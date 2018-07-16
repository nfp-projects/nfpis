const m = require('mithril')

const Front = {
  view: function() {
    return [
      m('header', m('h1', 'NFP ehf.')),
      m('main', [
        m('section',
          m('p', `
            Software development, video production,
            live streaming, software operations
            or whatever your needs may be, NFP ehf.
            has the resource and technical knowledge
            to approach any and all needs.
          `)
        ),
        m('aside',
          m('span', 'Contact us'),
          m('h3', 'nfp@nfp.is')
        ),
        m('section', [
          m('h5', 'Sample of our clients'),
          m('div.clients', [
            m('a.client.stjornarrad', {
              href: 'https://www.stjornarradid.is/',
              target: '_blank',
            }, 'Stjórnarráðið'),
            m('a.client.aranja', {
              href: 'https://aranja.com/',
              target: '_blank',
            }, 'Aranja'),
            m('a.client.jokula', {
              href: 'http://jokula.is/',
              target: '_blank',
            }, 'Jokula'),
            m('a.client.filadelfia', {
              href: 'http://filadelfia.is/',
              target: '_blank',
            }, 'Filadelfia'),
          ]),
        ]),
        m('footer',
          m('span', m.trust('Copyright &copy; 2018 NFP ehf. :: Kennitala: 250689-2849 :: 0133-26-011111')),
        ),
      ]),
    ]
  },
}

module.exports = Front
