import Sidebar from "@/components/global/Sidebar";
import LinkCard from "@/components/global/LinkCard";
import CollectionCard from "@/components/global/CollectionCard";
import LinksSortableList from "@/components/global/LinksSortAbleList";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-primary to-secondary text-foreground">
      <Sidebar />

      <main className="flex-1 p-8 space-y-6">
        <CollectionCard title="My Links">
          <LinksSortableList />
        </CollectionCard>
      </main>
    </div>
  );
}
