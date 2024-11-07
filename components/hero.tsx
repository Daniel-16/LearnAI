"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Hero() {

  const scrollToUpload = () => {
    const element = document.getElementById("upload-section");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative isolate overflow-hidden bg-background">
      <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
        <div className="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8">
          <h1 className="mt-10 text-4xl font-bold tracking-tight sm:text-6xl">
            Transform your learning with AI-powered PDF insights
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Upload your PDF documents and let our AI assistant help you understand complex concepts, 
            explain difficult topics, and enhance your learning experience page by page.
          </p>
          <div className="mt-10 flex items-center gap-x-6">
            <Button size="lg" onClick={scrollToUpload}>
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none xl:ml-32">
          <div className="w-[400px] sm:w-[600px] lg:w-[800px]">
            <svg
              viewBox="0 0 800 600"
              fill="none"
              className="w-full h-auto"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMid meet"
            >
              <circle
                cx="400"
                cy="300"
                r="250"
                className="fill-primary/5"
              />
              <path
                d="M400 50C539.787 50 653 163.213 653 303C653 442.787 539.787 556 400 556C260.213 556 147 442.787 147 303C147 163.213 260.213 50 400 50Z"
                className="stroke-primary"
                strokeWidth="2"
                strokeDasharray="8 8"
              />
              <rect
                x="250"
                y="200"
                width="180"
                height="240"
                rx="8"
                className="fill-background stroke-primary"
                strokeWidth="2"
              />
              <rect
                x="270"
                y="220"
                width="140"
                height="20"
                rx="4"
                className="fill-primary/10"
              />
              <rect
                x="270"
                y="250"
                width="140"
                height="150"
                rx="4"
                className="fill-primary/5"
              />
              <circle
                cx="340"
                cy="420"
                r="12"
                className="fill-primary"
              />
              <path
                d="M450 280C450 268.954 458.954 260 470 260H530C541.046 260 550 268.954 550 280V400C550 411.046 541.046 420 530 420H470C458.954 420 450 411.046 450 400V280Z"
                className="fill-background stroke-primary"
                strokeWidth="2"
              />
              <path
                d="M470 300H530"
                className="stroke-primary/50"
                strokeWidth="2"
              />
              <path
                d="M470 330H530"
                className="stroke-primary/50"
                strokeWidth="2"
              />
              <path
                d="M470 360H530"
                className="stroke-primary/50"
                strokeWidth="2"
              />
              <circle
                cx="500"
                cy="280"
                r="25"
                className="fill-primary/10 stroke-primary"
                strokeWidth="2"
              />
              <path
                d="M490 280L498 288L512 274"
                className="stroke-primary"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M350 150C350 144.477 354.477 140 360 140H440C445.523 140 450 144.477 450 150V190C450 195.523 445.523 200 440 200H360C354.477 200 350 195.523 350 190V150Z"
                className="fill-primary"
              />
              <path
                d="M370 170L430 170"
                className="stroke-primary-foreground"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M370 180L410 180"
                className="stroke-primary-foreground"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle
                cx="600"
                cy="350"
                r="40"
                className="fill-primary/10 stroke-primary"
                strokeWidth="2"
              />
              <path
                d="M585 350L595 360L615 340"
                className="stroke-primary"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}