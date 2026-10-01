import { GalleryImage } from "@/components/TourGallery";

const unsplash = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const serviceHeroImages: Record<number, string> = {
  1: unsplash("photo-1436491865332-7a61a109cc05", 1600),
  2: unsplash("photo-1591604129939-f1beb4be2757", 1600),
  3: unsplash("photo-1512453979798-5ea266f8880c", 1600),
  4: unsplash("photo-1488085068337-282e9ba384ba", 1600),
};

export const serviceCardImages: Record<string, string> = {
  air_tickets: unsplash("photo-1436491865332-7a61a109cc05", 800),
  umrah: unsplash("photo-1564760055775-d63b17a55c44", 800),
  tourism: unsplash("photo-1518684079-3c830dcef090", 800),
  insurance: unsplash("photo-1454165804606-c3d57bc86b40", 800),
};

export const serviceGalleries: Record<number, GalleryImage[]> = {
  1: [
    { url: unsplash("photo-1436491865332-7a61a109cc05"), alt: "Airplane wing at sunset" },
    { url: unsplash("photo-1540962351504-03077e80460e"), alt: "Modern airport terminal" },
    { url: unsplash("photo-1529078155058-5d716f45d393"), alt: "Commercial aircraft on runway" },
  ],
  2: [
    { url: unsplash("photo-1591604129939-f1beb4be2757"), alt: "Kaaba and pilgrims" },
    { url: unsplash("photo-1564760055775-d63b17a55c44"), alt: "Mosque architecture" },
    { url: unsplash("photo-1580418827493-f2b062c0a8f5"), alt: "Medina skyline" },
  ],
  3: [
    { url: unsplash("photo-1512453979798-5ea266f8880c", 1200), alt: "Dubai skyline" },
    { url: unsplash("photo-1524231757912-21f4fe3a7200", 1200), alt: "Turkey landmarks" },
    { url: unsplash("photo-1518684079-3c830dcef090", 1200), alt: "Scenic travel destination" },
  ],
  4: [
    { url: unsplash("photo-1454165804606-c3d57bc86b40", 1200), alt: "Travel planning and security" },
    { url: unsplash("photo-1488085068337-282e9ba384ba", 1200), alt: "Peaceful journey" },
    { url: unsplash("photo-1501785888041-46974f17f947", 1200), alt: "Protected travel experience" },
  ],
};
