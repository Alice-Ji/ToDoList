export function daysFromToday(dateStr?: string) {
  // for tasks without due date
  if (!dateStr) return null;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Parse YYYY-MM-DD safely as LOCAL date
  const [year, month, day] = dateStr.split("-").map(Number);
  const due = new Date(year, month - 1, day);
  due.setHours(0, 0, 0, 0);

  const diffMs = due.getTime() - today.getTime();
  return Math.round(diffMs / (1000 * 60 * 60 * 24));
}
