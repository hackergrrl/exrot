var getUserMedia = require('getusermedia')

module.exports = function (opts, done) {
  opts = opts || {}

  var opts = {
    audio: false,
    video: true
  }

  getUserMedia(opts, function (err, stream) {
    if (err) return done(err)

    var video = document.createElement('video')
    video.width = opts.width || 1024
    video.height = opts.height || 768
    video.src = window.URL.createObjectURL(stream)
    video.play()

    video.onloadedmetadata = function (e) {
      snap()
    }

    function snap () {
      var canvas = document.createElement('canvas')
      canvas.width = video.width
      canvas.height = video.height
      canvas.getContext('2d')
        .drawImage(video, 0, 0, video.width, video.height)

      var data = new Buffer(canvas.toDataURL().split(',')[1], 'base64')
      done(null, data)
    }
  })
}

