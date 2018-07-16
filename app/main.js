/**
 * @license
 * NFP ehf. <https://nfp.is>
 * Copyright 2018 Jonatan Nilsson <http://jonatan.nilsson.is/>
 *
 * Available under WTFPL License (http://www.wtfpl.net/txt/copying/)
*/

'use strict'

//Add debug components to window. Allows us to play with controls
//in the console. 
window.components = {}

const m = require('mithril')
const Front = require('./front')

m.mount(document.getElementById('container'), Front)
