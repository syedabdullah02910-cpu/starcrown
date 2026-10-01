"use client";

import { useState } from "react";
import Image from "next/image";
import { FiX } from "react-icons/fi";

export interface GalleryImage {
  url: string;
  alt: string;
}

interface TourGalleryProps {
  images: GalleryImage[];
}

export default function TourGallery({ images }: TourGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  if (!images.length) return null;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <button
            key={`${image.url}-${index}`}
            type="button"
            className="relative h-60 overflow-hidden rounded-xl cursor-pointer group glass-card border border-gold/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            onClick={() => setSelectedImage(image)}
          >
            <Image
              src={image.url}
              alt={image.alt}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
              <span className="text-white opacity-0 group-hover:opacity-100 text-lg font-bold tracking-wide">
                View
              </span>
            </div>
          </button>
        ))}
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center backdrop-blur-sm p-4"
          role="dialog"
          aria-modal
          onClick={() => setSelectedImage(null)}
          onKeyDown={(e) => e.key === "Escape" && setSelectedImage(null)}
        >
          <button
            type="button"
            className="absolute top-6 right-6 text-white/80 hover:text-gold transition-colors z-10"
            onClick={() => setSelectedImage(null)}
            aria-label="Close gallery"
          >
            <FiX className="text-3xl" />
          </button>
          <div className="relative w-full max-w-4xl h-[70vh]" onClick={(e) => e.stopPropagation()}>
            <Image
              src={selectedImage.url}
              alt={selectedImage.alt}
              fill
              className="object-contain rounded-lg"
              sizes="100vw"
              priority
            />
          </div>
        </div>
      )}
    </>
  );
}
