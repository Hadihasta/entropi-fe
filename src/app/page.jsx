'use client'
import { useState } from "react";

import Sidebar from "@/components/global/Sidebar";
import CollectionCard from "@/components/global/CollectionCard";
import LinksSortableList from "@/components/global/LinksSortAbleList";
import AddButton from "@/components/global/AddButton";
import AddCollectionButton from "@/components/global/AddCollectionButton";

export default function Home() {
    const [modalOpen, setModalOpen] = useState(false);
  return (
    <div className="flex min-h-screen  bg-linear-160 from-primary to-secondary text-foreground">
      <Sidebar />
      <main className="flex-1 p-8 space-y-6 md:ml-0 pt-20 md:pt-8">
            <AddCollectionButton onClick={() => setModalOpen(true)} />
        {/* here colletion button  */}
        <CollectionCard title="My Links">
          <LinksSortableList />
        </CollectionCard>
      </main>
    </div>
  );
}