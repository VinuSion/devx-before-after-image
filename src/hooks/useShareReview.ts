"use client";

import { ShareOptions } from "@/types/image";

export function useShareReview() {
  const shareImage = async ({ imageUrl, title, text }: ShareOptions) => {
    const reviewUrl = `${window.location.origin}/review?url=${encodeURIComponent(
      imageUrl
    )}`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: title ?? "Before & After Result",
          text: text ?? "Check out this result",
          url: reviewUrl,
        });
      } else {
        await navigator.clipboard.writeText(reviewUrl);
        alert("Review link copied to clipboard");
      }
    } catch (err) {
      console.error("Share failed:", err);
    }
  };

  return { shareImage };
}
