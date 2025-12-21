import type { Task } from "../types/task";
import calendarIcon from "../asset/calendar.svg";
import { daysFromToday } from "../utils/date";
import { useState, useRef, useEffect } from "react";
import TaskMenu from "./TaskMenu";
import ConfirmDialog from "./ConfirmDialog";

interface Props {
  task: Task;
  onToggle: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Task>) => void;
  onDelete: (id: string) => void;
  onDuplicate: (id: string) => void;
}

export default function TaskCard({
  task,
  onToggle,
  onUpdate,
  onDelete,
  onDuplicate,
}: Props) {
  const dayDiff = daysFromToday(task.dueDate);

  let relativeLabel = "";
  if (dayDiff === 0) relativeLabel = "Today";
  else if (dayDiff > 0) relativeLabel = `In ${dayDiff} days`;
  else relativeLabel = `${Math.abs(dayDiff)} days overdue`;

  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(task.title);

  const dateInputRef = useRef<HTMLInputElement>(null);

  const [menuOpen, setMenuOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const menuRef = useRef<HTMLButtonElement>(null);

  const commitTitle = () => {
    const trimmed = draftTitle.trim();
    if (trimmed && trimmed !== task.title) {
      onUpdate(task.id, { title: trimmed });
    }
    setDraftTitle(task.title);
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setDraftTitle(task.title);
    setIsEditing(false);
  };

  /* Close menu on outside click */
  useEffect(() => {
    if (!menuOpen) return;

    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [menuOpen]);

  return (
    <>
      {/* TASK CARD */}
      <div className={`task ${task.completed ? "completed" : ""}`}>
        {/* Left: checkbox */}
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />

        {/* Right: content */}
        <div className="task-content">
          {/* Header row */}
          <div className="task-header">
            {isEditing ? (
              <input
                className="task-title-input"
                value={draftTitle}
                autoFocus
                onChange={(e) => setDraftTitle(e.target.value)}
                onBlur={commitTitle}
                onKeyDown={(e) => {
                  if (e.key === "Enter") commitTitle();
                  if (e.key === "Escape") cancelEdit();
                }}
              />
            ) : (
              <div
                className="task-title"
                onClick={() => setIsEditing(true)}
                title="Click to edit task"
              >
                {task.title}
              </div>
            )}

            <button
              ref={menuRef}
              className="task-menu-trigger"
              onClick={() => setMenuOpen((o) => !o)}
            >
              ⋯
            </button>
          </div>

          {/* Date row */}
          <div className="task-date-row">
            {/* Hidden native date input */}
            <input
              ref={dateInputRef}
              type="date"
              className="task-date-input"
              value={task.dueDate ?? ""}
              onChange={(e) =>
                onUpdate(task.id, { dueDate: e.target.value || undefined })
              }
            />

            {/* Calendar icon trigger */}
            <button
              type="button"
              className="task-date-button"
              onClick={() => dateInputRef.current?.showPicker()}
              aria-label="Pick due date"
            >
              <img src={calendarIcon} alt="" className="task-date-icon" />
            </button>

            {/* Date text */}
            <label className="task-date-display">
              {task.dueDate && (
                <>
                  <span className="task-date-text">{task.dueDate}</span>
                  <span className="task-date-sep">•</span>
                  <span
                    className={`task-date-relative ${
                      dayDiff < 0 ? "overdue" : dayDiff === 0 ? "today" : ""
                    }`}
                  >
                    {relativeLabel}
                  </span>
                </>
              )}
            </label>
          </div>

          {/* Notes */}
          <textarea
            className="task-notes"
            placeholder="Notes…"
            value={task.notes}
            onChange={(e) => onUpdate(task.id, { notes: e.target.value })}
          />
        </div>
      </div>

      {/* TASK MENU (PORTAL) */}
      {menuOpen && (
        <TaskMenu
          anchorRef={menuRef}
          onDuplicate={() => {
            onDuplicate(task.id);
            setMenuOpen(false);
          }}
          onDelete={() => {
            setMenuOpen(false);
            setConfirmDelete(true);
          }}
        />
      )}

      {/* CONFIRM DELETE MODAL */}
      {confirmDelete && (
        <ConfirmDialog
          title="Delete task?"
          description={`This will permanently delete "${task.title}".`}
          onCancel={() => setConfirmDelete(false)}
          onConfirm={() => {
            onDelete(task.id);
            setConfirmDelete(false);
          }}
        />
      )}
    </>
  );
}
