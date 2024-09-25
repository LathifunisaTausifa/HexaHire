import React from 'react'
import bgVideo from '../../assets/Hero/Tech.mp4'
import Navbar from './Navbar'
import Body from './Body'

const Hero = () => {
  return (
    <div>
      <div className='h-[700px]  relative'>
        <video
          autoPlay loop muted className='fixed right-0 top-0 w-full h-[700px] object-cover z-[-1]'>
          <source src={bgVideo} type='video/mp4' />
        </video>
        <Navbar />
        <Body />
      </div>
    </div>
  )
}

export default Hero
