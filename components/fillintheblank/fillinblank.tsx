import React, { useState } from 'react'
import { CardContent } from '@/components/ui/card'
import { LineType } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { FcSearch } from 'react-icons/fc';
import { stringToArray } from '@/lib/utils';

export default function FillInBlank({ line }: {
	line: LineType,
}) {
	const [reveal, setReveal] = useState<boolean>(false);
	console.log(line);
  return (
		<CardContent className='flex gap-2 mb-8'>
			{stringToArray(line.text).map((word, wordIndex: number) => {
				if (line.blankIndices.includes(wordIndex))
					return (
						<div className='relative' key={wordIndex}>
							<Input
								style={{ width: word.length * 40}}
								className="focus-visible:ring-0 border-none relative bottom-0.5"
							/>
							<div className='h-[2px] relative bottom-1 w-[90%] mx-auto  bg-foreground' />
							{reveal && <p className='absolute left-3 text-foreground italic'>{stringToArray(line.text)[wordIndex]}</p>}
						</div> 
					)
				else
					return <span key={wordIndex}>{word} </span>
			})}
			<FcSearch size={32} className='hover:cursor-pointer' onClick={() => setReveal(!reveal)} />
			<hr/>
		</CardContent>
  )
}
