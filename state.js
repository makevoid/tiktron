class State {}
const STATE = new State()

// default state
STATE.idxCurrent  = 0
STATE.resource    = "users" // resources: users, hashtags, trending
STATE.query       = "makevoid"

module.exports = STATE
