import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IStudent } from 'src/interface/student.interface';
import { CreateStudentDto } from 'src/dto/create-student.dto';
import { UpdateStudentDto } from '../dto/update-student.dto'; // Assuming you have a CreateStudentDto defined
import { get } from 'http';

@Injectable()
export class StudentService {
  createService(createStudentDto: CreateStudentDto) {
    throw new Error('Method not implemented.');
  }
  constructor(@InjectModel('students') private studentModel: Model<IStudent>) {}

  async createStudent(createStudentDto: CreateStudentDto): Promise<IStudent> {
    const newStudent = await new this.studentModel(createStudentDto);
    return newStudent.save();
  }

  async getAllStudents(): Promise<IStudent[]> {
    const studentData = await this.studentModel.find();
    if (!studentData || studentData.length == 0) {
      throw new NotFoundException('No student found');
    }
    return studentData;
  }

  async getStudentById(studentId: string): Promise<IStudent> {
    const studentData = await this.studentModel.findById(studentId);
    if (!studentData) {
      throw new NotFoundException(`Student #${studentId} not found`);
    }
    return studentData;
  }
  async updateStudent(
    studentId: string,
    updateStudentDto: UpdateStudentDto,
  ): Promise<IStudent> {
    const studentData = await this.studentModel.findByIdAndUpdate(
      studentId,
      updateStudentDto,
      { new: true },
    );
    if (!studentData) {
      throw new NotFoundException(`Student #${studentId} not found`);
    }
    return studentData;
  }

  async deleteStudent(studentId: string): Promise<any> {
    const studentData = await this.studentModel.findByIdAndDelete(studentId);
    if (!studentData) {
      throw new NotFoundException(`Student #${studentId} not found`);
    }
    return studentData;
  }
}
