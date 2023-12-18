import User from './user.schema'

export class JWTUser {
  user: User
  token: string

  constructor(user: User, token: string) {
    this.user = user
    this.token = token
  }
}
