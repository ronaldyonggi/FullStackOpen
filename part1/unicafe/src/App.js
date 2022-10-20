import { useState } from 'react'

const Button = ({handler, text}) => <button onClick={handler}>{text}</button>
const Header = ({text}) => <div><h1>{text}</h1></div>
const StatisticLine = ({text, value, symbol}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value} {symbol}</td>
    </tr>
  )
}

const Stats = props => {
  if (props.all <= 0) {
    return <p>No feedback given</p>
  }
  return (
    <div>
      <table>
        <tbody>
          <StatisticLine text="good" value={props.good}/>
          <StatisticLine text="neutral" value={props.neutral}/>
          <StatisticLine text="bad" value={props.bad}/>
          <StatisticLine text="all" value={props.all}/>
          <StatisticLine text="average" value={props.average.toFixed(1)}/>
          <StatisticLine text="positive" value={props.positive.toFixed(1)} symbol="%"/>
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    setGood(good + 1)
  }
  const handleBad = () => {
    setBad(bad + 1)
  }
  const handleNeutral = () => {
    setNeutral(neutral + 1)
  }

  const all = good + bad + neutral
  const average = (good - bad) / (good + bad + neutral)
  const positive = good * 100 / (good + bad + neutral)
  
  return (
    <div>
      <Header text="give feedback"/>
      <Button text="good" handler={handleGood}/>
      <Button text="neutral" handler={handleNeutral}/>
      <Button text="bad" handler={handleBad}/>
      <Header text="statistics"/>
      <Stats good={good} neutral={neutral} bad={bad} 
      all={all} 
      average={average} 
      positive={positive}/>
    </div>
  )
}

export default App;
