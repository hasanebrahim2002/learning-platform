import { IoIosArrowRoundForward } from "react-icons/io";
import { translations } from "../../../constants/translations";
import { useLanguage } from "../../../context/useLanguage";
import type { Course } from "../../../types/course";
import Button from "../Button";
interface CourseCardProps {
  data: Course;
}

const CourseCard = ({ data }: CourseCardProps) => {
  const { language } = useLanguage();
  const t = translations[language].CourseCard;
  const isFree = !data.price || data.price === 0;
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-900">
      <div className="relative h-48 w-full overflow-hidden bg-gray-100 dark:bg-neutral-800">
        <img
          src={data.imageUrl}
          alt={data.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute top-3 inset-s-3 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white shadow-md">
          {data.category.title}
        </span>
        <span className="absolute top-3 inset-e-3 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white shadow-md">
          {t.courseLanguage[data.courseLanguage]}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="truncate text-base font-bold text-gray-900 transition-colors group-hover:text-primary dark:text-white dark:group-hover:text-primary">
          {data.title}
        </h3>

        <div className="mt-3 flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-50 text-xs font-bold text-primary dark:bg-primary-950 dark:text-primary">
            {data.instructor.fullName[0]}
          </div>
          <span className="text-xs font-medium text-gray-500 dark:text-neutral-400">
            {data.instructor.fullName}
          </span>
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4 dark:border-neutral-800">
          <div>
            <span className="block text-[11px] text-gray-400">{t.price}</span>
            <span className="text-base font-bold text-primary">
              {isFree ? t.free : `$${data.price}`}
            </span>
          </div>

          <Button size="sm" to={`/courses/${data.id}`}>
            <span>{t.details}</span>
            <span className="inline-block transition-transform duration-200 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1">
              <IoIosArrowRoundForward />
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
