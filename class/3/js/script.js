//Atributos especiais do DOM
ReactDOM.render(
  React.DOM.h1({  
    id: 'heading',
    className: 'header',
    htmlFor: 'me',
  }, 'Hello World'),
  document.getElementById('app')
)
