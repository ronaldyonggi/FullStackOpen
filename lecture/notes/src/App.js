import { useState, useEffect } from 'react'
import noteService from './services/notes'
import Note from "./components/Note";
import Notification from './components/Notification'
import Footer from './components/Footer'

const App = (props) => {
  const [notes, setNotes] = useState([]) // The notes resource
  const [newNote, setNewNote] = useState('') // The input box
  const [showAll, setShowAll] = useState(true) // Determines what to show
  const [errorMessage, setErrorMessage] = useState('some error occurred')

  useEffect(() => {

    // axios
    //   .get('http://localhost:3001/notes')
    noteService
      .getAll()
      .then(initialNotes => {
        // console.log('promise fulfilled')
        // setNotes(response.data)
        setNotes(initialNotes)
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
    // axios
    //   .post('http://localhost:3001/notes', noteObject) // add the new object do db.json
    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote)) // Add this note to the resource to be rendered. 
        setNewNote('') // Reset the input box back to empty
      })
  }
  
  const notesToShow = showAll
  ? notes
  : notes.filter(note => note.important === true)

  // Change the importance of a note from important to not important, or vice versa
  const toggleImportanceOf = id => {
    // const url = `http://localhost:3001/notes/${id}` 
    const note = notes.find(note => note.id === id ) 
    // changedNote is a copy of the old note but with the importance switched
    const changedNote = { ...note, important: !note.important}

    // axios
    //   .put(url, changedNote)
    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(
          // The mapping result will be an array where other than the changed note,
          // all the other notes are the same as the old one (unchanged)
          note => note.id !== id ? note : returnedNote
        ))
      })
      .catch(error => {
        // alert(`the note '${note.content}' was already deleted from server`)
        setErrorMessage(`Note '${note.content} was already removed from server`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000);
        setNotes(notes.filter(n => n.id !== id))
      })

  }

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note => 
        <Note 
          key={note.id} 
          note={note}
          toggleImportance = {() => toggleImportanceOf(note.id)}
        />
          )}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
      <Footer />
    </div>
  )
}

export default App;
