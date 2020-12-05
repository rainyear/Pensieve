'use strict'

import { app, BrowserWindow, ipcMain, dialog } from 'electron'
const klaw = require('klaw')
const Path = require('path')
// const Jimp = require('jimp')

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
// ipc
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
            if (ext === '.jpg' || ext === '.png') {
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
          event.sender.send('folderSelected', [DT, items])
          items.forEach(item => {
            console.log(item)
          })
        }) // => [ ... array of files]
    }
  })
})
