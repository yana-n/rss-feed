import { setupRefreshButton } from '@ui/refreshManager.ts'
import { setupFilters } from '@ui/filterManager'
import { updateMessages, startAutoRefresh } from '@components/messagesUpdater'
import '@styles/styles.scss'

setupRefreshButton()
setupFilters()

updateMessages(null)
startAutoRefresh()
