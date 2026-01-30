import './App.css'
import { BrowserRouter,Routes, Route  } from 'react-router'
import HomePage from './components/HomePage'
import Checkout from './components/Checkout'
import Tracking from './components/Tracking'
import Orders from './components/Orders'

function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/checkout" element={<Checkout />}/>
        <Route path="/tracking" element={<Tracking />}/>
        <Route path="/orders" element={<Orders />}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
