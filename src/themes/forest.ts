import { Theme } from "../types/theme";

export const forest: Theme = {
  name: "Forest",
  vars: {
    /* Backgrounds */
    "--bg": "#F2F6F3",
    "--board-bg": "#E6EFE9",
    "--card": "#FFFFFF",

    /* Text */
    "--text": "#24352D",
    "--text-muted": "#5F7A6A",

    /* Accent*/
    "--accent": "#3E7C59",
    "--accent-soft": "#6FAF8A",

    /* UI */
    "--radius": "16px",
    "--divider": "rgba(62, 124, 89, 0.18)",

    /* Typography */
    "--font-body":
      '"Inter", system-ui, -apple-system, BlinkMacSystemFont, sans-serif',

    /* ───────── calendar ───────── */
    "--calendar-day-bg": "#F7FBF8",
    "--calendar-day-bg-muted": "#E2ECE6",
    "--calendar-task-bg": "#EAF3ED",
    "--calendar-hover": "rgba(62, 124, 89, 0.10)",
  },
};
