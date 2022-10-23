import React from 'react'
import Header from './components/Header'
import Content from './components/Content'

const Course = ({ courses }) => {
    return (
        <>
            {courses.map(course => {
                return (
                    <div key={course.id}>
                        <Header course={course.name}/>
                        <Content parts={course.parts}/>
                    </div>
                )
            })}
        </>
    )
}

export default Course