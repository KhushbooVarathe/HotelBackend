import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDrag, useDrop } from 'react-dnd';

const Item = ({ id, text }) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: 'ITEM',
    item: { id, text },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0.5 : 1;

  return (
    <div
      ref={dragRef}
      style={{ opacity, padding: '80px', border: '1px solid black', margin: '4px', cursor: 'move',backgroundColor:'yellow' }}
    >
      {text}
    </div>
  );
};

const DroppableArea = ({ onDrop, children }) => {
  const [{ isOver }, dropRef] = useDrop({
    accept: 'ITEM',
    drop: onDrop,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const backgroundColor = isOver ? '#e0e0e0' : 'white';

  return (
    <div ref={dropRef} style={{ backgroundColor, padding: '16px', border: '2px dashed #ccc' }}>
      {children}
    </div>
  );
};

const App = () => {
  const [items, setItems] = useState([
    { id: 1, text: 'Item 1' },
    { id: 2, text: 'Item 2' },
    { id: 3, text: 'Item 3' },
  ]);
  const [copiedItem, setCopiedItem] = useState([]); // Initialize as an empty array

  const handleMainDrop = (item) => {
    // Do nothing here, as we only need to copy the item
  };

  // const handleCopyDrop = (item) => {
  //   console.log(item,"items")
  //   // Push the new item into the copiedItem array
  //   if(!copiedItem.includes(item)){

  //     setCopiedItem((prevCopiedItems) => [...prevCopiedItems, item]);
  //   }
  // };
  const handleCopyDrop = (item) => {
    // Check if the item is already in the copiedItem array
    const isAlreadyCopied = copiedItem.some((copiedItem) => copiedItem.id === item.id);
  
    // If the item is not already in the copiedItem array, then add it
    if (!isAlreadyCopied) {
      setCopiedItem((prevCopiedItems) => [...prevCopiedItems, item]);
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' ,backgroundColor:'GrayText'}}>
        <h1>Drag and Drop Example</h1>
        {/* Main Droppable Area */}
        <DroppableArea onDrop={handleMainDrop}>
          {items.map((item) => (
            <Item key={item.id} id={item.id} text={item.text} />
          ))}
        </DroppableArea>
        <br/>   <br/>   <br/>   <br/>
        {/* Copy Droppable Area */}
        <DroppableArea onDrop={handleCopyDrop}>
          {copiedItem.map((item) => (
            // console.log(item)
            <Item key={item.id} id={item.id} text={item.text} />
          ))}
        </DroppableArea>
      </div>
    </DndProvider>
  );
};

export default App;
