import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'

import Navbar from './assets/components/navbar'
import About from './assets/pages/aboutme'
import Proyects from './assets/pages/proyects'
import Skills from './assets/pages/skills'
import Footer from './assets/components/footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className='flex flex-col min-h-screen'>
      <div>
        <Navbar/>
      </div>
      <Routes>
<Route path='' element={<About/>}/>
<Route path='/proyects' element={<Proyects/>}/>
<Route path='/skill' element={<Skills/>}/>
      </Routes>
<Footer/>
    </div>
    </>
  )
}

export default App
