"use client";

import { motion } from "framer-motion";
import { Link, BarChart, Settings } from "lucide-react";

export default function Sidebar() {
  return (
    <motion.aside
      initial={{ width: 72 }}
      whileHover={{ width: 220 }}
      transition={{ duration: 0.3 }}
      className="h-screen bg-glass backdrop-blur-glass border-r border-white/20 p-4"
    >
      <nav className="space-y-4 text-white">
        <Item icon={<Link />} label="Links" />
        <Item icon={<BarChart />} label="Analytics" />
        <Item icon={<Settings />} label="Settings" />
      </nav>
    </motion.aside>
  );
}

function Item({ icon, label }) {
  return (
    <div className="flex items-center gap-3 cursor-pointer hover:opacity-100 opacity-80">
      {icon}
      <span className="hidden md:block">{label}</span>
    </div>
  );
}
