import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./index.css";

const List = () => {
  const data = [
    { id: 1, title: "Martin er sej" },
    { id: 2, title: "wasup mands" },
    { id: 3, title: "det begynder at ligne noget" },
    { id: 4, title: "JAA TAKK" },
  ];
  const [items, setItems] = useState(data);

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const tmpitems = Array.from(items);
    const [reorderedItem] = tmpitems.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setItems(tmpitems);
  };

  return (
    <div className="container">
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="lists">
          {(provided) => (
            <ul
              className="lists"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {data.map((list, index) => {
                return (
                  <Draggable key={list.id} draggableId={list.id} index={index}>
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <div className="single-list">
                          <p>{list.title}</p>
                        </div>
                      </li>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default List;
