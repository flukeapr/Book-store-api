import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class PaymentDto {
  @ApiProperty({
    example: 100,
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  cost: number;
}
