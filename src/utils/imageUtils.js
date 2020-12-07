
import { remote, app } from 'electron'
import { pHash, SAMPLE_SIZE } from '../utils/pHash'

const crypto = require('crypto')
const skmeans = require('skmeans')
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

function flatten(arr) {
  return [].concat.apply([], arr)
}
function processImage(path, cbk) {
  const name = Path.basename(path)
  const extn = Path.extname(path)
  const data = fs.readFileSync(path)
  const img = CV.imdecode(data, CV.IMREAD_UNCHANGED)

  // Resize - create thumbnails
  const scale = THUMB_HEIGHT / img.rows
  const thumb = img.rescale(scale)

  // Theme Color
  // const imgMatFlat = [].concat.apply([], thumb.getDataAsArray())
  const result = skmeans(flatten(thumb.getDataAsArray()), 10)
  const themeColors = result.centroids.map(sub => {
    return sub.map(x => parseInt(x))
  })

  // Hash filename - prevent same image name from different folder
  const pHashData = thumb.resize(SAMPLE_SIZE, SAMPLE_SIZE).cvtColor(CV.COLOR_BGR2GRAY).getDataAsArray()
  const hash = pHash(flatten(pHashData))

  // Save Thumbnail
  const saveToName = crypto.createHmac('sha256', 'Pensieve').update(path).digest('hex')
  const saveTo = Path.join(THUMB_PATH, `${saveToName}.${extn}`)

  CV.imwrite(saveTo, thumb)
  cbk({
    name: name,
    thumb_width: parseInt(img.cols * scale),
    thumb_path: saveTo,
    width: img.cols,
    height: img.rows,
    themeColors: themeColors,
    phash: hash
  })
}

export {
  processImage
}
