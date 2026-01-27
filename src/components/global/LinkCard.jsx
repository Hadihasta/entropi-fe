import { Grip, Edit, Trash } from "lucide-react";

export default function LinkCard({ title, url, enabled }) {
  return (
    <div className="flex items-center justify-between bg-glass backdrop-blur-glass p-4 rounded-xl border border-white/20">
      <div className="flex items-center gap-3">
        <Grip className="cursor-grab" />
        <div>
          <p className="font-semibold">{title}</p>
          <p className="text-sm opacity-70">{url}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-xs">0 clicks</span>
        <input type="checkbox" defaultChecked={enabled} />
        <Edit className="cursor-pointer" />
        <Trash className="cursor-pointer text-red-400" />
      </div>
    </div>
  );
}
