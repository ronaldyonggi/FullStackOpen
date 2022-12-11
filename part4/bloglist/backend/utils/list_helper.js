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

module.exports = {
  dummy, totalLikes, favoriteBlog
}
