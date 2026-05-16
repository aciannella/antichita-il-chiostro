"use client";

import { useState } from "react";

export default function ProductGallery({ product }) {
  const [selectedImage, setSelectedImage] = useState(
    product.images[0]
  );

  return (
    <div className="grid gap-4">
      <div className="overflow-hidden rounded-[2rem] bg-stone-200 shadow-2xl">
        <img
          src={selectedImage}
          alt={product.title}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="grid grid-cols-3 gap-3">
        {product.images.map((img) => (
          <button
            key={img}
            onClick={() => setSelectedImage(img)}
            className={`overflow-hidden rounded-2xl border bg-white transition ${
              selectedImage === img
                ? "border-stone-950"
                : "border-stone-200"
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
    </div>
  );
}