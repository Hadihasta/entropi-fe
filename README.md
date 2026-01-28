how to run in local ===>
git clone https://github.com/Hadihasta/entropi-fe.git
cd nama-project

npm install

npm run dev

how it works ====>

Store dibuat menggunakan Zustand \ global state

Komponen membaca state:

const collections = useLinksStore(s => s.collections)

Komponen mengubah state lewat action:

const addLink = useLinksStore(s => s.addLinkToCollection)

Saat state berubah → semua komponen yang memakai data tersebut otomatis re-render.
