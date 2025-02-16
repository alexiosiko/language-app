"use client"

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { Exercises } from '@/lib/types';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

export default function Page() {
	const router = useRouter();
	const [exercises, setExercises] = useState<Exercises | undefined | null>(undefined);
	useEffect(() => {
		fetchData();
	}, [])
	const fetchData = async () => {
		try {
			const res = await axios.get("api/exercises");
			if (res.status != 200)
				throw ("Error in server");
			console.log(res.data);
			setExercises(res.data);
		} catch (e: any) {
			toast({
				title: e.message,
				variant: "destructive"
			});
		}
	}
	return (
		<>
			{exercises === undefined ? <p>Fetching ...</p>
			:
			<div className='flex gap-4'>
				<Card>
					<CardHeader>
						<CardTitle>Fill in the Blanks</CardTitle>
					</CardHeader>

					<CardContent className='flex flex-col gap-4'>
						{exercises?.fillInTheBlanks.map((exercise, index: number) => 
							<div key={index}>
								<Button className='w-fit' onClick={() => router.push(`/exercises/fill-in-the-blank/${exercise._id}`)}>
									{exercise.title}
								</Button>
								
							</div>
						)}
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle>Drag & Drops</CardTitle>
					</CardHeader>
					<CardContent className='flex flex-col gap-4'>
						{exercises?.dragAndDrops.map((exercise, index: number) => 
							<div key={index}>
								<Button className='w-fit'  onClick={() => router.push(`/exercises/drag-and-drop/${exercise._id}`)}>
									{exercise.title}
								</Button>
								
							</div>
						)}
					</CardContent>
				</Card>
				</div>
			}
		</>
	)
}