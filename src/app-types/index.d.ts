type ScrollBehavior = 'auto' | 'instant' | 'smooth'

interface IChat {
  id: number
  title?: string
}

interface IUpdate {
  update_id: number
  message?: IChannelPost
  channel_post?: IChannelPost
}

interface ITelegramAPIResponse {
  ok: boolean
  result: IUpdate[]
}

interface IPhoto {
  file_id: string
}

interface IChannelPost {
  message_id: number
  text?: string
  caption?: string
  photo?: IPhoto[]
  date: number
  chat: IChat
}

export interface IMessage {
  channel_post: IChannelPost
}

export interface ScrollToOptions {
  left?: number
  top?: number
  behavior?: ScrollBehavior
}
