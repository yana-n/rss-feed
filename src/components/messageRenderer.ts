import { getFileUrl } from '@utils/fileUtils';
import { formatDate } from '@utils/dateFormatter';

export function renderMessages(messages: any[], filterImages: boolean | null = null) {
    const container = document.querySelector('#messages-container');
    const channelTitle = document.querySelector('#channel-title');

    if (!container) return;

    container.innerHTML = '';

    const posts = messages.filter((item) => {
        const hasText = item?.channel_post?.text || item?.channel_post?.caption;
        const hasImage = item?.channel_post?.photo?.length > 0;

        if (filterImages) {
            return hasText && hasImage;
        } else if (filterImages === false) {
            return hasText && !hasImage;
        } else {
            return hasText;
        }
    });

    if (!posts.length) return;

    const fragment = document.createDocumentFragment();

    channelTitle!.textContent = `Channel: ${posts[0].channel_post.chat.title}`;

    posts.forEach((update) => {
        const message = update.channel_post;

        if (!message) return;

        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');

        if (message.date) {
            const dateText = document.createElement('p');
            dateText.classList.add('date');
            dateText.textContent = formatDate(message.date);
            messageDiv.appendChild(dateText);
        }

        if (message.text || message.caption) {
            const messageText = document.createElement('p');
            messageText.classList.add('message-text');
            messageText.textContent = message.text || message.caption;
            messageDiv.appendChild(messageText);
        }

        if (message.photo?.length > 0) {
            const largestPic = message.photo[message.photo.length - 1];

            const imgElement = document.createElement('img');
            imgElement.classList.add('message-image', 'loading');
            imgElement.src = '/loader.svg';
            messageDiv.appendChild(imgElement);

            getFileUrl(largestPic.file_id).then((imageUrl) => {
                imgElement.src = imageUrl;
                imgElement.classList.remove('loading');
            });
        }

        fragment.appendChild(messageDiv);
    });

    container.appendChild(fragment);
}
