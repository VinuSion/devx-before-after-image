"use client";

import { useSearchParams } from "next/navigation";

type ReviewImageData = {
  imageUrl: string | null;
  downloadUrl: string | null;
  placeReviewUrl: string | null;
};

export function useReviewImage(): ReviewImageData {
  const params = useSearchParams();
  const rawUrl = params.get("url");
  const placeId = process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID ?? null;

  if (!rawUrl) {
    return {
      imageUrl: null,
      downloadUrl: null,
      placeReviewUrl: null,
    };
  }

  const decodedUrl = decodeURIComponent(rawUrl);

  const downloadUrl = decodedUrl.replace(
    "/upload/",
    "/upload/fl_attachment:before-after-review/"
  );

  const placeReviewUrl = placeId
    ? `https://search.google.com/local/writereview?placeid=${placeId}`
    : null;

  return {
    imageUrl: decodedUrl,
    downloadUrl,
    placeReviewUrl,
  };
}
