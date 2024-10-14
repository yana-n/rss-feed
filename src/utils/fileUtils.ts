const apiToken = import.meta.env.VITE_TG_API_TOKEN;
const baseUrl = import.meta.env.VITE_TG_BASE_URL;

export async function getFileUrl(fileId: string): Promise<string> {
    const url = `${baseUrl}/bot${apiToken}/getFile?file_id=${fileId}`;
    const response = await fetch(url);
    const data = await response.json();

    if (!data.ok) {
        throw new Error('Error on fetching file');
    }

    const filePath = data.result.file_path;
    return `${baseUrl}/file/bot${apiToken}/${filePath}`;
}
