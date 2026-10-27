import { useSearchParams } from "react-router-dom";
import Button from "../common/Button";
import type { Category } from "../../types/course";
import { useLanguage } from "../../context/useLanguage";
import { translations } from "../../constants/translations";
interface FilterProps {
  categories: Category[];
}
const CourseFilters = ({ categories }: FilterProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { language } = useLanguage();
  const currentCategory = searchParams.get("categoryId") || "all";
  const currentLanguage = searchParams.get("language") || "all";
  const t = translations[language].FilterCoursesLan;
  const handleCategoryChange = (categoryId: string) => {
    const params = new URLSearchParams(searchParams);

    if (categoryId === "all") {
      params.delete("categoryId");
    } else {
      params.set("categoryId", categoryId);
    }

    params.set("page", "1");

    setSearchParams(params);
  };
  const handleLanguageChange = (language: string) => {
    const params = new URLSearchParams(searchParams);

    if (language === "all") {
      params.delete("language");
    } else {
      params.set("language", language);
    }

    params.set("page", "1");

    setSearchParams(params);
  };
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-200/60 dark:border-slate-800">
      <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
        <Button
          variant={currentCategory === "all" ? "primary" : "outline"}
          size="sm"
          className="shrink-0"
          noScale={true}
          onClick={() => handleCategoryChange("all")}
        >
          {t.All}
        </Button>

        {categories.map((cat) => {
          const catId = String(cat.id);
          const isActive = currentCategory === catId;
          return (
            <Button
              key={cat.id}
              variant={isActive ? "primary" : "outline"}
              size="sm"
              className="shrink-0"
              noScale={true}
              onClick={() => handleCategoryChange(catId)}
            >
              {cat.title}
            </Button>
          );
        })}
      </div>

      <div className="flex items-center gap-2 shrink-0 border-t md:border-t-0 pt-3 md:pt-0 border-slate-200 dark:border-slate-800">
        <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
          {t.title} :
        </span>
        <select
          value={currentLanguage}
          onChange={(e) => handleLanguageChange(e.target.value)}
          className="px-3 py-1.5 text-sm bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
        >
          <option value="all">{t.All}</option>
          <option value="ar">{t.AR}</option>
          <option value="en">{t.EN}</option>
        </select>
      </div>
    </div>
  );
};

export default CourseFilters;
