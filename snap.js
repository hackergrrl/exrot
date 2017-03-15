var takeShot = require('./')
var args = require('minimist')(process.argv)

var opts = {}

opts.sfx = args.x || args.sfx || null

takeShot(opts, function (err, data) {
  if (err) {
    console.error('unable to take shot: ' + err)
    process.exit(1)
  } else {
    process.stdout.write(data, null, function () {
      process.exit(0)
    })
  }
})
