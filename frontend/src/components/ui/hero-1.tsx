import * as React from "react";
import { Sparkles, Coffee, Flame, Droplet, Search } from "lucide-react";

// @ts-ignore - TypeScript requires a declaration file for image imports
import espressoMug from "../../../../../skills master/brand-identity/visual-inspiration.png";

const Hero1 = () => {
  return (
    <section className="relative z-10 py-16 px-6 border-b border-[#252525] bg-[#0D0D0D] overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/3 w-[500px] h-[500px] rounded-full bg-[#BFF549]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Copy & Form */}
        <div className="lg:col-span-7 space-y-8 text-left">
          <div className="flex">
            <div className="bg-[#BFF549]/10 px-4 py-1.5 flex items-center gap-2 border border-[#BFF549]/30 rounded-[0px] backdrop-blur-md">
              <span className="text-[10px] flex items-center gap-1.5 text-[#BFF549] font-bold tracking-widest uppercase font-mono">
                <Sparkles size={12} />
                Elite Specialty Coffee Extraction
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight font-sans">
              Brewing Intelligence <br />
              <span className="text-[#BFF549]">
                Curated for Excellence
              </span>
            </h1>
            <p className="text-sm md:text-base text-[#B6B6B6] max-w-xl font-mono leading-relaxed">
              Analyze extraction yields, monitor dynamic pressure profiling, and coordinate your roasting schedules with Glaido's serverless intelligence stream.
            </p>
          </div>

          {/* Quick Search Panel */}
          <div className="bg-[#161616] border border-[#252525] p-2 flex items-center rounded-[0px] max-w-xl">
            <Search size={18} className="text-[#B6B6B6] ml-3" />
            <input
              type="text"
              placeholder="Query temperature, water parameters, extraction yields..."
              className="bg-transparent flex-1 outline-none text-white text-xs pl-3 py-2 font-mono placeholder-[#555555]"
            />
            <button className="bg-[#BFF549] text-black font-bold text-xs px-5 py-2.5 rounded-[2px] hover:bg-[#A6D83F] transition-all font-mono">
              Search Parameters
            </button>
          </div>

          {/* Precision Badges */}
          <div className="pt-4 flex flex-wrap gap-4 text-xs font-mono text-[#B6B6B6]">
            <div className="flex items-center gap-2 bg-[#121212] border border-[#252525] px-3 py-2">
              <Coffee size={14} className="text-[#BFF549]" />
              <span>Pressure Profiling</span>
            </div>
            <div className="flex items-center gap-2 bg-[#121212] border border-[#252525] px-3 py-2">
              <Flame size={14} className="text-[#BFF549]" />
              <span>Roasting Rate of Rise</span>
            </div>
            <div className="flex items-center gap-2 bg-[#121212] border border-[#252525] px-3 py-2">
              <Droplet size={14} className="text-[#BFF549]" />
              <span>Water Mineral Ratio</span>
            </div>
          </div>
        </div>

        {/* Right Column: Premium Opening Pic */}
        <div className="lg:col-span-5 relative flex justify-center">
          {/* Outer sharp panel with lime accent borders */}
          <div className="relative w-full max-w-[400px] aspect-square bg-[#121212] border border-[#BFF549]/30 p-2 shadow-2xl">
            {/* Corner Accent Decors (Sci-fi/High-performance styling) */}
            <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-[#BFF549]" />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-[#BFF549]" />

            <div className="w-full h-full border border-[#252525] overflow-hidden relative">
              <img
                src={espressoMug}
                alt="Glaido Premium Brewing Espresso"
                className="w-full h-full object-cover grayscale-[30%] hover:grayscale-0 transition-all duration-700"
              />
              {/* Overlay Label */}
              <div className="absolute bottom-4 left-4 right-4 bg-[#0D0D0D]/90 border border-[#252525] p-3 backdrop-blur-sm">
                <span className="text-[10px] text-[#BFF549] font-mono font-bold block tracking-widest uppercase">
                  Extraction Showcase
                </span>
                <span className="text-xs text-white font-sans mt-0.5 block">
                  Classic Dark Ceramic Mug & Swirling Steam
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Hero1 };
