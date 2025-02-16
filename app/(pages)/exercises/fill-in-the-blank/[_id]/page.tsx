"use client"

import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { FillInTheBlankType } from '@/lib/types'
import 'axios';
import React, { useEffect, useState } from 'react'
import FillInBlank from '@/components/fillintheblank/fillinblank'
import axios from 'axios'
import { toast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button';
import { AlertDialogHeader, AlertDialogFooter } from '@/components/ui/alert-dialog';
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel, AlertDialogAction } from '@/components/ui/alert-dialog';
import { useRouter } from 'next/navigation';
export default function Page({ params }: {
	params: Promise<{ _id : string}>
}) {
	const router = useRouter();
	const [data, setData] = useState<FillInTheBlankType | null>(null)
	useEffect(() => {
		const fetch = async () => {
			try {
				const res = await axios.get("/api/fill-in-the-blank", {
					params: {
						_id: (await params)._id
					}
				})
				console.log(res.data);
				if (res.status == 200)
					setData(res.data);
				else
					throw Error("Could not fetch excerise");
			} catch (e: any) {
				toast({
					title: e.message,
					variant: "destructive"
				});
			}
	
		}
		fetch();
		// eslint-disable-next-line
	}, [])

	const onDelete = async () => {
		try {
			const res = await axios.delete('/api/fill-in-the-blank', {
				params: {
					_id: data?._id
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
		<Card>
			<CardHeader>
				<CardTitle>This is the title for the page</CardTitle>
				<CardDescription>Fill in the blanks ...</CardDescription>
			</CardHeader>
			{data?.lines.map((data, dataIndex: number) => 
				<FillInBlank key={dataIndex} line={data} />
			)}
			<CardFooter className='justify-end'>
				{/* <Link href='/'><Button variant="secondary">Back</Button></Link> */}
				
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
	)
}
