import { Dispatch, SetStateAction } from "react";
import { DragAndDropLineType } from "./types";
import { Input } from "../ui/input";
import FcMinus from "../ui/minus";

export const Line = ({ index, lines, setLines, line }: {
	index: number,
	lines: DragAndDropLineType[],
	line: DragAndDropLineType,
	setLines: Dispatch<SetStateAction<DragAndDropLineType[]>>,
}) => {
	const onChangeDescription = (description: string, index: number) => {
		lines[index].description = description;
		setLines([...lines]);
	}

	const onChangeItem = (item: string, index: number) => {
		lines[index].item = item;
		setLines([...lines]);
	}

	const removeLine = (index: number) => {
		const updatedLines = lines.filter((_, i) => i !== index);
		setLines(updatedLines);
	};
	return (
		<div key={index} className="flex gap-4 items-center mb-4">
			<Input onChange={e => onChangeItem(e.target.value, index)} value={line.item} placeholder="Enter word" className="w-[50%]"/>
			<Input onChange={e => onChangeDescription(e.target.value, index)} value={line.description} placeholder="Enter description" />
			<FcMinus onClick={() => removeLine(index)} size={24} />
		</div>
	)
}
