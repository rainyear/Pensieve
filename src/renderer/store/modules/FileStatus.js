const state = {
  fTree: [],
  images: []
}

const mutations = {
  UPDATE_FTREE (state, tree) {
    if (tree) {
      state.fTree = state.fTree.concat(tree)
    }
  },
  UPDATE_IMAGES (state, images) {
    if (images) {
      state.images = state.images.concat(images)
    }
  },
  CLEAR (state) {
    state.fTree = []
    state.images = []
  }
}

const actions = {

}

export default {
  state,
  mutations,
  actions
}
