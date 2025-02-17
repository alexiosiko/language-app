'use client';

import DroppableAreaParent from '@/components/drag-and-drop/droppableareatparent';
import { DraggableItem } from '@/components/drag-and-drop/item';
import { AssignedItems, DragAndDropItem, DragAndDrop } from '@/components/drag-and-drop/types';
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Page({ params }: {
	params: Promise<{ _id: string }>
}) {
	const [gameData, setGameData] = useState<DragAndDrop | null>(null);
	const [assignedItems, setAssignedItems] = useState<AssignedItems>({});
	const router = useRouter();
	useEffect(() => {
		const fetchData = async () => {
		try {
			const { _id } = await params;
			const res = await axios.get('/api/drag-and-drop', { params: { _id } });
			if (res.status !== 200)
				throw new Error('Could not fetch exercise');
			setGameData(res.data);
			console.log(res.data);

				// Initialize assignedItems based on fetched data
			const initialAssignedItems = res.data.lines.reduce((acc: AssignedItems, _: any, index: number) => {
				acc[`drop-${index + 1}`] = null;
				return acc;
			}, {});
			setAssignedItems(initialAssignedItems);
		} catch (e: any) {
			toast({
			title: e.message,
			variant: 'destructive',
			});
		}
		};
		fetchData();
	}, [params]);

	const handleDragEnd = (event: DragEndEvent) => {
		const { over, active } = event;
		setAssignedItems((prev) => {
		const newAssignedItems = { ...prev };

		// Remove item from previous assignment
		for (const key in newAssignedItems)
			if (newAssignedItems[key] === active.id) newAssignedItems[key] = null;

		// Assign item to new droppable area if dropped over one
		if (over) newAssignedItems[over.id] = active.id;
			return newAssignedItems;
		});
	};

	if (!gameData) {
		return (
		<Card>
			<CardHeader>
				<CardTitle>Loading...</CardTitle>
			</CardHeader>
			<CardContent>
				<p>Loading game data...</p>
			</CardContent>
		</Card>
		);
	}

	const initialItems: DragAndDropItem[] = gameData.lines.map((item, index) => ({
		id: `item-${index + 1}`,
		content: item.item,
	}));
	
	function shuffleArray(array: DragAndDropItem[]) {
		for (let i = array.length - 1; i > 0; i--) {
		  const j = Math.floor(Math.random() * (i + 1));
		  [array[i], array[j]] = [array[j], array[i]];
		}
		return array;
	}

	const shuffledItems = shuffleArray([...initialItems]);

	const onDelete = async () => {
		try {
			const res = await axios.delete('/api/drag-and-drop', {
				params: {
					_id: gameData._id
				}
			})
			if (res.status != 200)
				throw Error("Error in server");
			toast({
				title: "Successfully deleted exercise"
			})
			router.push("/exercises")

		} catch (e: any) {
			toast({
				title: e.message,
				variant: "destructive"
			});
		}
	}
	  
	return (
		<DndContext onDragEnd={handleDragEnd}>
		<Card>
			<CardHeader>
				<CardTitle>Drag & Drop</CardTitle>
			</CardHeader>
			<CardContent className="flex justify-between">
				<div className="flex flex-col gap-6">
					{shuffledItems
					.filter((item) => !Object.values(assignedItems).includes(item.id))
						.map((item) => (
						<DraggableItem key={item.id} id={item.id} content={item.content} />
					))}
				</div>
			<div className="w-[80%] flex flex-col gap-6">
				{gameData.lines.map((line, index) => {
					const dropId = `drop-${index + 1}`;
					return (
						<DroppableAreaParent
							initialItems={initialItems}
							dropId={dropId}
							line={line}
							key={index}
							assignedItems={assignedItems}
						/>
					);
				})}
			</div>
			</CardContent>
			<CardFooter className="justify-end">
				<AlertDialog>
					<AlertDialogTrigger asChild><Button variant="destructive">Delete</Button></AlertDialogTrigger>
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle>Are you sure you want to delete this exercise?</AlertDialogTitle>
							<AlertDialogDescription>
								This action cannot be undone. 
							</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel>Cancel</AlertDialogCancel>
							<AlertDialogAction asChild onClick={onDelete}><Button variant="destructive">Yes Delete</Button></AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			</CardFooter>
		</Card>
		</DndContext>
	);
}
