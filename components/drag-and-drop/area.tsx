import { useDroppable } from "@dnd-kit/core";
import { FcSearch } from "react-icons/fc";
import { useState } from "react";
import { DragAndDropLineType } from "./types";

export function DroppableArea({ id, children, line }: {
	id: string,
	children: React.ReactNode,
	line: DragAndDropLineType,
}) {
	const { setNodeRef } = useDroppable({ id });
	const [reveal, setReveal] = useState<boolean>(false);
	return (
		<div ref={setNodeRef} className='flex items-center gap-4'>
			{reveal && <p>{line.item}</p>}
			<div className="">
				{children}
			</div>
			<p>{line.description}</p>
			<FcSearch size={32} className='hover:cursor-pointer' onClick={() => setReveal(!reveal)} />
		</div>
	);
}