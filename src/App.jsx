import React, { useState } from 'react'
import Accordion from './Components/accordion'

const App = () => {
  const [selected, SetSelected]= useState(null)
  return (
    <div>
      <Accordion />
    </div>
  )
}

export default App
