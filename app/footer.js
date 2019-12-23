var m = require('mithril')
var Helper = require('./helper')

var Footer = {
  oninit: function(vnode) {
    vnode.state.scrollListenerWaiting = []
  },

  view: function(vnode) {
    return [
      m('div.outerbox', [
        m('div.innerbox', [
          m('div.image', {
            oncreate: function(subnode) {
              Helper.scrollAddItem(vnode, {
                dom: subnode.dom,
                className: 'visible',
                threshold: -100,
                img: '/assets/images/contact.svg',
              })
            },
          }),
          m('aside', [
            m('h3', 'Hafðu samband'),
            m('p', `
              Sendu okkur tölvupóst og lýstu þínum þörfum. Við munum setja okkur
              inn í málin og finna lausnir. Við bjóðum persónulega og
              metnaðarfulla þjónustu fyrir alla okkar viðskiptavini.
            `),
            m('h5', 'nfp@nfp.is'),
          ]),
        ]),
        m('div.meta', [
          m('span', 'NFP ehf.'),
          m('span', 'nfp@nfp.is'),
          m('span', 'kt. 410915-1380'),
          m('span', [
            'Bakgrunnsmyndir frá ',
            m('a', { href: 'https://www.freepik.com/pikisuperstar' }, 'pikisuperstar úr freepik.com'),
          ]),
        ]),
      ]),
    ]
  },
}

/*
 <a href="https://www.freepik.com/free-photos-vectors/background">Background vector created by pikisuperstar - www.freepik.com</a> 
*/

module.exports = Footer
