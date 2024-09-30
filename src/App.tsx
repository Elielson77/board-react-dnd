// import { DndProvider } from "react-dnd";
import Workflow from "./Workflow";
// import { HTML5Backend } from "react-dnd-html5-backend";

type TItemStatus = "pending" | "in_progress" | "review" | "done";

const ItemStatus = {
  pending: "Pendente",
  in_progress: "Em andamento",
  review: "Em revisão",
  done: "Concluído",
} as const;

type TItem = {
  id: number;
  title: string;
  status: TItemStatus;
  priority: "high" | "medium" | "low";
};

type TColumn = {
  columnName: string;
  cards: TItem[];
};

type ParsedWorkflowType = Record<TItemStatus, TItem[]>;

function App() {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ width: "80%" }}>
        <Workflow />
      </div>
    </div>
  );
}

export default App;
export type { TItem, TColumn, TItemStatus, ParsedWorkflowType };
export { ItemStatus };
