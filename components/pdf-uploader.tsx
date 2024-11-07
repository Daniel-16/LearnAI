"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function PdfUploader() {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file && file.type === "application/pdf") {
      setUploading(true);
      // Store the PDF in localStorage for demo purposes
      // In a real app, you'd upload to a server
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          localStorage.setItem("pdfData", e.target.result as string);
          router.push("/learn");
        }
      };
      reader.readAsDataURL(file);
    }
  }, [router]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
    maxFiles: 1,
  });

  return (
    <div className="max-w-2xl mx-auto">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors
          ${isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25"}`}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
        <p className="mt-4 text-lg font-medium">
          {isDragActive ? "Drop your PDF here" : "Drag & drop your PDF here"}
        </p>
        <p className="mt-2 text-sm text-muted-foreground">or click to select a file</p>
        <Button variant="secondary" className="mt-4" disabled={uploading}>
          {uploading ? "Processing..." : "Select PDF"}
        </Button>
      </div>
    </div>
  );
}