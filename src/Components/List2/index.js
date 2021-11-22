import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './index.css';

const data = [
  {
    id: 'martin',
    name: 'Det virker nu',
  },
  {
    id: 'ersej',
    name: 'Hvad var problemet wtf',
  },
  {
    id: 'yess',
    name: 'Det er fedt',
  },
]

const List2 = () => {
  const [items, setItems] = useState(data);

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const tmpItems = Array.from(items);
    const [reorderedItem] = tmpItems.splice(result.source.index, 1);
    tmpItems.splice(result.destination.index, 0, reorderedItem);

    setItems(tmpItems);
  }

  return (
    <div className="container">
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="lists">
            {(provided) => (
              <ul className="lists" {...provided.droppableProps} ref={provided.innerRef}>
                {items.map(({id, name}, index) => {
                  return (
                    <Draggable key={id} draggableId={id} index={index}>
                      {(provided) => (
                        <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                          <p>
                            { name }
                          </p>
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
}

export default List2;