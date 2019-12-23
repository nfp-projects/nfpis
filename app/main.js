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

var m = require('mithril')

m.route.setOrig = m.route.set
m.route.set = function(path, data, options){
  m.route.setOrig(path, data, options)
  window.scrollTo(0, 0)
}

m.route.linkOrig = m.route.link
m.route.link = function(vnode){
  m.route.linkOrig(vnode)
  window.scrollTo(0, 0)
}

var Front = require('./front')
var Hosting = require('./hosting')
var Programming = require('./programming')
var Streaming = require('./streaming')
var Footer = require('./footer')

m.route.prefix = ''
m.route(document.getElementById('container'), '/', {
  '/': Front,
  '/hosting-solutions': Hosting,
  '/programming-solutions': Programming,
  '/video-solutions': Streaming,
})
m.mount(document.getElementById('footer'), Footer)
