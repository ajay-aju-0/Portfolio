import React, { useState } from "react";
import SectionTitle from "../../components/SectionTitle";
import { useSelector } from "react-redux";

const DescriptionList = ({ description = "" }) => {
  const points = description
    .split("\n")
    .map((p) => p.trim())
    .filter((p) => p.length > 0);

  return (
    <ul className="text-white text-[15px] mt-4 flex flex-col gap-3 leading-6">
      {points.map((point, index) => (
        <li key={index} className="flex gap-3 items-start">
          {/* <span className="text-tertiary mt-[3px]">•</span> */}
          <span>{point}</span>
        </li>
      ))}
    </ul>
  );
};

const Experiences = () => {
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);

  const { portfolioData } = useSelector((state) => state.root);
  const { experience } = portfolioData;

  const reverseExperience = [...experience].reverse();

  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (idx) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  return (
    <>
      {/* <SectionTitle title="Experience" />
        <div className="flex py-10 gap-20 sm:flex-col">
            <div className='flex flex-col gap-10 border-l-2 border-[#135e4c82] w-2/3 sm:flex-row sm:overflow-x-scroll sm:w-full'>
                {reverseExperience?.map((experience, index) => (
                    <div className='p-1 cursor-pointer' onClick={() => {setSelectedItemIndex(index);}} key={index}>
                        <h1 className={`text-xl px-5 if ${selectedItemIndex === index ? 'text-gray-400 border-tertiary border-l-4 -ml-[5px] bg-[#1a7f5a31] py-3': 'text-white'} text-white`}>{experience.period}</h1>
                    </div> 
                ))}
            </div>
            <div className='flex flex-col gap-4'>
                <h1 className="text-secondary text-2xl">{reverseExperience[selectedItemIndex]?.title}</h1>
                <h1 className="text-gray-300 text-xl">{reverseExperience[selectedItemIndex]?.company}</h1>
                <DescriptionList description={reverseExperience[selectedItemIndex]?.description} />
                <h1> 
                <a href={reverseExperience[selectedItemIndex]?.link} target="_blank" className="text-blue-600 inline-flex underline">certificate &nbsp;
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
                </h1>
            </div>
        </div> */}
      {/* <div className="py-10">
      <SectionTitle title="Experience" />

      <div className="flex gap-20 sm:flex-col">
        <div className="flex flex-col gap-10 border-l-2 border-[#135e4c82] w-2/3 sm:flex-row sm:overflow-x-scroll sm:w-full">
          {reverseExperience?.map((experience, index) => (
            <div
              className="p-1 cursor-pointer"
              onClick={() => {
                setSelectedItemIndex(index);
                setExpandedIndex(null); // collapse when switching
              }}
              key={index}
            >
              <h1
                className={`text-xl px-5 ${
                  selectedItemIndex === index
                    ? "text-gray-400 border-tertiary border-l-4 -ml-[5px] bg-[#1a7f5a31] py-3"
                    : "text-white"
                }`}
              >
                {experience.period}
              </h1>
            </div>
          ))}
        </div>

        
        <div className="flex flex-col gap-4">
          <h1 className="text-secondary text-2xl">
            {reverseExperience[selectedItemIndex]?.title}
          </h1>

          <h1 className="text-gray-300 text-xl">
            {reverseExperience[selectedItemIndex]?.company}
          </h1>

          
          {expandedIndex !== selectedItemIndex && (
            <button
              onClick={() => toggleExpand(selectedItemIndex)}
              className="text-blue-400 underline text-sm mt-2 w-fit"
            >
              View Details ↓
            </button>
          )}

       
          {expandedIndex === selectedItemIndex && (
            <div className="mt-2 flex flex-col gap-3">
             
              <ul className="text-white text-sm flex flex-col gap-2">
                {reverseExperience[selectedItemIndex]?.description
                  ?.split(".")
                  .filter((d) => d.trim() !== "")
                  .map((point, i) => (
                    <li key={i} className="list-disc ml-5">
                      {point.trim()}.
                    </li>
                  ))}
              </ul>

            
              {reverseExperience[selectedItemIndex]?.link && (
                <a
                  href={reverseExperience[selectedItemIndex].link}
                  target="_blank"
                  className="text-blue-400 underline text-sm mt-3"
                >
                  View Certificate →
                </a>
              )}

            
              <button
                onClick={() => toggleExpand(selectedItemIndex)}
                className="text-blue-400 underline text-sm mt-4 w-fit"
              >
                Hide Details ↑
              </button>
            </div>
          )}
        </div>
      </div>
    </div> */}

      <SectionTitle title="Experience" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
        {reverseExperience?.map((exp, index) => {
          const isOpen = selectedItemIndex === index;

          return (
            <div
              key={index}
              className="bg-[#0e1a25] border border-[#135e4c82] rounded-xl p-6 shadow-md transition-all duration-300"
            >
              {/* Title + Company */}
              <h2 className="text-secondary text-2xl font-semibold">
                {exp.title}
              </h2>
              <h3 className="text-gray-300 text-lg mt-1">{exp.company}</h3>
              <p className="text-gray-400 text-sm mt-1">{exp.period}</p>

              {/* Expand Button */}
              {!isOpen && (
                <button
                  className="mt-4 text-blue-400 underline text-sm"
                  onClick={() => setSelectedItemIndex(index)}
                >
                  View details ↓
                </button>
              )}

              {/* Detail Section */}
              {isOpen && (
                <div className="mt-4 animate-fadeIn">
                  {/* Render bullet-point description */}
                  <ul className="text-white text-sm flex flex-col gap-2">
                    {exp.description
                      ?.split("•")
                      .filter((d) => d.trim() !== "")
                      .map((point, i) => (
                        <li key={i} className="list-disc ml-5">
                          {point.trim()}
                        </li>
                      ))}
                  </ul>

                  {/* Optional certificate link */}
                  {exp.link && (
                    <a
                      href={exp.link}
                      target="_blank"
                      className="mt-4 inline-block text-blue-400 underline text-sm"
                    >
                      Certificate →
                    </a>
                  )}
                    <br />
                  {/* Hide button at the bottom */}
                  <button
                    className="mt-4 text-blue-400 underline text-sm"
                    onClick={() => setSelectedItemIndex(null)}
                  >
                    Hide Details ↑
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Experiences;
