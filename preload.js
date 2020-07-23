// TODO: use a preprocessor to build this file from parts

// ipc.js
const { ipcRenderer } = require('electron')
// module.exports = {
//   ipc: ipcRenderer,
// }
// --
// const ipc = require('./ipc.js')

const ipc = ipcRenderer

// models

const loadVideo = ({ position }) => {
  console.log("loading video ")
  ipc.send('load-video', { position })
}

const submitSearch = ({ query }) => {
  console.log("submitting search", query)
  ipc.send('search', { query })
}

const transition = ({ direction }) => {
  console.log("starting css animation - direction: ", direction)
  // send event
}


// actions.js

// actions trigger an ipc call to the backend
const actions = {
  nextVideo: () => {
    loadVideo({ position: "next" })
    transition({ direction: "next" })
  },
  prevVideo: () => {
    loadVideo({ position: "prev" })
    transition({ direction: "prev" })
  },
  search: ({ query }) => {
    submitSearch({ query })
  }
}

//

// renderers.js

const hideLoadingMsg = () => {
  const loadingElem = document.querySelector(".loading")
  loadingElem.style.display = "none"
}

const loadVideoRenderer = ({ video, videoElems }) => {
  console.log("render next/prev video")

  const { vidMain } = videoElems
  // const { vidMain, vidPrev, vidNext } = videoElems // TODO: set prev/next videos as well to enable fast switch
  vidMain.src = video.videoUrl
}

// renderers get data from ipc events data and update the UI
const renderers = {
  loadVideo: loadVideoRenderer,
  hideLoadingMsg: hideLoadingMsg,
}

// bindings.js (event bindings)

const bindEvents = ({ videoElems }) => {
  ipc.on('load-video-reply', (event, data) => {
    const { video, state } = data
    console.log("video: ", video)
    console.log("state: ", state)
    renderers.loadVideo({ video, videoElems })
    renderers.hideLoadingMsg()
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
  vidMain.volume = 0.25 // low
  // vidMain.volume = 1 // 100%
  vidMain // ... TODO implement
}

const bindHotkeys = () => {
  window.addEventListener("keydown", event => {
    if (event.keyCode === 37) { // left
       actions.prevVideo()
    }
    if (event.keyCode === 39) { // right
      actions.nextVideo()
    }
  })
}

const bindSearchForm = ({ searchForm, searchQueryElem }) => {
  const search = (evt) => {
    evt.preventDefault()
    const query = searchQueryElem.value
    actions.search({ query })
  }
  searchForm.addEventListener("submit", search)
}

// preload - ui-main.js (file name tbd)

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
  const searchForm = document.querySelector("form.search-form")
  const searchQueryElem = document.querySelector("form.search-form > .field > .control > input")
  bindMainButtons({ buttons })
  bindVideoTags({ videoElems })
  bindSearchForm({ searchForm, searchQueryElem })
  bindEvents({ videoElems })
  bindHotkeys()
}

const main = () => {
  window.addEventListener('DOMContentLoaded', () => {
    uiMain()

    loadVideo({ position: "first" })
  })
}

main()
