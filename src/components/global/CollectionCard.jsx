'use client'

import { useState } from 'react'
import { ChevronDown, Plus } from 'lucide-react'
import AddModal from './AddModal'

export default function CollectionCard({ title, children }) {
  const [open, setOpen] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <div className="bg-white/10 rounded-xl p-4 border border-white/20">
      {/* Header dengan title dan add button */}
      <div className="flex justify-between items-center w-full">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 font-semibold text-white transition-all hover:opacity-80"
        >
          {title}
          <ChevronDown 
            className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`} 
          />
        </button>

        {/* Add Button di header */}
        <button
          onClick={() => setModalOpen(true)}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors group"
        >
          <Plus size={20} className="text-white group-hover:rotate-90 transition-transform duration-300" />
        </button>
      </div>

      {/* Modal */}
      <AddModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />

      {/* Content */}
      {open && <div className="mt-4 space-y-3">{children}</div>}
    </div>
  )
}