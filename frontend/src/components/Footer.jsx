import React from 'react'
import HrtLn from './HrtLn'
import { footerItems } from '../constants'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <>
      <HrtLn/>
      <div className='flex flex-col justify-center items-center bg-zinc-950'>
        <div className='container text-white flex flex-col max-md:px-2 items-center py-[30px] gap-3'>
          <div className='flex w-full justify-around items-center'>
            <div className='flex'>
              <img src="/logo.png" width={150}/>
            </div>
            <div className='flex gap-2'>
              {footerItems.map((item) => (
                <Link map={item.link} to={item.link} key={item.title}>
                  <span className='text-sm font-[450] hover:text-fuchsia-700 hover:underline'>
                    {item.title}
                  </span>
                </Link>
              ))}
            </div>
          </div>
          <div className='w-full'>
            <hr className='border-none h-[1px] bg-zinc-500 mb-2'/>
            <span className='text-sm font-[450]'>&copy; {new Date().getFullYear()} EduHub. All Rights Reserved.</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default Footer