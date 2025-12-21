import type { Task } from "../types/task";
import type { Column } from "../types/column";
import { useLocalStorage } from "./useLocalStorage";
import { STORAGE_KEYS } from "../constants/storageKeys";
import { DEFAULT_COLUMNS } from "../constants/defaultColumns";
import { generateId } from "../utils/generateId";
import { arrayMove } from "@dnd-kit/sortable";

export function useTasks() {
  // 🔹 Tasks
  const [tasks, setTasks] = useLocalStorage<Task[]>(STORAGE_KEYS.TASKS, []);

  // 🔹 Columns
  const [columns, setColumns] = useLocalStorage<Column[]>(
    STORAGE_KEYS.COLUMNS,
    DEFAULT_COLUMNS
  );

  const today = new Date().toISOString().slice(0, 10); // yyyy-mm-dd

  // ─────────────────────────────
  // Task actions
  // ─────────────────────────────

  const addTask = (
    title: string,
    columnId: string,
    dueDate?: string,
    notes: string = ""
  ) => {
    const trimmed = title.trim();
    if (!trimmed) return;

    const newTask: Task = {
      id: generateId(),
      title: trimmed,
      completed: false,
      columnId,
      dueDate,
      notes,
    };

    setTasks((prev) => [...prev, newTask]);
  };

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updates } : t))
    );
  };

  const tasksByColumn = (columnId: string) =>
    tasks.filter((t) => t.columnId === columnId);

  const activeTasksByColumn = (columnId: string) =>
    tasks.filter((t) => t.columnId === columnId && !t.completed);

  const completedTasksByColumn = (columnId: string) =>
    tasks.filter((t) => t.columnId === columnId && t.completed);

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const duplicateTask = (id: string) => {
    setTasks((prev) => {
      const task = prev.find((t) => t.id === id);
      if (!task) return prev;

      const copy: Task = {
        ...task,
        id: generateId(),
        title: `${task.title} (copy)`,
      };

      return [...prev, copy];
    });
  };

  // ─────────────────────────────
  // Column actions
  // ─────────────────────────────

  const addColumn = (title: string) => {
    const trimmed = title.trim();
    if (!trimmed) return;

    setColumns((prev) => [...prev, { id: generateId(), title: trimmed }]);
  };

  const renameColumn = (id: string, title: string) => {
    setColumns((prev) => prev.map((c) => (c.id === id ? { ...c, title } : c)));
  };

  const deleteColumn = (id: string) => {
    setColumns((prev) => prev.filter((c) => c.id !== id));
    setTasks((prev) => prev.filter((t) => t.columnId !== id));
  };

  const setColumnSort = (id: string, sort: SortMode) => {
    setColumns((prev) => prev.map((c) => (c.id === id ? { ...c, sort } : c)));
  };

  const reorderColumns = (from: number, to: number) => {
    setColumns((cols) => arrayMove(cols, from, to));
  };

  const setColumnColor = (id: string, color?: string) => {
    setColumns((prev) => prev.map((c) => (c.id === id ? { ...c, color } : c)));
  };

  return {
    // state
    tasks,
    columns,

    // task actions
    addTask,
    toggleTask,
    updateTask,
    tasksByColumn,
    activeTasksByColumn,
    completedTasksByColumn,
    deleteTask,
    duplicateTask,

    // column actions
    addColumn,
    renameColumn,
    deleteColumn,
    setColumnSort,
    reorderColumns,
    setColumnColor,
  };
}
