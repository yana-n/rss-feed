import { ScrollToOptions } from '@app-types/index'

export function scrollTo(options?: ScrollToOptions): void {
  const defaultOptions: ScrollToOptions = {
    top: 0,
    left: 0,
    behavior: 'smooth',
  }

  window.scrollTo(options || defaultOptions)
}
