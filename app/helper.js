const Helper = {
  init: function(vnode, filename, options) {
    vnode.state.domImg = null
    vnode.state.domVideo = null
    vnode.state.domContainer = null

    vnode.state.videoShow = false
    vnode.state.videoFilename = filename
    vnode.state.resizePauseTimeout = null
    vnode.state.resizeTimeout = null
    vnode.state.videoResizeThrottler = Helper.resizeThrottler.bind(vnode.state, vnode)
    vnode.state.scrollListener = null
    vnode.state.scrollListenerTicking = false
    vnode.state.scrollListenerWaiting = []
    vnode.state.videoVisibilityHidden = ''
    vnode.state.videoVisibilityEvent = null
    vnode.state.videoVisibilityChanged = null
    vnode.state.videoResizeRatio = options && options.ratio || 1
    vnode.state.videoUrl = screen.width > 1280
      ? '/assets/cover/' + filename + '_1080.mp4'
      : '/assets/cover/' + filename + '_720.mp4'
  },

  clear: function(vnode) {
    vnode.state.scrollListenerWaiting.splice(0, vnode.state.scrollListenerWaiting.length)
    window.removeEventListener('resize', vnode.state.videoResizeThrottler)
    window.removeEventListener('scroll', vnode.state.scrollListener, false)
    window.removeEventListener(vnode.state.videoVisibilityEvent, vnode.state.videoVisibilityChanged)
  },

  scrollListener: function(vnode) {
    if (!vnode.state.scrollListenerWaiting.length) return
    
    let scrollTop = window.pageYOffset
    let height = window.innerHeight

    for (var i = 0; i < vnode.state.scrollListenerWaiting.length; i++) {
      Helper.scrollItemIsVisible(vnode, vnode.state.scrollListenerWaiting[i], scrollTop, height)
    }
  },

  scrollCheckEmpty: function(vnode) {
    if (vnode.state.scrollListenerWaiting.length) return

    vnode.state.scrollListener = null
    window.removeEventListener('scroll', vnode.state.scrollListener, false)
  },

  scrollAddItem: function(vnode, options) {
    let bound = options.dom.getBoundingClientRect()
    let scrollTop = window.pageYOffset

    let item = {
      dom: options.dom,
      threshold: options.threshold || 100,
      top: Math.round(bound.top) + Math.round(scrollTop),
      className: ' ' + options.className,
      ticking: false,
    }

    vnode.state.scrollListenerWaiting.push(item)

    if (!vnode.state.scrollListener) {
      vnode.state.scrollListener = Helper.scrollListener.bind(vnode.state, vnode)
      window.addEventListener('scroll', vnode.state.scrollListener, false)
    }
    Helper.scrollItemIsVisible(vnode, item, window.pageYOffset, window.innerHeight)
  },

  scrollResetBound: function(vnode) {
    let scrollTop = window.pageYOffset

    vnode.state.scrollListenerWaiting.forEach(function (item) {
      let bound = item.dom.getBoundingClientRect()
      item.top = Math.round(bound.top) + Math.round(scrollTop)
    })
  },

  scrollItemIsVisible: function(vnode, item, scrollTop, height) {
    if (item.ticking) return

    if (item.top - item.threshold < scrollTop + height) {
      item.ticking = true

      requestAnimationFrame(function() {
        item.dom.className += item.className
        let index = vnode.state.scrollListenerWaiting.indexOf(item)

        if (index >= 0) {
          vnode.state.scrollListenerWaiting.splice(index, 1)
        }
        Helper.scrollCheckEmpty(vnode)
      })
    }
  },

  checkCreated: function(vnode) {
    if (!vnode.state.domImg || !vnode.state.domVideo || !vnode.state.domContainer) return

    vnode.state.videoShow = Boolean(vnode.state.domVideo.play)

    window.addEventListener('resize', vnode.state.videoResizeThrottler, false)

    Helper.resizeHandler(vnode)
    if (vnode.state.videoShow) {
      vnode.state.domVideo.play()

      if (typeof document.hidden !== 'undefined') { // Opera 12.10 and Firefox 18 and later support 
        vnode.state.videoVisibilityHidden = 'hidden'
        vnode.state.videoVisibilityEvent = 'visibilitychange'
      } else if (typeof document.msHidden !== 'undefined') {
        vnode.state.videoVisibilityHidden = 'msHidden'
        vnode.state.videoVisibilityEvent = 'msvisibilitychange'
      } else if (typeof document.webkitHidden !== 'undefined') {
        vnode.state.videoVisibilityHidden = 'webkitHidden'
        vnode.state.videoVisibilityEvent = 'webkitvisibilitychange'
      }

      if (vnode.state.videoVisibilityHidden && vnode.state.videoVisibilityEvent) {
        vnode.state.videoVisibilityChanged = Helper.visibilityChanged.bind(this, vnode)

        document.addEventListener(vnode.state.videoVisibilityEvent, vnode.state.videoVisibilityChanged, false)
      }
    }
  },

  visibilityChanged: function(vnode) {
    if (document[vnode.state.videoVisibilityHidden]) {
      vnode.state.domVideo.pause()
    } else {
      vnode.state.domVideo.play()
    }
  },

  resizeThrottler: function(vnode) {
    if (vnode.state.videoShow) {
      if (!vnode.state.resizePauseTimeout) {
        vnode.state.domVideo.pause()
      }
      clearTimeout(vnode.state.resizePauseTimeout)
      vnode.state.resizePauseTimeout = setTimeout(function () {
        vnode.state.resizePauseTimeout = null

        requestAnimationFrame(function() {
          Helper.scrollResetBound(vnode)
          vnode.state.domVideo.play()
        })
      }, 250)
    }

    if (!vnode.state.resizeTimeout) {
      vnode.state.resizeTimeout = setTimeout(function () {
        vnode.state.resizeTimeout = null
        Helper.resizeHandler(vnode)
      }, 66)
    }
  },

  resizeHandler: function(vnode) {
    var height = Helper.getHeight(vnode)
    var width = document.documentElement.clientWidth

    Helper.scaleContainer(vnode, height)
    Helper.scaleContainerContent(vnode, 'domImg', true, width, height)
    Helper.scaleContainerContent(vnode, 'domVideo', false, width, height)
  },

  lazyLoadImage: function(vnode, name, url) {
    if (!vnode.state[name]) return

    var img = document.createElement('img')
    img.onload = function() {
      vnode.state[name].src = url
    }
    img.src = url
  },

  scaleContainer: function(vnode, height) {
    if (!vnode.state.domContainer) return
    vnode.state.domContainer.setAttribute('style', 'height: ' + height + 'px;')
  },

  scaleContainerContent: function(vnode, name, forceHeight, width, height) {
    if (!vnode.state[name]) return

    var videoRatio = 0.5625
    var windowRatio = height / width

    if (windowRatio > videoRatio) {
      var videoWidth = height / videoRatio
      var marginFromLeft = -(videoWidth - width) / 2 + 'px'
        vnode.state[name].setAttribute('style',
            'margin-top: 0; margin-left: ' + marginFromLeft + ';' +
            'width: ' + videoWidth + 'px; height: ' + height + 'px')
    } else {
        if (forceHeight) {
            vnode.state[name].setAttribute('style',
                'width: ' + width + 'px; height: ' + height + 'px')
        } else {
            vnode.state[name].setAttribute('style',
                'width: ' + width + 'px;')
        }
    }
  },

  getHeight: function(vnode) {
    var height = document.documentElement.clientHeight + 5
    if (height < 485) {
        height = 485
    } else {
      height = height * vnode.state.videoResizeRatio
    }
    return height
  },
}

window.helper = Helper

module.exports = Helper
