const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  console.log('DB cleared')

  const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

// test ('blogs are returned as json', async () => {
//   await api
//     .get('/api/blogs')
//     .expect(200)
//     .expect('Content-Type', /application\/json/)
// })

test('HTTP GET request to /api/blogs works', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

// test('a specific blog is within the returned blogs', async () => {
//   const response = await api.get('/api/blogs')

//   const titles = response.body.map(r => r.title)
//   expect(titles).toContain('This is the first blog')
// })

test('the unique identifier property of the blog posts is named id', async () => {
  const response = await api.get('/api/blogs')

  const ids = response.body.map(r => r.id)
  ids.forEach(id => {
    expect(id).toBeDefined()
  })
})

test('HTTP POST request to /api/blogs url successfully creates a new blog', async () => {
  const newBlog = {
    title: 'a new added blog',
    author: 'Jensen Jenkins',
    url: 'www.jensenjenkins23.com',
    likes: 324
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const titles = response.body.map(r => r.title)

  expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
  expect(titles).toContain('a new added blog')
})

test('if a blog with missing "likes" property is added, it will default to value 0', async () => {
  const newBlog = {
    title: 'a blog with missing likes',
    author: 'Mr. No Likes',
    url: 'www.ihavenolikes.com'
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  // Save the recently created blog id in the variable createdBlogId
  const createdBlogId = response.body.id

  // Retrieve the blog with a GET request and the saved id
  const retrievedBlog = await api
    .get(`/api/blogs/${createdBlogId}`)

  // Match the likes to be 0
  expect(retrievedBlog.body.likes).toBe(0)
})

test('if title property is missing from the request data, backend responds to request with status code "400 Bad Request"', async () => {
  const newBlog = {
    author: 'Mrs. no title',
    url: 'www.notitle.com',
    likes: 37
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const response = await api.get('/api/blogs')
  expect (response.body).toHaveLength(helper.initialBlogs.length)
})

test('if url property is missing from the request data, backend responds to request with status code "400 Bad Request"', async () => {
  const newBlog = {
    title: 'this blog has no url',
    author: 'Mrs. no url',
    likes: 567
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const response = await api.get('/api/blogs')
  expect (response.body).toHaveLength(helper.initialBlogs.length)
})

// test('blog without title is not added', async () => {
//   const newBlog = {
//     author: 'author of a blog without title'
//   }

//   await api
//     .post('/api/blogs')
//     .send(newBlog)
//     .expect(400)

//   const response = await api.get('/api/blogs')

//   expect(response.body).toHaveLength(helper.initialBlogs.length)
// })

// test('a specific blog can be viewed', async () => {
//   const blogsAtStart = await helper.blogsInDB()

//   const blogToView = blogsAtStart[0]

//   const resultBlog = await api
//     .get(`/api/blogs/${blogToView.id}`)
//     .expect(200)
//     .expect('Content-Type', /application\/json/)

//   const processedBlogToView = JSON.parse(JSON.stringify(blogToView))

//   expect(resultBlog.body).toEqual(processedBlogToView)
// })

// test('a blog can be deleted', async () => {
//   const blogsAtStart = await helper.blogsInDB()
//   const blogToDelete = blogsAtStart[0]

//   await api
//     .delete(`/api/blogs/${blogToDelete.id}`)
//     .expect(204)

//   const blogsAtEnd = await helper.blogsInDB()

//   expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

//   const titles = blogsAtEnd.map(r => r.title)

//   expect(titles).not.toContain(blogToDelete.title)
// })

afterAll(() => mongoose.connection.close())