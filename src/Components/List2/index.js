import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { FaEdit , FaTrashAlt}  from 'react-icons/fa'
import { EditText } from 'react-edit-text';
import { Popup } from '..';

import './index.css';
import 'react-edit-text/dist/index.css';
import PopUp from '../Popup';

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
  const [editAbleItem, setEditAbleItem] = useState(null)


  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const tmpItems = Array.from(items);
    const [reorderedItem] = tmpItems.splice(result.source.index, 1);
    tmpItems.splice(result.destination.index, 0, reorderedItem);
    setItems(tmpItems);
  }

  const deleteItem = (itemId) => {
    var tmpItems = Array.from(items);
    tmpItems = tmpItems.filter((item) => item.id !== itemId)
    setItems(tmpItems)
  }

  const editItem = (itemId, string) => {
      var tmpItems = Array.from(items)
      tmpItems.map((item) => {
          if(item.id === itemId){
              item.name = string
          }
        return item
      })
      setItems(tmpItems)
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
                            <EditText 
                            value={name} 
                            onChange={(text) => editItem(id, text)} 
                            style={{backgroundColor:'rgb(0,0,255)', fontSize:'2rem', textAlign:'center'}}
                            readonly={(id !== editAbleItem)}
                            onSave={() => setEditAbleItem(null)}
                            />
                            <FaEdit onClick={() => setEditAbleItem(id)}/>
                            <FaTrashAlt onClick={() => deleteItem(id)}/>
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