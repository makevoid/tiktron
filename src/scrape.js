// const tt = require('tiktok-scraper')
// const EventEmitter = require('events')
//
// const ttOptions = { number: 1, noWaterMark: true }
//
// const userEvent = ({ user }) => {
//   console.log("user:", user)
// }
//
//
// const loadVideo = ({ position }) => {
//   console.log("loading video")
//   if (!position) throw new Error("Position not specified - position must be `prev` or `next`")
//
//   // send event
// }
//
//
// const main = () => {
//   ;(async () => {
//
//     const hashtag = "doge"
//     const username = "makevoid"
//     // const results = await tt.hashtag(hashtag, ttOptions)
//     const result = await tt.user(username, ttOptions)
//     const users = result.collector
//     const user = users[0]
//
//     // console.log(Object.keys(user))
//     const { id, name, nickname, avatar, covers, videoUrl, webVideoUrl, playCount, shareCount } = user
//     const { default: defaultCover } = covers
//     console.log(`id: ${id}`)
//     console.log(`nickname: ${nickname}`)
//     console.log(`webVideoUrl: ${videoUrl}`)
//     // console.log(user.id)
//   })()
// }
//
// main()
