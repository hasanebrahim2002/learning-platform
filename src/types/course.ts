import type { TypeOfLanguage } from "./state";
interface Instructor {
  fullName: string;
}
export interface Category {
  id: string;
  title: string;
}
export interface Course {
  id: string;
  title: string;
  description: string;
  sessionCount: number | null;
  courseLanguage: TypeOfLanguage;
  instructor: Instructor;
  category: Category;
  imageUrl?: string;
  price?: number;
}
export interface PaginationType {
  page: number;
  limit: number;
  totalPages: number;
  hasPrevious: boolean;
  hasNext: boolean;
}
export interface Meta {
  pagination: PaginationType;
}
export interface Courses {
  success: boolean;
  data: Array<Course>;
  meta: Meta;
}
export interface CourseDetails {
  id: string;
  title: string;
  description: string;
  price: number;
  sessionCount: number;
  createdAt: string;
  imageKey: string;
  instructor: Instructor;
  learningOutcomes?: string[];
}
