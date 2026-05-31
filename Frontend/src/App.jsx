import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { Navbar } from './components/navbar/navbar'
import { Footer } from './components/footer/footer'
import { Hero } from './components/heroSection/heroSec'
import { Features } from './components/features/features'
import { Reviews } from './components/reviewSection/reviews'
import { HowItWork } from './components/howItWork/howItWork'
import { WhyChooseUs } from './components/whychooseus/whychooseus'
import { CTASec } from './components/CTASection/CTASec'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <Hero />
        <HowItWork />
        <Features />
        <WhyChooseUs/>
        <Reviews />
        <CTASec/>
      </main>
      <Footer />
    </>
  )
}

export default App
