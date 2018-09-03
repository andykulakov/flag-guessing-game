import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './Game.css';

class Game extends Component {
  static propTypes = {
    fourCountries: PropTypes.array.isRequired
  }
  
  
  //Game has 3 options of status value: start, right and wrong: for the beginning of the game, for correct answers, and for incorrect answers
  //state.country receives the data about the country chosen by a radio button in the form
  
  constructor(props) {
    super(props);
    this.state = {
      country: '',
      status: 'start'
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNext = this.handleNext.bind(this);
  }
  
  handleChange(e) {
    this.setState({country: e.target.value});
  }
  
  handleSubmit(e) {
    e.preventDefault();
    const {country} = this.state;
    if(country === this.props.secretCountry.name) {
      this.setState({status: 'right'})
    } else {
      this.setState({status: 'wrong'})
    }
  }
  
  handleNext(e) {
    this.props.nextGame();
    this.setState({
      country: '',
      status: 'start'
    })
  }
  
  render(){
    const {fourCountries} = this.props;
    const {secretCountry} = this.props;
    const {status} = this.state;
    let view = '';
    if(status === 'start') {
      view = 
        <div className="form-container">
          <form onSubmit={this.handleSubmit}>
            {fourCountries.map((option,i) => {
              return (
                <label for={option.name} key={i}>
                  <input 
                  type="radio" 
                  name="country" 
                  value={option.name} 
                  id={option.name}
                  checked={this.state.country === option.name}
                  onChange={this.handleChange}/> 
                {option.name}
                </label>
              )}
            )}
            <button type="submit">GUESS</button>
          </form>
        </div>
    }
    
    else if(status === 'right') {
      view = 
        <div className="results-container">
          <p>Correct: {secretCountry.name}</p>
          <button onClick={this.handleNext}>NEXT</button>
        </div>
    }
    
    else if(status === 'wrong') {
      view = 
        <div className="results-container">
          <p>Incorrect! The correct answer was {secretCountry.name}</p>
          <button onClick={this.handleNext}>NEW GAME</button>
        </div>
    }
    
    return(
      <div className="game-container">
        {view}
      </div>
    );
  }
}

export default Game;