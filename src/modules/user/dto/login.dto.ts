import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, Length } from 'class-validator'

export class LoginDto {
  @IsNotEmpty()
  @ApiProperty()
  phoneNumber: string

  @IsNotEmpty()
  @ApiProperty()
  password: string
}
