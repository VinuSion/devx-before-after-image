"use client";

import { useForm } from "react-hook-form";
import Image from "next/image";
import { useGenerateImage } from "@/hooks/useGenerateImage";
import { ImageUploaderFormValues } from "@/types/form";

export function ImageUploaderForm() {
  const { register, handleSubmit } = useForm<ImageUploaderFormValues>();
  const { generate, loading, resultUrl, error } = useGenerateImage();

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
      </div>

      <div>
        <label>After Image</label>
        <input
          type="file"
          accept="image/png,image/jpeg"
          {...register("after", { required: true })}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Generating..." : "Generate"}
      </button>

      {error && 
        <p className="text-red-600">
          Unknown Error when generating image: {error}
        </p>
      }

      {resultUrl && (
        <div className="mt-4">
          <Image src={resultUrl} alt="result" />
          <a href={resultUrl} download className="text-blue-600 block mt-2">
            Download Image
          </a>
        </div>
      )}
    </form>
  );
}
