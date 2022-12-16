const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Note = require('../models/note')

beforeEach(async () => {
  // Clear the DB in the beginning
  await Note.deleteMany({})

  const noteObjects = helper.initialNotes.map(note => new Note(note))
  const promiseArray = noteObjects.map(note => note.save())
  await Promise.all(promiseArray)
  // helper.initialNotes.forEach(async note => {
  //   let noteObject = new Note(note)
  //   await noteObject.save()
  //   console.log('saved')
  // })

  console.log('done')

  // Add the 2 initial notes into the DB
  // let noteObject = new Note(helper.initialNotes[0])
  // await noteObject.save()
  // noteObject = new Note(helper.initialNotes[1])
  // await noteObject.save()
})

test('notes are returned as json', async () => {
  await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/)
// }, 100000)
})

// test('there are two notes', async() => {
//   const response = await api.get('/api/notes')
//   expect(response.body).toHaveLength(2)
// })

// test('the first note is about HTTP methods', async () => {
//   const response = await api.get('/api/notes')
//   expect(response.body[0].content).toBe('HTML is easy')
// })

test('all notes are returned', async () => {
  const response = await api.get('/api/notes')
  expect (response.body).toHaveLength(helper.initialNotes.length)
})

test('a specific note is within the returned notes', async () => {
  const response = await api.get('/api/notes')

  const contents = response.body.map(r => r.content)
  expect (contents).toContain('Browser can execute only Javascript')
})

test('a valid note can be added', async () => {
  const newNote = {
    content: 'async/await simplifies making async calls',
    important: true
  }

  await api
    .post('/api/notes')
    .send(newNote)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  // const response = await api.get('/api/notes')
  // const contents = response.body.map(r => r.content)
  const notesAtEnd = await helper.notesInDb()

  // expect(response.body).toHaveLength(helper.initialNotes.length + 1)
  expect(notesAtEnd).toHaveLength(helper.initialNotes.length + 1)

  const contents = notesAtEnd.map(n => n.content)
  expect(contents).toContain('async/await simplifies making async calls')
})

test('note without content is not added', async () => {
  const newNote = {
    important: true
  }

  await api
    .post('/api/notes')
    .send(newNote)
    .expect(400)

  // const response = await api.get('/api/notes')
  const notesAtEnd = await helper.notesInDb()
  // expect(response.body).toHaveLength(helper.initialNotes.length)
  expect(notesAtEnd).toHaveLength(helper.initialNotes.length)

})

test('a specific note can be viewed', async () => {
  const notesAtStart = await helper.notesInDb()

  const noteToView = notesAtStart[0]

  const resultNote = await api
    .get(`/api/notes/${noteToView.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const processedNoteToView = JSON.parse(JSON.stringify(noteToView))

  expect(resultNote.body).toEqual(processedNoteToView)
})

test('a note can be deleted', async () => {
  const notesAtStart = await helper.notesInDb()
  const noteToDelete = notesAtStart[0]

  await api
    .delete(`/api/notes/${noteToDelete.id}`)
    .expect(204)

  const notesAtEnd = await helper.notesInDb()

  expect(notesAtEnd).toHaveLength(helper.initialNotes.length - 1)

  const contents = notesAtEnd.map(r => r.content)

  expect(contents).not.toContain(noteToDelete.content)
})


afterAll(() => {
  mongoose.connection.close()
})