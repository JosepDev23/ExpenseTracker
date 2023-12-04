import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, Length } from 'class-validator'
import { LoginDto } from './login.dto'

export class RegisterDTO extends LoginDto {
  @IsNotEmpty()
  @Length(9)
  @ApiProperty()
  phoneNumber: string

  @IsNotEmpty()
  @ApiProperty()
  currency: number
}
