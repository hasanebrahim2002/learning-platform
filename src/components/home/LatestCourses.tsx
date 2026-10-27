import { useEffect, useState } from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { Courses } from "../../types/course";
import { apiClient } from "../../api/apiClient";
import { useLanguage } from "../../context/useLanguage";
import CourseCard from "../common/courses/CourseCard";
import SkeltonCourse from "../common/courses/SkeltonCourse";
import { translations } from "../../constants/translations";

const LatestCourses = () => {
  const [courseData, setCourseData] = useState<Courses | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { language } = useLanguage();
  const t = translations[language];
  const isAr = language === "ar";
  const initialX = isAr ? 50 : -50;
  const arrowMovement = isAr ? -6 : 6;

  useEffect(() => {
    const fetchState = async () => {
      try {
        setIsLoading(true);
        const res = await apiClient<Courses>("/courses?page=1&limit=4", {
          lang: language,
        });
        console.log(res);
        setCourseData(res);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchState();
  }, [language]);

  return (
    <div className="py-3 md:py-5 lg:py-11">
      <div className="flex justify-between py-3 md:pb-6 lg:pb-11">
        <h2 className="text-2xl font-bold">{t.latestCourses}</h2>
        <Link
          to="/courses"
          className="inline-block font-bold text-gray-700 dark:text-neutral-200"
        >
          <motion.div
            className="flex items-center gap-2 hover:text-primary transition-colors"
            whileHover="hover"
            whileTap={{ scale: 0.95 }}
          >
            <span>{t.view}</span>

            <motion.span
              className={isAr ? "rotate-180" : ""}
              variants={{
                hover: { x: arrowMovement },
              }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              <IoIosArrowRoundForward size={22} />
            </motion.span>
          </motion.div>
        </Link>
      </div>
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          {[...Array(4)].map((_, index) => (
            <SkeltonCourse key={index} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          {courseData?.data.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: initialX }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.5,
                delay: index * 0.5,
                ease: "easeOut",
              }}
            >
              <CourseCard data={item} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LatestCourses;
