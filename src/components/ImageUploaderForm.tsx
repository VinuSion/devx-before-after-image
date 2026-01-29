"use client";

import { useForm } from "react-hook-form";
import Image from "next/image";
import { useGenerateImage } from "@/hooks/useGenerateImage";
import { useShareReview } from "@/hooks/useShareReview";
import { ImageUploaderFormValues } from "@/types/form";
import { FileInput } from "./ui/FileInput";
import { ImageSkeleton } from "./ui/ImageSkeleton";

export function ImageUploaderForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ImageUploaderFormValues>();

  const { generate, loading, resultUrl, error } = useGenerateImage();
  const { shareImage } = useShareReview();

  const beforeFile = watch("before")?.[0];
  const afterFile = watch("after")?.[0];

  const imageUploaderSubmit = (data: ImageUploaderFormValues) => {
    const before = data.before?.[0];
    const after = data.after?.[0];
    if (before && after) generate(before, after);
  };

  return (
    <form
      onSubmit={handleSubmit(imageUploaderSubmit)}
      className="space-y-6"
    >
      <FileInput
        label="Before Image"
        register={register("before", { required: true })}
        error={errors.before && "Before image is required"}
        file={beforeFile}
      />

      <FileInput
        label="After Image"
        register={register("after", { required: true })}
        error={errors.after && "After image is required"}
        file={afterFile}
      />

      <button
        type="submit"
        disabled={loading || isSubmitting || resultUrl !== null}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition disabled:opacity-50 cursor-pointer disabled:hover:bg-blue-600 disabled:hover:cursor-not-allowed"
      >
        {loading ? "Generating image..." : "Generate Image"}
      </button>

      {error && (
        <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-700">
          {error}
        </div>
      )}

      {(loading || resultUrl) && (
        <div className="mt-6 space-y-4">
          {loading && <ImageSkeleton />}

          {resultUrl && (
            <>
              <button
                type="button"
                onClick={() =>
                  shareImage({
                    imageUrl: resultUrl,
                    title: "Check out this before & after!",
                    text: "Here is your result image",
                  })
                }
                className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg transition cursor-pointer"
              >
                Send Review Request
              </button>

              <div className="relative w-full h-100 mb-8 border rounded-xl overflow-hidden bg-gray-100">
                <Image
                  src={resultUrl}
                  alt="Generated result"
                  fill
                  className="object-contain rounded-lg border"
                  sizes="(max-width: 768px) 100vw, 700px"
                />
              </div>
            </>
          )}
        </div>
      )}
    </form>
  );
}
