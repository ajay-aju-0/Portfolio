import React, { useState } from 'react'
import SectionTitle from '../../components/SectionTitle'
import { useSelector } from 'react-redux';

const Certificates = () => {
    const [selectedItemIndex, setSelectedItemIndex] = useState(0)
    
    const { portfolioData } = useSelector((state) => state.root);
    const { certificate } = portfolioData; 
      
  return (
    <>
        <SectionTitle title="Certificates" />
        <div className="flex py-10 gap-20 sm:flex-col">
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
        </div>
    </>
  )
}

export default Certificates