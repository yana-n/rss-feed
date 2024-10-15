import { getMessagesFromChannel } from '@api/telegramApi.ts'
import { renderMessages } from '@components/messageRenderer.ts'
import { Toaster } from '@components/toaster.ts'
import { Message } from '@app-types/index'

const toaster = new Toaster()
const msgContainer = document.querySelector('#messages-container')

export async function updateMessages(filterImages: boolean | null) {
  try {
    const messages = await getMessagesFromChannel()

    const filteredMessages = messages.filter((message: Message) => {
      const hasImage =
        message.channel_post.caption && message.channel_post.photo
      const hasText = message.channel_post.text

      if (filterImages === true) return hasImage
      if (filterImages === false) return !hasImage && hasText

      return true
    })

    if (filteredMessages.length === 0) {
      const declaimer = document.createElement('p')
      declaimer.textContent =
        "No message found for this filter. Let's try another one!"
      declaimer.classList.add('no-messages')

      msgContainer!.innerHTML = ''
      msgContainer!.appendChild(declaimer)
    } else {
      msgContainer!.innerHTML = ''
      renderMessages(filteredMessages)
    }
  } catch (error) {
    toaster.show('Error on updating messages', 'error')
    console.error('Error on updating messages:', error)
  }
}

export function startAutoRefresh() {
  setInterval(async () => {
    toaster.show('Checking for new messages...', 'info')
    await updateMessages(null)
  }, 15000)
}
