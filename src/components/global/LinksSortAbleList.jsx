"use client";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";

import { useLinksStore } from "@/store/useLinkStore";
import SortableLink from "./SortAbleLink";

export default function LinksSortableList() {
  const { links, reorderLinks } = useLinksStore();

  function handleDragEnd(event) {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = links.findIndex((l) => l.id === active.id);
    const newIndex = links.findIndex((l) => l.id === over.id);

    reorderLinks(arrayMove(links, oldIndex, newIndex));
  }

  const sensors = useSensors(
  useSensor(PointerSensor, {
    activationConstraint: {
      distance: 5,
    },
  })
);

  return (
    <DndContext  sensors={sensors}
  collisionDetection={closestCenter}
  onDragEnd={handleDragEnd}>
      <SortableContext
        items={links.map((l) => l.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-3">
          {links.map((link) => (
            <SortableLink key={link.id} link={link} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
