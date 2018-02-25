var logMixin = {
  _log: function (methodName, args) {
    console.log(this.name + '::' + methodName, args)
  },
  componentWillUpdate: function () {
    this._log('componentWillUpdate', arguments)
  },
  componentDidUpdate: function () {
    this._log('componentDidUpdate', arguments)
  },
  componentWillMount: function () {
    this._log('componentWillMount', arguments)
  },
  componentDidMount: function () {
    this._log('componentDidMount', arguments)
  },
  componentWillUnmount: function () {
    this._log('componentWillUnmount', arguments)
  }
}

var Counter = React.createClass({
  name: 'Counter',
  // mixins: [logMixin],
  shouldComponentUpdate(nextProps, nextStage_ignore) {
    return nextProps.count !== this.props.count
  },
  propTypes: {
    count: React.PropTypes.number.isRequired
  },
  render: function () {
    console.log(this.name + '::render()')
    return React.DOM.span(null, this.props.count)
  }
})

var TextAreaCounter = React.createClass({
  name: 'TextAreaCounter',
  // mixins: [logMixin],
  propTypes: {
    defaultValue: React.PropTypes.string
  },
  getInitialState: function () {
    return {
      text: this.props.defaultValue
    }
  },
  _textChange: function (event) {
    this.setState({
      text: event.target.value
    })
  },
  render: function () {
    console.log(this.name + '::render()')
    var counter = null
    if (this.state.text.length > 0) {
      counter = React.DOM.h3(null,
        React.createElement(Counter, {
          count: this.state.text.length
        })
      )
    }
    return React.DOM.div(null,
      React.DOM.textarea({
        value: this.state.text,
        onChange: this._textChange
      }),
      counter
    )
  }
})

var myTextAreaCounter = ReactDOM.render(
  React.createElement(TextAreaCounter, {
    defaultValue: 'Hello'
  }),
  document.getElementById('app')
)
