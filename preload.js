const ipc = require('electron').ipcRenderer



const loadVideo = ({ position }) => {
  console.log("loading video ")
  ipc.send('load-video', { position })
}

const transition = () => {
  console.log("starting css animation to replace video")
  // send event
}

// actions trigger an ipc call to the backend
const actions = {
  nextVideo: (evt) => {
    loadVideo({ position: "next" })
  },
  prevVideo: (evt) => {
    loadVideo({ position: "prev" })
  }
}

// renderers get data from ipc events data and update the UI
const renderers = {
  loadVideo: (data) => {

  }
}

const bindEvents = () => {
  ipc.on('load-video-reply', (event, data) => {
    console.log("data: ", data)
    renderers.loadVideo(data)
  })

  // ipc.once...
}

const bindMainButtons = ({ buttons }) => {
  buttons.prevButton.addEventListener("click", actions.prevVideo)
  buttons.nextButton.addEventListener("click", actions.nextVideo)
}

const bindVideoTags = () => {
  var vidMain = document.querySelector("video.video-main")
  var vidNext = document.querySelector("video.video-next")
  var vidPrev = document.querySelector("video.video-prev")
  vidMain.volume = 0 // muted
  // vidMain.volume = 1 // 100%
  vidMain //...
}

const uiMain = () => {
  const buttons = {
    prevButton: document.querySelector(".arrow.arrow-left"),
    nextButton: document.querySelector(".arrow.arrow-right"),
  }
  bindMainButtons({ buttons })
  bindVideoTags()
  bindEvents()
}


const sampleCode = () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }
}

window.addEventListener('DOMContentLoaded', () => {
  uiMain()
  sampleCode()
})
