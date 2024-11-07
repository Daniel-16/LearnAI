import Hero from "@/components/hero";
import PdfUploader from "@/components/pdf-uploader";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <div id="upload-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <PdfUploader />
      </div>
    </main>
  );
}