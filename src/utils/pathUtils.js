const Path = require('path')

function buildPathTree(paths) {
  const _dt = (p) => {
    return {
      'label': Path.basename(p.path),
      'children': [],
      'stats': p,
      'path': p.path
    }
  }
  const _findChildren = (DT, paths) => {
    paths.forEach(path => {
      if (Path.dirname(path.path) === DT.path) {
        let child = _dt(path)
        DT.children.push(child)
        _findChildren(child, paths)
      }
    })
  }
  let DT = _dt(paths[0])
  _findChildren(DT, paths)
  return DT
}
const isHiddenFolder = path => Path.basename(path).startsWith('.')

export {
  buildPathTree,
  isHiddenFolder
}
