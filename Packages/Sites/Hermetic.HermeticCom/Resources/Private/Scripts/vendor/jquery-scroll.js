/* Copyright (C) Tristan Koch <tristan@tknetwork.de>, All Rights Reserved */

$.fn.smoothScroll = function (options) {
  options = $.extend({
    offset: 0,
    duration: 500
  }, options)

  return this.each(function () {
    $(this).on('click', function (event) {
      var hash = this.hash || $(this).attr('xlink:href')
      if (!hash) return
      event.preventDefault()
      $('html, body').animate({scrollTop: $(hash).offset().top - options.offset}, options.duration)
      setTimeout(function () {
        window.location.hash = hash
      }, 0)
    })
  })
}
