import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common'
import { UserService } from './user.service'
import User from './user.schema'
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger'
import { LoginDto } from './dto/login.dto'
import { RegisterDto } from './dto/register.dto'

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
  async findAll(): Promise<User[]> {
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
  async findById(id: string): Promise<User> {
    return this.userService.findById(id)
  }

  @Post('/register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({
    status: 201,
    description: 'User registered successfully.',
    type: User,
  })
  async register(@Body() registerDto: RegisterDto): Promise<User> {
    try {
      return await this.userService.register(registerDto)
    } catch (error) {
      throw new HttpException(error.toString(), HttpStatus.BAD_REQUEST)
    }
  }

  @Post('/login')
  @ApiOperation({ summary: 'Login a user' })
  @ApiResponse({
    status: 201,
    description: 'User login successfully.',
    type: User,
  })
  async login(@Body() loginDTO: LoginDto): Promise<User> {
    try {
      return null
    } catch (error) {
      return null
    }
  }
}
