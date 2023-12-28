import { PartialType } from '@nestjs/mapped-types';
import { CreateStudentDto } from './create-student.Dto';
export class UpdateStudentDto extends PartialType(CreateStudentDto) {}
