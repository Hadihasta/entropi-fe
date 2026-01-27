'use client'
import Sidebar from '@/components/global/Sidebar'
import CollectionCard from '@/components/global/CollectionCard'
import LinksSortableList from '@/components/global/LinksSortAbleList'
import AddCollectionButton from '@/components/global/AddCollectionButton'
import { useLinksStore } from '@/store/useLinkStore'
import SkeletonDot from '@/components/global/SkeletonDot'

export default function Home() {
  const collections = useLinksStore((s) => s.collections)
  const addCollection = useLinksStore((s) => s.addCollection)
  const setActiveCollection = useLinksStore((s) => s.setActiveCollection)
  const activeCollectionId = useLinksStore((s) => s.activeCollectionId)
  const isAddingCollection = useLinksStore((s) => s.isAddingCollection)
  return (
    <div className="flex min-h-screen w-full bg-linear-160 from-primary to-secondary text-foreground">
      <Sidebar />
      <main className="flex-1 p-8 space-y-6 md:ml-0 pt-20 md:pt-8 max-w-screen">
        <AddCollectionButton onClick={addCollection} />

        {/* 🔥 LOADING ANIMATION */}
        {isAddingCollection && <SkeletonDot />}

        {collections.map((col, index) => (
          <CollectionCard
            key={col.id}
            title={col.name}
            collectionIndex={index}
            active={col.id === activeCollectionId}
            onClick={() => setActiveCollection(col.id)}
          >
            {col.id === activeCollectionId && <LinksSortableList />}
          </CollectionCard>
        ))}
      </main>
    </div>
  )
}
