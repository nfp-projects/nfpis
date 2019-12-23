var m = require('mithril')
var Helper = require('../helper')

var Hosting = {
  oninit: function(vnode) {
    Helper.init(vnode, 'hosting')
  },

  onremove: function(vnode) {
    Helper.clear(vnode)
  },

  view: function(vnode) {
    return [
      m('header.hosting', {
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
                src: '/assets/cover/hosting.webm',
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
                Helper.lazyLoadImage(vnode, 'domImg', '/assets/cover/hosting.jpg')
                Helper.checkCreated(vnode)
              },
              src: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wgARCABaAKADASIAAhEBAxEB/8QAGgAAAwEBAQEAAAAAAAAAAAAAAQIDAAQFBv/EABcBAQEBAQAAAAAAAAAAAAAAAAEAAgP/2gAMAwEAAhADEAAAAfisu652ITFMJkZ5vRZXzRl0L0OdOmc8y1nmutJtHFctzBsVtFkoYmgpWfSeLxpsnSIyaFhWOXqRxm5g0mLo2HEGARqGAr0GiylNNKqobSZB6TNtE+e8am2cUJKJmBDbZexpmih2gBhU0pOqmTZRNptWibplyoihkIrIIVzPc+l25h1x0rz5qxyCzyfDkKJQA406jIQ5WIZSttiy5NTBcRQoT0lUlV0D/8QAHRAAAgMBAQEBAQAAAAAAAAAAAAEQESACMRJBMP/aAAgBAQABBQKy82fvPh0VLEIYznbF7z4OKGhwhjFNlyzn3mHhn6joYi4ssuV7zDw45GP+PPqhllw45GMZe16oeuRsYxZss5FD0hwxFFFFFFCFtilizRQ82WNjFLiyyyz6PoubLLwpYoQ5YtWXCliwoYpelLP/xAAaEQACAwEBAAAAAAAAAAAAAAABEQAQIDBA/9oACAEDAQE/AbVv0vTyjAC6Ii7f/8QAHREAAwEBAQADAQAAAAAAAAAAAAEREBICEyAhMf/aAAgBAgEBPwH8JnWIhBeof3KzoueVRqDYspS6nBu4oMXg+M4H5mcnJzkLDo6G1MXo6LlyE+lLv//EABQQAQAAAAAAAAAAAAAAAAAAAHD/2gAIAQEABj8CcP/EABsQAQEBAQEBAQEAAAAAAAAAAAEAERAhIDFB/9oACAEBAAE/ISepLObM3qExJ4HsPPjb8bxfNMngMft+PibD02ez8d7bL2/PT9cb8BZeS8hnxnn+347jjHwSy+Sj8tnHBZX9l53/AFwNpbx7Py2dtsstsuC4UsMsMxi9l5bK22WeOU8ifMRhGMOMvLZ9sskk4cs8HOBZtlixDGGGG0kSODlb1vHq89memG2Zq1bLPG2ylLLrOP1HG23hiy+R+Dx+o+z83//aAAwDAQACAAMAAAAQQxMUBpQhhWsZvsfymwhtADDvcnRC6d2P9ahJ5zPOwQHzNBJeJ9ae+/zQ637l/8QAGhEAAwEBAQEAAAAAAAAAAAAAAAERECEgMf/aAAgBAwEBPxDpfBuCFIfBKeWLolrqKyl2Y8bxUJrKirVOtHYNglWNbylkyeYTf//EABoRAQEBAQEBAQAAAAAAAAAAAAEAESEQMUH/2gAIAQIBAT8Q24/J58lfPAJO5zJxMBiBXT43BI8bjl1JkcQMsWnn4Jfpvt27YXkqbfEqTwJtygg1tl2wbG5sCd4yPDuzHwdY6nEngypUtrf/xAAbEAEBAQEBAQEBAAAAAAAAAAABABEhEDFBIP/aAAgBAQABPxBCQOwrGJ5ckX7ATl8JLXxU8jw5ehWcjL8nZWy8uU9N8I+2ZDF44+79w0uGcfviqOLOyM8PmfMPZz150mZ46od8KDYyTuMEdXG0L53D6pjcSly2vnz8eDu3l3ZeS74JNJyx50J147ep0Q43EAwn2W+WM7CbIycy5nBF2j+AkbcbhC2d8E/JNllk2TLS8keI9Byu3K4Slbvg3bM8V2fJuvgIIO363Hjp66JdMsHwCM5bCEHG4XSH9uXqQQ+TxL4CzhjC6TF5kp+w74eEPJjfg5zxPl4XazOy1jUlQ8ly2VmTPo+19JIXx4Pfz7PiPD6+h6//2Q==',
            })
          ),
          m('nav', [
            m(m.route.Link, { class: 'title', href: '/' }, m('span', 'NFP ehf.')),
            m('div.filler'),
            m(m.route.Link, { class: 'active', href: '/hosting-solutions' }, [ 'Hýsingarlausnir', m('div') ]),
            m(m.route.Link, { href: '/programming-solutions' }, [ 'Forritunarlausnir', m('div') ]),
            m(m.route.Link, { href: '/video-solutions' }, [ 'Videólausnir', m('div') ]),
          ]),
          m('div.content', [
            m('h1', 'Hýsingarlausnir sem þú getur treyst'),
            m('h2', 'SÝNDARVÉLAR, WORDPRESS, GEYMSLUHÝSING, OG HVAÐ EINA!'),
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
                  img: '/assets/images/hostintro.svg',
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
                m('h3', 'Vefhýsing'),
                m('p', `
                  Við getum boðið okkar viðskiptavinum upp á margskonar
                  lausnir þegar kemur að hýsa þeirra vefi. Meðal þess sem
                  við höfum reynslu af er að setja upp sýndarvélar sem þú
                  getur haft fulla umsjá með og gert hvað svo sem þig lystir
                  með en einnig sérhæfum okkur í að bjóða upp á
                  alsherjarlausnir þar sem við sjáum um alla uppsetningu og
                  umsjón svo að þú getir haft athyglina á öðrum þáttum
                  reksturs þíns.
                `),
                m('p', `
                  Ef þig vantar Wordpress/PHP uppsetningu eða hefur sérhæfða
                  síðu og vilt nota docker eða node þá munar okkur ekki um
                  það. Okkar kerfi geta séð um að mæta þínum þörfum hverjar
                  sem þær eru.
                `),
              ]),
            ]),
          ]),
        ]),
        m('article.hoststorage', [
          m('section', [
            m('div.image', {
              oncreate: function(subnode) {
                Helper.scrollAddItem(vnode, {
                  dom: subnode.dom,
                  className: 'visible',
                  threshold: -100,
                  img: '/assets/images/hostfile.svg',
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
                m('h3', 'Gagnageymslur og skölun myndefnis'),
                m('p', `
                  Örugg geymsla gagna er sífellt mikilvægari þáttur fyrir
                  fyrirtæki. NFP ehf. hefur boðið upp á gagnageymslu fyrir
                  fyrirtæki til að geyma sín afrit eða vinnslugögn sem
                  starfsmenn geta haft aðgang að og unnið með hvar sem
                  þeir eru staddir í heiminum. 
                `),
                m('p', `
                  Við getum einnig séð um hvers kyns meðhöndlun myndgagna
                  svo sem endurkóðun upptökuefnis til að lágmarka rýmisþörf
                  með bestu mögulegu gæðum eða skölun á myndum fyrir
                  vefsíðubirtingar. Lausnir okkar eru skilvirkar og
                  afkastamiklar.
                `),
              ]),
            ]),
          ]),
        ]),
        m('article.hostmanaged', [
          m('section', [
            m('div.image', {
              oncreate: function(subnode) {
                Helper.scrollAddItem(vnode, {
                  dom: subnode.dom,
                  className: 'visible',
                  threshold: -100,
                  img: '/assets/images/hostmanaged.svg',
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
                m('h3', 'Láttu okkur sjá um viðhaldið'),
                m('p', `
                  Það getur verið kúnst að viðhalda sýndarvélum og
                  heimasíðum og Það er ekki á allra hendi að framkvæma
                  Wordpress uppfærslur eða prófanir á öryggisafritum.
                `),
                m('p', `
                  Þú átt að geta einbeitt þér að þínu sérsviði. Þess vegna
                  bjóðum við upp á að sjá um allt sem kemur að viðhaldi og
                  gæðaeftirliti. Við fylgjumst vel með þróuninni, gerum
                  reglulegar uppfærslur og tryggjum að allt virki sem
                  skildi.
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

module.exports = Hosting
