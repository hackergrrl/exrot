#!/usr/bin/env node

var fs = require('fs')
var path = require('path')
var spawn = require('electron-spawn')
var args = require('minimist')(process.argv)
var strftime = require('strftime')

if (args.h || args.help) {
  printUsage()
  return
}

var out = args._[2] || strftime('%Y_%m_%d_%S_exrot.png')

if (args.d || args.delay) {
  setTimeout(go, (args.d || args.delay) * 1000)
} else {
  go()
}

function go () {
  var file = path.join(__dirname, '..', 'snap.js')
  var pargs = [file].concat(process.argv.slice(2))
  var p = spawn.apply(this, pargs)
  p.stdout.pipe(fs.createWriteStream(out))
}

function printUsage () {
  fs.createReadStream(path.join(__dirname, 'usage.txt')).pipe(process.stdout)
}
