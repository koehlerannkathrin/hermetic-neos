export function toggleBelowFold () {
  const onScroll = function () {
    $('body').toggleClass('scroll', $(window).scrollTop() > 100)
  }

  $(window).on('scroll', onScroll)
  onScroll()
}

export function scrollSpy (selector, options) {
  options = $.extend({
    target: selector
  }, options)
  const $spy = $('body').scrollspy(options)
  $spy.data('bs.scrollspy').selector = selector + ' > li > a'
  $spy.scrollspy('refresh')
  $spy.scrollspy('process')
  fixScrollPosition(options)
}

export function fixScrollPosition (options) {
  if (window.location.hash) {
    setTimeout(function () {
      if (!/^#\w+/.test(window.location.hash)) return
      $('html, body')
        .scrollTop($(window.location.hash).offset().top - options.offset)
    })
  }
}

export function smoothScroll (element, options) {
  $(element).smoothScroll(options)
}
