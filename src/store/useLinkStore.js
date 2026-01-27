import { create } from "zustand";

export const useLinksStore = create((set) => ({
  links: [
    { id: "1", title: "Website", url: "https://example.com", enabled: true },
    { id: "2", title: "Instagram", url: "https://instagram.com", enabled: true },
    { id: "3", title: "GitHub", url: "https://github.com", enabled: true },
  ],

  reorderLinks: (newOrder) =>
    set({
      links: newOrder,
    }),
}));
