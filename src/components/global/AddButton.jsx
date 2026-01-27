"use client";

import { Plus } from "lucide-react";
import { motion } from "framer-motion";

export default function AddButton({ onClick }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 bg-primary hover:bg-primary/90 text-white w-14 h-14 rounded-full shadow-2xl flex items-center justify-center z-50 transition-colors"
    >
      <Plus size={28} strokeWidth={2.5} />
    </motion.button>
  );
}