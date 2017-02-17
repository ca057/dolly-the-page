#!/usr/bin/env node
const clone = require('./src/clone');
const version = require('./package.json').version;

clone(version);
