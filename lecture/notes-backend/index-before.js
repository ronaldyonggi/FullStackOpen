// const http = require('http')
require('dotenv').config()
const { response } = require('express')
const express = require('express')
const app = express()
const cors = require('cors')
const Note = require('./models/note')
const { update } = require('./models/note')

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:', request.path)
  console.log('Body:', request.body)
  console.log('---')
  next()
}

// MongoDB Connection
// const mongoose = require('mongoose')

// if (process.argv.length < 3) {
//     console.log('Please provide the password as an argument: node mongo.js <password>')
//     process.exit(1)
// }

// const password = process.argv[2]
// const url = `mongodb+srv://fullstack:${password}@cluster0.roigez4.mongodb.net/noteApp?retryWrites=true&w=majority`

// mongoose.connect(url)

// const noteSchema = new mongoose.Schema({
//   content: String,
//   date: Date,
//   important: Boolean
// })

// noteSchema.set('toJSON', {
//   transform: (document, returnedObject) => {
//     returnedObject.id = returnedObject._id.toString()
//     delete returnedObject._id
//     delete returnedObject.__v
//   }
// })

// const Note = mongoose.model('Note', noteSchema)


app.use(express.static('build'))
app.use(express.json())
app.use(requestLogger)
app.use(cors())


// let notes = [
//     {
//       id: 1,
//       content: "HTML is easy",
//       date: "2022-05-30T17:30:31.098Z",
//       important: true
//     },
//     {
//       id: 2,
//       content: "Browser can execute only Javascript",
//       date: "2022-05-30T18:39:34.091Z",
//       important: false
//     },
//     {
//       id: 3,
//       content: "GET and POST are the most important methods of HTTP protocol",
//       date: "2022-05-30T19:20:14.298Z",
//       important: true
//     }
//   ]

// const app = http.createServer((request, response) => {
//     response.writeHead(200, {
//         // 'Content-Type': 'text/plain'
//         'Content-Type': 'application/json'
//     })
//     // response.end('Hello World')
//     response.end(JSON.stringify(notes))
// })

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes)
  })
})

app.get('/api/notes/:id', (request, response, next) => {
  // const id = Number(request.params.id)
  // const note = notes.find(note => note.id === id)

  // if (note) response.json(note) // If the id exists (not undefined), response with the note
  // else response.status(404).end() // Otherwise if the id doesn't exist, give status 404
  Note.findById(request.params.id).then(note => {
    if (note) {
      response.json(note)
    } else { // the id is not found
      response.status(404).end()
    }
  })
    .catch(error => { // executed if findById method doesn't even work
      next(error)
    })
})

app.delete('/api/notes/:id', (request, response, next) => {
  // const id = Number(request.params.id)
  // notes = notes.filter(note => note.id !== id) // update notes. Now notes are containing all the note that don't have the id that was deleted
  // response.status(204).end()

  Note.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

const generateId = () => {
  const maxId = notes.length > 0
    ? Math.max(...notes.map(n => n.id))
    : 0
  return maxId + 1
}

app.post('/api/notes', (request, response, next) => {
  const body = request.body

  // if (!body.content) { // If the content body is null
  //   return response.status(400).json({
  //     error: 'content missing'
  //   })
  // }

  // const note = {
  //   content: body.content,
  //   important: body.important || false,
  //   date: new Date(),
  //   id: generateId()
  // }
  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date()
  })

  // notes = notes.concat(note)
  // response.json(note)
  note.save().then(savedNote => {
    response.json(savedNote)
  })
    .catch(error => next(error))
})

app.put('/api/notes/:id', (request, response, next) => {
  // const body = request.body
  const { content, important } = request.body

  // const note = {
  //   content: body.content,
  //   important: body.important
  // }

  // Note.findByIdAndUpdate(request.params.id, note, {new: true})
  Note.findByIdAndUpdate(
    request.params.id,
    { content, important },
    { new: true, runValidators: true, context: 'query' }
  )
    .then(updatedNote => {
      response.json(updatedNote)
    })
    .catch(error => next(error))
})


const unknownEndpoint = (request, response) => {
  response.status(404).send({
    error: 'unknownEndpoint'
  })
}
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  // Error caused by invalid object id for Mongo
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') { // Handles validation error
    return response.status(400).json({ error: error.message })
  }

  // All other error is passed to default Express error handler
  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})