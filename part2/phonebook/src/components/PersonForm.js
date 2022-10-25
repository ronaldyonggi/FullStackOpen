import Name from './components/Name'
import Number from './components/Number'
import Button from './components/Button'

const PersonForm = props => {
    return (
        <form onSubmit={props.addName}>
            <Name value={props.newName} onChange={props.handleNameInputChange} />
            <Number value={props.newNumber} onChange={props.handleNumberInputChange} />
            <Button/>
        </form>
    )
}

export default PersonForm