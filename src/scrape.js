const tt = require('tiktok-scraper')
const ttOptions = { number: 1, noWaterMark: true }

;(async () => {

  const hashtag = "doge"
  const username = "makevoid"
  // const results = await tt.hashtag(hashtag, ttOptions)
  const results = await tt.user(username, ttOptions)

  console.log(results.collector)
})()
