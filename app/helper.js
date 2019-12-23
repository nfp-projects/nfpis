var Helper = {
  init: function(vnode, filename, options) {
    vnode.state.domImg = null
    vnode.state.domVideo = null
    vnode.state.domContainer = null
    vnode.state.isMobile = Helper.isMobile()

    vnode.state.videoShow = false
    vnode.state.videoFilename = filename
    vnode.state.resizePauseTimeout = null
    vnode.state.resizeTimeout = null
    vnode.state.videoResizeThrottler = Helper.resizeThrottler.bind(vnode.state, vnode)
    vnode.state.scrollListener = null
    vnode.state.scrollListenerWaiting = []
    vnode.state.videoVisibilityHidden = ''
    vnode.state.videoVisibilityEvent = null
    vnode.state.videoVisibilityChanged = null
    vnode.state.videoResizeRatio = options && options.ratio || 1
    vnode.state.videoUrl = screen.width > 1280
      ? '/assets/cover/' + filename + '_1080.mp4'
      : '/assets/cover/' + filename + '_720.mp4'
  },

  isMobile: function() {
    var check = false;
    (function(a) {
      if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check
  },

  clear: function(vnode) {
    vnode.state.scrollListenerWaiting.splice(0, vnode.state.scrollListenerWaiting.length)
    window.removeEventListener('resize', vnode.state.videoResizeThrottler)
    window.removeEventListener('scroll', vnode.state.scrollListener, false)
    window.removeEventListener(vnode.state.videoVisibilityEvent, vnode.state.videoVisibilityChanged)
  },

  scrollListener: function(vnode) {
    if (!vnode.state.scrollListenerWaiting.length) return
    
    var scrollTop = window.pageYOffset
    var height = window.innerHeight

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
    var bound = options.dom.getBoundingClientRect()
    var scrollTop = window.pageYOffset

    var item = {
      dom: options.dom,
      threshold: options.threshold || 100,
      top: Math.round(bound.top) + Math.round(scrollTop),
      bottom: Math.round(bound.bottom) + Math.round(scrollTop),
      className: ' ' + options.className,
      img: options.img || null,
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
    var scrollTop = window.pageYOffset

    vnode.state.scrollListenerWaiting.forEach(function (item) {
      var bound = item.dom.getBoundingClientRect()
      item.top = Math.round(bound.top) + Math.round(scrollTop)
    })
  },

  scrollItemIsVisible: function(vnode, item, scrollTop, height) {
    if (item.ticking) return

    if (item.top - item.threshold < scrollTop + height) {
      item.ticking = true

      if (item.img) {
        Helper.lazyLoadImage(vnode, null, item.img, function() {
          item.dom.style.backgroundImage = 'url("' + item.img + '")'

          requestAnimationFrame(function() {
            item.dom.className += item.className
            var index = vnode.state.scrollListenerWaiting.indexOf(item)

            if (index >= 0) {
              vnode.state.scrollListenerWaiting.splice(index, 1)
            }
            Helper.scrollCheckEmpty(vnode)
          })
        })
      } else {
        requestAnimationFrame(function() {
          item.dom.className += item.className
          var index = vnode.state.scrollListenerWaiting.indexOf(item)

          if (index >= 0) {
            vnode.state.scrollListenerWaiting.splice(index, 1)
          }
          Helper.scrollCheckEmpty(vnode)
        })
      }
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

  lazyLoadImage: function(vnode, name, url, cb) {
    if (!vnode.state[name] && !cb) return

    var img = document.createElement('img')
    img.onload = function() {
      if (cb) {
        cb()
      } else {
        vnode.state[name].src = url
      }
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
