const { app, BrowserWindow } = require('electron')
const path = require('path')
const EventEmitter = require('events')
const tt = require('tiktok-scraper')

class MainEvents extends EventEmitter {}

const mainEvents = new MainEvents()

const ttOptions = { number: 1, noWaterMark: true }

const loadVideo = () => {
  console.log("loading video")
}

const transition = () => {
  console.log("starting css animation to replace video")
}

const actions = {
  nextVideo: (evt) => {
    loadVideo()
    transition({ direction: "next" })
  },
  prevVideo: (evt) => {
    loadVideo()
    transition({ direction: "prev" })
  },
}

const userEvent = ({ user }) => {
  console.log("user:", user)
}

const bindMainEvents = () => {
  // bind user events
  mainEvents.on('ev-user', ({ user }) => userEvent({ user }))
}

const bindMainButtons = ({ buttons }) => {
  console.log(buttons)
  buttons.prevButton.addEventListener(actions.prevVideo)
  buttons.nextButton.addEventListener(actions.nextVideo)
}

const bindVideoTags = () => {
  var vidMain = document.querySelector("video.video-main")
  var vidNext = document.querySelector("video.video-next")
  var vidPrev = document.querySelector("video.video-prev")
  vid.volume = 0 // muted
  // vid.volume = 1 // 100%
}


const bindIPC = () => {
  const ipc = require('electron').ipcMain

  ipc.on('invokeAction', (event, data) => {
    const result = processData(data)
    event.sender.send('actionReply', result)
  })
}

// main

const main = () => {
  bindIPC()

  ;(async () => {

    const hashtag = "doge"
    const username = "makevoid"
    // const results = await tt.hashtag(hashtag, ttOptions)
    const result = await tt.user(username, ttOptions)
    const users = result.collector
    const user = users[0]

    mainEvents.emit('ev-user', { antani: "true" })
    // console.log(Object.keys(user))
    const { id, name, nickname, avatar, covers, videoUrl, webVideoUrl, playCount, shareCount } = user
    const { default: defaultCover } = covers
    console.log(`id: ${id}`)
    console.log(`nickname: ${nickname}`)
    console.log(`webVideoUrl: ${videoUrl}`)
    // console.log(user.id)
  })()
}

// electron window management

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 1024,
    height: 730,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  mainWindow.loadFile('index.html')

  mainWindow.webContents.openDevTools()

  main()
}

app.whenReady().then(() => {
  createWindow()

  // macos fix
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
