import React from 'react'
import LastestCollection from '../components/Product/LastestCollection'
import Hero from '../components/Menu/Hero'
import BestSeller from '../components/Product/BestSeller'
import OurPolicy from '../components/Contact/OurPolicy'
import NewsletterBox from '../components/Contact/NewsletterBox'

const Home = () => {
  return (
    <div>
      <Hero />
      <LastestCollection />
      <BestSeller />
      <OurPolicy />
      <NewsletterBox />
    </div>
  )
}

export default Home