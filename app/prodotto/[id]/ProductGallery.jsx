"use client";

import { useState } from "react";

export default function ProductGallery({ product }) {
  const images = Array.isArray(product.images)
    ? product.images.filter(Boolean)
    : [];
  const [selectedImage, setSelectedImage] = useState(images[0] || null);

  return (
    <div className="grid gap-4">
      <div className="aspect-[4/5] overflow-hidden rounded-lg border border-[#d6c7ad] bg-[#2a1810] shadow-2xl">
        {selectedImage ? (
          <img
            src={selectedImage}
            alt={product.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="grid h-full place-items-center px-6 text-center text-[#d6c7ad]">
            Immagine non disponibile
          </div>
        )}
      </div>

      {images.length > 1 && (
        <div className="grid grid-cols-3 gap-3">
          {images.map((img) => (
            <button
              key={img}
              type="button"
              onClick={() => setSelectedImage(img)}
              className={`overflow-hidden rounded-lg border bg-[#fffaf0] transition ${
                selectedImage === img
                  ? "border-[#8a5527] shadow-md"
                  : "border-[#d6c7ad]"
              }`}
            >
              <img
                src={img}
                alt={product.title}
                className="h-32 w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
