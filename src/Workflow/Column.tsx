import { useDrop } from "react-dnd";
import { TItem, TItemStatus } from "../App";
import Card from "./Card";

interface IColumnProps {
  cards: TItem[];
  title: string;
  columnCode: TItemStatus;
  moveCard: (
    actualIndex: number,
    newIndex: number,
    column: TItemStatus
  ) => void;
  onProgress: (item: TItem, newColumn: TItemStatus) => void;
}

function Column(props: IColumnProps) {
  const { columnCode, title, cards, moveCard, onProgress } = props;

  const [, drop] = useDrop({
    accept: "Card",
    drop: (item: TItem) => onProgress(item, columnCode),
  });

  return (
    <div ref={drop}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
          borderRadius: "10px",
          backgroundColor: "#4a4a4a",
          padding: "0 16px 16px 16px",
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h4 style={{ marginBottom: "0" }}>{title}</h4>
          <hr style={{ width: "100%", marginTop: "0" }} />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
          }}
        >
          {cards.map((card, i) => (
            <Card
              key={card.id}
              item={card}
              index={i}
              onReorderCard={moveCard}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Column;
