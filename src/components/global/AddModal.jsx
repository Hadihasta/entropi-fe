"use client";

import { useState } from "react";

export default function AddModal({ open, onClose }) {
  const [url, setUrl] = useState("");

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-end md:items-center justify-center">
      <div className="bg-white rounded-t-2xl md:rounded-2xl p-6 w-full md:w-96">
        <h2 className="font-bold mb-4">Add New Link</h2>

        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://"
          className="w-full border p-2 rounded"
        />

        <div className="flex gap-2 mt-4">
          <button
            onClick={onClose}
            className="flex-1 border rounded p-2"
          >
            Cancel
          </button>
          <button className="flex-1 bg-primary rounded p-2">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
