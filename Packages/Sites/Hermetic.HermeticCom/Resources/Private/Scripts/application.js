import contact from './lib/contact'
import rebox from './lib/rebox'
import { toggleBelowFold, scrollSpy, smoothScroll } from './lib/scroll'

$(document).ready(function () {
  contact('#contact-form')
  rebox('.instanode-headstart-thumbimage')
  toggleBelowFold()
  scrollSpy('.header-nav-sub:visible', {offset: 0})
  smoothScroll('a[href^="#"]', {offset: 0})
})
