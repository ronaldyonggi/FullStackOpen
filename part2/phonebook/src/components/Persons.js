const Persons = ({person, deleteName}) => {
    return (
        <div key={person.id}>
            {person.name} {person.number}
            <button onClick={deleteName(person.id)}>delete</button>
        </div>
    )
}

export default Persons