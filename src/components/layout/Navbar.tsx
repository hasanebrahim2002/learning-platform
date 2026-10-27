import { NavLink } from "react-router-dom";
import Button from "../common/Button";
import { FaMoon } from "react-icons/fa";
import { useTheme } from "../../context/useTheme";
import { IoMdSunny } from "react-icons/io";
import { useState } from "react";
import { translations } from "../../constants/translations";
import { useLanguage } from "../../context/useLanguage";

interface navProps {
  content: string;
  path: string;
}

const Navbar = () => {
  const { language, toggleLanguage } = useLanguage();
  const t = translations[language].navbar;
  const navItem: Array<navProps> = [
    {
      content: t.home,
      path: "/",
    },
    {
      content: t.about,
      path: "/about",
    },
    {
      content: t.courses,
      path: "/courses",
    },
    {
      content: t.contact,
      path: "/contact",
    },
  ];
  const { theme, toggelTheme } = useTheme();
  const [isOppen, setIsOppen] = useState<boolean>(false);
  return (
    <header className="px-3 md:px-6 lg:px-12 sticky top-0 z-50 w-full bg-white/80 dark:bg-gray-950/85 backdrop-blur-md backdrop-contrast-125 border-b border-gray-200/50 dark:border-gray-800/50 transition-colors">
      <div className="flex justify-between items-center">
        <div>
          <img width={100} src="/logo.svg" alt="logo" />
        </div>

        <div>
          <ul className="hidden lg:flex">
            {navItem.map((item) => {
              return (
                <li key={item.path} className="gap-3">
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `px-4 py-2 duration-200 ${isActive ? " bg-none bg-gray-200 dark:bg-gray-900 rounded-3xl font-semibold text-primary" : " hover:text-primary hover:bg-gray-200 rounded-3xl "}`
                    }
                  >
                    {item.content}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex gap-3 lg:gap-1">
            <Button variant="outline" size="sm" onClick={toggleLanguage}>
              {t.langBtn}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={toggelTheme}
              className="relative flex items-center justify-center overflow-hidden w-9 h-9"
            >
              <FaMoon
                className={`absolute transition-all duration-300 transform ${
                  theme === "light"
                    ? "opacity-100 rotate-0 scale-100"
                    : "opacity-0 -rotate-90 scale-50"
                }`}
              />

              {/* أيقونة الشمس (للظلام) */}
              <IoMdSunny
                className={`absolute transition-all duration-300 transform ${
                  theme === "dark"
                    ? "opacity-100 rotate-0 scale-100"
                    : "opacity-0 rotate-90 scale-50"
                }`}
              />
            </Button>
            <button
              type="button"
              onClick={() => setIsOppen(!isOppen)}
              className="w-8 h-8 flex lg:hidden flex-col justify-center items-center gap-1 focus:outline-none cursor-pointer"
              aria-label="Toggle Menu"
            >
              <span
                className={`h-0.5 w-5 bg-gray-700 dark:bg-gray-200 rounded-full transition-all duration-300 transform origin-center ${
                  isOppen ? "rotate-45 translate-y-1.5" : ""
                }`}
              />

              <span
                className={`h-0.5 w-5 bg-gray-700 dark:bg-gray-200 rounded-full transition-all duration-200 ${
                  isOppen ? "opacity-0" : "opacity-100"
                }`}
              />

              <span
                className={`h-0.5 w-5 bg-gray-700 dark:bg-gray-200 rounded-full transition-all duration-300 transform origin-center ${
                  isOppen ? "-rotate-45 -translate-y-1.5" : ""
                }`}
              />
            </button>
          </div>
          <div className="hidden lg:flex gap-3">
            <Button variant="primary" size="md" to="/login">
              {t.login}
            </Button>
            <Button variant="outline" size="md" to="/register">
              {t.register}
            </Button>
          </div>
        </div>
      </div>
      {isOppen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-800/50 shadow-xl px-6 py-6 transition-all duration-200">
          <ul className="flex flex-col divide-y divide-gray-100 dark:divide-gray-800/60 mb-6">
            {navItem.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  onClick={() => setIsOppen(false)}
                  className={({ isActive }) =>
                    `block py-3 text-base font-medium transition-colors ${
                      isActive
                        ? "text-primary dark:text-violet-400 font-semibold"
                        : "text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-violet-400"
                    }`
                  }
                >
                  {item.content}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-3 pt-2">
            <Button
              variant="primary"
              size="md"
              to="/login"
              onClick={() => setIsOppen(false)}
              className="w-full justify-center"
            >
              {t.login}
            </Button>
            <Button
              variant="outline"
              size="md"
              to="/register"
              onClick={() => setIsOppen(false)}
              className="w-full justify-center"
            >
              {t.register}
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
