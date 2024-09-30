import { useCallback, useState } from "react";
import { ItemStatus, ParsedWorkflowType, TItem, TItemStatus } from "../App";
import Column from "./Column";
import { workflow } from "../data";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import update from "immutability-helper";

function parseWorkflowData(workflow: TItem[]): ParsedWorkflowType {
  return workflow.reduce(
    (acc, item) => {
      acc[item.status as keyof ParsedWorkflowType].push(item);
      return acc;
    },
    {
      done: [],
      in_progress: [],
      pending: [],
      review: [],
    } as ParsedWorkflowType
  );
}

function Workflow() {
  const [workflowData, setWorkflowData] = useState(parseWorkflowData(workflow));
  const columns: TItemStatus[] = ["pending", "in_progress", "review", "done"];

  const moveCard = useCallback(
    (dragIndex: number, hoverIndex: number, column: TItemStatus) => {
      setWorkflowData((prev) => ({
        ...prev,
        [column]: update(prev[column], {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, prev[column][dragIndex]],
          ],
        }),
      }));
    },
    []
  );

  const moveCardColumn = (item: TItem, newColumn: TItemStatus) => {
    if (item.status === newColumn) return;

    const previousColumn = item.status;

    setWorkflowData((prev) => {
      const alreadyInColumn =
        prev[newColumn].findIndex(({ id }) => id === item.id) !== -1;

      if (alreadyInColumn) return prev;

      const removedItemPreviousColumn = prev[previousColumn].filter(
        ({ id }) => id !== item.id
      );

      const addedItemNewColumn = [
        ...prev[newColumn],
        { ...item, status: newColumn },
      ];

      return {
        ...prev,
        [previousColumn]: removedItemPreviousColumn,
        [newColumn]: addedItemNewColumn,
      };
    });
  };

  return (
    <div
      className="workflow"
      style={{
        overflow: "auto",
        height: "100%",
        display: "grid",
        gridTemplateColumns: `repeat(auto-fill, minmax(250px, 1fr))`,
        gap: "25px",
      }}
    >
      <DndProvider backend={HTML5Backend}>
        {columns.map((column) => (
          <Column
            key={column}
            columnCode={column}
            title={ItemStatus[column]}
            cards={workflowData[column]}
            moveCard={moveCard}
            onProgress={moveCardColumn}
          />
        ))}
      </DndProvider>
    </div>
  );
}

export default Workflow;
