"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, X } from "lucide-react";
import { useLinksStore } from "@/store/useLinkStore";

export default function AddModal({ open, onClose,collectionId   }) {
  const addLinkToCollection = useLinksStore(
    (s) => s.addLinkToCollection )
  const [step, setStep] = useState("choose");
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");

  const normalizeUrl = (value) => {
    if (!value) return "";
    if (!/^https?:\/\//i.test(value)) return "https://" + value;
    return value;
  };

  const handleClose = () => {
    setStep("choose");
    setUrl("");
    setTitle("");
    onClose();
  };

const handleSave = () => {
  if (!url.trim() || !title.trim()) return

  addLinkToCollection(collectionId, {
    title: title.trim(),
    url: normalizeUrl(url.trim()),
  })

  setUrl('')
  setTitle('')
  onClose()
}
  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-end md:items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleClose}
      >
        <motion.div
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-t-3xl md:rounded-2xl p-6 w-full md:w-[480px] md:max-w-[90vw] shadow-2xl"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">
              {step === "choose" && "Add New Item"}
              {step === "link" && "Add Link"}
            </h2>
            <button onClick={handleClose} className="p-2 hover:bg-gray-100 rounded-full">
              <X size={20} />
            </button>
          </div>

          <AnimatePresence mode="wait">
            {step === "choose" && (
              <motion.div
                key="choose"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-3"
              >
                <OptionButton
                  icon={<Link size={20} />}
                  title="New Link"
                  description="Add a new link to active collection"
                  onClick={() => setStep("link")}
                />
              </motion.div>
            )}

            {step === "link" && (
              <motion.div
                key="link"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium mb-2">URL *</label>
                  <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    onBlur={() => setUrl(normalizeUrl(url))}
                    placeholder="https://"
                    className="w-full border rounded-lg px-4 py-2.5"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Title *</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Instagram Hadi"
                    className="w-full border rounded-lg px-4 py-2.5"
                  />
                </div>

                <ActionButtons
                  onCancel={() => setStep("choose")}
                  onSave={handleSave}
                  saveDisabled={!url.trim() || !title.trim()}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}


function OptionButton({ icon, title, description, onClick }) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="w-full flex items-start gap-4 p-4 border border-gray-200 rounded-xl hover:border-primary hover:bg-primary/5 transition-all text-left group"
    >
      <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors flex-shrink-0">
        <div className="text-primary">{icon}</div>
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-800 mb-1">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </motion.button>
  );
}

function ActionButtons({ onCancel, onSave, saveDisabled }) {
  return (
    <div className="flex gap-3 mt-6">
      <button
        onClick={onCancel}
        className="flex-1 border border-gray-300 rounded-lg py-2.5 font-medium text-gray-700 hover:bg-gray-50 transition-colors"
      >
        Back
      </button>
      <button
        onClick={onSave}
        disabled={saveDisabled}
        className="flex-1 bg-primary rounded-lg py-2.5 font-medium text-white hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Save
      </button>
    </div>
  );
}