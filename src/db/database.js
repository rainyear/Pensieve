import Datastore from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'
import path from 'path'
import { app, remote } from 'electron'

const APP = process.type === 'renderer' ? remote.app : app

const STORE_PATH = APP.getPath('userData')
const adapter = new FileSync(path.join(STORE_PATH, '/db.json'))
const db = Datastore(adapter)

if (!db.has('version').value()) {
  db.set('version', '0.0.1').write()
}

export default db
