var takeShot = require('./')

takeShot(function (err, data) {
  if (err) {
    console.error('unable to take shot: ' + err)
    process.exit(1)
  } else {
    process.stdout.write(data)
  }
})
