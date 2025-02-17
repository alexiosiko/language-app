import { DragAndDrop } from "@/components/drag-and-drop/types";

export type FillInTheBlankWithoutObjectIdType = {
	lines: FillInTheBlankLineType[],
	title: string,
};

export type FillInTheBlankLineType = {
	text: string;
	blankIndices: number[];
}

export type FillInTheBlankType = FillInTheBlankWithoutObjectIdType & {
	_id: string,
};

export type NavItemType = {
	icon: any,
	title: string,
	href: string
}

export type Resource = ResourceWithout_id & {
	_id: string,
}
export type ResourceWithout_id = {
	title: string,
	url: string,
}


export type vector2 = {
	x: number,
	y: number
}


export type Slot = {
	description: string,
	correctItem: string,
	selectedItem: string | null,
}

export type Exercises = {
	dragAndDrops: DragAndDrop[],
	fillInTheBlanks: FillInTheBlankType[],
} ;