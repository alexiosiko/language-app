import React from 'react'
import Link from 'next/link'
import { FcPlus, FcReading, FcSupport } from "react-icons/fc";
import { NavItemType } from '@/lib/types';

const navItems: NavItemType[] = [
	{
		icon: <FcSupport size={32} />,
		title: "EXERCISES",
		href: "/exercises"
	},
	{
		icon: <FcReading  size={32} />,
		title: "RESOURCES",
		href: "/resources"
	},
	{
		icon: <FcPlus size={32} />,
		title: "CREATE",
		href: "/create"
	},
]
export default function Nav() {
	return (
		<div className='w-72 p-12 h-screen mr-2 outline outline-card flex flex-col'>
			<Link href="/"><h1 className='mb-12 text-primary'>greeklingo</h1></Link>
			{navItems.map((item: NavItemType, index: number) => 
				<Link href={item.href} key={index} className='flex gap-2 mb-2 items-center'>
					{item.icon} 
					<p>{item.title}</p>
					
				</Link>
			)}
		</div>
	)
}