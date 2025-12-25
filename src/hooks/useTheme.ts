import { useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";
import type { Theme } from "../types/theme";
import { defaultTheme } from "../themes/default";

const ACTIVE_KEY = "taskboard.activeTheme";
const CUSTOM_KEY = "taskboard.customTheme";

export function useTheme() {
  // Active theme (preset OR custom)
  const [theme, setTheme] = useLocalStorage<Theme>(ACTIVE_KEY, defaultTheme);

  // Apply CSS vars
  useEffect(() => {
    Object.entries(theme.vars).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    });
  }, [theme]);

  // Persist custom ONLY when editing Custom
  useEffect(() => {
    if (theme.name === "Custom") {
      localStorage.setItem(CUSTOM_KEY, JSON.stringify(theme.vars));
    }
  }, [theme]);

  return {
    currentTheme: theme,
    setTheme,
  };
}
