const Path = require('path')

const state = {
  root: '',
  fTree: [],
  images: [],
  importing: false,
  currentImages: []
}

const mutations = {
  UPDATE_ROOT (state, root) {
    state.root = root
  },
  UPDATE_FTREE (state, tree) {
    if (tree) {
      state.fTree = state.fTree.concat(tree)
    }
    state.importing = false
  },
  UPDATE_IMAGES (state, images) {
    if (images) {
      state.images = state.images.concat(images)
    }
    state.importing = false
  },
  UPDATE_IMPORTING (state, flag) {
    state.importing = flag
  },
  SELECT_FOLDER (state, folder) {
    state.currentImages = state.images.filter(img => Path.dirname(img.path) === folder)
  },
  CLEAR (state) {
    state.fTree = []
    state.images = []
    state.currentImages = []
    state.importing = false
  }
}

const actions = {

}

export default {
  state,
  mutations,
  actions
}
