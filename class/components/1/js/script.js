// component

var myComponent = React.createClass({
  render: function () {
    return React.DOM.span(null, 'Componente customizado')
  }
})


ReactDOM.render(
  React.createElement(myComponent),
  document.getElementById('app')
)