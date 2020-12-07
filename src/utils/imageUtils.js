
import { remote, app } from 'electron'

const crypto = require('crypto')
const fs = require('fs')
const Path = require('path')
const CV = require('opencv4nodejs')
const APP = process.type === 'renderer' ? remote.app : app
const THUMB_PATH = Path.join(APP.getPath('userData'), 'thumbs')
if (!fs.existsSync(THUMB_PATH)) {
  fs.mkdirSync(THUMB_PATH)
}
console.log('OpenCV Version: ', CV.version)
const THUMB_HEIGHT = 200

function processImage(path, cbk) {
  const name = Path.basename(path)
  const extn = Path.extname(path)
  const data = fs.readFileSync(path)
  const img = CV.imdecode(data, CV.IMREAD_UNCHANGED)

  // Resize - create thumbnails
  const scale = THUMB_HEIGHT / img.rows
  const thumb = img.rescale(scale)

  // Hash filename - prevent same image name from different folder
  const saveToName = crypto.createHmac('sha256', 'Pensieve').update(path).digest('hex')
  const saveTo = Path.join(THUMB_PATH, `${saveToName}.${extn}`)

  CV.imwrite(saveTo, thumb)
  cbk({
    name: name,
    thumb_width: parseInt(img.cols * scale),
    thumb_path: saveTo,
    width: img.cols,
    height: img.rows
  })
}

export {
  processImage
}
