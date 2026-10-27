import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  FiArrowRight,
  FiArrowLeft,
  FiCalendar,
  FiClock,
  FiUser,
  FiBookOpen,
  FiShare2,
  FiCheckCircle,
  FiAlertTriangle,
} from "react-icons/fi";
import { apiClient } from "../../api/apiClient";
import { useLanguage } from "../../context/useLanguage";
import type { CourseDetails } from "../../types/course";
import { translations } from "../../constants/translations";

const CourseDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { language } = useLanguage();
  const [courses, setCourses] = useState<CourseDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const isAr = language === "ar";
  const t = translations[language].CourseDetails;
  const ArrowIcon = isAr ? FiArrowRight : FiArrowLeft;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await apiClient<{ data: CourseDetails }>(`/courses/${id}`, {
          lang: language,
        });
        setCourses(res.data);
      } catch (err: unknown) {
        console.error(err);
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError(t.errorLoadCourse);
        }
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [t.errorLoadCourse, id, language]);

  // حالة التحميل (Loading)
  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
        <div className="w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-gray-500 text-sm">{t.loadCourse}</p>
      </div>
    );
  }

  // حالة الخطأ أو عدم وجود الكورس
  if (error || !courses) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center text-center px-4">
        <FiAlertTriangle className="w-12 h-12 text-red-500 mb-3" />
        <h2 className="text-xl font-bold mb-6 text-gray-800 dark:text-gray-200">
          {error || t.notFoundCourse}
        </h2>

        <Link
          to="/courses"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-white hover:bg-emerald-700 transition"
        >
          <ArrowIcon className="w-4 h-4" />
          <span>{t.backToCourses}</span>
        </Link>
      </div>
    );
  }

  // تنسيق تاريخ الإنشاء
  const formattedDate = courses.createdAt
    ? new Date(courses.createdAt).toLocaleDateString(isAr ? "ar-EG" : "en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6">
      {/* شريط المسار السريع (Breadcrumb) */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
        <Link to="/" className="hover:text-primary transition">
          {t.home}
        </Link>
        <span>/</span>
        <Link to="/courses" className="hover:text-primary transition">
          {t.courses}
        </Link>
        <span>/</span>
        <span className="text-gray-900 dark:text-gray-100 font-medium truncate max-w-50 sm:max-w-xs">
          {courses.title}
        </span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* العمود الرئيسي (المحتوى والتفاصيل) */}
        <div className="lg:col-span-2 space-y-6">
          {/* غلاف الكورس الرئيسي */}
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-800 shadow-sm">
            {courses.imageKey ? (
              <img
                src={courses.imageKey}
                alt={courses.title}
                className="w-full h-full object-cover"
                loading="eager"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <FiBookOpen className="w-16 h-16" />
              </div>
            )}
          </div>

          {/* العنوان والمدرّب وتاريخ النشر */}
          <div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-50 capitalize">
              {courses.title}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-300 border-b border-gray-100 dark:border-gray-800 pb-5">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-bold">
                  {courses.instructor?.fullName?.charAt(0) || "U"}
                </div>
                <div>
                  <span className="text-xs text-gray-400 block">
                    {t.instructorLabel}
                  </span>
                  <span className="font-semibold text-gray-900 dark:text-gray-100">
                    {courses.instructor?.fullName || t.instructorName}
                  </span>
                </div>
              </div>

              {formattedDate && (
                <>
                  <div className="h-6 w-px bg-gray-200 dark:bg-gray-800 hidden sm:block" />
                  <div className="flex items-center gap-2">
                    <FiCalendar className="w-4 h-4 text-gray-400" />
                    <span>{`${t.bublishHistory}: ${formattedDate}`}</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* وصف الكورس */}
          <div className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              {t.aboutTheCourse}
            </h2>
            <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed text-base whitespace-pre-line bg-white dark:bg-gray-900/40 p-6 rounded-xl border border-gray-100 dark:border-gray-800/80">
              {courses.description || t.descreption}
            </div>
          </div>

          {/* ميزات ومخرجات الكورس (ديناميكي) */}
          {courses.learningOutcomes && courses.learningOutcomes.length > 0 && (
            <div className="border border-gray-100 dark:border-gray-800 rounded-xl p-6 bg-gray-50/50 dark:bg-gray-900/20">
              <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-4">
                {t.whatLearn}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                {courses.learningOutcomes.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2 text-gray-700 dark:text-gray-300"
                  >
                    <FiCheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* الشريط الجانبي الثابت (Sticky Sidebar) */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm space-y-6">
            {/* عرض السعر */}
            <div className="border-b border-gray-100 dark:border-gray-800 pb-5">
              <span className="text-sm text-gray-500 block mb-1">
                {t.courseFeeLabel}
              </span>
              <div className="flex items-baseline gap-2">
                {courses.price === null || courses.price === 0 ? (
                  <span className="text-3xl font-extrabold text-primary dark:text-emerald-400">
                    {t.courseFee}
                  </span>
                ) : (
                  <>
                    <span className="text-3xl font-extrabold text-gray-900 dark:text-white">
                      ${courses.price}
                    </span>
                    <span className="text-xs text-gray-400">
                      {t.oneTimepayment}
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* تفاصيل سريعة */}
            <div className="space-y-3.5 text-sm">
              <div className="flex items-center justify-between text-gray-600 dark:text-gray-300">
                <span className="flex items-center gap-2">
                  <FiClock className="w-4 h-4 text-primary" />
                  {t.sessionsCount}
                </span>
                <span className="font-semibold text-gray-900 dark:text-gray-100">
                  {courses.sessionCount
                    ? `${courses.sessionCount} ${t.sessionsCount}`
                    : t.TBD}
                </span>
              </div>

              <div className="flex items-center justify-between text-gray-600 dark:text-gray-300">
                <span className="flex items-center gap-2">
                  <FiUser className="w-4 h-4 text-primary" />
                  {t.instructorLabel}
                </span>
                <span className="font-semibold text-gray-900 dark:text-gray-100">
                  {courses.instructor?.fullName || t.certified_Instructor}
                </span>
              </div>
            </div>

            {/* أزرار الإجراء */}
            <div className="space-y-3 pt-2">
              <button
                type="button"
                className="w-full py-3.5 px-4 rounded-xl font-bold bg-primary hover:bg-emerald-700 text-white shadow-sm transition active:scale-[0.99]"
              >
                {t.EnrollButton}
              </button>

              <button
                type="button"
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: courses.title,
                      url: window.location.href,
                    });
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                    alert(t.copyCourse);
                  }
                }}
                className="w-full py-2.5 px-4 rounded-xl font-medium border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 flex items-center justify-center gap-2 transition text-sm"
              >
                <FiShare2 className="w-4 h-4" />
                <span>{t.sharCourse}</span>
              </button>
            </div>

            <p className="text-center text-xs text-gray-400">
              {t.confirmation}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsPage;
