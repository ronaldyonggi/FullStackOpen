import { useState, useEffect } from 'react'
import axios from 'axios'
import Note from "./components/Note";

const App = (props) => {
  const [notes, setNotes] = useState([]) // The notes resource
  const [newNote, setNewNote] = useState('') // The input box
  const [showAll, setShowAll] = useState(true) // Determines what to show

  useEffect(() => {
    // console.log('effect')

    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        // console.log('promise fulfilled')
        setNotes(response.data)
      })

    // const eventHandler = response => {
    //   console.log('promise fulfilled')
    //   setNotes(response.data)
    // }

    // const promise = axios.get('http://localhost:3001/notes')
    // promise.then(eventHandler)
  }, [])


  // console.log('render', notes.length, 'notes')

  const handleNoteChange = event => {
    // console.log(event.target.value)
    setNewNote(event.target.value)
  }
  
  const addNote = event => {
    event.preventDefault()
    const noteObject = {
      content: newNote, // Grab the content from the input box
      date: new Date().toISOString(),
      important: Math.random() < 0.5, // 50-50 chance of whether this new note is important
      // id: notes.length + 1
    }

    // setNotes(notes.concat(noteObject))
    // setNewNote('')
    axios
      .post('http://localhost:3001/notes', noteObject)
      .then(response => {
        setNotes(notes.concat(response.data)) // Add this note to the resource. 
        setNewNote('') // Reset the input box back to empty
      })
  }

  
  const notesToShow = showAll
  ? notes
  : notes.filter(note => note.important === true)

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note => 
        <Note key={note.id} note={note} />
          )}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default App;
