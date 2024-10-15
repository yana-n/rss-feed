import { Toaster } from '@components/toaster.ts'

const toaster = new Toaster()

const apiToken = import.meta.env.VITE_TG_API_TOKEN
const baseUrl = import.meta.env.VITE_TG_BASE_URL

export async function getFileUrl(fileId: string): Promise<string> {
  const url = `${baseUrl}/bot${apiToken}/getFile?file_id=${fileId}`
  const response = await fetch(url)
  const data = await response.json()

  if (!data.ok) {
    toaster.show('Error on fetching file', 'error')
  }

  const filePath = data.result.file_path
  return `${baseUrl}/file/bot${apiToken}/${filePath}`
}
