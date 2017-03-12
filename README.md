# exrot

> like scrot, but for **ex**ternal use: taking webcam shots

Sometimes I like to take a quick picture of a whiteboard or some notes, but
don't want to go find a phone and fiddle with getting images off of it.

## Install

With [npm](https://npmjs.org/) installed, run

```
$ npm install --global exrot
```

## CLI Usage

```
USAGE:

  exrot [OPTIONS]... [FILE]

  Where FILE is the target file for the screenshot.

  If FILE is not specified, a date-stamped file will be dropped in the
  current directory.

  -h, --help                display this help and exit
  -d, --delay NUM           wait NUM seconds before taking a shot

```

## API Usage

```js
var exrot = require('exrot')

var opts = {
  width: 320,
  height: 240
}

exrot(opts, function (err, data) {
  if (err) throw err
  process.stdout.write(data)
})
```

outputs the raw PNG data from the captured frame.

## API

```js
var exrot = require('exrot')
```

### exrot(opts, cb)

`opts`, if present, can set `opts.width` and/or `opts.height` to be the desired
output dimensions of the image.

`cb` is a callback that will be called with `cb(err, data)`, where `data` is a
`Buffer` of raw PNG data.

## License

ISC

