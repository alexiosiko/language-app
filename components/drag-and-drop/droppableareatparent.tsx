import React from 'react'
import { DroppableArea } from './area'
import { AssignedItems, DragAndDropItem, DragAndDropLineType } from './types'
import { DraggableItem } from './item'

export default function DroppableAreaParent({ line, dropId, assignedItems, initialItems }: {
	line: DragAndDropLineType,
	dropId: string,
	initialItems: DragAndDropItem[],
	assignedItems: AssignedItems,
}) {
  return (
	<div key={dropId} className='flex justify-end gap-12'>
		<DroppableArea id={dropId} line={line}>
			{assignedItems[dropId] ? (
				<DraggableItem
					id={assignedItems[dropId]!}
					content={initialItems.find((i) => i.id === assignedItems[dropId])?.content || ''}
				/>
			) : (
				<p className="relative rounded w-24 h-9 top-3 text-center bg-secondary" />
			)}

		</DroppableArea>
	</div>
  )
}
