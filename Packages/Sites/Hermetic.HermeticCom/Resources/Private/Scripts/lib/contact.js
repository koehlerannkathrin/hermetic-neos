export class ContactForm {
  constructor (id, options) {
    this.$el = $(id)
    if (this.$el.length < 1) {
      return
    }

    options = this.options = $.extend({focus: true, hidden: []}, options)

    const prefix = 'contact'
    this.$el.on('submit', this.onSubmit.bind(this))
    this.$content = this.$el.find('.' + prefix + '-content')
    this.$confirmation = this.$el.find('.' + prefix + '-confirmation')
    this.$error = this.$el.find('.' + prefix + '-error')
    if (options.focus) {
      this.$el.find('input').eq(0).focus()
    }
  }

  onSubmit (evt) {
    function blur () {
      $(evt.target).find('[type="submit"]').blur()
    }

    const fields = $.merge(
      this.options.hidden,
      this.$el.serializeArray()
    )

    $.post(
      this.$el.attr('action'),
      $.param(fields)
    ).then(function (data) {
      const ticket = data ? '(Ticket #' + data + ')' : ''
      blur()
      this.$error.hide()
      this.$el.find(':input').prop('disabled', true)
      this.$content.find('[type=submit]').css('visibility', 'hidden')
      this.$content.css('opacity', '.5')
      this.$confirmation.show()
      this.$confirmation.find('.ticket').text(ticket).css('opacity', '.7')
    }.bind(this), function (res) {
      blur()
      this.$error.show()
      this.$error.find('.status').text(res.status)
      this.$error.find('.error').text(res.responseText)
    }.bind(this))

    return false
  }
}

export default function (id, options) {
  return new ContactForm(id, options)
}
