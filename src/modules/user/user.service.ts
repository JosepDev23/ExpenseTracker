import { Injectable } from '@nestjs/common'
import User from './user.schema'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { RegisterDto } from './dto/register.dto'
import { JwtService } from '@nestjs/jwt'
import { hash } from 'bcrypt'
import { LoginDto } from './dto/login.dto'

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private UserModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async findAll(): Promise<User[]> {
    return this.UserModel.find()
  }

  async findById(id: string): Promise<User> {
    return this.UserModel.findById(id)
  }

  async register(registerDto: RegisterDto): Promise<User> {
    const { password } = registerDto
    const plainToHash = await hash(password, 10)

    try {
      const savedUser = new this.UserModel({
        ...registerDto,
        password: plainToHash,
      })
      return savedUser.save()
    } catch (error) {
      throw new Error('Error during user registration')
    }
  }

  async login(loginDTO: LoginDto): Promise<User> {
    return null
  }
}
