'use strict'

import { app, BrowserWindow, ipcMain, dialog } from 'electron'
import { processImage } from '../utils/imageUtils'
import { buildPathTree, isHiddenFolder } from '../utils/pathUtils'
const Klaw = require('klaw')
const Path = require('path')

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
      Klaw(results[0])
        .on('data', item => {
          if (item.stats.isDirectory()) {
            if (!isHiddenFolder(item.path)) paths.push(item)
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
