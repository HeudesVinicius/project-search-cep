import { useState } from 'react'
import './App.css'

import { FiSearch } from 'react-icons/fi'
import api from './services/api'

function App() {
  const [input, setInput] = useState('')
  const [cepData, setCepData] = useState('')

  async function search(){
    
    if(input === ''){
      alert('Type CEP')
      return
    }

    try{
      const response = await api.get(`${input}/json/`)
      setCepData(response.data)
      console.log(cepData)
    }catch{
      alert('ERROR')
    }
  }

  return (
    <>
      <div className="container">
        <h1>Search CEP</h1>

        <div className="containerInput">
          <input
          type="text"
          placeholder="Type your cep..."
          value={input}
          onChange = {(e) => setInput(e.target.value)}
          />
          <button onClick={search}><FiSearch/></button>
        </div>

        {Object.keys(cepData).length !== 0 && (
          <main>
            <h2>CEP: {cepData.cep}</h2>

            <span>{cepData.localidade}</span>
            <span>{cepData.uf}</span>
            <span>{cepData.bairro}</span>
            <span>DDD: {cepData.ddd}</span>
          </main>
        )}
      </div>
    </>
  )
}

export default App
