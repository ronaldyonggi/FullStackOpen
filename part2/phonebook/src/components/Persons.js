

const Persons = ({persons, newFilter}) => {
    // Filtered person to show
    const filteredPersons = () => {
        // If the filter input is empty, then by default show all
        if (newFilter === '') return persons
        return persons.filter(person => {
        let personLowercase = person.name.toLowerCase()
        let filterLowercase = newFilter.toLowerCase()
        return personLowercase.includes(filterLowercase)
        })
    }
    return filteredPersons().map(person => <div key={person.name}>{person.name} {person.number}</div>)
}

export default Persons