import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Show from './components/Show'

const App = () => {
  const [newFilter, setNewFilter] = useState('')
  const [countries, setCountries] = useState([])

  // UseEffect to retrieve json data from the server 
  useEffect(() => {
    axios
    .get('https://restcountries.com/v3.1/all')
    .then(response => {
     setCountries(response.data)
      
    })
  })

  return (
    <>
      <Filter value={newFilter} setNewFilter={setNewFilter} />
      <Show countries={countries} newFilter={newFilter} />
    </>
  )
}

export default App;
