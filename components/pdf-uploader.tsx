"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes

export default function PdfUploader() {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    
    if (!file) {
      toast.error("Please upload a file");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      toast.error("File is too large. Maximum size is 5MB");
      return;
    }

    if (file && file.type === "application/pdf") {
      setUploading(true);
      try {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            localStorage.setItem("pdfData", e.target.result as string);
            toast.success("PDF uploaded successfully");
            router.push("/learn");
          }
        };
        reader.onerror = () => {
          toast.error("Error reading PDF file");
          setUploading(false);
        };
        reader.readAsDataURL(file);
      } catch (error) {
        toast.error("Error processing PDF file");
        setUploading(false);
      }
    } else {
      toast.error("Please upload a valid PDF file");
    }
  }, [router]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
    maxFiles: 1,
    maxSize: MAX_FILE_SIZE,
    onDropRejected: (fileRejections) => {
      const error = fileRejections[0]?.errors[0];
      if (error?.code === "file-too-large") {
        toast.error("File is too large. Maximum size is 5MB");
      }
    },
  });

  return (
    <div className="max-w-2xl mx-auto">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors
          ${isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25"}
          ${uploading ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        <input {...getInputProps()} disabled={uploading} />
        <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
        <p className="mt-4 text-lg font-medium">
          {isDragActive ? "Drop your PDF here" : "Drag & drop your PDF here"}
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Maximum file size: 5MB
        </p>
        <Button variant="secondary" className="mt-4" disabled={uploading}>
          {uploading ? "Processing..." : "Select PDF"}
        </Button>
      </div>
    </div>
  );
}