import { Toaster } from '@components/toaster.ts'
import { IUpdate, ITelegramAPIResponse } from '@app-types/index'

const apiToken = import.meta.env.VITE_TG_API_TOKEN
const baseUrl = import.meta.env.VITE_TG_BASE_URL
const chatId = import.meta.env.VITE_TG_CHANNEL_ID

const toaster = new Toaster()

export async function getMessagesFromChannel(): Promise<IUpdate[]> {
  const url = `${baseUrl}/bot${apiToken}/getUpdates`
  const response = await fetch(url)
  const data: ITelegramAPIResponse = await response.json()

  if (!data.ok) {
    toaster.show('Error on fetching messages', 'error')
  }

  return data.result.filter((update: IUpdate) => {
    return update.message?.chat.id === chatId
  })
}
