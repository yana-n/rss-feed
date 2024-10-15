import { updateMessages } from '@components/messagesUpdater'
import { Toaster } from '@components/toaster.ts'
import { getCurrentFilter } from '@ui/filterManager.ts'
import { scrollTo } from '@ui/scrollManager.ts'

const toaster = new Toaster()

export function setupRefreshButton() {
  const refreshButton = document.querySelector(
    '#refresh-button',
  ) as HTMLButtonElement
  const loader = document.createElement('img')

  loader.src = '/images/loader.svg'
  loader.classList.add('loading')
  loader.style.display = 'none'
  refreshButton?.parentNode?.insertBefore(loader, refreshButton.nextSibling)

  if (refreshButton) {
    refreshButton.addEventListener('click', async () => {
      loader.style.display = 'block'
      refreshButton.disabled = true

      try {
        const currentFilter = getCurrentFilter()

        await updateMessages(currentFilter)

        scrollTo()
      } catch (error) {
        toaster.show('Error on updating messages list', 'error')
        console.error('Error on updating messages list:', error)
      } finally {
        loader.style.display = 'none'
        refreshButton.disabled = false
      }
    })
  }
}
