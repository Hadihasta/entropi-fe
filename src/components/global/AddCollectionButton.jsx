"use client";

import { FolderPlus } from "lucide-react";
import { motion } from "framer-motion";

export default function AddCollectionButton({ onClick }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="w-full flex items-center justify-center gap-2 p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl hover:bg-white/15 transition-all group"
    >
      <div className="p-2 bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors">
        <FolderPlus size={20} className="text-white" />
      </div>
      <span className="font-semibold text-white">Create New Collection</span>
    </motion.button>
  );
}