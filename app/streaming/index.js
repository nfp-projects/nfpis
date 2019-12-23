var m = require('mithril')
var Helper = require('../helper')

var Streaming = {
  oninit: function(vnode) {
    Helper.init(vnode, 'streaming')
  },

  onremove: function(vnode) {
    Helper.clear(vnode)
  },

  view: function(vnode) {
    return [
      m('header.streaming', {
        oncreate: function(subnode) {
          vnode.state.domContainer = subnode.dom
          Helper.checkCreated(vnode)
          Helper.scrollAddItem(vnode, {
            dom: subnode.dom,
            className: 'visible',
          })
        },
      }, m('div.container', [
          !vnode.state.isMobile ? m('video', {
              oncreate: function(subnode) {
                vnode.state.domVideo = subnode.dom
                Helper.checkCreated(vnode)
              },
              preload: 'none',
              loop: true,
              muted: true,
              playsinline: true,
            }, [
              m('source', {
                src: vnode.state.videoUrl,
                type: 'video/mp4',
              }),
              m('source', {
                src: '/assets/cover/streaming.webm',
                type: 'video/webm',
              }),
            ]
          ) : m('div', {
                oncreate: function(subnode) {
                  vnode.state.domVideo = subnode.dom
                  Helper.checkCreated(vnode)
                },
              }),
          m('div',
            m('img', {
              oncreate: function(subnode) {
                vnode.state.domImg = subnode.dom
                Helper.lazyLoadImage(vnode, 'domImg', '/assets/cover/streaming.jpg')
                Helper.checkCreated(vnode)
              },
              src: ' data:image/jpeg;base64,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',
            })
          ),
          m('nav', [
            m(m.route.Link, { class: 'title', href: '/' }, m('span', 'NFP ehf.')),
            m('div.filler'),
            m(m.route.Link, { href: '/hosting-solutions' }, [ 'Hýsingarlausnir', m('div') ]),
            m(m.route.Link, { href: '/programming-solutions' }, [ 'Forritunarlausnir', m('div') ]),
            m(m.route.Link, { class: 'active', href: '/video-solutions' }, [ 'Videólausnir', m('div') ]),
          ]),
          m('div.content', [
            m('h1', 'Streymi- og upptökulausnir'),
            m('h2', 'Fyrir ráðstefnur og fundi á tækniöld'),
          ]),
        ])
      ),
      m('main', [
        // Solutions
        m('article.hostintro', [
          m('section', [
            m('div.image', {
              oncreate: function(subnode) {
                Helper.scrollAddItem(vnode, {
                  dom: subnode.dom,
                  className: 'visible',
                  threshold: -100,
                  img: '/assets/images/videoconference.svg',
                })
              },
            }),
            m('aside', [
              m('div.item', {
                oncreate: function(subnode) {
                  Helper.scrollAddItem(vnode, {
                    dom: subnode.dom,
                    className: 'visible',
                    threshold: -100,
                  })
                },
              }, [
                m('h3', 'Ekki missa af neinu!'),
                m('p', `
                  Aðstæður fólks eru æði ólíkar og ekki geta allir komist á
                  alla viðburði, hvort sem er vegna fjarlægðar, fötlunar eða
                  tímaleysis. Við bjóðum upp á upptöku og streymiþjónustu
                  fyrir hvers kyns viðburði til að færa þá nær fólki í tíma
                  og rúmi. 
                `),
                m('p', `
                  Innifalið í þjónustunni er streymigluggi, upptaka og
                  úrvinnsla myndefnis með sundurgreiningu eftir ræðumanni
                  eða umræðuefni, tilbúið til birtingar á netinu og/eða
                  í varðveislu á stafrænu formi.
                `),
              ]),
            ]),
          ]),
        ]),
      ]),
    ]
  },
}

/*
<a href="https://www.freepik.com/free-photos-vectors/background">Background vector created by macrovector - www.freepik.com</a>
*/

module.exports = Streaming
