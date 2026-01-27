import Sidebar from "@/components/global/Sidebar";
import CollectionCard from "@/components/global/CollectionCard";
import LinksSortableList from "@/components/global/LinksSortAbleList";

export default function Home() {
  return (
    <div className="flex min-h-screen bg-linear-to-br from-primary to-secondary text-foreground">
      <Sidebar />
      <main className="flex-1 p-8 space-y-6 md:ml-0 pt-20 md:pt-8">
        <CollectionCard title="My Links">
          <LinksSortableList />
        </CollectionCard>
      </main>
    </div>
  );
}