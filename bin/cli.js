#!/usr/bin/env node

var path = require('path')
var spawn = require('electron-spawn')
spawn(path.join(__dirname, '..', 'snap.js'), {stdio: 'inherit'})
