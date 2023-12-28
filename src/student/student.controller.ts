import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Put,
  Res,
  Param,
  Delete,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from 'src/dto/create-student.dto';
import { UpdateStudentDto } from '../dto/update-student.dto';
import { IStudent } from 'src/interface/student.interface';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}
  @Post()
  async createStudent(
    @Res() response,
    @Body() createStudentDto: CreateStudentDto,
  ): Promise<IStudent> {
    try {
      const newStudent =
        await this.studentService.createStudent(createStudentDto);
      return response.status(HttpStatus.OK).json({
        statusCode: 200,
        message: 'Student created successfully',
        data: newStudent,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error:Student not created',
        error: 'Bad Request',
      });
    }
  }

  @Get()
  async getStudents(@Res() response) {
    try {
      const studentData = await this.studentService.getAllStudents();
      return response.status(HttpStatus.OK).json({
        message: 'Students fetched successfully',
        data: studentData,
      });
    } catch (error) {
      return response.status(error.status).json(error.response);
    }
  }

  @Put(':id')
  async updateStudent(
    @Res() response,
    @Param('id') studentId: string,
    @Body() updateStudentDto: UpdateStudentDto,
  ) {
    try {
      const studentData = await this.studentService.updateStudent(
        studentId,
        updateStudentDto,
      );
      return response.status(HttpStatus.OK).json({
        message: 'Student updated successfully',
        data: studentData,
      });
    } catch (error) {
      return response.status(error.status).json(error.response);
    }
  }

  @Get(':id')
  async getStudent(@Res() response, @Param('id') studentId: string) {
    try {
      const studentData = await this.studentService.getStudentById(studentId);
      return response.status(HttpStatus.OK).json({
        message: 'Student found successfully',
        data: studentData,
      });
    } catch (error) {
      return response.status(error.status).json(error.response);
    }
  }
  @Delete(':id')
  async deleteUser(@Res() response, @Param('id') studentId: string) {
    try {
      const studentData = await this.studentService.deleteStudent(studentId);
      return response.status(HttpStatus.OK).json({
        message: 'Student deleted successfully',
        data: studentData,
      });
    } catch (error) {
      return response.status(error.status).json(error.response);
    }
  }
}
