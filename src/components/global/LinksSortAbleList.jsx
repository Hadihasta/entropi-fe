'use client'

import { useEffect, useState } from 'react'
import {
  DndContext,
  closestCenter,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable'

import { useLinksStore } from '@/store/useLinkStore'
import SortableLink from './SortAbleLink'

export default function LinksSortableList() {

  const collections = useLinksStore((s) => s.collections)
  const activeCollectionId = useLinksStore((s) => s.activeCollectionId)

  const reorderLinks = useLinksStore((s) => s.reorderLinks)
  const updateLink = useLinksStore((s) => s.updateLink)
  const deleteLink = useLinksStore((s) => s.deleteLink)
  const duplicateLink = useLinksStore((s) => s.duplicateLink)

 
  const activeCollection = collections.find(c => c.id === activeCollectionId)
  const links = activeCollection?.links || []

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 150, tolerance: 5 },
    }),
  )

  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  function handleDragEnd(event) {
    const { active, over } = event
    if (!over || active.id === over.id) return

    const oldIndex = links.findIndex((l) => l.id === active.id)
    const newIndex = links.findIndex((l) => l.id === over.id)

    reorderLinks(arrayMove(links, oldIndex, newIndex))
  }

  if (!mounted) return null

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={links.map((l) => l.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-3">
          {links.map((link) => (
            <SortableLink
              key={link.id}   
              link={link}
              onUpdate={updateLink}
              onDelete={deleteLink}
              onDuplicate={duplicateLink}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  )
}
