// component
// os proptypes nos ajudam a definir o tipo dos valores e se são obrigatórios
// o getDefaultProps serve para aceitar propriedades opcionais

var myComponent = React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired,
    lastName: React.PropTypes.string
  },
  getDefaultProps: function () {
    return {
      lastName: 'COLOCAR SOBRENOME'
    }
  },
  render: function () {
    return React.DOM.span(null, 'My name is ' + this.props.name + this.props.lastName)
  }
})

var componentFactory = React.createFactory(myComponent)

ReactDOM.render(
  React.createElement(myComponent, {
    name: 'Helton ',
  // lastName: 'Souza Silveira'
  }),
  document.getElementById('app')
)
