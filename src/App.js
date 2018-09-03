import React, { Component } from 'react';
import Game from './Game';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      fourCountries: [],
      secretCountry: ''
    }
    
    this.nextGame = this.nextGame.bind(this);
    this.getStarted = this.getStarted.bind(this);
  }
  
  //Function to start a new game
  
  nextGame() {
    this.setState({fourCountries: [], secretCountry: ''});
    this.getStarted();
  }
  
  componentDidMount() {
    this.getStarted();
  }
  
  //Function to choose new countries
  
  getStarted() {
    const url = 'https://restcountries.eu/rest/v2/all';
    
    fetch(url)
    .then(data => data.json())
    .then(data => {
        let fourCountries = Array(4).fill().map(country => {
          return data[Math.floor(Math.random() * data.length)]
      })
      return fourCountries;
    })
    .then(fourCountries => {
      let secretCountry = fourCountries[Math.floor(Math.random() * fourCountries.length)]
      this.setState({fourCountries, secretCountry})
    });
  }

  render() {
    let game = <div>Loading...</div>;
    const {fourCountries, secretCountry} = this.state;
    
    
    if(fourCountries && fourCountries.length > 0) {
      const secretFlag = secretCountry.flag;
      game = 
      <div>
        <Game fourCountries={fourCountries} secretCountry={secretCountry} nextGame={this.nextGame}/>
        <img alt="flag" src={secretFlag}/>
      </div>
        ;
    }
    
    return (
      <div className="loading">
        <h1>Flag Guessing Game</h1>
        {game}
      </div>
    );
  }
}

export default App;
