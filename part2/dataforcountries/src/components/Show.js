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
            // If there's only one matching country, display details
            else if (filteredCountries.length === 1) {
                let country = filteredCountries[0]
                let countryName = country.name.common
                let countryCapital = country.capital[0]
                let countryArea = country.area
                let countryFlag = country.flag

                return (
                    <div>
                        <h1>{countryName}</h1>
                        <div>Capital: {countryCapital}</div>
                        <div>Area: {countryArea}</div>
                        <h4>Languages:</h4>
                        {Object.values(country.languages).map(language => 
                            <div key={language}>
                                {language}
                            </div>)}
                        <div>{countryFlag}</div>
                    </div>
                )
            }
            // Otherwise filtered countries are between 2 to 10. Simply list the countries
            else {
                let countryNames = []
                for (let country of filteredCountries) {
                    countryNames.push(country.name.common)
                }
                return countryNames.map(country => <li>{country}</li>)
            }
        }
    }
    return (
        <>{countriesToShow()}</>
    )
}

export default Show