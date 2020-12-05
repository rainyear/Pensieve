const state = {
  main: 0
}

const mutations = {
  DECREMENT_MAIN_COUNTER (state) {
    state.main--
  },
  INCREMENT_MAIN_COUNTER (state) {
    state.main++
  },
  INC_N (state, n) {
    state.main += n
  }
}

const actions = {
}

export default {
  state,
  mutations,
  actions
}
