"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Grip, Edit, Trash } from "lucide-react";

export default function SortableLink({ link }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: link.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="
    bg-glass backdrop-blur-xl
    border border-[var(--glass-border)]
    rounded-xl p-4
    flex items-center justify-between
    transition-opacity
    data-[dragging=true]:opacity-50
  "
    >
      <div className="flex items-center gap-3">
        <button {...attributes} {...listeners}>
          <Grip className="cursor-grab active:cursor-grabbing" />
        </button>

        <div>
          <p className="font-semibold">{link.title}</p>
          <p className="text-sm opacity-70">{link.url}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-xs">0 clicks</span>
        <input type="checkbox" defaultChecked={link.enabled} />
        <Edit className="cursor-pointer" />
        <Trash className="cursor-pointer text-red-400" />
      </div>
    </div>
  );
}
