import { Controller, Get } from '@nestjs/common'
import { UserService } from './user.service'
import User from './user.schema'
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger'

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Return all users.' })
  @ApiResponse({
    status: 200,
    description: 'Users found successfully.',
    type: User,
  })
  async getAll(): Promise<User[]> {
    return this.userService.findAll()
  }

  @Get(':id')
  @ApiOperation({ summary: 'Return a user by id.' })
  @ApiResponse({
    status: 200,
    description: 'User found successfully.',
    type: User,
  })
  @ApiParam({
    name: 'id',
    required: true,
    type: String,
    description: 'User id',
  })
  async getById(id: string): Promise<User> {
    return this.userService.findById(id)
  }
}
