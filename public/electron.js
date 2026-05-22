const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
  width: 300,
  height: 470,
  resizable: false,
  frame: false,
  transparent: true,
  icon: path.join(__dirname, 'icon.jpg'),
  webPreferences: {
    nodeIntegration: false,
    contextIsolation: true,
  },
  title: 'MeowP3',
});

  win.loadURL('http://localhost:3000');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});