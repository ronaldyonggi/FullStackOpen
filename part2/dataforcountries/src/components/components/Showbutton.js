const Showbutton = ({ text, country }) => {
    const handler = () => {
        let countryCapital = country.capital[0]
        let countryArea = country.area
        let countryFlag = country.flag
        return (
            <div>
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
    return <button onClick={handler}>{text}</button>
}

export default Showbutton