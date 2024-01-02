import { HttpException, Injectable } from '@nestjs/common'
import User from './user.schema'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { RegisterDto } from './dto/register.dto'
import { JwtService } from '@nestjs/jwt'
import { compare, hash } from 'bcrypt'
import { LoginDto } from './dto/login.dto'
import { JWTUser } from './jwt-user.model'

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

  async login(loginDto: LoginDto): Promise<JWTUser> {
    const { phoneNumber, password } = loginDto
    try {
      let user = await this.UserModel.findOne({ phoneNumber })
      if (!user) throw new HttpException('User not found', 404)

      const isPasswordValid = await compare(password, user.password)
      if (!isPasswordValid) {
        throw new HttpException('Incorrect password', 403)
      }

      const payload = { id: user._id, phoneNumber: user.phoneNumber }
      const token = this.jwtService.sign(payload)

      const jwtUser: JWTUser = {
        user,
        token,
      }

      return jwtUser
    } catch (error) {
      throw new HttpException('Error during user login: ' + error.message, 500)
    }
  }
}
