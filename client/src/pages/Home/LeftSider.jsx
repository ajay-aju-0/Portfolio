import React from 'react'

const LeftSider = () => {
  return (
    <div className='fixed left-0 bottom-0 px-10 sm:static'>
        <div className="flex flex-col items-center">
            <div className="flex flex-col gap-3 sm:flex-row">
                <a href="#">
                    <i className="ri-facebook-circle-line text-gray-400 text-xl"></i>
                </a>
                <a href="mailto:ajaypadmanabhan01@gmail.com">
                    <i className="ri-mail-line text-gray-400 text-xl"></i>
                </a>
                <a href="https://www.instagram.com/____r_a_v_a_n_/" target='_blank'>
                    <i className="ri-instagram-line text-gray-400 text-xl"></i>
                </a>
                <a href="https://www.linkedin.com/in/ajaytm/" target='_blank'>
                    <i className="ri-linkedin-box-line text-gray-400 text-xl"></i>
                </a>
                <a href="https://github.com/ajay-aju-0?tab=repositories" target='_blank'>
                    <i className="ri-github-line text-gray-400 text-xl"></i>
                </a>
            </div>
            <div className='w-[1px] h-32 bg-[#124770] sm:hidden'>
            </div>
        </div>
    </div>
  )
}

export default LeftSider