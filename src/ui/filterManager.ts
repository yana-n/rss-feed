import { updateMessages } from '@components/messagesUpdater'

const showImagesButton = document.querySelector(
  '#show-images',
) as HTMLButtonElement
const hideImagesButton = document.querySelector(
  '#hide-images',
) as HTMLButtonElement
const showAllButton = document.querySelector('#show-all') as HTMLButtonElement

let currentFilter: boolean | null = null

function setActiveFilter(button: HTMLButtonElement) {
  document
    .querySelectorAll('.filter-btn')
    .forEach((btn) => btn.classList.remove('active'))

  button.classList.add('active')
}

async function handleFilterClick(
  filter: boolean | null,
  button: HTMLButtonElement,
) {
  setActiveFilter(button)
  currentFilter = filter
  await updateMessages(filter)
}

export function setupFilters() {
  showImagesButton?.addEventListener('click', () =>
    handleFilterClick(true, showImagesButton),
  )
  hideImagesButton?.addEventListener('click', () =>
    handleFilterClick(false, hideImagesButton),
  )
  showAllButton?.addEventListener('click', () =>
    handleFilterClick(null, showAllButton),
  )
}

export function getCurrentFilter(): boolean | null {
  return currentFilter
}
