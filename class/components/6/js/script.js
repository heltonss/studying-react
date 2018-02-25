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


var TextAreaCounter = React.createClass({
  name: 'TextAreaCounter',
  mixins: [logMixin],
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
    return React.DOM.div(null,
      React.DOM.textarea({
        value: this.state.text,
        onChange: this._textChange
      }),
      React.DOM.h3(null, this.state.text.length)
    )
  }
})

var myTextAreaCounter = ReactDOM.render(
  React.createElement(TextAreaCounter, {
    defaultValue: 'Hello'
  }),
  document.getElementById('app')
)