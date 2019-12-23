var m = require('mithril')
var Helper = require('../helper')

var Front = {
  oninit: function(vnode) {
    Helper.init(vnode, 'frontpage', {
      ratio: 0.91,
    })
  },

  view: function(vnode) {
    return [
      m('header', {
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
                src: '/assets/cover/frontpage.webm',
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
                Helper.lazyLoadImage(vnode, 'domImg', '/assets/cover/frontpage.jpg')
                Helper.checkCreated(vnode)
              },
              src: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAQCAwMDAgQDAwMEBAQEBQkGBQUFBQsICAYJDQsNDQ0LDAwOEBQRDg8TDwwMEhgSExUWFxcXDhEZGxkWGhQWFxb/2wBDAQQEBAUFBQoGBgoWDwwPFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhb/wgARCABaAKADASIAAhEBAxEB/8QAGgAAAwEBAQEAAAAAAAAAAAAAAgMEAQAFB//EABkBAQEBAQEBAAAAAAAAAAAAAAECAAMEBf/aAAwDAQACEAMQAAAB+fctH2/iXeVbCXGuni5OaBWbztuNz9PnjWrPE2zT5h18PkJrjOnsFG6uRzkootzKNxwotobs1ezjvBwuphfgk1rSNdy5uN01MW4+RUEUZZ9QZaL5pZlDkIulMruzVrU6b0VTBh0uKnox8JcbYpeKfDwtfKy4vf5xdOd8yNRnGSJ49ypbUzSsII6Bhr8/TCAlPu657eYHFXLcBobWoYjail8FNS6SpOJV0jHTz9DfJ6TPrriILonHqhG1CDx25jnYvaHWSX1znHGUFndU/wD/xAAhEAADAAICAwADAQAAAAAAAAAAAQIQEQMgEiExEyJBQv/aAAgBAQABBQKnomi/nMhoazsQkeLGsSxo8B8Xq51jleyH7q/XI8NDRo0SiEPQ9D0cSR4IekO1rmYxVi2POjQlhMqjZsm9H5CmbGNCoVlMQxCHljyiUeA4ND0KiWJbNaGySPZaxJQ8MRLFfqqLY2SShVpclmxUcfIO9n9lFIrrsbHRs4hsqjeUyWQzzHRWNZYx4iiqN9EJio2eRskZo0Uhjwhvuuks2JiKkpDRrDwukSeH63mTYmcbGx9dCgc4Qq0fl9N7ymbJJ+VWIKWYJOT4+iH04/v+f6/kjP/EABwRAAIDAQEBAQAAAAAAAAAAAAABAhARIBIhQf/aAAgBAwEBPwFISNNN4TEZ2zRSJU4jTVK1EURx+nkwaHE82rfGGDQhOpPBPTDKwkYfp//EABwRAAMBAAIDAAAAAAAAAAAAAAABERAgIQISMP/aAAgBAgEBPwG5ONHl+ME8TLxpTxfR7FExMuseJ6mUpcaKJUfRRMpRMuf/xAAUEAEAAAAAAAAAAAAAAAAAAABw/9oACAEBAAY/AnD/xAAbEAEBAQEBAQEBAAAAAAAAAAABABEQISAxQf/aAAgBAQABPyF1bwG+ndzIb1wzwS9mkYTJN0kMx4G8e9hhxlt58hqUyJxeJCspGCwlsc9TfWDDpb4ZQ0nZUVl5+NuXq8XqPnOw63gn78Nr2cUnxQ8QOKsCzn9hyIhxmxT1vDmdnijSeXBgEGzxhztY4PO8wEYcWrb8SAI0lrBMzpdYcGb9I3wXLYnqDhh5wGIJi23LwZO/KXlevJumQ2/srbbNtGDPDbEvJ6DzmSWWwxqSUgyRlov4cyw3jM9Mc1JtrDYt4X7j5Cfvj1+oj4L2P1f/2gAMAwEAAgADAAAAEJfK1cHvJurU1ZyigO6xZhbQ1tS7V0hPtb08C1iCrD9IB0dS0jX6/HNHdekp0f/EABgRAQEBAQEAAAAAAAAAAAAAAAEAERAh/9oACAEDAQE/ENSYhkBkFvHCSazlg8ktnWCyxB4AIFZElJZRJt6WVtAHG/HxLjbyR6+wsZScWY7bGSccljCDJLDLOw9ywcf/xAAbEQEBAQADAQEAAAAAAAAAAAABABEQITFRMP/aAAgBAgEBPxBxbs6syBlS2+ODdre4bLznJJjSwka4SeHE/kVp0tQwvpaStlEIT20vUUOpeStq3NCh0v/EAB4QAQEBAQEBAQEBAQEAAAAAAAEAESExEEFRYbEg/9oACAEBAAE/EOyheLb6MeWjwlPy0pSYKt4hOHkL8jDZMJvpI+MreSMJZMI5B3YeNib2yuxZ5dvPgu3hyINJjOFrvkqGxy2PJL+WnxI8u1wVkzdkHvznOy7xv8LP4CrI2fc2dPWF/YvjY/bvbL/Znbd5AdGBxsftdrhPV6p4xiSHKM625YW3ELWAb38gf5J/ZWItFEubFsMFi0tcS+wUzJB7Dfhw2V8E3ht9bNvs6hAtln8ujGXfZj9mDv0dHexEFy3sjJhT9gY2Y7sqZto2TWxZIvtt+yMMlH2Vw2A6sZm3uYeDKy3ESwmS9TIM2RPZF9+NllYfs2Zs/wBreZts9n6RxyReQw8kyTYXMhqy5FDfiO2iFsY2W2LG8t71iU2Nhd2Knkfy8sCkT4uSNQoQ7B1zyI4T3IYCBvti8ZXOxc7IPYlkHs/7+GmT4RXlo7A9R6Fp6WxdmGeIm77NElszIzjGNYHE+Xu8Is8Ihc/Pu2F33/xniPbyn/i/7wM8nnnz/9k=',
            })
          ),
          m('nav', [
            m(m.route.Link, { class: 'title', href: '/' }, m('span', 'NFP ehf.')),
            m('div.filler'),
            m(m.route.Link, { href: '/hosting-solutions' }, [ 'Hýsingarlausnir', m('div') ]),
            m(m.route.Link, { href: '/programming-solutions' }, [ 'Forritunarlausnir', m('div') ]),
            m(m.route.Link, { href: '/video-solutions' }, [ 'Videólausnir', m('div') ]),
          ]),
          m('div.content', [
            m('h1', 'Nýjir tímar kalla á nýjar lausnir'),
            m('h2', '...og við erum með þær'),
          ]),
        ])
      ),
      m('main', [
        // Solutions
        m('article.solution', [
          m('h3', [
            'Hvað getum við gert fyrir þig?',
            m('div.left'),
            m('div.right'),
          ]),
          m('section', [
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
                m('h5', 'Þínar þarfir'),
                m('p', `
                  Þarfir fólks og fyrirtækja eru margvíslegar og krefjast
                  oft sérstæðrar nálgunar. Starfslið okkar hefur víðtæka
                  reynslu í þarfagreiningu og útfærslum á ýmsum sviðum
                  hins stafræna nútíma. 
                `),
              ]),
              m('div.item', {
                oncreate: function(subnode) {
                  Helper.scrollAddItem(vnode, {
                    dom: subnode.dom,
                    className: 'visible',
                    threshold: -100,
                  })
                },
              }, [
                m('h5', 'Okkar lausnir'),
                m('p', `
                  Hvort sem þú ert að leitast eftir hýsingu, hugbúnaðargerð,
                  vefhönnun, streymi- eða upptökulausnum, þá erum við með
                  þekkinguna og reynsluna. Við erum alltaf tilbúnir til
                  leiks og elskum að taka að okkur krefjandi verkefni.
                `),
              ]),
            ]),
            m('div.image', {
              oncreate: function(subnode) {
                Helper.scrollAddItem(vnode, {
                  dom: subnode.dom,
                  className: 'visible',
                  threshold: -100,
                  img: '/assets/images/solutions.svg',
                })
              },
            }),
          ]),
        ]),
        // Solutions
        m('article.hosting', [
          m('section', [
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
                m('h3', 'Hýsingarlausnir'),
                m('p', `
                  Hvort heldur sem þig vantar vefhýsingu, sýndarvélar eða
                  geymslu og meðhöndlun gagna þá getum við fundið lausn sem
                  hentar þér.
                `),
                m(m.route.Link, { class: 'next', href: '/hosting-solutions' }, 'Lesa meira'),
              ]),
            ]),
            m('div.image', {
              oncreate: function(subnode) {
                Helper.scrollAddItem(vnode, {
                  dom: subnode.dom,
                  className: 'visible',
                  threshold: -100,
                  img: '/assets/images/hosting.svg',
                })
              },
            }),
          ]),
        ]),
        // Programming
        m('article.programming', [
          m('section', [
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
                m('h3', 'Forritunarlausnir'),
                m('p', `
                  Ef þig vantar sérlausn eða aðstoð með þín verkefni að þá
                  getum við hjálpað þér. Við höfum yfir 20 ára reynslu í
                  forritun og hugbúnaðargerð. 
                `),
                m(m.route.Link, { class: 'next', href: '/programming-solutions' }, 'Lesa meira'),
              ]),
            ]),
            m('div.image', {
              oncreate: function(subnode) {
                Helper.scrollAddItem(vnode, {
                  dom: subnode.dom,
                  className: 'visible',
                  threshold: -100,
                  img: '/assets/images/programming.svg',
                })
              },
            }),
          ]),
        ]),
        // Programming
        m('article.video', [
          m('section', [
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
                m('h3', 'Streymi- og upptökulausnir'),
                m('p', `
                  Hvort sem er að ræða fundi eða ráðstefnur þá tökum við að
                  okkur upptökur og streymingu á þeim. Við höfum margra ára
                  reynslu og getum unnið í hvaða sal sem er.
                `),
                m(m.route.Link, { class: 'next', href: '/video-solutions' }, 'Lesa meira'),
              ]),
            ]),
            m('div.image', {
              oncreate: function(subnode) {
                Helper.scrollAddItem(vnode, {
                  dom: subnode.dom,
                  className: 'visible',
                  threshold: -100,
                  img: '/assets/images/video.svg',
                })
              },
            }),
          ]),
        ]),
      ]),
    ]
  },
}

/*
<a href="https://www.freepik.com/free-photos-vectors/background">Background vector created by macrovector - www.freepik.com</a>
*/

module.exports = Front
