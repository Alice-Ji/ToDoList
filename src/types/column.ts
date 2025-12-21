export type SortMode = "manual" | "due" | "alpha";

export interface Column {
  id: string;
  title: string;
  sort?: SortMode; // default = manual
  color?: string; // hex or CSS color
}
