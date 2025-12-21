import { Theme } from "../types/theme";

export const darkDefault: Theme = {
  name: "Dark",
  vars: {
    /* browser hint */
    "--color-scheme": "dark",

    /* backgrounds */
    "--bg": "#0f1115", // app background
    "--board-bg": "#161a20", // board canvas
    "--card": "#1c2129", // column + cards

    /* text */
    "--text": "#e6e8eb", // primary text
    "--text-muted": "#a1a6ad", // secondary text

    /* accent (same as Default) */
    "--accent": "#1a73e8", // Google blue
    "--accent-soft": "#155fc7",

    /* UI chrome */
    "--divider": "rgba(255,255,255,0.08)",
    "--radius": "16px",

    /* fonts */
    "--font-body": "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",

    /* calendar-specific overrides */
    "--calendar-day-bg": "#1c2129",
    "--calendar-day-bg-muted": "#141820",
    "--calendar-task-bg": "#232936",
    "--calendar-hover": "rgba(255,255,255,0.06)",
  },
};
