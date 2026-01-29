import { ImageUploaderForm } from "@/components/ImageUploaderForm";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
        <h1 className="text-3xl font-semibold text-center mb-2 text-black">
          Before / After Image Combiner
        </h1>
        <h3 className="text-1xl text-center font-semibold text-gray-800 mb-2">DevX Assignment - William Gomez (VinuSion)</h3>
        <p className="text-center text-gray-500 mb-8">
          Upload two images to generate a shareable before & after result.
        </p>

        <ImageUploaderForm />
      </div>
    </main>
  );
}
