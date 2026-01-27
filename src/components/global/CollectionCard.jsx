"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function CollectionCard({ title, children }) {
  const [open, setOpen] = useState(true);

  return (
    <div className="bg-glass backdrop-blur-glass rounded-xl p-4 border border-white/20">
      <button
        onClick={() => setOpen(!open)}
        className="flex justify-between w-full font-semibold"
      >
        {title}
        <ChevronDown className={open ? "rotate-180" : ""} />
      </button>

      {open && <div className="mt-4 space-y-3">{children}</div>}
    </div>
  );
}
