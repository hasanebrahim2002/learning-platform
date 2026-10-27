import { createContext, useEffect, useState } from "react";
import type { TypeOfLanguage } from "../types/state";
interface LanguageContextType {
  language: TypeOfLanguage;
  toggleLanguage: () => void;
}
// eslint-disable-next-line react-refresh/only-export-components
export const LanguageContext = createContext<LanguageContextType | null>(null);
export const LanguageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [language, setLanguage] = useState<TypeOfLanguage>(() => {
    const savedLang = localStorage.getItem("app_lang");
    return savedLang === "ar" || savedLang === "en" ? savedLang : "en";
  });
  const toggleLanguage = () => {
    setLanguage((prev) => (prev == "ar" ? "en" : "ar"));
  };

  useEffect(() => {
    const dir = language === "ar" ? "rtl" : "ltr";
    document.documentElement.dir = dir;
    document.documentElement.lang = language;
    localStorage.setItem("app_lang", language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
