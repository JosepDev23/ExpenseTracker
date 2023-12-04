import { HttpException, Injectable } from '@nestjs/common'
import User from './user.schema'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { RegisterDto } from './dto/register.dto'
import { JwtService } from '@nestjs/jwt'
import { compare, hash } from 'bcrypt'
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
      throw new HttpException(
        'Error during user registration: ' + error.message,
        500,
      )
    }
  }

  async login(loginDto: LoginDto): Promise<{ user: User; token: string }> {
    const { username, password } = loginDto
    try {
      let findUser = await this.UserModel.findOne({ username })
      if (!findUser) throw new HttpException('User not found', 404)

      const isPasswordValid = await compare(password, findUser.password)
      if (!isPasswordValid) {
        throw new HttpException('WRONG_PASSWORD', 403)
      }

      const payload = { id: findUser._id, name: findUser.username }
      const token = this.jwtService.sign(payload)

      const data = {
        user: findUser,
        token,
      }

      return data
    } catch (error) {
      throw new HttpException('Error during user login: ' + error.message, 500)
    }
  }
}
