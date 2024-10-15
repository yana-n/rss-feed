interface ChannelPost {
  text?: string
  caption?: string
  photo?: Array<object>
}

export interface Message {
  channel_post: ChannelPost
}
