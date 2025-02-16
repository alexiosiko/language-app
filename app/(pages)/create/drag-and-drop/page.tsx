'use client';

import { Button } from '@/components/ui/button';
import { DndContext, useDraggable, useDroppable, DragEndEvent, UniqueIdentifier } from '@dnd-kit/core';
import { useState } from 'react';

interface Item {
  id: UniqueIdentifier;
  content: string;
}

interface AssignedItems {
  [key: UniqueIdentifier]: UniqueIdentifier | null;
}

function DraggableItem({ id, content }: Item) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });
  const style: React.CSSProperties = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,

    cursor: 'grab',
  };

  return (
    <Button className='hover:cursor-grab' ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {content}
    </Button>
  );
}

interface DroppableAreaProps {
  id: UniqueIdentifier;
  description: string;
  children?: React.ReactNode;
}

function DroppableArea({ id, description, children }: DroppableAreaProps) {
	const { isOver, setNodeRef } = useDroppable({ id });


	return (
		<div ref={setNodeRef} className='grid grid-cols-2'>
			<div>
				{children}
			</div>
			<p>{description}</p>
		</div>
	);
}

export default function DragAndDropGame() {
  const initialItems: Item[] = [
    { id: 'item-1', content: 'Item 1' },
    { id: 'item-2', content: 'Item 2' },
    { id: 'item-3', content: 'Item 3' },
  ];

  const [assignedItems, setAssignedItems] = useState<AssignedItems>({
    'drop-1': null,
    'drop-2': null,
    'drop-3': null,
  });

  const handleDragEnd = (event: DragEndEvent) => {
    const { over, active } = event;
    setAssignedItems((prev) => {
      const newAssignedItems = { ...prev };
      // Remove item from previous assignment
      for (const key in newAssignedItems) {
        if (newAssignedItems[key] === active.id) {
          newAssignedItems[key] = null;
        }
      }
      // Assign item to new droppable area if dropped over one
      if (over) {
        newAssignedItems[over.id] = active.id;
      }
      return newAssignedItems;
    });
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className='flex justify-around'>
        <div className='flex flex-col gap-4'>
          {initialItems
            .filter((item) => !Object.values(assignedItems).includes(item.id))
            .map((item) => (
              <DraggableItem key={item.id} id={item.id} content={item.content} />
            ))}
        </div>
        <div className='w-[50%] flex flex-col'>
          {Object.keys(assignedItems).map((dropId) => (
            <DroppableArea key={dropId} id={dropId} description={`Description ${dropId}`}>
              {assignedItems[dropId] ? (
                <DraggableItem
                  id={assignedItems[dropId]!}
                  content={initialItems.find((item) => item.id === assignedItems[dropId])?.content || ''}
                />
              ) : <p className='relative mt-6'>____</p>}
            </DroppableArea>
          ))}
        </div>
      </div>
    </DndContext>
  );
}
