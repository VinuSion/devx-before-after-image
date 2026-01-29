"use client";

import Image from "next/image";
import { useReviewImage } from "@/hooks/useReviewImage";

export default function ReviewPage() {
  const { imageUrl, downloadUrl } = useReviewImage();

  if (!imageUrl || !downloadUrl) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 text-center">
          <h1 className="text-xl font-semibold mb-2 text-black">Invalid Review Link</h1>
          <p className="text-gray-500">
            The review link appears to be incorrect or expired.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-8 border border-gray-100 text-center">
        <h1 className="text-3xl font-semibold mb-2 text-black">
          Your Before & After Result
        </h1>
        <p className="text-gray-500 mb-8">
          You can download the image and leave a review for the service.
        </p>

        <div className="relative w-full h-100 mb-8 border rounded-xl overflow-hidden bg-gray-100">
          <Image
            src={imageUrl}
            alt="Generated result"
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 700px"
          />
        </div>

        <div className="space-y-4">
          <a
            href={downloadUrl}
            className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition"
          >
            Download Image
          </a>
        </div>
      </div>
    </main>
  );
}
