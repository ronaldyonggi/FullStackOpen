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
      /*
      let country = response.data[2]
      console.log(country)
      // Common name
      console.log("Common name is",country.name.common)
      // Capital
      console.log("Capital is",country.capital[0])
      // Area
      console.log("Area is",country.area)
      // Languages
      for (let language of Object.values(country.languages)) {
        console.log(language)
      }
      // Country flag
      console.log(country.flag)
      */
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
