import { getMessagesFromChannel } from '@api/telegramApi';
import { renderMessages } from '@components/messageRenderer';
import '@styles/styles.css';

async function updateMessages() {
    try {
        const messages = await getMessagesFromChannel();
        renderMessages(messages);
    } catch (error) {
        console.error('Error on fetching messages:', error);
    }
}

document.getElementById('refresh-button')?.addEventListener('click', updateMessages);

updateMessages()
