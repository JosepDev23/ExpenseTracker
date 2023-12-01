import { Controller } from '@nestjs/common'
import { UserService } from './user.service'
import User from './user.schema'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  async getAllUsers(): Promise<User[]> {
    return this.userService.findAll()
  }

  async getUserById(id: string): Promise<User> {
    return this.userService.findById(id)
  }
}
