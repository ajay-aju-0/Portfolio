import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { message } from 'antd';

const Intro = () => {
  const { loading, portfolioData } = useSelector((state) => state.root);
  const { intro } = portfolioData;
  const { firstname, lastname, welcomeText, description, caption } = intro;

  const handleDownload = async () => {
    try {
        const response = await axios.get(`/api/portfolio/download`, {
          responseType: 'blob'
        });

        const url = window.URL.createObjectURL(new Blob([response.data],{ type : "application/pdf" }));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', (link.href.split('-').slice(1)).join('.pdf')); // Remove timestamp
        document.body.appendChild(link);
        link.click();
        link.remove();
      } catch (error) {
      console.log(error);
        message.error('Error downloading file');
      }
  };

  return (
    <div className="h-[90vh] bg-primary flex flex-col items-start justify-center gap-7 w-3/4 py-10">
      <h1 className="text-white">{welcomeText || ""}</h1>
      <h1 className="text-9xl sm:text-3xl text-secondary font-semibold">
        {firstname || ""} {lastname || ""}
      </h1>
      <h1 className="text-4xl sm:text-3xl text-white font-semibold">
        {caption || ""}
      </h1>
      <p className="text-white">{description || ""}</p>
      <button
        className="border-2 border-tertiary text-white px-8 py-4 cursor-pointer"
        onClick={handleDownload}
        // disabled={!downloadLink}
      >
        Download Resume
      </button>
    </div>
  );
};

export default Intro;
