import { Theme } from "../types/theme";

export const customTheme: Theme = {
  name: "Custom",
  vars: {
    "--bg": "#f9f9f9",
    "--board-bg": "#f6f7f9",
    "--card": "#ffffff",

    "--text": "#222",
    "--text-muted": "#555",

    "--accent": "#1a73e8",
    "--accent-soft": "#155fc7",

    "--radius": "16px",
    "--divider": "rgba(0,0,0,0.08)",

    "--font-body": "system-ui, sans-serif",

    /* calendar */
    "--calendar-day-bg": "#ffffff",
    "--calendar-day-bg-muted": "#f1f2f4",
    "--calendar-task-bg": "#f6f7f9",
    "--calendar-hover": "rgba(0,0,0,0.06)",
  },
};
