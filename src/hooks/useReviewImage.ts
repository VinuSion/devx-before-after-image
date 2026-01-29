import { useSearchParams } from "next/navigation";
import { isValidCloudinaryUrl} from "@/lib/utils";

export function useReviewImage() {
  const params = useSearchParams();
  const rawUrl = params.get("url");

  if (!rawUrl) {
    return { imageUrl: null, downloadUrl: null, placeReviewUrl: null };
  }

  const decodedUrl = decodeURIComponent(rawUrl);

  if (!isValidCloudinaryUrl(decodedUrl)) {
    return { imageUrl: null, downloadUrl: null, placeReviewUrl: null };
  }

  const fileName = "before-after-review";

  const downloadUrl = decodedUrl.replace(
    "/upload/",
    `/upload/fl_attachment:${fileName}/`
  );

  const placeId = process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID;
  const placeReviewUrl = placeId
    ? `https://search.google.com/local/writereview?placeid=${placeId}`
    : null;

  return {
    imageUrl: decodedUrl,
    downloadUrl,
    placeReviewUrl,
  };
}