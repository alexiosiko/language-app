"use client"

import { AlertDialogHeader, AlertDialogFooter, AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel, AlertDialogAction } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { Resource } from '@/lib/types';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

export default function Page() {
	const router = useRouter();
	const [resources, setResources] = useState<Resource[] | undefined>(undefined);
	const fetchData = async () => {
		try {
			const res = await axios.get('/api/resources');
			if (res.status != 200)
				throw ("Error in server");
			setResources(res.data );
		} catch (e: any) {
			toast({
				title: e.message,
				variant: "destructive"
			});
		}
	}
	useEffect(() => {
		fetchData();
	}, [])
	const onDelete = async (_id: string) => {
		try {
			const res = await axios.delete('/api/resources', {
				params: {
					_id: _id
				}
			})
			if (res.status != 200)
				throw Error("Error in server");
			toast({
				title: "Successfully deleted exercise"
			})
			router.push("/resources")

		} catch (e: any) {
			toast({
				title: e.message,
				variant: "destructive"
			});
		}
	}
	return (
		<div className='flex flex-col gap-4'>
			<h1>Resources</h1>
			{resources?.map((resource, index) => 
				<div key={index} className='flex justify-between'>
					<Button onClick={() => window.open("https://" + resource.url, '_blank')}>
						{resource.title}
					</Button>
					<AlertDialog>
						<AlertDialogTrigger><Button variant="destructive">Delete</Button></AlertDialogTrigger>
						<AlertDialogContent>
							<AlertDialogHeader>
							<AlertDialogTitle>Are you sure you want to delete this exercise?</AlertDialogTitle>
							<AlertDialogDescription>
								This action cannot be undone. 
							</AlertDialogDescription>
							</AlertDialogHeader>
							<AlertDialogFooter>
							<AlertDialogCancel>Cancel</AlertDialogCancel>
							<AlertDialogAction onClick={() => onDelete(resource._id)}><Button variant="destructive">Yes Delete</Button></AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
				</div>
			)}
			{resources === undefined && <p>Fetching ...</p>}
			{resources && resources.length === 0 && <p>No resources ...</p>}
		</div>
	)
}
