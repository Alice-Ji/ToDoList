import { useState } from "react";
import { useTasks } from "../hooks/useTasks";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  horizontalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import TaskColumn from "./TaskColumn";
import SortableColumn from "./SortableColumn";
import type { SortMode } from "../types/sort";

export default function BoardView() {
  const {
    columns,
    tasksByColumn,
    addTask,
    toggleTask,
    updateTask,
    renameColumn,
    addColumn,
    deleteColumn,
    setColumnSort,
    reorderColumns,
    deleteTask,
    duplicateTask,
    setColumnColor,
  } = useTasks();

  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState("");

  const commitAdd = () => {
    const trimmed = newTitle.trim();

    if (!trimmed) {
      // cancel instead of staying stuck
      setIsAdding(false);
      setNewTitle("");
      return;
    }

    addColumn(trimmed);
    setNewTitle("");
    setIsAdding(false);
  };

  const getSortedTasks = (columnId: string, sort?: SortMode) => {
    const list = tasksByColumn(columnId);

    if (sort === "alpha") {
      return [...list].sort((a, b) => a.title.localeCompare(b.title));
    }

    if (sort === "due") {
      return [...list].sort((a, b) =>
        (a.dueDate ?? "").localeCompare(b.dueDate ?? "")
      );
    }

    return list; // manual
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // prevents accidental drags
      },
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = columns.findIndex((c) => c.id === active.id);
    const newIndex = columns.findIndex((c) => c.id === over.id);

    reorderColumns(oldIndex, newIndex);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={columns.map((c) => c.id)}
        strategy={horizontalListSortingStrategy}
      >
        <div className="board-view">
          <div className="board">
            {columns.map((col) => (
              <SortableColumn
                key={col.id}
                column={col}
                tasks={getSortedTasks(col.id, col.sort)}
                onAddTask={addTask}
                onToggleTask={toggleTask}
                onUpdateTask={updateTask}
                onDeleteTask={deleteTask}
                onDuplicateTask={duplicateTask}
                onRenameColumn={renameColumn}
                onDeleteColumn={deleteColumn}
                onSetSort={setColumnSort}
                onSetColumnColor={setColumnColor}
              />
            ))}

            {/* Add list card */}
            <div className="add-column">
              {isAdding ? (
                <input
                  className="add-column-input"
                  placeholder="List name"
                  autoFocus
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  onBlur={commitAdd}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") commitAdd();
                    if (e.key === "Escape") {
                      setIsAdding(false);
                      setNewTitle("");
                    }
                  }}
                />
              ) : (
                <button
                  className="add-column-button"
                  onClick={() => setIsAdding(true)}
                >
                  + Add list
                </button>
              )}
            </div>
          </div>
        </div>
      </SortableContext>
    </DndContext>
  );
}
