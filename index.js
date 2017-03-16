var getUserMedia = require('getusermedia')

module.exports = function (opts, done) {
  if (!done) {
    done = opts
    opts = {}
  }
  opts = opts || {}

  var mopts = {
    audio: false,
    video: true
  }

  getUserMedia(mopts, function (err, stream) {
    if (err) return done(err)

    var video = document.createElement('video')
    video.style.width = opts.width || window.innerWidth
    // video.height = opts.height || window.innerHeight
    video.src = window.URL.createObjectURL(stream)
    video.play()

    video.onloadedmetadata = function (e) {
      if (!opts.interactive) snap()
      else {
        document.body.appendChild(video)
        video.onclick = function (e) {
          snap()
        }
      }
    }

    function snap () {
      if (opts.sfx) playSnapSfx()

      var canvas = document.createElement('canvas')
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      canvas.getContext('2d')
        .drawImage(video, 0, 0, canvas.width, canvas.height)

      setTimeout(fin, 100)

      function fin () {
        var data = new Buffer(canvas.toDataURL().split(',')[1], 'base64')
        done(null, data)
      }
    }
  })
}

function playSnapSfx () {
  var sfx = require('./camera_shutter')

  var audio = document.createElement('audio')
  audio.src = sfx
  audio.play()
}
