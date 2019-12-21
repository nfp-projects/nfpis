const m = require('mithril')

const Footer = {
  oninit: function() {
  },

  view: function() {
    return [
      m('div.innerbox', [
        m('div.image'),
        m('aside', [
          m('h3', 'Hafðu samband'),
          m('p', `
            Sendu okkur email og lýstu þínum þörfum og við munum koma til móts
            við þín. Við erum ekki feimnir og höfum alltaf gaman að því að
            hefja nýja vináttusambönd við alla okkar viðskiptavini.
          `),
          m('h5', 'nfp@nfp.is'),
        ]),
      ]),
    ]
  },
}

/*
 <a href="https://www.freepik.com/free-photos-vectors/background">Background vector created by pikisuperstar - www.freepik.com</a> 
*/

module.exports = Footer
