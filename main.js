const { app, BrowserWindow } = require('electron')
const path = require('path')
const EventEmitter = require('events')
const tt = require('tiktok-scraper')

const ttOptions = { number: 1, noWaterMark: true }

class MainEvents extends EventEmitter {}

const mainEvents = new MainEvents()
mainEvents.on('event', () => {
  console.log('an event occurred!')
})

const hashtag = "doge"
const username = "makevoid"


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

console.log(">")

;(async () => {
  // const results = await tt.hashtag(hashtag, ttOptions)
  const results = await tt.user(username, ttOptions)

  console.log("results:", results.collector)

  mainEvents.emit('event')
})()
