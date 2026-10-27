import { createContext, useEffect, useState, type ReactNode } from "react";

interface ThemeProviderProps {
  children: ReactNode;
}

interface ThemeContextType {
  theme: Theme;
  toggelTheme: () => void;
}

type Theme = "light" | "dark";

// eslint-disable-next-line react-refresh/only-export-components
export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
);
export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem("Theme");
    return savedTheme == "light" || savedTheme == "dark" ? savedTheme : "light";
  });
  const toggelTheme = () => {
    setTheme((prevTheme) => (prevTheme == "light" ? "dark" : "light"));
  };

  useEffect(() => {
    localStorage.setItem("Theme", theme);
  }, [theme]);
  return (
    <ThemeContext.Provider value={{ theme, toggelTheme }}>
      <div className={theme == "dark" ? "dark" : ""}>{children}</div>
    </ThemeContext.Provider>
  );
};
