import type { Theme } from "../types/theme";

import { defaultTheme } from "./default";
import { softAcademia } from "./soft-academia";
import { girlbossDelulu } from "./girlboss-delulu";
import { darkDefault } from "./dark-default";
import { forest } from "./forest";
import { maleficent } from "./maleficent";
import { sunshine } from "./sunshine";

/* Preset themes only */
export const themes: Theme[] = [
  defaultTheme,
  darkDefault,
  softAcademia,
  girlbossDelulu,
  forest,
  sunshine,
  maleficent,
];
