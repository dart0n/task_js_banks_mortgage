import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import axios from 'axios'
import { BANKS_API_URL } from '../config'
import Header from './Header'
import Banks from './Banks/Banks'
import MortgageCalculator from './MortgageCalculator'

function App() {
  const [banks, setBanks] = useState(null)

  useEffect(() => {
    async function fetchData() {
      const result = await axios(BANKS_API_URL)
      setBanks(result.data.data)
    }

    if (!banks) fetchData()
  }, [banks])

  const createBank = async (fields) => {
    await axios.post(BANKS_API_URL, fields)
  }

  const editBank = async (id, fields) => {
    const response = await axios.put(`${BANKS_API_URL}/${id}`, fields)
    const updatedBank = response.data.data

    const foundIndex = banks.findIndex((b) => b.id === id)
    let updatedBanks = [...banks]
    updatedBanks[foundIndex] = { ...updatedBank }
    setBanks(updatedBanks)
  }

  const deleteBank = async (bank) => {
    await axios.delete(`${BANKS_API_URL}/${bank._id}`)

    const foundIndex = banks.findIndex((b) => b._id === bank._id)
    let updatedBanks = [...banks]
    updatedBanks.splice(foundIndex, 1)
    setBanks(updatedBanks)
  }

  return (
    <Router>
      <div className="container">
        <Header />

        <Switch>
          <Route path="/" exact>
            <Banks banks={banks} createBank={createBank} editBank={editBank} deleteBank={deleteBank} />
          </Route>
          <Route path="/calculator">
            <MortgageCalculator banks={banks} />
          </Route>
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  )
}

export default App
