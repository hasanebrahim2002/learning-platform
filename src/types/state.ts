import type { IconType } from "react-icons";
import { FaChalkboardTeacher, FaUserGraduate } from "react-icons/fa";
import { FaBookOpen } from "react-icons/fa6";

export interface StateData {
  students: number;
  instructors: number;
  courses?: number;
}

export type TypeOfLanguage = "en" | "ar";

export const STATE_ICONS: Record<string, IconType> = {
  students: FaUserGraduate,
  instructors: FaChalkboardTeacher,
  courses: FaBookOpen,
};
