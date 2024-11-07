"use client";

import { useEffect, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ChevronLeft, ChevronRight, Send } from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Image from "next/image";
import "@/lib/pdf-worker";
import { toast } from "sonner";

export default function Learn() {
  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pdfData, setPdfData] = useState<string | null>(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [pageCanvas, setPageCanvas] = useState<HTMLCanvasElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [pageText, setPageText] = useState<string>("");

  useEffect(() => {
    const data = localStorage.getItem("pdfData");
    if (data) setPdfData(data);
  }, []);

  useEffect(() => {
    if (!pdfData) return;

    const loadPage = async () => {
      setIsLoading(true);
      try {
        const loadingTask = pdfjsLib.getDocument(pdfData);
        const pdf = await loadingTask.promise;
        setNumPages(pdf.numPages);

        const page = await pdf.getPage(currentPage);
        const scale = 1.5;
        const viewport = page.getViewport({ scale });

        const textContent = await page.getTextContent();
        const textItems = textContent.items.map((item: any) => item.str);
        const extractedText = textItems.join(" ");
        setPageText(extractedText);

        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        if (!context) return;

        canvas.height = viewport.height;
        canvas.width = viewport.width;

        await page.render({
          canvasContext: context,
          viewport,
        }).promise;

        setPageCanvas(canvas);
      } catch (error) {
        console.error("Error loading PDF:", error);
        toast.error("Error loading PDF page");
      } finally {
        setIsLoading(false);
      }
    };

    loadPage();
  }, [pdfData, currentPage]);

  const askQuestion = async () => {
    if (!question.trim()) return;

    setLoading(true);
    try {
      const genAI = new GoogleGenerativeAI(
        "AIzaSyCo7ypFcmFxscee_xJl23hiT3ya4T2dsWY"
      );
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      const prompt = `Here is a text passage:

"""
${pageText}
"""

Please answer this question about the passage above: ${question}`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      setAnswer(response.text());
    } catch (error) {
      console.error("Error getting answer:", error);
      setAnswer(
        "Sorry, there was an error processing your question. Please try again."
      );
    }
    setLoading(false);
  };

  if (!pdfData)
    return <div className="p-8">No PDF loaded. Please upload a PDF first.</div>;

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-card rounded-lg p-6 shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <Button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage <= 1}
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            <span>
              Page {currentPage} of {numPages}
            </span>
            <Button
              onClick={() => setCurrentPage((p) => Math.min(numPages, p + 1))}
              disabled={currentPage >= numPages}
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="border rounded-lg overflow-auto max-h-[800px] flex justify-center">
            {isLoading ? (
              <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
              </div>
            ) : pageCanvas ? (
              <Image
                src={pageCanvas.toDataURL()}
                alt={`Page ${currentPage}`}
                width={pageCanvas.width}
                height={pageCanvas.height}
                className="max-w-full"
              />
            ) : null}
          </div>
        </div>

        <div className="bg-card rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Ask about this page</h2>
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ask a question about this page..."
                onKeyDown={(e) => e.key === "Enter" && askQuestion()}
              />
              <Button onClick={askQuestion} disabled={loading}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
            {loading && <p className="text-muted-foreground">Thinking...</p>}
            {answer && (
              <Textarea value={answer} readOnly className="min-h-[200px]" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
