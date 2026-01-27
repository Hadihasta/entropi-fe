import { create } from "zustand";
import { nanoid } from "nanoid";

export const useLinksStore = create((set) => ({
  collections: [
    {
      id: 1,
      name: "Collection 1",
      links: [
        { id: "1", title: "Website", url: "https://example.com", enabled: true },
        { id: "2", title: "Instagram", url: "https://instagram.com", enabled: true },
      ],
    },
  ],

  activeCollectionId: 1,
   isAddingCollection: false, // 👈 NEW


  // 🔹 SET COLLECTION ACTIVE
  setActiveCollection: (id) => set({ activeCollectionId: id }),

  // ➕ ADD COLLECTION (dipanggil tombol kamu)
   addCollection: async () => {
    set({ isAddingCollection: true }) // start loading

    // ⏳ fake delay (ganti API nanti)
    await new Promise((r) => setTimeout(r, 700))
    
    set((state) => ({
      
      collections: [
     
        {
          id: nanoid(),
          name: `Collection ${state.collections.length + 1}`,
          links: [],
        },
           ...state.collections,
      ],
      isAddingCollection: false, // stop loading
    }))
  },

  // ➕ ADD LINK KE COLLECTION AKTIF
  addLink: () =>
    set((state) => ({
      collections: state.collections.map((col) =>
        col.id === state.activeCollectionId
          ? {
              ...col,
              links: [
                ...col.links,
                {
                  id: nanoid(),
                  title: "New Link",
                  url: "https://",
                  enabled: true,
                },
              ],
            }
          : col
      ),
    })),

  // ✏️ UPDATE LINK
  updateLink: (updatedLink) =>
    set((state) => ({
      collections: state.collections.map((col) =>
        col.id === state.activeCollectionId
          ? {
              ...col,
              links: col.links.map((l) =>
                l.id === updatedLink.id ? updatedLink : l
              ),
            }
          : col
      ),
    })),

  // 🗑 DELETE LINK
  deleteLink: (linkId) =>
    set((state) => ({
      collections: state.collections.map((col) =>
        col.id === state.activeCollectionId
          ? { ...col, links: col.links.filter((l) => l.id !== linkId) }
          : col
      ),
    })),

  // 🔀 REORDER
  reorderLinks: (newLinks) =>
    set((state) => ({
      collections: state.collections.map((col) =>
        col.id === state.activeCollectionId ? { ...col, links: newLinks } : col
      ),
    })),

  
addLinkToCollection: (collectionId, { title, url }) =>
  set((state) => ({
    collections: state.collections.map((col) =>
      col.id === collectionId
        ? {
            ...col,
            links: [
              ...col.links,
              {
                id: nanoid(),
                title,
                url,
                enabled: true,
              },
            ],
          }
        : col
    ),
  })),
}));
