import { IsString, IsNotEmpty, MaxLength, IsNumber } from 'class-validator';

export class CreateStudentDto {
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly name: string;
  @IsNumber()
  @IsNotEmpty()
  readonly age: number;
  @IsNumber()
  @IsNotEmpty()
  readonly class: number;
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly gender: string;
}
