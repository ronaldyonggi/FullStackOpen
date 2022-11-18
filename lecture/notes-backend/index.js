// const http = require('http')
const { response } = require('express')
const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())


let notes = [
    {
      id: 1,
      content: "HTML is easy",
      date: "2022-05-30T17:30:31.098Z",
      important: true
    },
    {
      id: 2,
      content: "Browser can execute only Javascript",
      date: "2022-05-30T18:39:34.091Z",
      important: false
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      date: "2022-05-30T19:20:14.298Z",
      important: true
    }
  ]

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
    response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  const note = notes.find(note => note.id === id)
  
  if (note) response.json(note) // If the id exists (not undefined), response with the note
  else response.status(404).end() // Otherwise if the id doesn't exist, give status 404
})

app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter(note => note.id !== id) // update notes. Now notes are containing all the note that don't have the id that was deleted
  response.status(204).end()
})

const generateId = () => {
  const maxId = notes.length > 0
  ? Math.max(...notes.map(n => n.id))
  : 0
  return maxId + 1
}

app.post('/api/notes', (request, response) => {
  const body = request.body

  if (!body.content) { // If the content body is null
    return response.status(400).json({
      error: 'content missing'
    })
  }

  const note = {
    content: body.content,
    important: body.important || false,
    date: new Date(),
    id: generateId()
  }

  notes = notes.concat(note)
  response.json(note)
})

  const requestLogger = (request, response, next) => {
      console.log('Method:', request.method)
      console.log('Path:', request.path)
      console.log('Body:', request.body)
      console.log('---')
      next()
  }

  app.use(requestLogger)

  const unknownEndpoint = (request, response) => {
      response.status(404).send({
          error: 'unknownEndpoint'
      })
  }
  app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})