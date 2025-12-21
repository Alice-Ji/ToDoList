import { Theme } from "../types/theme";

export const softAcademia: Theme = {
  name: "Soft Academia",
  vars: {
    /* Core surfaces */
    "--bg": "#faf7f2",
    "--board-bg": "#f3efe8",
    "--card": "#ffffff",

    /* Text */
    "--text": "#2e2e2e",
    "--text-muted": "#6b6b6b",

    /* Accents */
    "--accent": "#8b6f47",
    "--accent-soft": "#c9b89a",

    /* UI */
    "--radius": "16px",
    "--divider": "rgba(0,0,0,0.08)",

    /* Typography */
    "--font-body": "'Libre Baskerville', serif",

    /* Calendar (warm parchment look) */
    "--calendar-day-bg": "#fdfbf7",
    "--calendar-day-bg-muted": "#e9e2d7",
    "--calendar-task-bg": "#f1e9de",
    "--calendar-hover": "rgba(139, 111, 71, 0.10)",
  },
};
