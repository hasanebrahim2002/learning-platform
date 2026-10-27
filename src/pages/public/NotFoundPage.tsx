import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "../../context/useLanguage";

export const NotFoundPage = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const isAr = language === "ar";

  return (
    <div className="relative flex min-h-[calc(100vh-80px)] w-full items-center justify-center overflow-hidden bg-white px-4 py-16 dark:bg-neutral-950">
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="h-72 w-72 rounded-full bg-primary/10 blur-3xl sm:h-96 sm:w-96" />
      </div>

      <div className="relative z-10 flex max-w-lg flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary-100 bg-primary-50/70 px-4 py-1.5 text-xs font-semibold text-primary backdrop-blur-sm dark:border-primary-200/20">
          <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
          <span>{isAr ? "خطأ 404" : "Error 404"}</span>
        </div>

        <h1 className="mt-4 text-7xl font-black tracking-tight text-transparent bg-clip-text bg-linear-to-r from-primary via-primary-hover to-primary-200 sm:text-8xl md:text-9xl">
          404
        </h1>

        <h2 className="mt-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
          {isAr ? "عذراً! الصفحة غير موجودة" : "Oops! Page Not Found"}
        </h2>

        <p className="mt-3 max-w-md text-sm leading-relaxed text-gray-600 dark:text-neutral-400 sm:text-base">
          {isAr
            ? "يبدو أن الرابط الذي تحاول الوصول إليه غير صحيح، أو تم نقل الصفحة، أو ربما الكورس لم يعد متاحاً."
            : "The link you are trying to reach might be broken, removed, or the course is no longer available."}
        </p>

        <div className="mt-8 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
          <Link
            to="/"
            className="group flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary-hover hover:shadow-md dark:text-neutral-950 sm:w-auto"
          >
            <span>{isAr ? "العودة للرئيسية" : "Back to Home"}</span>
            <span className="transition-transform group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5">
              →
            </span>
          </Link>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-white sm:w-auto"
          >
            {isAr ? "الصفحة السابقة" : "Go Back"}
          </button>
        </div>

        <div className="mt-10 border-t border-gray-100 pt-6 text-xs text-gray-500 dark:border-neutral-800 dark:text-neutral-500">
          <span>
            {isAr
              ? "هل تبحث عن دورة تعليمية محددة؟ "
              : "Looking for a specific course? "}
          </span>
          <Link
            to="/courses"
            className="font-semibold text-primary underline-offset-4 hover:underline hover:text-primary-hover"
          >
            {isAr ? "تصفح جميع الكورسات" : "Browse All Courses"}
          </Link>
        </div>
      </div>
    </div>
  );
};
