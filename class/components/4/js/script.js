// component
// Trabalhando com estado no REACT vc não precisa se preocupa como os componentes serão renderizados
// vc se preocupa apenas se preocupar é com a atualizacão de dados
// o componente reagindo a acao do usuario

var textAreaCounter = React.createClass({
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
  React.createElement(textAreaCounter, {
    defaultValue: 'Hello'
  }),
  document.getElementById('app')
)
