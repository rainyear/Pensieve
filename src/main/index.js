'use strict'

import { app, BrowserWindow, ipcMain, dialog, remote } from 'electron'
const klaw = require('klaw')
const Path = require('path')
// const Jimp = require('jimp')
const fs = require('fs')
// const ExifImage = require('exif').ExifImage
const SizeOfImg = require('image-size')
const Sharp = require('sharp')
const APP = process.type === 'renderer' ? remote.app : app
const THUMB_PATH = Path.join(APP.getPath('userData'), 'thumbs')
if (!fs.existsSync(THUMB_PATH)) {
  fs.mkdirSync(THUMB_PATH)
}

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 563,
    minHeight: 563,
    useContentSize: true,
    width: 1000,
    minWidth: 800,
    autoHideMenuBar: true,
    webPreferences: {
      webSecurity: false
    }
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

// uitls
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

function processImage(path, cbk) {
  let dim = SizeOfImg(path)
  const name = Path.basename(path)

  /*
  Jimp.read(path).then(image => {
    image.resize(200, 200).quality(60).writeAsync(Path.join(THUMB_PATH, name))
  }).catch(err => {
    console.log(`Jimp Err: ${err}`)
  })
  */
  Sharp(path).resize({height: 200}).toFile(Path.join(THUMB_PATH, name), err => {
    if (err) {
      console.log(err)
    }
  })
  cbk({
    name: name,
    width: dim.width,
    height: dim.height
  })
}
// ipc
ipcMain.on('clearFolder', (event, args) => {
  // TODO: clear the thumb dir
  console.log('Clear Folder')
})
ipcMain.on('selectFolder', (event, args) => {
  dialog.showOpenDialog(mainWindow, {
    properties: ['openDirectory']
  }, results => {
    const items = [] // files, directories, symlinks, etc
    const paths = []
    if (results) {
      klaw(results[0])
        .on('data', item => {
          if (item.stats.isDirectory()) {
            paths.push(item)
          } else {
            let ext = Path.extname(item.path).toLowerCase()
            if (ext === '.jpg' || ext === '.png' || ext === 'jpeg') {
              items.push(item)
            }
          }
        })
        .on('error', (error, item) => {
          console.error(error.message)
          console.error(item.path)
        })
        .on('end', () => {
          const DT = buildPathTree(paths)

          items.forEach((item, idx) => {
            processImage(item.path, info => {
              item.info = info
              event.sender.send('imageProcess', (idx + 1) / items.length)
            })
          })

          console.log('folderSelected')
          event.sender.send('folderSelected', [DT, items])
        }) // => [ ... array of files]
    }
  })
})
