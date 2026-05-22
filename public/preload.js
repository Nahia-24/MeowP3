const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  openFiles: () => ipcRenderer.invoke('open-files'),
  deleteSong: (filePath) => ipcRenderer.invoke('delete-song', filePath),
});