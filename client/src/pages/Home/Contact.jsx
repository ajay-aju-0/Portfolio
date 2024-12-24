import React from 'react'
import SectionTitle from '../../components/SectionTitle'
import { useSelector } from 'react-redux';

const Contact = () => {
    const { portfolioData } = useSelector((state) => state.root);
    const { contact } = portfolioData; 
  
  return (
    <> 
        <SectionTitle title="Say Hello" />
        <div className="flex sm:flex-col items-center justify-between">
            <div className='flex flex-col gap-1'>
                <p className='text-white text-xl'>{'{'}</p>
                {/* {Object.keys(user).map(key => (
                    <p className='ml-8'>
                        <span className='text-white text-xl'>{key} : </span><span className='text-white'>{user[key]}</span>
                    </p>
                ))} */}
                    <p className='ml-8'>
                        <span className='text-white text-xl'>name : </span><span className='text-white'>{contact[0]['name']}</span>
                    </p>
                    <p className='ml-8'>
                        <span className='text-white text-xl'>email : </span><span className='text-white'>{contact[0]['email']}</span>
                    </p>
                    <p className='ml-8'>
                        <span className='text-white text-xl'>phone : </span><span className='text-white'>{contact[0]['phone'][0]} , {contact[0]['phone'][1]}</span>
                    </p>
                    <p className='ml-8'>
                        <span className='text-white text-xl'>country : </span><span className='text-white'>{contact[0]['country']}</span>
                    </p>
                <p className='text-white text-xl'>{'}'}</p>
            </div>
            <div className='h-[300px]'>
                    <dotlottie-player
                        src="https://lottie.host/fac05b83-e4c3-4884-a466-583f5de4d0d7/v6ezpjpkXD.lottie"
                        background="transparent"
                        speed="1"
                    ></dotlottie-player>
            </div>
        </div>
    </>
  )
}

export default Contact