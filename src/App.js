import React, { Component } from 'react';
import FaSearch from 'react-icons/lib/fa/search'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error : '',
      data : '',
      number : '',
      from : '',
      to : '',
      rate : ''
    }
  }
  componentWillMount() {
    const api = process.env.REACT_APP_API;
    fetch(api)
      .then(results => {
        return results.json();
      })
      .then(data => {        
        this.setState({ data });
      })
  }
  onSubmit = (e) => {
    e.preventDefault();
    const { rates } = this.state.data;   
    let str = this.refs.converter.value.toUpperCase().trim(); // 2 AUD TO USD    
    let num = [];    
    str.replace(/([^\s]+)/g, match => {
      num.push(match);
    });
    let [number, from, sep, to] = num;
    let base = 1 / rates[`${from}`]; //dynamic base currency
    const rate = (number * base * rates[`${to}`]).toFixed(2);

    this.setState({ number, from, to, rate });
    
    if(isNaN(rate) || sep !== 'TO'){
      this.setState({ error: 'Wrong Format' })
    }else{
      this.setState({ error: '' })
    }

  }
  render() {
    let { number, from, rate, to, error } = this.state
    return (
      <div className="App">
        <form onSubmit={this.onSubmit}>        
          <input type="text" ref="converter" placeholder="1 USD TO PHP"/>
          <button type="submit">
            <FaSearch />
          </button>
        </form>
        <div className="currency-border">
        { error ? <p className="error">{error}</p> : 
          <div>
            <strong>{` ${number} ${from} equals `}</strong>
            <h2>{`${rate} ${to}`}</h2>
          </div>}          
        </div>        
      </div>
    );
  }
}

export default App;
