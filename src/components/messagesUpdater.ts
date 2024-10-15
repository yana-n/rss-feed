import { getMessagesFromChannel } from '@api/telegramApi.ts'
import { renderMessages } from '@components/messageRenderer.ts'
import { Toaster } from '@components/toaster.ts'

const toaster = new Toaster()
const msgContainer = document.querySelector('#messages-container')

export async function updateMessages(filterImages: boolean | null) {
  try {
    const messages = await getMessagesFromChannel()

    const filteredMessages = messages.filter(
      (message: { photo: string | any[] }) => {
        const hasImage = message.photo?.length > 0
        if (filterImages === true) return hasImage
        if (filterImages === false) return !hasImage
        return true
      },
    )

    if (filteredMessages.length === 0) {
      const declaimer = document.createElement('p')

      declaimer.textContent =
        "No message found for this filter. Let's try another one!"
      declaimer.classList.add('no-messages')

      msgContainer!.innerHTML = ''
      msgContainer!.appendChild(declaimer)
    } else {
      renderMessages(filteredMessages)
    }
  } catch (error) {
    toaster.show('Error on updating messages', 'info')
    console.error('Error on updating messages:', error)
  }
}

export function startAutoRefresh() {
  setInterval(async () => {
    toaster.show('Check for new messages...', 'info')
    await updateMessages(null)
  }, 15000)
}
