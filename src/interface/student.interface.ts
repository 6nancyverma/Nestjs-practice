import { Document } from 'mongoose';
export interface IStudent extends Document {
  readonly name: string;
  readonly age: number;
  readonly class: number;
  readonly gender: string;
}
