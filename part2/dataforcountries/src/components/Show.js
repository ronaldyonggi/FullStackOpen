const Show = ({ countries, newFilter }) => {

    // Filtered countries to show
    const countriesToShow = () => {
        // If the filter box is empty, return nothing
        if (newFilter === '') return <></>
        else {
            // Filter the country
            let filteredCountries = countries.filter(country => {
                let countryNameLowercase = country.name.common.toLowerCase()
                let filterLowercase = newFilter.toLowerCase()
                return countryNameLowercase.includes(filterLowercase)
            })
            // If length of filteredCountries is more than 10, return "too many matches"
            if (filteredCountries.length > 10) return <>Too many matches, specify another filter</>
        }
    }
    return (
        <>{countriesToShow()}</>
    )
}

export default Show