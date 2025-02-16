"use client"

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { FillInTheBlankWithoutObjectIdType, LineType } from '@/lib/types';
import Line from '@/components/fillintheblank/line';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FcPlus } from 'react-icons/fc';
import { toast } from '@/hooks/use-toast';
import axios from 'axios';

export default function Page() {
	const [name, setTitle] = useState<string>("");
	const [uploading, setUploading] = useState<boolean>(false);
	
	const [lines, setLines] = useState<LineType[]>([
		{
			blankIndices: [],
			text: "",
		}
	]);

	const addLine = () => {
		setLines(prevLines => [...prevLines, { text: '', blankIndices: [] }]);
	  };

	const handleUpload = async () => {
		try {
			setUploading(true);
			validateForm();
			const data: FillInTheBlankWithoutObjectIdType = {
				lines: lines,
				title: name
			}
			const res = await axios.put("/api/fill-in-the-blank", 
				data
			)
			if (res.status != 200)
				throw Error("Error happened");
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
	function resetData() {
		setTitle("");
		setLines([]);

	}
	function validateForm(): boolean {
		if (name == "")
			throw Error("Title is empty")
		if (lines.length == 0)
			throw Error("No lines have been created")
		lines.forEach(line => {
			if (line.text.length == 0)
				throw Error("A line is empty")
			if (line.blankIndices.length == 0)
				throw Error("A line has no hidden words")
					
		})
		return true;
	}
	return (
		<Card className="p-4 max-w-2xl mx-auto">
			<CardHeader className=''>
					<CardTitle className="mb-4">Create a Fill in the blank</CardTitle>
				<div className='flex gap-2 items-center'>
					<p>Title:  </p>
					<Input
						placeholder="Enter title for this exercise"
						value={name}
						onChange={(e) => setTitle(e.target.value)}
						/>
				</div>
			</CardHeader>
			<CardContent>
				{lines.map((line: LineType, index) => (
					<Line
						lines={lines}
						setLines={setLines}
						key={`line-${index}`} // Unique key based on index + content
						lineData={line}
						index={index} />
				))}
				<FcPlus  className='hover:cursor-pointer mt-12' onClick={addLine} size={32} />
			</CardContent>
			<CardFooter className='justify-end'>
				<Button disabled={uploading} onClick={handleUpload} >Upload</Button>
			</CardFooter>
		</Card>
	);
}

