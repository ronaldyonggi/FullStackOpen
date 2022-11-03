import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'

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
      */
     setCountries(response.data)
      
    })
  })

  // Handle filter box change
  const handleFilterChange = event => setNewFilter(event.target.value)

  // Filtered countries to show
  const countriesToShow = () => {
    // If the filter box is full, return nothing
    if (newFilter === '') return []
    // Otherwise filter country based on the filter input
    return countries.filter(country => {
      let countryLowerCased = country.name.common.toLowerCase()
      let filterLowerCased = newFilter.toLowerCase()
      return countryLowerCased.includes(filterLowerCased)
    })
  }

  return (
    <>
      <Filter value={newFilter} onChange={handleFilterChange} />
    </>
  )
}

export default App;
