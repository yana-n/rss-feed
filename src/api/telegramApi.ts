import { Toaster } from '@components/toaster.ts'

const apiToken = import.meta.env.VITE_TG_API_TOKEN
const baseUrl = import.meta.env.VITE_TG_BASE_URL
const chatId = import.meta.env.VITE_TG_CHANNEL_ID

const toaster = new Toaster()

export async function getMessagesFromChannel() {
  const url = `${baseUrl}/bot${apiToken}/getUpdates`
  const response = await fetch(url)
  const data = await response.json()

  if (!data.ok) {
    toaster.show('Error on fetching messages', 'error')
  }

  return data.result.filter((update: any) => {
    return update.message?.chat.id === chatId
  })
}
