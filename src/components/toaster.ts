type ToasterType = 'success' | 'error' | 'info' | 'warning'

export class Toaster {
  private container: HTMLElement | null = null

  private createContainer() {
    this.container = document.createElement('div')
    this.container.classList.add('toaster-container')
    document.body.appendChild(this.container)
  }

  show(message: string, type: ToasterType = 'info', duration: number = 3000) {
    if (!this.container) {
      this.createContainer()
    }

    const toast = document.createElement('div')
    toast.classList.add('toast', type)
    toast.textContent = message

    this.container!.appendChild(toast)

    setTimeout(() => {
      toast.classList.add('fade-out')
      toast.addEventListener('transitionend', () => {
        toast.remove()

        if (this.container?.children.length === 0) {
          this.removeContainer()
        }
      })
    }, duration)
  }

  private removeContainer() {
    if (this.container) {
      this.container.remove()
      this.container = null
    }
  }
}
