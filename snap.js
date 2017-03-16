var takeShot = require('./')
var ipc = require('electron').ipcRenderer

var stdout = require('electron').remote.getGlobal('process').stdout

ipc.on('snap', function (_, opts) {
  takeShot(opts, function (err, data) {
    if (err) {
      process.exit(1)
    } else {
      stdout.write(data, null, function () {
        setTimeout(function () {
          ipc.send('done')
        }, 400)
      })
    }
  })
})
