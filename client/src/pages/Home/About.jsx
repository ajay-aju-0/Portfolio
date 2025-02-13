import React from "react";
import SectionTitle from "../../components/SectionTitle";
import { useSelector } from "react-redux";

const About = () => {
    const { loading, portfolioData } = useSelector((state) => state.root);
    const { about } = portfolioData;
    const { lottieUrl, description1, description2, skills } = about;

  return (
    <div>
      <SectionTitle title="About Me" />
      <div className="flex w-full items-center sm:flex-col">
        <div className="h-[50vh] w-1/2 sm:w-96">
          <dotlottie-player
            src= {lottieUrl}
            background="transparent"
            speed="1"
            autoplay
          ></dotlottie-player>
        </div>
        <div className="flex flex-col w-1/2 sm:w-full sm:px-2">
          <p className="text-white">
            { description1 || '' }
          </p>
          <p className="text-white">
          { description2 || '' }
          </p>
        </div>
      </div>

      <div className="py-5">
        <h1 className="text-white text-xl">Here are few technologies I've been worked</h1>
        <div className="flex flex-wrap gap-6 mt-5">
            {skills.map((skill, index) => (
                <div className="border border-tertiary py-2 px-4" key={skill}>
                    <h1 className="text-white">{skill}</h1>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default About;
