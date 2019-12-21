const m = require('mithril')
const Helper = require('../helper')

const Programming = {
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
          m('video', {
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
          ),
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
                })
              },
              style: {
                backgroundImage: 'url("/assets/images/programmingintro.svg")',
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
                  Með margra ára reynslu í forritun og mikla þekkingu þegar
                  kemur að vefsíðugerð, að þá er ekkert sem hefur stoppað okkur
                  í að leysa krefjandi verkefni. Hvort heldur sem það er flókin
                  útfærsla á hönnun og innleiðing þess í HTML/CSS eða setja
                  upp greiðslugáttir og áskriftaleiðir hjá mismunandi aðilum
                  að þá erum við sérfræðingar í þeim hlutum.
                `),
                m('p', `
                  Forritunartungumál skipta okkur ekki máli enda er það bara
                  tól til að vinna með. Hvaða tækni sem þú notar, node eða
                  python eða C# eða hvað svo sem það er, að þá lætur það ekkert
                  stoppa okkur.
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
                })
              },
              style: {
                backgroundImage: 'url("/assets/images/programmingstore.svg")',
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
                  Okkar mesta stolt var að búa til sölukerfi frá grunni í
                  síðuformi, byggt frá grunni til að vera einföld í notkun
                  og henta lítil fyrirtæki. Sölukerfið býður upp á pantana-
                  og birgðakerfi sem og vefverslunarframenda. Allt kerfið er
                  svo hægt að fá í einum pakka, með eða án posa og tilbúið til
                  notkunar.
                `),
                m('p', `
                  Við höfum einnig breytt vefverslunarframendanum til að passa
                  fyrir hvert fyrirtæki og þeirra vörumerki. Við vinnum með
                  hverjum og einum og pössum upp á að skilja aldrei frá hlutum
                  fyrr en allir eru sáttir.
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
                })
              },
              style: {
                backgroundImage: 'url("/assets/images/programmingcontractor.svg")',
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
                m('h3', 'Verktakavinna heim til þín'),
                m('p', `
                  Ef það er tímapressa hjá þér, að þá erum við alltaf tilbúnir
                  að koma beint inn í hús til ykkar og vinna verktakavinnu
                  á ykkar vinnustað. Við vinnum alltaf með ykkar fólki og
                  getum aðlagast hvaða vinnureglum sem er.
                `),
                m('p', `
                  Okkar fólk hefur verið vel tekið hvert sem við förum og
                  höfum alltaf skilið hlutum frá okkur í tilbúnu formi.
                  Hverjar svo sem sem vandamálin kunna að liggja að þá geturðu
                  treyst því að við munum finna lausn saman og redda málunum.
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
