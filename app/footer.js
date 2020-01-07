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
            m('h3', 'Contact us'),
            m('p', `
              Get in touch with us, we are a friendly bunch and we always
              welcome new partners and contacts.
            `),
            m('h5', 'einar@dokument.is / skapti@dokument.is'),
          ]),
        ]),
        m('div.meta', [
          m('span', 'Dokument ehf.'),
          m('span', 'einar@dokument.is / skapti@dokument.is'),
          m('span', 'kt. 631219-2250'),
          m('span', [
            'background images from ',
            m('a', { href: 'https://www.freepik.com/pikisuperstar' }, 'pikisuperstar on freepik.com'),
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
