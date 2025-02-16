"use client"

import { Button } from '@/components/ui/button'
import { NavItemType } from '@/lib/types'
import { useRouter } from 'next/navigation'
import React from 'react'
import { FcAbout, FcGrid, FcLink } from 'react-icons/fc'

const list: NavItemType[] = [
	{
		href: "/create/fill-in-the-blank",
		icon: <FcAbout className='relative scale-[200%]'  size={32} />,
		title: "Fill in the Blank"
	},
	{
		href: "/create/resource",
		icon: <FcLink className='relative scale-[200%]' size={32}/>,
		title: "Create a resource"
	},
	{
		href: "/create/drag-and-drop",
		icon: <FcGrid className='relative scale-[200%]' size={32}/>,
		title: "Drag & Drop"
	},
]
export default function Page() {
	const router = useRouter();
	return (
		<div>
			<h1>Choose a Module</h1>
			{list.map((item, index) =>
				<Button onClick={() => router.push(item.href)}
				key={index}
				className='flex gap-4 mb-2 items-center'>
						{/* {item.icon} */}
						<p>{item.title}</p>
				</Button>
			)}
		</div>
	)
}
