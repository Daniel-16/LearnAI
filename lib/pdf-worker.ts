import { GlobalWorkerOptions } from "pdfjs-dist";

if (typeof window !== "undefined") {
  GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.mjs",
    import.meta.url
  ).toString();
}
