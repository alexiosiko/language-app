"use client"

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from '@/hooks/use-toast'
import { ResourceWithout_id } from '@/lib/types'
import axios from 'axios'
import React, { useState } from 'react'

export default function Page() {
	const [title, setTitle] = useState<string>("");
	const [url, setUrl] = useState<string>("");
	const [uploading, setUploading] = useState<boolean>(false);
	const handleUpload = async () => {
		try {
			const data: ResourceWithout_id = {
				title: title,
				url: url,
			}
			validateData(data);

			const res = await axios.put('/api/resources',
				data
			);
			if (res.status != 200)
				throw Error("Error in server");
			toast({
				title: "Successfully uploaded resource"
			})

			setTitle("");
			setUrl("");
			

		} catch (e: any) {
			toast({
				title: e.message,
				variant: "destructive"
			});
		} finally {
			setUploading(false);
		}
	}
	const validateData = (data: ResourceWithout_id) => {
		if (data.title == "")
			throw Error("Title cannot be empty");
		if (data.url == "")
			throw Error("URL cannot be empty");
	}
  return (
	<Card>
		<CardHeader>
			<CardTitle>Create a resource</CardTitle>
		</CardHeader>
		<CardContent>
			<Label>Title</Label>
			<Input className='mb-12' value={title} onChange={e => setTitle(e.target.value)} placeholder='Enter title for link' />
			<Label>Url</Label>
			<Input value={url} onChange={e => setUrl(e.target.value)} placeholder='Example: www.google.ca' />
		</CardContent>
		<CardFooter className='justify-end'>
			<Button disabled={uploading} onClick={handleUpload}>Upload</Button>
		</CardFooter>
	</Card>
  )
}
