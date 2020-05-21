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
    video.style.width = opts.width || '100%'
    video.style.height = opts.height || '100%'
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
      var ctx = canvas.getContext('2d')
      ctx.translate(canvas.width, 0)
      ctx.scale(-1, 1)
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

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
