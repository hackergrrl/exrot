var electron = require('electron')
var app = electron.app
var BrowserWindow = electron.BrowserWindow

var path = require('path')
var url = require('url')

var mainWindow

var args = require('minimist')(process.argv)

var opts = {}
opts.sfx = args.x || args.sfx || null
opts.interactive = args.i || args.interactive || null

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 640,
    height: 480,
    autoHideMenuBar: true,
    show: !!opts.interactive
  })

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'snap.html'),
    protocol: 'file:',
    slashes: true
  }))

  mainWindow.webContents.once('did-finish-load', function () {
    mainWindow.webContents.send('snap', opts)
  })

  mainWindow.on('closed', function () {
    app.quit()
  })
}

electron.ipcMain.on('done', function () {
  app.quit()
})

app.on('ready', createWindow)
