import React from 'react'

const alertTypes = {
    error: 'bg-red-800', 
}

const AlertCard = ({text,type}) => {
  return (
    <div className={`p-[1px] rounded ${alertTypes[type]}`}>
      <div className='bg-black w-full p-2 rounded bg-opacity-85'>
        <span className='text-white'>{text}</span>
      </div>
    </div>
  )
}

export default AlertCard