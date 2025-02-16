"use client"

// import { toast } from '@/hooks/use-toast';
// import { FillInTheBlankType } from '@/lib/types';
// import axios from 'axios';
// import { useRouter } from 'next/navigation';
// import React, { useEffect, useState } from 'react'

export default function Page() {
	// const router = useRouter();
	// const [data, setData] = useState<FillInTheBlankType | null>(null)
	// useEffect(() => {
	// 	const fetch = async () => {
	// 		try {
	// 			const res = await axios.get("/api/fill-in-the-blank", {
	// 				params: {
	// 					_id: (await params)._id
	// 				}
	// 			})
	// 			console.log(res.data);
	// 			if (res.status == 200)
	// 				setData(res.data);
	// 			else
	// 				throw Error("Could not fetch excerise");
	// 		} catch (e: any) {
	// 			toast({
	// 				title: e.message,
	// 				variant: "destructive"
	// 			});
	// 		}
	
	// 	}
	// 	fetch();
	// 	// eslint-disable-next-line
	// }, [])

	// const onDelete = async () => {
	// 	try {
	// 		const res = await axios.delete('/api/fill-in-the-blank', {
	// 			params: {
	// 				_id: data?._id
	// 			}
	// 		})
	// 		if (res.status != 200)
	// 			throw Error("Error in server");
	// 		toast({
	// 			title: "Successfully deleted exercise"
	// 		})
	// 		router.push("/exercises")

	// 	} catch (e: any) {
	// 		toast({
	// 			title: e.message,
	// 			variant: "destructive"
	// 		});
	// 	}
	// }
  return (
	<div>Page</div>
  )
}
