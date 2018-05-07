import React, { Component } from 'react';
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
          <input type="text" ref="converter"/>
          <button type="submit">Search</button>
        </form>
        <div className="currency-border">
        { error ? <p className="error">{error}</p> : 
          <div>
            <p>{` ${number} ${from} equals `}</p>
            <p>{`${rate} ${to}`}</p>
          </div>}          
        </div>        
      </div>
    );
  }
}

export default App;
