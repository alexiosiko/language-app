import { UniqueIdentifier } from "@dnd-kit/core";




export type DragAndDropItem = {
	id: UniqueIdentifier;
	content: string;
}

  
export type AssignedItems = {
	[key: UniqueIdentifier]: UniqueIdentifier | null;
}

export type DragAndDropWithout_id = {
	title: string;
	lines: DragAndDropLineType[];
}

export type DragAndDrop = DragAndDropWithout_id & {
	_id: string,
}

export type DragAndDropLineType = {
	item: string,
	description: string,
}