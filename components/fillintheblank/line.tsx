
	import React from 'react';
	import { Input } from '../ui/input';
	import { stringToArray } from '@/lib/utils';
	import { Button } from '../ui/button';
	import { LineType } from '@/lib/types';
	import MinusIcon from '../ui/minus';

	export default function Line({ lineData, index, setLines, lines }: {
		lineData: LineType,
		index: number,
		lines: LineType[],
		setLines: React.Dispatch<React.SetStateAction<LineType[]>>,
	}) {
		const handleTextChange = (e: any) => {
			const line = lines[index];
			line.text = e.target.value;
			setLines([...lines]);
		};
		const onDelete = () => {
			setLines((prevLines) => prevLines.filter((_, i) => i !== index));
		};
		
		const toggleWordBlank = (wordIndex: number) => {
			const line = lines[index];
			if (line.blankIndices.includes(wordIndex))
			// Remove the wordIndex if it exists in blankIndices
			line.blankIndices = line.blankIndices.filter((i) => i !== wordIndex);
			else 
			// Add the wordIndex if it doesn't exist in blankIndices
			line.blankIndices = [...line.blankIndices, wordIndex];
			
			// Update the lines state with the modified line
			setLines([...lines]);
		};
		
		return (
			<div className="mb-12 flex-col flex gap-2">
				<div>
					<div className="flex gap-2 items-center">
					<MinusIcon
					
					onClick={() => onDelete()} 
					className="hover:cursor-pointer mb-2" />
					<p className="mb-2 text-base">Type your sentence:</p>
					</div>
					<Input
					placeholder="Enter sentence"
					value={lineData.text}
					onChange={handleTextChange}
					/>
				</div>
				<div>
					<div className="flex flex-wrap gap-2">
					{stringToArray(lineData.text).map((word, wordIndex) => (
						<Button
						variant="ghost"
						className="focus-visible:ring-0 p-1 border-none relative bottom-0.5"
						onClick={() => toggleWordBlank(wordIndex)}
						key={wordIndex}
						>
						{lineData.blankIndices.includes(wordIndex) ? (
							<span className="text-transparent border-b-2 border-foreground inline-block">
								{word}
							</span>
						) : (
							word
						)}
						</Button>
					))}
					</div>
				</div>
			</div>
		);
	}