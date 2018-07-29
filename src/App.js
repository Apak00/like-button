import React, { Component } from 'react';
import './App.css';
import Transition from 'react-transition-group/Transition';


const duration = 500;

const transitionStyles = {
  exiting: { opacity: 0, top: -50 },
};
const countLimit = 40;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      in: false,
      count: 0,
      circleStyle:{
        backgroundImage: `linear-gradient(${90}deg, transparent 50% , white 50%),
        linear-gradient(${90}deg, white 50% , transparent 50%)`
      },
    }
  }

  activateCounter = () => {
    clearTimeout(this.state.timeoutId);
    let nextCount = this.state.count + 1;
    let backgroundImage = this.getBackgroundImage(nextCount);
    this.setState({
      in: true,
      count: nextCount,
      timeoutId: setTimeout(() => { this.setState({ in: false }) }, duration * 2),
      circleStyle: {
        backgroundImage: backgroundImage
      }
    })
  }
  getBackgroundImage = (nextCount) => {
    let per = nextCount / countLimit;
    let stage = per < 0.5 ? 1 : (per < 1 ? 2 : 3);
    let backgroundImage = `none`;
    switch (stage) {
      case 1:
        backgroundImage =
        `linear-gradient(${90 + per * 4 * 90}deg, transparent 50% , white 50%),
        linear-gradient(${90}deg, white 50% , transparent 50%)`;
        break;
      case 2:
      backgroundImage =
      `linear-gradient(${90 + (per - 0.5) * 4 * 90}deg, transparent 50% , rgb(95, 142, 241) 50%),
      linear-gradient(${90}deg, white 50% , transparent 50%)`;
        break;
      default:
        return;
    }

    return backgroundImage;
  };

  render() {
    return (
      <div className="App">
        <div className="container">
          <div className={"like-button"} onClick={this.activateCounter.bind(this)}>
            <i className="fas fa-thumbs-up" />
            <Transition in={this.state.in} timeout={duration} mountOnEnter={true} unmountOnExit={true}>
              {(state) => (<div style={{ transition: `all ${duration}ms ease-in-out`, ...transitionStyles[state] }} className={"countered"}>{this.state.count}</div>)}
            </Transition>
          </div>
          <div className={"circlerCounter"} style={this.state.circleStyle} />
        </div>
      </div>
    );
  }
}

export default App;
