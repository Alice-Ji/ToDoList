import { useSortable, defaultAnimateLayoutChanges } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import TaskColumn from "./TaskColumn";

export default function SortableColumn(props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: props.column.id,
      animateLayoutChanges: (args) =>
        args.isSorting || args.isDragging
          ? false
          : defaultAnimateLayoutChanges(args),
    });

  const style = {
    transform: transform ? CSS.Transform.toString(transform) : undefined,
    transition,
    height: "100%", // 🔥 OVERRIDE fit-content
    alignSelf: "stretch", // 🔥 CRITICAL for flex parent
  };

  return (
    <div ref={setNodeRef} style={style}>
      <TaskColumn
        {...props}
        dragHandleProps={{ ...listeners, ...attributes }}
      />
    </div>
  );
}
