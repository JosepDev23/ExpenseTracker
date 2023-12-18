import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, Length } from 'class-validator'
import { LoginDto } from './login.dto'

export class RegisterDto extends LoginDto {
  @IsNotEmpty()
  @ApiProperty()
  username: string
}
