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
                 ...state.collections,
          {
            id: newId,
            name: `Collection ${newId}`,
            links: [],
          },
   
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


reorderLinks: (collectionId, newLinks) =>
  set((state) => ({
    collections: state.collections.map((col) =>
      col.id === collectionId
        ? { ...col, links: newLinks }
        : col,
    ),
  })),
updateLink: (collectionId, updatedLink) =>
  set((state) => ({
    collections: state.collections.map((col) =>
      col.id === collectionId
        ? {
            ...col,
            links: col.links.map((l) =>
              l.id === updatedLink.id ? updatedLink : l
            ),
          }
        : col,
    ),
  })),
deleteLink: (collectionId, linkId) =>
  set((state) => ({
    collections: state.collections.map((col) =>
      col.id === collectionId
        ? { ...col, links: col.links.filter((l) => l.id !== linkId) }
        : col,
    ),
  })),

  duplicateLink: (collectionId, link) =>
  set((state) => ({
    collections: state.collections.map((col) =>
      col.id === collectionId
        ? {
            ...col,
            links: [
              ...col.links,
              { ...link, id: Date.now() },
            ],
          }
        : col,
    ),
  })),
addLinkToCollection: (collectionId, { title, url }) =>
  set((state) => ({
    collections: state.collections.map((col) => {
      if (col.id !== collectionId) return col

      const nextId = getNextLinkId(col.links)

      return {
        ...col,
        links: [
          ...col.links,
          {
            id: String(nextId),
            title,
            url,
            enabled: true,
          },
        ],
      }
    }),
  })),


    
}))

