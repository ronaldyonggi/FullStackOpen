import Course from './components/Course'


const App = (props) => {
  const { courses} = props
  return <Course courses={courses}/>
}

export default App