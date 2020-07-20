console.log("preload")

const ipc = require('electron').ipcRenderer

const loadVideo = ({ position }) => {
  console.log("loading video ")
  ipc.send('load-video', { position })
}

const transition = ({ direction }) => {
  console.log("starting css animation - direction: ", direction)
  // send event
}

// actions trigger an ipc call to the backend
const actions = {
  nextVideo: (evt) => {
    loadVideo({ position: "next" })
    transition({ direction: "next" })
  },
  prevVideo: (evt) => {
    loadVideo({ position: "prev" })
    transition({ direction: "prev" })
  }
}

// renderers get data from ipc events data and update the UI
const renderers = {
  loadVideo: ({ video, videoElems }) => {
    console.log("render next/prev video")

    const { vidMain } = videoElems
    // const { vidMain, vidPrev, vidNext } = videoElems // TODO: set prev/next videos as well to enable fast switch
    vidMain.src = video.videoUrl
  },
  // loadVideo: (data) => {
  //   ...
  // },
}

const bindEvents = ({ videoElems }) => {
  ipc.on('load-video-reply', (event, data) => {
    const { video, state } = data
    console.log("video: ", video)
    console.log("state: ", state)
    renderers.loadVideo({ video, videoElems })
  })

  // ipc.once...
}

const bindMainButtons = ({ buttons }) => {
  const { prevButton, nextButton } = buttons
  prevButton.addEventListener("click", actions.prevVideo)
  nextButton.addEventListener("click", actions.nextVideo)
}

const bindVideoTags = ({ videoElems }) => {
  const { vidMain, vidPrev, vidNext } = videoElems
  vidMain.volume = 0 // muted
  // vidMain.volume = 1 // 100%
  vidMain // ... TODO implement
}

const uiMain = () => {
  const buttons = {
    prevButton: document.querySelector(".arrow.arrow-left"),
    nextButton: document.querySelector(".arrow.arrow-right"),
  }
  const videoElems = {
    vidMain: document.querySelector("video.video-main"),
    vidPrev: document.querySelector("video.video-prev"),
    vidNext: document.querySelector("video.video-next"),
  }
  bindMainButtons({ buttons })
  bindVideoTags({ videoElems })
  bindEvents({ videoElems })
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

const tmpTestCode = () => {
  setTimeout(() => {
    console.log("simulating click next")
    const elem = document.querySelector("a.arrow.arrow-right")
    elem.click()
  }, 4000)
}


const tmpTestCode2 = () => {
  setInterval(() => {
    console.log("simulating click next")
    const elem = document.querySelector("a.arrow.arrow-right")
    elem.click()
  }, 7000)
}

window.addEventListener('DOMContentLoaded', () => {
  uiMain()
  sampleCode()
  // tmpTestCode()
  tmpTestCode2()
})
