"use client"

import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { Resource } from '@/lib/types';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function Page() {
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
	useEffect(() => {
		console.log(resources);
	}, [resources])
	return (
		<div>
			<h1>Resources</h1>
			{resources?.map((resource, index) => {
				console.log(resource);
				return (
					<Button key={index} onClick={() => window.open("https:// "+resource.url, '_blank')}>
						{resource.title}
					</Button>
				)
				}
			)}
		</div>
	)
}
