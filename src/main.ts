import { getMessagesFromChannel } from '@api/telegramApi';
import { renderMessages } from '@components/messageRenderer';
import '@styles/styles.css';

const showImagesButton = document.querySelector('#show-images') as HTMLButtonElement;
const hideImagesButton = document.querySelector('#hide-images') as HTMLButtonElement;
const showAllButton = document.querySelector('#show-all') as HTMLButtonElement;
const refreshButton = document.querySelector('#refresh-button') as HTMLButtonElement;

function setActiveFilter(button: HTMLButtonElement) {
    document.querySelectorAll('.filter-btn').forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');
}

async function updateMessages(filterImages: boolean | null, button?: HTMLButtonElement) {
    try {
        if (button) {
            setActiveFilter(button);
        }

        const messages = await getMessagesFromChannel();
        renderMessages(messages, filterImages);
    } catch (error) {
        console.error('Ошибка при получении сообщений:', error);
    }
}

function handleFilterClick(filter: boolean | null, button: HTMLButtonElement) {
    updateMessages(filter, button);
}

showImagesButton?.addEventListener('click', () => handleFilterClick(true, showImagesButton));
hideImagesButton?.addEventListener('click', () => handleFilterClick(false, hideImagesButton));
showAllButton?.addEventListener('click', () => handleFilterClick(null, showAllButton));

refreshButton?.addEventListener('click', () => updateMessages(null, showAllButton));

updateMessages(null, showAllButton);
