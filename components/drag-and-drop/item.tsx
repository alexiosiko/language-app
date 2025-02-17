import { useDraggable } from "@dnd-kit/core";
import { DragAndDropItem } from "./types";

export function DraggableItem({ id, content }: DragAndDropItem) {
	
	const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });
	const style: React.CSSProperties = {
	  transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
	  cursor: 'grab',
	};
  
	return (
	  <div className='h-9 mr-4 px-4 py-2 bg-primary rounded items-center flex w-min' ref={setNodeRef} style={style} {...listeners} {...attributes}>
		{content}
	  </div>
	);
  }