export type FillInTheBlankWithoutObjectIdType = {
	lines: LineType[],
	title: string,
};

export type LineType = {
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


export type DragAndDropTypeWithout_id = {
	title: string,
	slots: Slot[]
}
export type  DragAndDropType = DragAndDropTypeWithout_id & {
	_id: string,
}
export type Slot = {
	description: string,
	correctItem: string,
	selectedItem: string | null,
}

export type Exercises = {
	dragAndDrops: DragAndDropType[],
	fillInTheBlanks: FillInTheBlankType[],
} ;