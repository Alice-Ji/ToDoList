import { useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";
import type { Theme } from "../types/theme";
import { defaultTheme } from "../themes/default";

export function useTheme() {
  const [theme, setThemeState] = useLocalStorage<Theme>(
    "taskboard.theme",
    defaultTheme
  );

  useEffect(() => {
    Object.entries(theme.vars).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    });
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  return {
    currentTheme: theme,
    setTheme,
  };
}
