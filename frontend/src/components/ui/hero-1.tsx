"use client";

import * as React from "react";
import { Paperclip, Sparkles, Hexagon } from "lucide-react";

const Hero1 = () => {
  return (
    <section className="relative z-10 py-20 flex flex-col items-center">
      {/* Main Content */}
      <div className="max-w-4xl mx-auto space-y-12 px-4 text-center">
        <div className="flex justify-center">
          <div className="bg-[#00ffa31a] rounded-full px-6 py-2 flex items-center gap-3 w-fit shadow-lg border border-[#00ffa333] backdrop-blur-md transition-all hover:scale-105">
            <span className="text-xs flex items-center gap-2 text-[#00ffa3] font-bold tracking-widest uppercase">
              <Sparkles size={14} />
              AI-Powered Intelligence
            </span>
          </div>
        </div>
        
        {/* Headline */}
        <h1 className="text-6xl md:text-7xl font-extrabold leading-tight tracking-tighter">
          Curated Intelligence <br />
          <span className="bg-gradient-to-r from-[#00ffa3] to-[#7000ff] bg-clip-text text-transparent">
            Effortlessly Delivered
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
          Experience the most advanced news aggregator with elite curation and secure user-specific intelligence streams.
        </p>

        {/* Search bar */}
        <div className="relative max-w-2xl mx-auto w-full group">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#00ffa3] to-[#7000ff] rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative bg-[#1c1528] rounded-full p-2 flex items-center border border-white/5">
            <div className="flex gap-1 pl-2">
              <button className="p-2 rounded-full hover:bg-white/5 transition-all text-zinc-400 hover:text-white">
                <Paperclip className="w-5 h-5" />
              </button>
              <button className="p-2 rounded-full hover:bg-white/5 transition-all text-[#00ffa3]">
                <Sparkles className="w-5 h-5" />
              </button>
            </div>
            <input
              type="text"
              placeholder="Search intelligence streams..."
              className="bg-transparent flex-1 outline-none text-white pl-4 placeholder:text-zinc-600"
            />
          </div>
        </div>

        {/* Suggestion pills */}
        <div className="flex flex-wrap justify-center gap-3 mt-12 max-w-3xl mx-auto">
          {["Neural Networks", "LLM Architectures", "Agentic Workflows", "Vector Databases"].map((tag) => (
            <button key={tag} className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-full px-5 py-2 text-sm text-zinc-300 transition-all hover:border-[#00ffa333]">
              {tag}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Hero1 };
