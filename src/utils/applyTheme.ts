import { Theme } from "../types/theme";

export function applyTheme(theme: Theme) {
  const root = document.documentElement;

  // Apply CSS variables
  Object.entries(theme.vars).forEach(([key, value]) => {
    if (key === "--color-scheme") {
      root.style.colorScheme = value;
    } else {
      root.style.setProperty(key, value);
    }
  });

  // Set data-theme for CSS selectors (dark / light)
  const isDark = theme.name.toLowerCase().includes("dark");
  root.setAttribute("data-theme", isDark ? "dark" : "light");

  // Fallback: ensure native UI follows theme
  root.style.colorScheme = isDark ? "dark" : "light";
}
