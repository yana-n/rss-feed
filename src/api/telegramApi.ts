const apiToken = import.meta.env.VITE_TG_API_TOKEN;
const baseUrl = import.meta.env.VITE_TG_BASE_URL;
const chatId = import.meta.env.VITE_TG_CHANNEL_ID;

export async function getChannelInfo() {
    const url = `${baseUrl}/bot${apiToken}/getChat?chat_id=${chatId}`;
    const response = await fetch(url);
    const data = await response.json();

    if (!data.ok) {
        throw new Error('Error jn fetching channel info');
    }

    return data.result;
}

export async function getMessagesFromChannel() {
    const url = `${baseUrl}/bot${apiToken}/getUpdates`;
    const response = await fetch(url);
    const data = await response.json();

    if (!data.ok) {
        throw new Error('Error on fetching messages');
    }

    return data.result.filter((update: any) => {
       return update.message?.chat.id === chatId
    });
}
