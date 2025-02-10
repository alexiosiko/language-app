"use client"

import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { FillInTheBlankType } from '@/lib/types'
import Link from 'next/link'
import 'axios';
import React, { useEffect, useState } from 'react'
import FillInBlank from '@/components/fillintheblank/fillinblank'
import axios from 'axios'
import { toast } from '@/hooks/use-toast'
export default function Page({ params }: {
	params: Promise<{ id : string}>
}) {
	const [data, setData] = useState<FillInTheBlankType | null>(null)
	
	const fetch = async () => {
		try {
			const res = await axios.get("/api/exercises", {
				params: {
					id: (await params).id
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
	const onComplete = async () => {

	}
	useEffect(() => {
		fetch();
	}, [])
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
				{/* <Button onClick={() => onComplete()}>Complete</Button> */}
			</CardFooter>

		</Card>
	)
}
