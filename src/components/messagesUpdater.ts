import { getMessagesFromChannel } from '@api/telegramApi.ts'
import { renderMessages } from '@components/messageRenderer.ts'
import { getCurrentFilter } from '@ui/filterManager.ts'
import { Toaster } from '@components/toaster.ts'
import { IMessage, IUpdate } from '@app-types/index'

const toaster = new Toaster()
const msgContainer = document.querySelector('#messages-container')

export async function updateMessages(filterImages: boolean | null) {
  try {
    const messages = await getMessagesFromChannel()

    const filteredMessages: IMessage[] = messages
      .filter((update: IUpdate) => update.channel_post)
      .map((update: IUpdate) => ({ channel_post: update.channel_post! }))

    const finalFilteredMessages = filteredMessages.filter(
      (message: IMessage) => {
        const hasImage = message.channel_post.photo?.length
        const hasText =
          message.channel_post.text

        if (filterImages === true) return hasImage
        if (filterImages === false) return !hasImage && hasText

        return true
      },
    )

    if (finalFilteredMessages.length === 0) {
      const declaimer = document.createElement('p')
      declaimer.textContent =
        "No message found for this filter. Let's try another one!"
      declaimer.classList.add('no-messages')

      msgContainer!.innerHTML = ''
      msgContainer!.appendChild(declaimer)
    } else {
      msgContainer!.innerHTML = ''
      renderMessages(finalFilteredMessages)
    }
  } catch (error) {
    toaster.show('Error on updating messages', 'error')
    console.error('Error on updating messages:', error)
  }
}

export async function startAutoRefresh() {
  async function refreshMessages() {
    try {
      toaster.show('Checking for new messages...', 'info')
      const currentFilter = getCurrentFilter()

      await updateMessages(currentFilter)
    } catch (error) {
      toaster.show('Error while refreshing messages', 'error')
      console.error('Error while refreshing messages:', error)
    } finally {
      setTimeout(refreshMessages, 15000)
    }
  }

  await refreshMessages()
}
