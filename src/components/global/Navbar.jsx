"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Link, BarChart, Settings, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
  
      <div className="md:hidden fixed top-0 left-0 right-0 h-14 bg-glass backdrop-blur-glass border-b border-white/20 flex items-center px-4 z-50">
        <button 
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          {mobileOpen ? (
            <X className="text-white" size={20} />
          ) : (
            <Menu className="text-white" size={20} />
          )}
        </button>
        <span className="ml-3 text-white font-semibold">My App</span>
      </div>

   
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-30"
          />
        )}
      </AnimatePresence>

  
      <motion.aside
        initial={false}
        animate={{
          x: mobileOpen ? 0 : -220,
        }}
        transition={{ 
          type: "spring", 
          damping: 25, 
          stiffness: 200 
        }}
        className="md:hidden fixed left-0 top-14 bottom-0 w-64 bg-glass backdrop-blur-glass border-r border-white/20 p-6 z-40"
      >
        <nav className="space-y-2 text-white">
          <Item icon={<Link size={20} />} label="Links" alwaysShow />
          <Item icon={<BarChart size={20} />} label="Analytics" alwaysShow />
          <Item icon={<Settings size={20} />} label="Settings" alwaysShow />
        </nav>
      </motion.aside>

 
      <DesktopSidebar />
    </>
  );
}

function DesktopSidebar() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.aside
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={false}
      animate={{
        width: isHovered ? 220 : 72,
      }}
      transition={{ 
        duration: 0.3,
        ease: "easeInOut"
      }}
      className="hidden md:block relative h-screen bg-glass backdrop-blur-glass border-r border-white/20 p-4"
    >
      <nav className="space-y-2 text-white">
        <Item icon={<Link size={20} />} label="Links" showLabel={isHovered} />
        <Item icon={<BarChart size={20} />} label="Analytics" showLabel={isHovered} />
        <Item icon={<Settings size={20} />} label="Settings" showLabel={isHovered} />
      </nav>
    </motion.aside>
  );
}

function Item({ icon, label, showLabel, alwaysShow }) {
  return (
    <div className="flex items-center gap-3 px-3 py-3 cursor-pointer hover:bg-white/10 rounded-lg transition-all duration-200 group">
      <div className="flex-shrink-0">
        {icon}
      </div>
      <motion.span
        initial={false}
        animate={{
          opacity: alwaysShow ? 1 : (showLabel ? 1 : 0),
          width: alwaysShow ? "auto" : (showLabel ? "auto" : 0),
        }}
        transition={{ duration: 0.2 }}
        className="whitespace-nowrap overflow-hidden"
      >
        {label}
      </motion.span>
    </div>
  );
}