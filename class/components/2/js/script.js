// component

var myComponent = React.createClass({
  render: function () {
    return React.DOM.span(null, 'Componente customizado')
  }
})

var componentFactory = React.createFactory(myComponent)


ReactDOM.render(
  componentFactory(),
  document.getElementById('app')
)