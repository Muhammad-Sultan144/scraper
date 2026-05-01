"use client";

import * as React from "react";
import { Paperclip, Sparkles, Hexagon } from "lucide-react";

const Hero1 = () => {
  return (
    <div className="min-h-screen bg-[#0c0414] text-white flex flex-col relative overflow-x-hidden">
      {/* Gradient */}
      <div className="flex gap-[10rem] rotate-[-20deg] absolute top-[-40rem] right-[-30rem] z-[0] blur-[4rem] skew-[-40deg]  opacity-50">
        <div className="w-[10rem] h-[20rem]  bg-linear-90 from-white to-blue-300"></div>
        <div className="w-[10rem] h-[20rem]  bg-linear-90 from-white to-blue-300"></div>
        <div className="w-[10rem] h-[20rem]  bg-linear-90 from-white to-blue-300"></div>
      </div>
      <div className="flex gap-[10rem] rotate-[-20deg] absolute top-[-50rem] right-[-50rem] z-[0] blur-[4rem] skew-[-40deg]  opacity-50">
        <div className="w-[10rem] h-[20rem]  bg-linear-90 from-white to-blue-300"></div>
        <div className="w-[10rem] h-[20rem]  bg-linear-90 from-white to-blue-300"></div>
        <div className="w-[10rem] h-[20rem]  bg-linear-90 from-white to-blue-300"></div>
      </div>
      <div className="flex gap-[10rem] rotate-[-20deg] absolute top-[-60rem] right-[-60rem] z-[0] blur-[4rem] skew-[-40deg]  opacity-50">
        <div className="w-[10rem] h-[30rem]  bg-linear-90 from-white to-blue-300"></div>
        <div className="w-[10rem] h-[30rem]  bg-linear-90 from-white to-blue-300"></div>
        <div className="w-[10rem] h-[30rem]  bg-linear-90 from-white to-blue-300"></div>
      </div>
      {/* Header */}
      <header className="flex justify-between items-center p-8 relative z-10 w-full max-w-7xl mx-auto">
        <div className="flex items-center gap-4 bg-[#006A4E] px-6 py-3 rounded-full shadow-lg border border-emerald-700/50 transition-all hover:scale-105">
          <Hexagon className="w-6 h-6 text-emerald-300" />
          <div className="font-bold text-lg text-emerald-50 tracking-wide">HextaAI</div>
        </div>
        <button className="bg-gradient-to-br from-[#006A4E] to-[#009879] text-emerald-50 hover:opacity-90 border border-[#009879]/50 rounded-full px-8 py-3 text-sm cursor-pointer font-bold shadow-lg transition-all hover:scale-105">
          Get Started
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 text-center relative z-10 mt-8">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="flex-1 flex justify-center">
            <div className="bg-[#006A4E] rounded-full px-6 py-3 flex items-center gap-3 w-fit shadow-lg border border-emerald-700/50 transition-all hover:scale-105">
              <span className="text-sm flex items-center gap-2 text-emerald-50 font-medium">
                <span className="bg-[#062c1a] p-1.5 rounded-full shadow-inner">✨</span>
                Introduction to Magic Components
              </span>
            </div>
          </div>
          {/* Headline */}
          <h1 className="text-5xl font-bold leading-tight">
            Build Stunning websites effortlessly
          </h1>

          {/* Subtitle */}
          <p className="text-md">
            HextaAI can create amazing websites with few lines of prompt.
          </p>

          {/* Search bar */}
          <div className="relative max-w-2xl mx-auto w-full">
            <div className="bg-[#1c1528] rounded-full p-3 flex items-center">
              <button className="p-2 rounded-full hover:bg-[#2a1f3d] transition-all">
                <Paperclip className="w-5 h-5 text-gray-400" />
              </button>
              <button className="p-2 rounded-full hover:bg-[#2a1f3d] transition-all">
                <Sparkles className="w-5 h-5 text-purple-400" />
              </button>
              <input
                type="text"
                placeholder="How HextaAI can help you today?"
                className="bg-transparent flex-1 outline-none text-gray-300 pl-4"
              />
            </div>
          </div>

          {/* Suggestion pills */}
          <div className="flex flex-wrap justify-center gap-2 mt-12 max-w-2xl mx-auto">
            <button className="bg-[#1c1528] hover:bg-[#2a1f3d] rounded-full px-4 py-2 text-sm">
              Launch a blog with Astro
            </button>
            <button className="bg-[#1c1528] hover:bg-[#2a1f3d] rounded-full px-4 py-2 text-sm">
              Develop an app using NativeScript
            </button>
            <button className="bg-[#1c1528] hover:bg-[#2a1f3d] rounded-full px-4 py-2 text-sm">
              Build documentation with Vitepress
            </button>
            <button className="bg-[#1c1528] hover:bg-[#2a1f3d] rounded-full px-4 py-2 text-sm">
              Generate UI with shadcn
            </button>
            <button className="bg-[#1c1528] hover:bg-[#2a1f3d] rounded-full px-4 py-2 text-sm">
              Generate UI with HextaUI
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export { Hero1 };
