import React from 'react'
import Part from './components/Part'
import Total from './components/Total'

const Content = ({ parts }) => {
    const sum = parts.reduce(
        (previous, part) => previous + part.exercises,
        0)
    return (
        <>
            {parts.map(part => 
                <Part key={part.id} part={part}/>
                )}
            <Total
            sum={sum}
            />
        </>
    )
}

export default Content