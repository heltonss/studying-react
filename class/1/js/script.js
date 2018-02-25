// ReactDOM.render(
//   React.DOM.h1(null, 'Hello World!!'),
//   document.getElementById('app')
// )
ReactDOM.render(
  React.DOM.h1({  
    id: 'heading',
  }, 
  React.DOM.span(null, 
    React.DOM.em(null, 'Hello '),
    'w'),
  ' World!!'),
  document.getElementById('app')
)
