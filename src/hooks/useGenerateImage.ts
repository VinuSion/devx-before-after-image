import { useState } from "react";
import { GenerateImageResponse, ErrorImageResponse } from "@/types/generate";
import { getErrorMessage } from "@/lib/utils";

export function useGenerateImage() {
  const [loading, setLoading] = useState(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generate = async (before: File, after: File) => {
    try {
      setLoading(true);
      setError(null);
      setResultUrl(null);

      const form = new FormData();
      form.append("before", before);
      form.append("after", after);

      const res = await fetch("/api/generate", {
        method: "POST",
        body: form,
      });

      const data: GenerateImageResponse | ErrorImageResponse = await res.json();

      if (!res.ok) {
        throw new Error((data as ErrorImageResponse).error);
      }

      setResultUrl((data as GenerateImageResponse).url);
    } catch (err: unknown) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return { generate, loading, resultUrl, error };
}
