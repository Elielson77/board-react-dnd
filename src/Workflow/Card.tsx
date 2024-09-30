import { useRef } from "react";
import { TItem, TItemStatus } from "../App";
import { useDrag, useDrop } from "react-dnd";
import { Identifier, XYCoord } from "dnd-core";

interface ICardProps {
  index: number;
  item: TItem;
  onReorderCard: (
    actualIndex: number,
    overIndex: number,
    column: TItemStatus
  ) => void;
}

interface DragItem extends TItem {
  index: number;
}

function Card({ item, index, onReorderCard }: ICardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: "Card",
    collect: (monitor) => ({ handlerId: monitor.getHandlerId() }),
    hover(item: DragItem, monitor) {
      if (!ref.current) return;

      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) return;

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      const draggingDownward =
        dragIndex < hoverIndex && hoverClientY < hoverMiddleY;

      if (draggingDownward) return;

      const draggingUpwards =
        dragIndex > hoverIndex && hoverClientY > hoverMiddleY;

      if (draggingUpwards) return;

      onReorderCard(dragIndex, hoverIndex, item.status);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "Card",
    item: () => ({ ...item, index }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const hrColor = {
    high: "red",
    low: "green",
    medium: "yellow",
  }[item.priority];

  drag(drop(ref));

  const opacity = isDragging ? 0 : 1;

  return (
    <div
      ref={ref}
      data-handler-id={handlerId}
      style={{
        opacity,
        userSelect: "none",
        width: "100%",
        backgroundColor: "#191B1C",
        display: "flex",
        justifyContent: "flex-start",
        padding: "8px",
        borderRadius: "10px",
        color: "#fefefe",
        gap: "10px",
      }}
    >
      <hr
        style={{
          margin: 0,
          width: "7px",
          background: hrColor,
          borderRadius: "10px",
          border: "none",
        }}
      />

      <p>{item.title}</p>
    </div>
  );
}

export default Card;
