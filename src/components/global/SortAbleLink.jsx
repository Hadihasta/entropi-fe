'use client'

import { useEffect, useState } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Grip, Edit, Trash, Copy, Check, X } from 'lucide-react'

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

export default function SortableLink({ link, onUpdate, onDelete, onDuplicate }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: link.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(link.title)
  const [url, setUrl] = useState(link.url)
  const [enabled, setEnabled] = useState(link.enabled)

  const [openTooltip, setOpenTooltip] = useState(null) // "title" | "url" | null
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(max-width: 767px)')
    const handler = () => setIsMobile(media.matches)

    handler()
    media.addEventListener('change', handler)
    return () => media.removeEventListener('change', handler)
  }, [])

  function handleSave() {
    onUpdate({
      ...link,
      title,
      url,
      enabled,
    })
    setIsEditing(false)
  }

  return (
    <TooltipProvider>
      <div
        ref={setNodeRef}
        style={style}
        className="
          bg-glass backdrop-blur-xl
          border border-[var(--glass-border)]
          rounded-xl p-4
          flex items-center justify-between
          gap-4 w-full
        "
      >
        {/* LEFT */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <button
            {...attributes}
            {...listeners}
            className="touch-none"
          >
            <Grip className="cursor-grab active:cursor-grabbing" />
          </button>

          <div className="flex-1 min-w-0">
            {isEditing ? (
              <div className="space-y-2">
                <input
                  className="w-full min-w-0 bg-transparent border rounded px-2 py-1 text-sm"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <input
                  className="w-full min-w-0 bg-transparent border rounded px-2 py-1 text-sm"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
              </div>
            ) : (
              <>
                {/* TITLE */}
                {isMobile ? (
                  <Tooltip open={openTooltip === 'title'}>
                    <TooltipTrigger asChild>
                      <p
                        className="font-semibold truncate cursor-pointer"
                        onClick={() => setOpenTooltip(openTooltip === 'title' ? null : 'title')}
                      >
                        {link.title}
                      </p>
                    </TooltipTrigger>
                    <TooltipContent
                      onPointerDownOutside={() => setOpenTooltip(null)}
                      className="max-w-xs break-words"
                    >
                      {link.title}
                    </TooltipContent>
                  </Tooltip>
                ) : (
                  <p className="font-semibold truncate">{link.title}</p>
                )}

                {/* URL */}
                {isMobile ? (
                  <Tooltip open={openTooltip === 'url'}>
                    <TooltipTrigger asChild>
                      <p
                        className="text-sm opacity-70 truncate cursor-pointer"
                        onClick={() => setOpenTooltip(openTooltip === 'url' ? null : 'url')}
                      >
                        {link.url}
                      </p>
                    </TooltipTrigger>
                    <TooltipContent
                      onPointerDownOutside={() => setOpenTooltip(null)}
                      className="max-w-xs break-words"
                    >
                      {link.url}
                    </TooltipContent>
                  </Tooltip>
                ) : (
                  <p className="text-sm opacity-70 truncate">{link.url}</p>
                )}
              </>
            )}
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3 shrink-0">
          <span className="text-xs opacity-70 whitespace-nowrap">0 clicks</span>

          {/* Toggle */}
          <button
            onClick={() => {
              setEnabled(!enabled)
              onUpdate({ ...link, enabled: !enabled })
            }}
            className={`w-10 h-5 rounded-full transition ${enabled ? 'bg-green-500' : 'bg-gray-400'}`}
          >
            <div
              className={`w-4 h-4 bg-white rounded-full transition-transform ${
                enabled ? 'translate-x-5' : 'translate-x-1'
              }`}
            />
          </button>

          {isEditing ? (
            <>
              <Check
                className="cursor-pointer text-green-500"
                onClick={handleSave}
              />
              <X
                className="cursor-pointer text-gray-400"
                onClick={() => setIsEditing(false)}
              />
            </>
          ) : (
            <>
              <Edit
                className="cursor-pointer"
                onClick={() => setIsEditing(true)}
              />
              <Copy
                className="cursor-pointer"
                onClick={() => onDuplicate(link)}
              />
              <Trash
                className="cursor-pointer text-red-400"
                onClick={() => onDelete(link.id)}
              />
            </>
          )}
        </div>
      </div>
    </TooltipProvider>
  )
}
