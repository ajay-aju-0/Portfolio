import React, { useState } from "react";
import SectionTitle from "../../components/SectionTitle";
import { useSelector } from "react-redux";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Certificates = () => {
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);

  const { portfolioData } = useSelector((state) => state.root);
  const { certificate } = portfolioData;

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const rowRef = useRef(null);

  function scroll(dir = "right") {
    const el = rowRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.75; // scroll by 75% of visible area
    el.scrollBy({
      left: dir === "right" ? amount : -amount,
      behavior: "smooth",
    });
  }

  return (
    <>
      <SectionTitle title="Certificates" />
      {/* <div className="flex py-10 gap-20 sm:flex-col">
            <div className='flex flex-col gap-10 border-l-2 border-[#135e4c82] w-2/3 sm:flex-row sm:overflow-x-scroll sm:w-full'>
                {certificate.map((certificate, index) => (
                    <div className='p-1 cursor-pointer' onClick={() => {setSelectedItemIndex(index);}} key={index}>
                        <h1 className={`text-xl px-5 if ${selectedItemIndex === index ? 'text-gray-400 border-tertiary border-l-4 -ml-[5px] bg-[#1a7f5a31] py-3': 'text-white'} text-white`}>Certificate {index+1}</h1>
                    </div> 
                ))}
            </div>
            <div className='flex flex-col gap-4'>
                <h1 className="text-secondary text-2xl">{certificate[selectedItemIndex].title}</h1>
                <h1 className="text-gray-300 text-xl">Issued Organisation - {certificate[selectedItemIndex].organisation}</h1>
                <p className="text-white text-xl">{certificate[selectedItemIndex].description}</p>
                <a href={`${certificate[selectedItemIndex].link}`} target='_blank' className="text-blue-600 mx-1 inline-flex gap-1 text-xl">Certificate
                <svg
                    fill="currentColor"
                    viewBox="0 0 16 16"
                    height="1em"
                    width="1em" 
                    >
                    <path
                        fillRule="evenodd"
                        d="M8.636 3.5a.5.5 0 00-.5-.5H1.5A1.5 1.5 0 000 4.5v10A1.5 1.5 0 001.5 16h10a1.5 1.5 0 001.5-1.5V7.864a.5.5 0 00-1 0V14.5a.5.5 0 01-.5.5h-10a.5.5 0 01-.5-.5v-10a.5.5 0 01.5-.5h6.636a.5.5 0 00.5-.5z"
                    />
                    <path
                        fillRule="evenodd"
                        d="M16 .5a.5.5 0 00-.5-.5h-5a.5.5 0 000 1h3.793L6.146 9.146a.5.5 0 10.708.708L15 1.707V5.5a.5.5 0 001 0v-5z"
                    />
                </svg>
                </a>
                
            </div>
        </div> */}

      <section className="w-full py-12 bg-gradient-to-b from-[#07162a] via-[#061a2b] to-[#041221] text-white">
              <div className="max-w-6xl mx-auto px-4">
                <div className="flex items-center justify-between mb-6">
                  {/* <h2 className="text-3xl md:text-4xl font-extrabold">Projects</h2> */}
                  <p className="hidden md:block text-[#9fc0d6]">
                    A few highlights — hover to see details.
                  </p>
                </div>
      
                {/* Desktop Arrows */}
                <div className="relative">
                  <button
                    onClick={() => scroll("left")}
                    aria-label="Scroll left"
                    className="hidden md:flex items-center justify-center absolute -left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-[#0c2431] border border-[#15323f] shadow-md hover:translate-x-[-2px]"
                  >
                    <ChevronLeft size={22} />
                  </button>
      
                  <button
                    onClick={() => scroll("right")}
                    aria-label="Scroll right"
                    className="hidden md:flex items-center justify-center absolute -right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-[#0c2431] border border-[#15323f] shadow-md hover:translate-x-[2px]"
                  >
                    <ChevronRight size={22} />
                  </button>
      
                  {/* Scrollable Row */}
                  <div
                    ref={rowRef}
                    className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory py-4 no-scrollbar"
                  >
                    {certificate.map((c,i) => (
                      <div
                        key={i}
                        className="snap-start min-w-[260px] md:min-w-[320px] bg-[#071827] rounded-2xl border border-[#15303a] overflow-hidden shadow-lg relative group"
                      >
                        {/* Image */}
                        <div className="h-44 md:h-48 w-full overflow-hidden">
                          <img
                            src={`${API_BASE_URL}/${c.thumbnail}`}
                            alt={c.thumbnail}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
      
                        {/* Content */}
                        <div className="p-4">
                          <div className="flex items-center gap-3">
                            <div>
                              <h3 className="text-lg font-semibold">{c.title}</h3>
                              <p className="text-sm text-[#9fc0d6]">{c.short}</p>
                            </div>
                          </div>
                        </div>
      
                        {/* Hover overlay (reveals on hover) */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                          <div className="backdrop-blur-sm rounded-md p-3 bg-black/30">
                            <p className="text-sm text-[#d6eefb]">{c.description}</p>
                            <div className="mt-3 flex gap-3">
                              {/* <a href="#" className="text-xs font-medium px-3 py-1 bg-[#0f2b3a] rounded-md border border-[#15414d]">View</a> */}
                              <a
                                href={`${certificate[selectedItemIndex].link}`}
                                target="_blank"
                                className="text-xs font-medium px-3 py-1 bg-[#0f2b3a] rounded-md border border-[#15414d]"
                              >
                                Link
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
      
                  {/* Mobile overlay arrows (small) */}
                  <div className="md:hidden absolute inset-y-0 left-2 flex items-center">
                    <button
                      onClick={() => scroll("left")}
                      className="p-2 rounded-full bg-black/40 backdrop-blur border border-[#12323b]"
                    >
                      <svg
                        className="w-5 h-5 text-white"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                    </button>
                  </div>
                  <div className="md:hidden absolute inset-y-0 right-2 flex items-center">
                    <button
                      onClick={() => scroll("right")}
                      className="p-2 rounded-full bg-black/40 backdrop-blur border border-[#12323b]"
                    >
                      <svg
                        className="w-5 h-5 text-white"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
      
                {/* Desktop grid fallback (3 columns) */}
                <div className="hidden md:grid md:grid-cols-3 md:gap-6 mt-8">
                  {certificate.map((c,i) => (
                    <div
                      key={i}
                      className="rounded-2xl overflow-hidden border border-[#15303a] bg-[#071827] shadow-md"
                    >
                      <img
                        src={`${API_BASE_URL}/${c.thumbnail}`}
                        alt={c.thumbnail}
                        className="w-full h-44 object-cover"
                      />
                      <div className="p-4">
                        <div className="flex items-center gap-3">
                          <div
                            style={{ background: c.color }}
                            className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                          >
                            <svg
                              className="w-5 h-5 text-white"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 2v20M2 12h20"
                              />
                            </svg>
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold">{c.title}</h3>
                            <p className="text-sm text-[#9fc0d6]">{c.short}</p>
                          </div>
                        </div>
                        
                        <p className="mt-3 text-sm text-[#cfeaf9]">{c.desc}</p>
                        <div className="mt-4 flex gap-3">
                          <a
                            href="#"
                            className="text-xs font-medium px-3 py-1 bg-[#0f2b3a] rounded-md border border-[#15414d]"
                          >
                            View
                          </a>
                          <a
                            href="#"
                            className="text-xs font-medium px-3 py-1 bg-[#0f2b3a] rounded-md border border-[#15414d]"
                          >
                            Repo
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
    </>
  );
};

export default Certificates;
