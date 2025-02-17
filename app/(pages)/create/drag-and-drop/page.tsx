'use client';

import { Line } from "@/components/drag-and-drop/line";
import { DragAndDropWithout_id, DragAndDropLineType } from "@/components/drag-and-drop/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { useState } from "react";
import { FcPlus } from "react-icons/fc";

const defaultValue: DragAndDropLineType[] = [{	description: "",	item: ""},{	description: "",	item: ""},{	description: "",	item: ""},{	description: "",	item: ""}];

export default function DragAndDropGame() {
	const [title, setTitle] = useState<string>("");
	const [uploading, setUploading] = useState<boolean>(false);
	
	const [lines, setLines] = useState<DragAndDropLineType[]>(defaultValue);
	const onAddLine = () => {
		setLines(prev => [
			...prev,
			{ description: "", item: "" }
		]);
	}

	const handleUpload = async () => {
		try {
			setUploading(true);
			validate();
			const data: DragAndDropWithout_id = {
				lines: lines,
				title: title,
			}
			const res = await axios.put("/api/drag-and-drop", data);
			if (res.status != 200)
				throw Error("Error in the server. Ask Alexi");
			toast({
				title: "Successfully uploaded exercise"
			});
			resetData();
		} catch (e: any) {
			toast({
				title: e.message,
				variant: "destructive"
			});
		} finally {
			setUploading(false);
		}
	}
	const resetData = () => {
		setTitle("");
		setLines(defaultValue);
	}
	const validate = () => {
		if (title == "")
			throw Error("Title cannot be empty.");
		lines.forEach(lines => {
			if (lines.description == "")
				throw Error("All boxes must be filled");
			if (lines.item == "")
				throw Error("All boxes must be filled");
		})
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle className="mb-4">Create a Fill in the blank</CardTitle>
				<div className='flex gap-2 items-center'>
					<p>Title:  </p>
					<Input
						placeholder="Enter title for this exercise"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						/>
				</div>
			</CardHeader>
			<CardContent>
				{lines.map((line, index) => 
					<Line
						index={index}
						lines={lines}
						line={line}
						setLines={setLines}
						key={index}
					/>
				)}
				<FcPlus onClick={() => onAddLine()} className="hover:cursor-pointer" size={32} />
			</CardContent>
			<CardFooter className="justify-end">
				<Button  disabled={uploading} onClick={handleUpload} >Upload</Button>
			</CardFooter>
		</Card>
	);
}

