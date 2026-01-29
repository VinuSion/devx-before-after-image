import { FileInputProps } from "@/types/form";

export function FileInput({ label, error, register, file }: FileInputProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>

      <label
        className={`flex flex-col items-center justify-center w-full border-2 border-dashed rounded-lg p-6 cursor-pointer transition
        ${file ? "border-green-500 bg-green-50" : "border-gray-300 hover:border-blue-500"}`}
      >
        {file ? (
          <>
            <span className="text-green-700 font-medium">Image selected:</span>
            <span className="text-sm text-gray-600 mt-1">{file.name}</span>
          </>
        ) : (
          <span className="text-gray-500">Click to upload image</span>
        )}

        <input
          type="file"
          accept="image/png,image/jpeg"
          className="hidden"
          {...register}
        />
      </label>

      {error && <p className="p-1 text-sm text-red-600 bg-red-200 rounded-lg">{error}</p>}
    </div>
  );
}
