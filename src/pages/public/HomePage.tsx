import { useEffect, useState } from "react";
import Button from "../../components/common/Button";
import StateSection from "../../components/home/StateSection";
import { apiClient } from "../../api/apiClient";
import type { StateData } from "../../types/state";
import { useLanguage } from "../../context/useLanguage";
import { translations } from "../../constants/translations";
import LatestCourses from "../../components/home/LatestCourses";
const HomePage = () => {
  const [statsData, setStatsData] = useState<StateData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { language } = useLanguage();
  const t = translations[language].home.hero;
  useEffect(() => {
    const fetchState = async () => {
      try {
        setIsLoading(true);
        const res = await apiClient<{ data: StateData }>("/users-count", {
          lang: language,
        });
        setStatsData(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchState();
  }, [language]);
  return (
    <section>
      <div className="w-full px-3 md:px-6 lg:px-12 bg-primary-50 dark:bg-gray-900 py-16 ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="col-span-1 order-2 lg:order-1 pt-5">
            <h1 className="text-[clamp(2rem,5vw+1rem,3.75rem)] pb-0 md:pb-5  font-extrabold tracking-tight leading-[1.15] text-primary">
              {t.title}
            </h1>
            <h4 className="pb-2 md:pb-5 text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed font-normal">
              {t.subtitle}
            </h4>
            <div className="flex flex-col sm:flex-row gap-2 lg:gap-5">
              <Button size="lg" className="px-16">
                {t.joinBtn}
              </Button>
              <Button
                to="/courses"
                size="lg"
                variant="outline"
                className="px-16"
              >
                {t.exploreBtn}
              </Button>
            </div>
            <StateSection
              data={statsData}
              isLoading={isLoading}
              skeletonCount={3}
            />
          </div>
          <div className="col-span-1 w-full order-1 lg:order-2">
            <div className="relative w-full aspect-16/10 overflow-hidden rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800">
              <img
                src="/heroHome.webp"
                alt=""
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="px-3 md:px-6 lg:px-12">
        <LatestCourses />
      </div>
    </section>
  );
};

export default HomePage;
