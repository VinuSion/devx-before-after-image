import { Metadata } from "next";
import { Suspense } from "react";
import { ReviewImage } from "@/components/ReviewImage";

export const metadata: Metadata = {
  title: "Review Your Before / After Image",
  description:
    "Download your combined image and leave a review for the service.",
};

export default function ReviewPage() {
  return (
    <Suspense fallback={<LoadingReview />}>
      <ReviewImage />
    </Suspense>
  );
}

function LoadingReview() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 text-center">
        <h1 className="text-xl font-semibold mb-2 text-black">Loading Review...</h1>
        <p className="text-gray-500">Please wait while we load your review image.</p>
      </div>
    </main>
  );
}