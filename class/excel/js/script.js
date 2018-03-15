var Excel = React.createClass({
  displayName: 'Excel',

  propTypes: {
    headers: React.PropTypes.arrayOf(
      React.PropTypes.string
    ),
    initialData: React.PropTypes.arrayOf(
      React.PropTypes.arrayOf(
        React.PropTypes.string
      )
    )
  },

  getInitialState: function () {
    return {
      data: this.props.initialData,
      sortby: null,
      descending: false,
      edit: null,
      search: false
    }
  },
  _log: [],
  _logSetSate: function (newSate) { 
    // guarda o estado antigo
    this._log.push(JSON.parse(JSON.stringify(
      this._log.length === 0 ? this.state : newState
    )))
    this.setState(newSate);
   },
  _replay: function () { 
    if (this._log.length === 0) {
        console.warn('No state to replay yet');
        return;
      }
      var idx = -1;
      var interval = setInterval(function() {
        idx++;
        if (idx === this._log.length - 1) { // the end
          clearInterval(interval);
        }
        this.setState(this._log[idx]);
      }.bind(this), 1000);
    },
  componentDidMount: function (newState) { 
      document.onkeydown = function (e) { 
        if(e.altKey && e.shiftKey && e.keyCode === 82) { //alt + shift + R
          this._replay()  
        }
      }
   },
  _sort: function (e) {
    var column = e.target.cellIndex
    // copia os dados
    var data = this.state.data.slice()
    var descending = this.state.sortby === column && !this.state.descending
    data.sort(function (a, b) {
      return descending ? (a[column] < b[column] ? 1 : -1) : (a[column] > b[column] ? 1 : -1)
    })
    this.setState({
      data: data,
      sortby: column,
      descending: descending
    })
  },

  _showEditor: function (e) {
    this.setState({edit: {
        row: parseInt(e.target.dataset.row, 10),
        cell: e.target.cellIndex
    }})
  },

  _save: function (e) {
    e.preventDefault()
    var input = e.target.firstChild
    var data = this.state.data.slice()
    data[this.state.edit.row][this.state.edit.cell] = input.value

    this.setState({
      edit: null,
      data: data
    })
  },
  _preSearchData: null,

  
  _toggleSearch: function () { 
    if (this.state.search) {
      this.setState({
        data: this.__preSearchData,
        search: false
      });
      this.__preSearchData = null
    } else {
      this.__preSearchData = this.state.data;
      this.setState({
        search: true
      })
    }
   },
  _search: function (e) { 
    var needle = e.target.value.toLowerCase();
    if (!needle) { //a string de pesquisa foi apagada.
      this.setState({data: this.__preSearchData});
      return;
    }
    var idx = e.target.dataset.idx; // a coluna a ser pesquisada
    var searchdata = this.__preSearchData.filter(function (row) { 
      return row[idx].toString().toLowerCase().indexOf(needle) > -1;
     });
    this.setState({data: searchdata});
   },
  _renderTable: function () {
    return (
    React.DOM.table(null,
      React.DOM.thead({onClick: this._sort},
        React.DOM.tr(null,
          this.props.headers.map(function (title, idx) {
            if (this.state.sortby === idx) {
              title += this.state.descending ? '\u2191' : '\u2193'
            }
            return React.DOM.th({key: idx}, title)
          }, this)
        )),

      React.DOM.tbody({onDoubleClick: this._showEditor},
        this._renderSearch(),
        this.state.data.map(function (row, rowidx) {
          return (
          React.DOM.tr({key: rowidx},
            row.map(function (cell, idx) {
              var content = cell
              var edit = this.state.edit

              if (edit && edit.row === rowidx && edit.cell === idx) {
                content = React.DOM.form({onSubmit: this._save},
                  React.DOM.input({
                    type: 'text',
                    defaultValue: cell
                  })
                )
              }

              return React.DOM.td(
                {
                  key: idx,
                  'data-row': rowidx
                }, content)
            }, this)
          )
          )
        }, this)
      )
    )
    )
  },
  _renderToolbar: function () {
    return React.DOM.button(
      {
        onClick: this._toggleSearch,
        className: 'toolbar'
      },
      'search'
    )
  },
  _renderSearch: function () {
    if (!this.state.search) {
      return null
    }
    return (
    React.DOM.tr({onChange: this._search},
      this.props.headers.map(function (_ignore, idx) {
        return React.DOM.td({key: idx},
          React.DOM.input({
            type: 'text',
            'data-idx': idx
          })
        )
      })
    )
    )
  },
  render: function () {
    return (
    React.DOM.div(null,
      this._renderToolbar(),
      this._renderTable(),
    )
    )
  }
})

var headers = [
  'Book', 'Author', 'Language', 'Published', 'Sales'
]

var data = [
  ['The Lord of the Rings', 'J. R. R. Tolkien', 'English', '1954–1955', '150 million'],
  ['Le Petit Prince (The Little Prince)', 'Antoine de Saint-Exupéry', 'French', '1943', '140 million'],
  ["Harry Potter and the Philosopher's Stone", 'J. K. Rowling', 'English', '1997', '107 million'],
  ['And Then There Were None', 'Agatha Christie', 'English', '1939', '100 million'],
  ['Dream of the Red Chamber', 'Cao Xueqin', 'Chinese', '1754–1791', '100 million'],
  ['The Hobbit', 'J. R. R. Tolkien', 'English', '1937', '100 million'],
  ['She: A History of Adventure', 'H. Rider Haggard', 'English', '1887', '100 million']
]

ReactDOM.render(
  React.createElement(Excel, {
    headers: headers,
    initialData: data
  }),
  document.getElementById('app')
)
