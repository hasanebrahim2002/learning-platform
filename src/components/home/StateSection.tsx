import { translations } from "../../constants/translations";
import { useLanguage } from "../../context/useLanguage";
import { STATE_ICONS, type StateData } from "../../types/state";

interface StateSecionProps {
  data: StateData | null;
  isLoading: boolean;
  skeletonCount?: number | undefined;
}
const StateSection = ({ data, isLoading, skeletonCount }: StateSecionProps) => {
  const { language } = useLanguage();
  if (isLoading) {
    return (
      <div className="flex gap-8 py-8 animate-pulse">
        {Array.from({ length: skeletonCount ?? 2 }).map((_, index) => {
          return (
            <div key={index} className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
              <div className="h-8 w-20 bg-slate-200 dark:bg-slate-700 rounded-md"></div>
              <div className="h-4 w-28 bg-slate-200 dark:bg-slate-700 rounded-md"></div>
            </div>
          );
        })}
      </div>
    );
  }
  if (!data) return null;
  return (
    <div className="grid grid-cols-2 sm:flex sm:flex-row justify-center sm:justify-start items-center sm:items-start gap-8 sm:gap-16 py-10">
      {Object.entries(data).map(([key, value]) => {
        const IconComponent = STATE_ICONS[key];
        const Label =
          translations[language]?.home.stats[
            key as "students" | "instructors"
          ] || key;
        return (
          <div
            key={key}
            className="flex flex-col items-center last:col-span-2 sm:last:col-span-1"
          >
            {IconComponent && (
              <div className="p-2 rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
                <IconComponent size={22} />
              </div>
            )}
            <span className="text-2xl font-bold text-slate-800 dark:text-white">
              {value}+
            </span>
            <span className="text-sm font-medium text-slate-500 mt-1 capitalize">
              {Label}
            </span>
          </div>
        );
      })}
    </div>
  );
};
export default StateSection;
