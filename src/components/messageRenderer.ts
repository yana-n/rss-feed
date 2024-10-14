import { getFileUrl } from '@utils/fileUtils';
import {formatDate} from "@utils/dateFormatter.ts";

export function renderMessages(messages: any[]) {
    const container = document.getElementById('messages-container');
    if (!container) return;

    container.innerHTML = '';

    const posts = messages.filter(item => item.channel_post)

    const titleText = document.createElement('h1');
    titleText.textContent = `Channel: ${posts[0].channel_post.chat.title}`
    container.insertAdjacentElement('afterbegin', titleText)

    posts.forEach((update) => {
        const message = update.channel_post;

        if (!message) return;

        console.log(message)

        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');

        if (message.text || message.caption) {
            const messageText = document.createElement('p');
            messageText.textContent = `Message: ${message.text || message.caption}`;
            messageDiv.appendChild(messageText);
        }

        if (message.date) {
            const dateText = document.createElement('p');
            dateText.textContent = formatDate(message.date);
            messageDiv.appendChild(dateText);
        }

        if (message?.photo?.length > 0) {
            const largestPic = message.photo[message.photo.length - 1];

            getFileUrl(largestPic.file_id).then((imageUrl) => {
                const imgElement = document.createElement('img');
                imgElement.src = imageUrl;
                imgElement.style.width = '300px';
                messageDiv.appendChild(imgElement);
            });
        }

        container.appendChild(messageDiv);
    });
}
