import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

const showOpenDialog = () => {
  ipcRenderer.send('openFile')
}
ipcRenderer.on('eventFromMain-message', function (evt, message) {
  console.log(message); // Returns: {'SAVED': 'File Saved'}
});

// Custom APIs for renderer
const api = { showOpenDialog }

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api

}
