import { useState } from 'react'
import './App.css'
import Modal from "react-modal";

import Buscador from './components/Buscador'

function App() {
  const [count, setCount] = useState(0)

  Modal.setAppElement('#root');
  
  return (
    <div>
      <Buscador/>
    </div>
  )
}

export default App
