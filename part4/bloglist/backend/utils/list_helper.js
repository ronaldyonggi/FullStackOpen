
const dummy = blogs => {
  return 1
}

const totalLikes = blogs => {
  return blogs.reduce((acc, blog) => acc + blog.likes, 0)
}

const favoriteBlog = blogs => {
  let currentFav = 0 // index of the blog with the most likes
  for (let i = 0; i < blogs.length; i++) {
    if (blogs[i]['likes'] > blogs[currentFav]['likes']) currentFav = i
  }
  return (({ title, author, likes }) => ({ title, author, likes }))(blogs[currentFav])
}

const mostBlogs = blogs => {
  let authors = {}
  for (let i = 0; i < blogs.length; i++) {
    // If not found in authors, create a new entry
    let author = blogs[i]['author']
    if (!(authors[author])) {
      authors[author] = 1
    } else {
      authors[author] ++
    }
  }
  // Get the author with the most values
  let maxAuthor = Object.keys(authors).reduce((a, b) =>
    authors[a] > authors[b] ? a : b )
  return {
    author: maxAuthor,
    blogs: authors[maxAuthor]
  }
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs
}
