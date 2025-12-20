import React from 'react'
import Header from '../../components/Header'
import Intro from './Intro'
import About from './About'
import Experiences from './Experiences'
import Projects from './Projects'
import Certificates from './Certificates'
import Contact from './Contact'
import Footer from '../../components/Footer'
import LeftSider from './LeftSider'
import { useSelector } from 'react-redux'

const Home = () => {
    const { loading, portfolioData } = useSelector((state) => state.root)

  return (
    <>
    <Header />
    {portfolioData && 
        <div className='bg-primary px-40 sm:px-4'>
            <Intro />
            <About />
            <Experiences />
            <Projects />
            <Certificates />
            <Contact />
            <Footer />
            <LeftSider />
        </div> 
    }
    </>
  )
}

export default Home