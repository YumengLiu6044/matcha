export type UserData = {
  availability?: Record<string, { start: string; end: string }>
  name: string
  email?: string
  major?: string
  year?: string
  profileURL?: string
  createdAt?: string
  interests: string[]
  uid?: string
}


