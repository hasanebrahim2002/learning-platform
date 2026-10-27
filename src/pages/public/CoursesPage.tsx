import { useEffect, useState } from "react";
import { apiClient } from "../../api/apiClient";
import { useLanguage } from "../../context/useLanguage";
import type { Category, Course, PaginationType } from "../../types/course";
import CourseFilters from "../../components/common/filteres";
import { useSearchParams } from "react-router-dom";
import CourseCard from "../../components/common/courses/CourseCard";
import { motion } from "framer-motion";
import Pagination from "../../components/common/Pagination";
import SkeltonCourse from "../../components/common/courses/SkeltonCourse";

const CoursesPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [pagination, setPagination] = useState<PaginationType>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const { language } = useLanguage();
  const isAr = language === "ar";
  const initialX = isAr ? 50 : -50;
  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    const validPage = isNaN(newPage) ? 1 : newPage;
    params.set("page", validPage.toString());
    setSearchParams(params);
  };
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    let needsUpdate = false;

    if (!params.has("page")) {
      params.set("page", "1");
      needsUpdate = true;
    }
    if (!params.has("limit")) {
      params.set("limit", "8");
      needsUpdate = true;
    }

    if (needsUpdate) {
      setSearchParams(params, { replace: true });
    }
  }, [searchParams, setSearchParams]);
  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await apiClient<{ data: Category[] }>("/category/all", {
          lang: language,
        });
        setCategories(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getCategories();
  }, [language]);
  useEffect(() => {
    const getCourses = async () => {
      const queryString = searchParams.toString();

      try {
        setIsLoading(true);
        const res = await apiClient<{ data: Course[]; meta: PaginationType }>(
          `/courses?${queryString}`,
          {
            lang: language,
          },
        );
        setCourses(res.data);
        setPagination(res.meta);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getCourses();
  }, [language, searchParams]);
  return (
    <div className="pb-5 w-full px-3 md:px-6 lg:px-12">
      <CourseFilters categories={categories} />
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          {[...Array(8)].map((_, index) => (
            <SkeltonCourse key={index} />
          ))}
        </div>
      ) : courses.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 dark:bg-gray-900/40 rounded-2xl border border-dashed border-gray-300 dark:border-gray-800 mt-6">
          <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">
            No courses found
          </p>
          <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">
            Try changing your filter criteria or search terms.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          {courses.map((course, index) => {
            return (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, x: initialX }}
                animate={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.9,
                  ease: "easeOut",
                }}
              >
                <CourseCard data={course} />
              </motion.div>
            );
          })}
        </div>
      )}
      {pagination && (
        <Pagination data={pagination} onPageChange={handlePageChange} />
      )}
    </div>
  );
};

export default CoursesPage;
