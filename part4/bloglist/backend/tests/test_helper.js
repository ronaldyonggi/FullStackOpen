const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'This is the first blog',
    author: 'This is the first author',
    url: 'This is the url',
    likes: 34
  },
  {
    title: 'Just another blog',
    author: 'Just simply another author',
    url: 'Just another URL',
    likes: 2
  }
]

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'will remove this blog',
    author: 'will remove this too',
    url: 'this url will me removed',
    likes: 17
  })

  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDB = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = { initialBlogs, nonExistingId, blogsInDB }