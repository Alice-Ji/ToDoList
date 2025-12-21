export interface Task {
  id: string;
  title: string;
  completed: boolean;
  columnId: string;

  dueDate: string; // yyyy-mm-dd (HTML date input format)
  notes: string;
}
