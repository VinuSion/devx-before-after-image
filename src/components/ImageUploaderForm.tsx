"use client";

import { useForm } from "react-hook-form";
import Image from "next/image";
import { useGenerateImage } from "@/hooks/useGenerateImage";
import { useShareReview } from "@/hooks/useShareReview";
import { ImageUploaderFormValues } from "@/types/form";

export function ImageUploaderForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting} } = useForm<ImageUploaderFormValues>();
  const { generate, loading, resultUrl, error } = useGenerateImage();
  const { shareImage } = useShareReview();

  const imageUploaderSubmit = (data: ImageUploaderFormValues) => {
    const before = data.before?.[0];
    const after = data.after?.[0];
    if (before && after) generate(before, after);
  };

  return (
    <form onSubmit={handleSubmit(imageUploaderSubmit)} className="space-y-4">
      <div>
        <label>Before Image</label>
        <input
          type="file"
          accept="image/png,image/jpeg"
          {...register("before", { required: true })}
        />
        {errors?.before && <p className="text-red-600">Before image is required</p>}
      </div>

      <div>
        <label>After Image</label>
        <input
          type="file"
          accept="image/png,image/jpeg"
          {...register("after", { required: true })}
        />
        {errors?.after && <p className="text-red-600">After image is required</p>}
      </div>

      <button
        type="submit"
        disabled={loading || isSubmitting}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Generating..." : "Generate Image"}
      </button>

      {error && 
        <p className="text-red-600">
          Unknown Error when generating image: {error}
        </p>
      }

      {resultUrl && (
        <div className="mt-6 space-y-3">
          <button
            type="button"
            onClick={() =>
              shareImage({
                imageUrl: resultUrl!,
                title: "Check out this before & after!",
                text: "Here is your result image",
              })
            }
            className="bg-green-600 text-white px-4 py-2 rounded w-full"
          >
            Send Review Request
          </button>

          <div className="relative w-full h-100">
            <Image
              src={resultUrl}
              alt="result"
              fill
              className="object-contain rounded"
              sizes="(max-width: 768px) 100vw, 600px"
            />
          </div>
        </div>
      )}
    </form>
  );
}
