import { useState, useRef, useEffect } from "react";
import type { Column } from "../types/column";
import type { Task } from "../types/task";
import type { SortMode } from "../types/sort";
import TaskCard from "./TaskCard";
import ColumnMenu from "./ColumnMenu";
import { createPortal } from "react-dom";

interface Props {
  column: Column;
  tasks: Task[];
  onAddTask: (title: string, columnId: string) => void;
  onToggleTask: (id: string) => void;
  onUpdateTask: (id: string, updates: Partial<Task>) => void;
  onDeleteTask: (id: string) => void;
  onDuplicateTask: (id: string) => void;

  onRenameColumn: (id: string, title: string) => void;
  onDeleteColumn: (id: string) => void;
  onSetSort: (id: string, sort: SortMode) => void;

  // ✅ NEW: set list color
  onSetColumnColor: (id: string, color: string | undefined) => void;

  dragHandleProps?: React.HTMLAttributes<HTMLDivElement>;
}

const COLORS = [
  "#3F51B5", // indigo
  "#2E7D32", // deep green
  "#F9A825", // amber yellow
  "#D81B60", // magenta / pink
  "#6A1B9A", // purple
  "#00897B", // teal
  "#E53935", // red
  "#FB8C00", // orange
  "#039BE5", // cyan / sky blue
  "#8D6E63", // brown / earth
  "#455A64", // blue-gray
];

export default function TaskColumn({
  column,
  tasks,
  onAddTask,
  onToggleTask,
  onUpdateTask,
  onDeleteTask,
  onDuplicateTask,
  onRenameColumn,
  onDeleteColumn,
  onSetSort,
  onSetColumnColor,
  dragHandleProps,
}: Props) {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [titleDraft, setTitleDraft] = useState(column.title);
  const [input, setInput] = useState("");

  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const [confirmDeleteList, setConfirmDeleteList] = useState(false);

  // color picker state
  const [colorPickerOpen, setColorPickerOpen] = useState(false);
  const colorChipRef = useRef<HTMLButtonElement>(null);

  const activeTasks = tasks.filter((t) => !t.completed);
  const completedTasks = tasks.filter((t) => t.completed);

  const commitTitle = () => {
    const trimmed = titleDraft.trim();
    if (trimmed && trimmed !== column.title) {
      onRenameColumn(column.id, trimmed);
    }
    setTitleDraft(column.title);
    setIsEditingTitle(false);
  };

  const cancelEdit = () => {
    setTitleDraft(column.title);
    setIsEditingTitle(false);
  };

  const handleAdd = () => {
    if (!input.trim()) return;
    onAddTask(input, column.id);
    setInput("");
  };

  // Close menu on outside click (portal-safe)
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as Node;

      // close column menu if click outside trigger
      if (
        menuOpen &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(target)
      ) {
        setMenuOpen(false);
      }

      // close color picker if click outside chip
      if (
        colorPickerOpen &&
        colorChipRef.current &&
        !colorChipRef.current.contains(target)
      ) {
        // if click inside popover, don't close (handled by stopPropagation below)
        setColorPickerOpen(false);
      }
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [menuOpen, colorPickerOpen]);

  return (
    <div className="column">
      {/* Header */}
      <div className="column-header">
        {/* Color chip */}
        <button
          ref={colorChipRef}
          className="column-color-chip"
          style={{ backgroundColor: column.color ?? "transparent" }}
          onClick={(e) => {
            e.stopPropagation();
            setColorPickerOpen((o) => !o);
          }}
          aria-label="Pick list color"
          type="button"
        />

        {/* Popover */}
        {colorPickerOpen &&
          createPortal(
            <div
              className="color-picker-popover"
              style={(() => {
                const rect = colorChipRef.current?.getBoundingClientRect();
                return {
                  position: "fixed",
                  top: (rect?.bottom ?? 0) + 8,
                  left: rect?.left ?? 0,
                  zIndex: 9999,
                };
              })()}
              onClick={(e) => e.stopPropagation()}
            >
              {/* clear color */}
              <button
                className="color-swatch clear"
                onClick={() => {
                  onSetColumnColor(column.id, undefined);
                  setColorPickerOpen(false);
                }}
                title="Clear"
                type="button"
              ></button>

              {COLORS.map((c) => (
                <button
                  key={c}
                  className="color-swatch"
                  style={{ backgroundColor: c }}
                  onClick={() => {
                    onSetColumnColor(column.id, c);
                    setColorPickerOpen(false);
                  }}
                  type="button"
                />
              ))}
            </div>,
            document.body
          )}

        {/* Title */}
        <div className="column-title-wrapper" {...dragHandleProps}>
          {isEditingTitle ? (
            <input
              className="column-title-input"
              value={titleDraft}
              autoFocus
              onChange={(e) => setTitleDraft(e.target.value)}
              onBlur={commitTitle}
              onKeyDown={(e) => {
                if (e.key === "Enter") commitTitle();
                if (e.key === "Escape") cancelEdit();
              }}
            />
          ) : (
            <span
              className="column-title"
              onClick={() => setIsEditingTitle(true)}
              title="Click to rename list"
            >
              {column.title}
            </span>
          )}
        </div>

        {/* Column menu */}
        <button
          ref={menuButtonRef}
          className="column-menu-trigger"
          onClick={(e) => {
            e.stopPropagation();
            setMenuOpen((o) => !o);
          }}
          type="button"
        >
          ⋯
        </button>
      </div>

      {menuOpen && (
        <ColumnMenu
          anchorRef={menuButtonRef}
          currentSort={column.sort}
          onSortChange={(sort) => onSetSort(column.id, sort)}
          onDelete={() => {
            setMenuOpen(false);
            setConfirmDeleteList(true);
          }}
        />
      )}

      {/* Add task */}
      <div className="add-task">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add task"
        />
        <button onClick={handleAdd}>+</button>
      </div>

      {/* Scrollable tasks */}
      <div className="column-tasks">
        {activeTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onToggle={onToggleTask}
            onUpdate={onUpdateTask}
            onDelete={onDeleteTask}
            onDuplicate={onDuplicateTask}
          />
        ))}

        {completedTasks.length > 0 && (
          <details className="completed">
            <summary>Completed ({completedTasks.length})</summary>
            {completedTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onToggle={onToggleTask}
                onUpdate={onUpdateTask}
                onDelete={onDeleteTask}
                onDuplicate={onDuplicateTask}
              />
            ))}
          </details>
        )}
      </div>

      {/* Confirm delete list modal */}
      {confirmDeleteList &&
        createPortal(
          <div className="modal-backdrop">
            <div className="modal">
              <h3>Delete list?</h3>
              <p>
                This will permanently delete <strong>{column.title}</strong> and
                all its tasks.
              </p>

              <div className="modal-actions">
                <button
                  className="btn-cancel"
                  onClick={() => setConfirmDeleteList(false)}
                  type="button"
                >
                  Cancel
                </button>
                <button
                  className="btn-danger"
                  onClick={() => {
                    onDeleteColumn(column.id);
                    setConfirmDeleteList(false);
                  }}
                  type="button"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
