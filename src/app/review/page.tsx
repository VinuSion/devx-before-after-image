"use client";

import Image from "next/image";
import { useReviewImage } from "@/hooks/useReviewImage";

export default function ReviewPage() {
  const { imageUrl, downloadUrl, placeReviewUrl } = useReviewImage();

  if (!imageUrl || !downloadUrl) {
    return <div className="p-6">Invalid review link</div>;
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="max-w-xl w-full text-center">
        <h1 className="text-2xl font-semibold">Your Before & After</h1>

        <div className="relative w-full h-100 mb-6">
          <Image
            src={imageUrl}
            alt="Generated result"
            fill
            className="object-contain rounded"
            sizes="(max-width: 768px) 100vw, 600px"
          />
        </div>

        <a
          href={downloadUrl}
          className="block bg-blue-600 text-white px-4 py-2 rounded mb-4"
        >
          Download Image
        </a>

        {placeReviewUrl && (
          <a
            href={placeReviewUrl}
            target="_blank"
            className="block border border-gray-300 px-4 py-2 rounded"
          >
            Leave a Google Review
          </a>
        )}
      </div>
    </main>
  );
}
