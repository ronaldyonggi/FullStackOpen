const Filter = ({ newFilter, setNewFilter}) => {
    // Handle filter box change
    const handleFilterChange = event => setNewFilter(event.target.value)

    return (
        <div>
            find countries <input value={newFilter} onChange={handleFilterChange}/>
        </div>
    )
}

export default Filter