import { create } from 'zustand'
// import { nanoid } from "nanoid";

const getNextCollectionId = (collections) => {
  if (collections.length === 0) return 1
  return Math.max(...collections.map((c) => Number(c.id))) + 1
}

const getNextLinkId = (links) => {
  if (links.length === 0) return 1
  return Math.max(...links.map((l) => Number(l.id))) + 1
}

export const useLinksStore = create((set) => ({
  collections: [
    {
      id: 1,
      name: 'Collection 1',
      links: [
        { id: '1', title: 'Website', url: 'https://example.com', enabled: true },
        { id: '2', title: 'Instagram', url: 'https://instagram.com', enabled: true },
      ],
    },
  ],

  activeCollectionId: 1,
  isAddingCollection: false, 

  // 🔹 SET COLLECTION ACTIVE
  setActiveCollection: (id) => set({ activeCollectionId: id }),

  // ➕ ADD COLLECTION (dipanggil tombol kamu)
  addCollection: async () => {
    set({ isAddingCollection: true })

    await new Promise((r) => setTimeout(r, 700))

    set((state) => {
      const newId = getNextCollectionId(state.collections)

      return {
        collections: [
          {
            id: newId,
            name: `Collection ${newId}`,
            links: [],
          },
          ...state.collections,
        ],
        isAddingCollection: false,
      }
    })
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
                  title: 'New Link',
                  url: 'https://',
                  enabled: true,
                },
              ],
            }
          : col,
      ),
    })),

  // ✏️ UPDATE LINK
  updateLink: (updatedLink) =>
    set((state) => ({
      collections: state.collections.map((col) =>
        col.id === state.activeCollectionId
          ? {
              ...col,
              links: col.links.map((l) => (l.id === updatedLink.id ? updatedLink : l)),
            }
          : col,
      ),
    })),

  // 🗑 DELETE LINK
  deleteLink: (linkId) =>
    set((state) => ({
      collections: state.collections.map((col) =>
        col.id === state.activeCollectionId ? { ...col, links: col.links.filter((l) => l.id !== linkId) } : col,
      ),
    })),

  // 🔀 REORDER
  reorderLinks: (newLinks) =>
    set((state) => ({
      collections: state.collections.map((col) =>
        col.id === state.activeCollectionId ? { ...col, links: newLinks } : col,
      ),
    })),

    


  addLinkToCollectionByIndex: (collectionIndex, { title, url }) =>
    set((state) => {
      const updated = [...state.collections]
      console.log(updated)
      const targetCollection = updated[collectionIndex]
        if (!targetCollection) return state
         const nextId = getNextLinkId(targetCollection.links)
      if (!updated[collectionIndex]) return state

      updated[collectionIndex] = {
        ...updated[collectionIndex],
        links: [
          ...updated[collectionIndex].links,
          {
            id: nextId,
            title,
            url,
            enabled: true,
          },
        ],
      }

      return { collections: updated }
    }),


    
}))


useLinksStore.subscribe((state, prevState) => {
  state.collections.forEach((col, i) => {
    const prevCol = prevState.collections[i]

    // Collection baru
    if (!prevCol) {
      console.log("🆕 Collection ditambah:", col)
      return
    }

    // Link baru
    if (col.links.length > prevCol.links.length) {
      const newLink = col.links[col.links.length - 1]
      console.log(`🔗 Link baru di Collection ${col.id}:`, newLink)
    }
  })
})