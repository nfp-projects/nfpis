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
              src: ' data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAlgCWAAD/2wBDAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5Ojf/2wBDAQoKCg0MDRoPDxo3JR8lNzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzf/wAARCABaAKADASIAAhEBAxEB/8QAGwAAAQUBAQAAAAAAAAAAAAAAAgEDBAUGAAf/xAApEAACAQMCBQUBAQEBAAAAAAAAAQIDBBEFURIhMUFCExQyUmEiFQZi/8QAFwEBAQEBAAAAAAAAAAAAAAAAAAECA//EABgRAQEBAQEAAAAAAAAAAAAAAAABEQIS/9oADAMBAAIRAxEAPwD1vIuQMnZMtHMnZAyLkAsnCZOAXJ2RDshC5FyNuWBHUQDuReIjuqgXW/QuJXEdxohut+g+v+jBYKQrkQFcpdwJ3aS6jBOnVS7kepcLcr6t3nuR3cZfUYLGVfI26mSEqv6Gqq3LirJVVuEqi3MdDX4t/IlUtcg/IzibGpUkLxIoKerwl5IeWpwfkXBdcSF41uUv+lH7CPU4ryGC6dRLuNTrpdyjq6tFeRDq6svsXE1oZ3K3GZXS3M1U1ZfYYnqy+xcPUal3S3AldLcy61ZfY56on5DD00c7tbjMr3Hcz0tST8hmeoZ7lxPTRu+/RuV7nuZuV/8AoPv/ANLjPpoHdZ7ne6W5n1fLcX3q3GHpf+8W5zvf0z/vM9zvd/oxfTIrUZryY9T1WcfJlO0C20YnS3ixpqOtzXkS4a88fIxqm9w1UluXUytj/uv7Ay11/YyPqS3BlVluXYllamett+QxPV2/IzLqy3BdaW5dZaKeqt+Q29Sb8ig9Z7neqxpi/Wov7DkdQb8jPKqxyNZ7jTKv/fvcF3/6UnrPcB1mXUXjvs9wfevcpPWZ3rsaYvFevcNXv6UKrsJV2TTGgjefoSvP0oFcPcJXL3GmUzxoBzTI8pgeoc5y73tK4kFGSIfqixqFxPSdlDc2hj1QJVcjC9HWwJMBSbDUJS6FYBxCqQ4rab7C+1muzABSDizlbz2YvozXYAlzOcREmuoaawVDTQgU2N8XMAkORQ3EegZrfMI1gDOB6XQjzeGJVsM8LBcWXD0+S7AOylsaYyqngYqi0WUrRrsNSt5LsDEJpg4bZMdB7CKg89Alda0HNrkX1hpbq45EPT6aUllGx0dQ5ZwCI1DQMr4jk9ASXxNdbRpuK6Eh28ZdEGmFWg5fxOq/8/8Az8Te07KOw5Oyi49AY8mvdHlTz/JT17eVNvketajpamniJldS0ZrLUQlYSaaG8PJe3WmTi3/JCnZSj2CIlMkwiAqMovoPQWCWN803UWEQ6mck+cckWrASFr1Cpoa+pGnoX/k2korYblFbIy6MRU0J/Ui1NCf1N5OMdkMVIR2QRgp6I14katpTgvibyrCOHyRU6hFcL5IqVk6Vs4S6F1p/FBojYXqFjaLmi6xi5tK0kkW9vXylllJR6Im0WaZ1eU60R+M1IqKbe5NoMiypE6SmuhBudPjUT5FkuhzCspdaJGTf8lVcaCueIm5qJbEWtFY6IDzq70Vwy+Ep7i0dJ4wej38Y8L5Ix+qpcT5BKz8oDFannsTpdRuaRLVk1//Z',
            })
          ),
          m('nav', [
            m(m.route.Link, { class: 'title', href: '/' }, m('span', 'Dokument Films')),
          ]),
          m('div.content', [
            m('h1', 'Independent films and documentaries'),
            m('h2', 'Einar Thorsteinsson and Skapti Olafsson '),
          ]),
        ])
      ),
      m('main', [
        // Solutions
        m('article.whoami', [
          m('h3', [
            'What we stand for',
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
                m('h5', 'The team'),
                m('p', `
                  We are Einar Thorsteinsson and Skapti Olafsson and combined we have 
                  many years of experience behind us when it comes to TV and movies.
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
                m('h5', 'What we do'),
                m('p', `
                  Dokument Films is a Reykjavik-based film production company
                  formed in 2019 to make high quality, cost-effective independent
                  films and documentaries.
                `),
              ]),
            ]),
            m('div.image', {
              oncreate: function(subnode) {
                Helper.scrollAddItem(vnode, {
                  dom: subnode.dom,
                  className: 'visible',
                  threshold: -100,
                  img: '/assets/images/team_alt.svg',
                })
              },
            }),
          ]),
        ]),
        m('article.passion', [
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
                m('h3', 'Documentaries on the rise'),
                m('p', [
                  'With the coming of digital age in streaming services, more and more ',
                  ' people are becoming interested in documentaries. With the advent of ',
                  'services like ',
                  m('a', { href: 'https://curiositystream.com/', target: '_blank'}, 'Curiosity Stream'),
                  ' and ',
                  m('a', { href: 'https://watchnebula.com/', target: '_blank'}, 'Nebula'),
                  ', it is clear that people at this day and age are discovering the wonderful ',
                  'world of documentaries.',
                ]),
              ]),
            ]),
            m('div.image', {
              oncreate: function(subnode) {
                Helper.scrollAddItem(vnode, {
                  dom: subnode.dom,
                  className: 'visible',
                  threshold: -100,
                  img: '/assets/images/discover.svg',
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
