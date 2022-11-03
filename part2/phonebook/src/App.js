import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  })

  // Adding a new Name
  const addName = event => {
    event.preventDefault()
    let isExist = false; // flag that indicates whether the name is already present
    persons.forEach(person => {
      if (newName === person.name) isExist = true
    })
    if (isExist) {
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat({name: newName, number: newNumber}))
      setNewName('')
      setNewNumber('')
    }
  }


  // Handle name input box change
  const handleNameInputChange = event => setNewName(event.target.value)
  // Handle number input box change
  const handleNumberInputChange = event => setNewNumber(event.target.value)
  // Handle filter input box change
  const handleFilterChange = event => {
    setNewFilter(event.target.value)
  }
  
  // Filtered person to show
  // const filteredPersons = () => {
  //   // If the filter input is empty, then by default show all
  //   if (newFilter === '') return persons
  //   return persons.filter(person => {
  //     let personLowercase = person.name.toLowerCase()
  //     let filterLowercase = newFilter.toLowerCase()
  //     return personLowercase.includes(filterLowercase)
  //   })
  // }


  return (
    <div>
      <h2>Phonebook</h2>
      {/* <div>
        filter shown with <input value={newFilter} onChange={handleFilterChange}/>
      </div> */}
      <Filter value={newFilter} onChange={handleFilterChange} />
      <h2>add a new</h2>
      {/* <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameInputChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberInputChange} />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form> */}
      <PersonForm addName={addName} newName={newName} 
      handleNameInputChange={handleNameInputChange}
      newNumber={newNumber}
      handleNumberInputChange={handleNumberInputChange}
      />
      <h2>Numbers</h2>
      {/* {filteredPersons().map(person => <div key={person.name}>{person.name} {person.number}</div>)} */}
      <Persons persons={persons} newFilter={newFilter} />
    </div>
  )
}

export default App;