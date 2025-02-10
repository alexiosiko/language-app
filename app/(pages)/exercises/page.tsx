"use client"

import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { FillInTheBlankType } from '@/lib/types';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

export default function Page() {
	const router = useRouter();
	const [exercises, setExercises] = useState<FillInTheBlankType[]>([]);
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
		<div>
			<h1 className=''>Exercises</h1>
			<div className='flex flex-col gap-4'>
				{exercises.length > 0 && exercises.map((exercise, index: number) => 
					<Button className='w-fit' key={index} onClick={() => router.push(`/exercises/${exercise._id}`)}>
						{exercise.title}
					</Button>
				)}
			</div>
		</div>
	)
}