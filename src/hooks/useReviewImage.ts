import { useSearchParams } from "next/navigation";
import { isValidCloudinaryUrl} from "@/lib/utils";

export function useReviewImage() {
  const params = useSearchParams();
  const rawUrl = params.get("url");

  if (!rawUrl) {
    return { imageUrl: null, downloadUrl: null };
  }

  const decodedUrl = decodeURIComponent(rawUrl);

  if (!isValidCloudinaryUrl(decodedUrl)) {
    return { imageUrl: null, downloadUrl: null };
  }

  const fileName = "before-after-review";

  const downloadUrl = decodedUrl.replace(
    "/upload/",
    `/upload/fl_attachment:${fileName}/`
  );

  return {
    imageUrl: decodedUrl,
    downloadUrl,
  };
}