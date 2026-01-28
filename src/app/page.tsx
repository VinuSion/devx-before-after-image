import { ImageUploaderForm } from "@/components/ImageUploaderForm";

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-xl w-full">
        <h1 className="text-2xl font-semibold mb-6">Before / After Image Combiner</h1>
        <ImageUploaderForm />
      </div>
    </main>
  );
}
