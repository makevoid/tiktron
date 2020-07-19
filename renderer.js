const ipc = require('electron').ipcRenderer
const authButton = document.getElementById('auth-button')
authButton.addEventListener('click', () => {
    ipc.once('actionReply', (event, response) => {
        processResponse(response)
    })
    ipc.send('invokeAction', 'someData')
})


const transition = () => {
  console.log("starting css animation to replace video")
  // send event
}

const actions = {
  nextVideo: (evt) => {
    loadVideo({ position: "next" })
  },
  prevVideo: (evt) => {
    loadVideo({ position: "prev" })
  },
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

const uiMain = () => {
  const buttons = {
    prevButton: document.querySelector(".arrow.arrow-left"),
    nextButton: document.querySelector(".arrow.arrow-right"),
  }
  bindMainEvents()
  bindMainButtons({ buttons })
  bindVideoTags()
}

uiMain()
