var m = require('mithril')
var Helper = require('../helper')

var Programming = {
  oninit: function(vnode) {
    Helper.init(vnode, 'programming')
  },

  onremove: function(vnode) {
    Helper.clear(vnode)
  },

  view: function(vnode) {
    return [
      m('header.programming', {
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
                src: '/assets/cover/programming.webm',
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
                Helper.lazyLoadImage(vnode, 'domImg', '/assets/cover/programming.jpg')
                Helper.checkCreated(vnode)
              },
              src: ' data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAA0JCgsKCA0LCgsODg0PEyAVExISEyccHhcgLikxMC4pLSwzOko+MzZGNywtQFdBRkxOUlNSMj5aYVpQYEpRUk//2wBDAQ4ODhMREyYVFSZPNS01T09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0//wgARCABaAKADASIAAhEBAxEB/8QAGQAAAwEBAQAAAAAAAAAAAAAAAQIDAAQF/8QAFwEBAQEBAAAAAAAAAAAAAAAAAQACA//aAAwDAQACEAMQAAAB8adF6cJioGIqprZ2RWdHICE0FoBe/PXXNpOqQleOO3YCmuZyGXA0F50gqyICGNYOsEgpObzztZUnnp1HDfPBhSYqaLzeHDFyuc0qNKnE0NUmozsqcPVhPfOw58NxHTXSNdTSOudMi00gpoqQaG2HY6qCra5846lnnFgMxUUrYVRAKzK7bNnKFtShsVWiUrkKKApqtefocvLoVxzC6G5CoGaXgKhBno4XT//EABsQAAMBAQEBAQAAAAAAAAAAAAABERAgMBIC/9oACAEBAAEFAnkITqlHixof5GvN8TaUfcITiE4ePKPaUomXwePxXVPo+hsvknkyD8aUvCFtGy+DKUpcQtflCEIQmXqEIQhMhCE2HzyvC9JHyP8AJCEJtKUvaPzr5fP/xAAaEQADAAMBAAAAAAAAAAAAAAAAAREQEiAC/9oACAEDAQE/AUUpS4oxU88PlC4eKI1EsQ1NSEIJcU2KXLKXEz6EylEQh//EABkRAAIDAQAAAAAAAAAAAAAAAAARASAwEP/aAAgBAgEBPwG8cnKcGPrGO6EIWUUkYz//xAAUEAEAAAAAAAAAAAAAAAAAAABw/9oACAEBAAY/AnD/xAAcEAEBAQEBAQADAAAAAAAAAAABABEQICEwMUH/2gAIAQEAAT8hWyeFkFkFudvqD7OPAKT4SyILISQWcBDnLXLZPMsmEJk2RwyDrZTwrbeWnKxeDxifdnHgemz5CXxlknN8DODJZPneuLS+Xzwb0M2fLLyGyl8t4pss9Jw+cZkQbZeB6AwNjm1mWX3asT8LZY4GZ4ZFI4PN4JLnnDhx8H8np4/rl8f/2gAMAwEAAgADAAAAEBr/AJK106M1iZzHPUQsF7qTyBHmplEJPpqBT2lWE8Kfxs8s7ywQsqGwhiTaN5D/xAAbEQEBAQEBAAMAAAAAAAAAAAABABEQITFRYf/aAAgBAwEBPxBZCiMNWHB+rCSxtljajZ2Gb4djEHoDAYSI1yR8zDUJAW23mKX92jAStWoXjPYIZJDhT1g2L//EABkRAQEBAQEBAAAAAAAAAAAAAAEAERAhIP/aAAgBAgEBPxBsLIJL2zhyBNt5GT8PwY5krKlcXPibbLPfU9nssWFhIW2y8IWWXi1av//EAB0QAQEBAQEBAAMBAAAAAAAAAAEAERAhMSBBUWH/2gAIAQEAAT8QSas1/wATi1suQt4mEid8MoBey14Z2LIttJx4Pq+YmBl/OXeDfqQZxObQtb25ARjYgpBBycQkrwfEHYJAJk8S96BWyMdEGC0t9ivEvDOHkJyzMXjIkhlm3rBJ+Q+yeRoxk9jgE3eXK8YHbUqaVIZaQaRC4sfk0q2TtlllggFjktKpiNkZacOIYJq28sssmWPyVatWrcu8R7l4NbTKkbIGxsySG8XrPM6SE6z5tbdtJ4vqDln8FDrhhxvLS+SH6hk7YsD15YXgWCHJhYIWZZvLaVIPkH8hP1A35CRiTJ1aJq5bJl5edl+EFnvOQn2/i//Z',
            })
          ),
          m('nav', [
            m(m.route.Link, { class: 'title', href: '/' }, m('span', 'NFP ehf.')),
            m('div.filler'),
            m(m.route.Link, { href: '/hosting-solutions' }, [ 'Hýsingarlausnir', m('div') ]),
            m(m.route.Link, { class: 'active', href: '/programming-solutions' }, [ 'Forritunarlausnir', m('div') ]),
            m(m.route.Link, { href: '/video-solutions' }, [ 'Videólausnir', m('div') ]),
          ]),
          m('div.content', [
            m('h1', 'Sérfræðingar í forritun'),
            m('h2', 'Meira en 20 ára reynsla!'),
          ]),
        ])
      ),
      m('main', [
        // Solutions
        m('article.programmingintro', [
          m('section', [
            m('div.image', {
              oncreate: function(subnode) {
                Helper.scrollAddItem(vnode, {
                  dom: subnode.dom,
                  className: 'visible',
                  threshold: -100,
                  img: '/assets/images/programmingintro.svg',
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
                m('h3', 'Vefsíðuforritun'),
                m('p', `
                  Með margra ára reynslu í forritun og yfirgripsmikla
                  þekkingu þegar kemur að vefsíðugerð, er ekkert sem stoppar
                  okkur í að leysa krefjandi verkefni. Hvort heldur sem um
                  er að ræða útfærslu á hönnun og innleiðing hennar í
                  HTML/CSS eða uppsetningu greiðslugátta og áskriftaleiða
                  hjá mismunandi aðilum að þá erum við sérfræðingar á því
                  sviði.
                `),
                m('p', `
                  Við getum unnið með hvaða forritunartungumál sem er.
                  Hvaða tækni sem þú notar, node, python, C# eða hvað
                  annað tungumál, þá látum við ekkert stoppa okkur.
                `),
              ]),
            ]),
          ]),
        ]),
        m('article.programmingstore', [
          m('section', [
            m('div.image', {
              oncreate: function(subnode) {
                Helper.scrollAddItem(vnode, {
                  dom: subnode.dom,
                  className: 'visible',
                  threshold: -100,
                  img: '/assets/images/programmingstore.svg',
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
                m('h3', 'Sölukerfi og vefverslun'),
                m('p', `
                  Við höfum hannað og þróað sölukerfi frá grunni í síðuformi.
                  Það er byggt til að vera einfalt í notkun og henta fyrir
                  lítil og meðalstór fyrirtæki. Sölukerfið býður upp á
                  pantanakerfi, verkbókhald og birgðakerfi sem og
                  vefverslunarframenda og tengingu við posa.
                `),
                m('p', `
                  Við getum aðlagað vefverslunarframendanum til að passa
                  fyrir hvert fyrirtæki og þeirra vöruframboði. Við vinnum
                  náið með hverjum og einum viðskiptavini og skilum af okkur
                  lausn sem uppfyllir þarfir þeirra.
                `),
              ]),
            ]),
          ]),
        ]),
        m('article.programmingcontracting', [
          m('section', [
            m('div.image', {
              oncreate: function(subnode) {
                Helper.scrollAddItem(vnode, {
                  dom: subnode.dom,
                  className: 'visible',
                  threshold: -100,
                  img: '/assets/images/programmingcontractor.svg',
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
                m('h3', 'Verktakavinna'),
                m('p', `
                  Ef það er tímapressa hjá þér, að þá getum við komið beint
                  til ykkar og unnið verktakavinnu á ykkar vinnustað. Við
                  getum unnið náið með ykkar fólki og aðlagast hvaða
                  vinnureglum sem er.
                `),
                m('p', `
                  Okkar fólki hefur verið vel tekið hvert sem við förum og
                  við höfum ætíð kappkostað að skila frá okkur góðu verki.
                  Hverjar svo sem sem vandamálin kunna að liggja að þá
                  geturðu treyst því að við munum finna lausn á þeim
                  saman og redda málunum.
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

module.exports = Programming
