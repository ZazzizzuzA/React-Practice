import React from "react";
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';
import sampleFishes from '../sample-fishes';
import base from '../base';
import PropTypes from 'prop-types';

class App extends React.Component {
  state = {
    fishes: {},
    order: {}
  };

  static propTypes = {
    match: PropTypes.object
  }

  componentDidMount() {
    const { params } = this.props.match;
    // first reinstate our localStorage
    const localStorageRef = localStorage.getItem(params.storeId);
    if (localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) });
    }
    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: 'fishes'
    });
  };

  componentWillUnmount() {
    base.removeBinding(this.ref);
  };

  componentDidUpdate() {
    console.log(this.state.order);
    localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order));
  }

  addFish = fish => {
    //1 .Take a copy of the exsiting state
    const fishes = { ...this.state.fishes};
    // 2. Add a new fish to that fishes variable
    fishes[`fish${Date.now()}`] = fish;
    // 3. Set the new fishes object to state
    this.setState({
      fishes
    });
  };

  updateFish = (key, updatedFish) => {
    // Take a copy of a current state
    const fishes = { ...this.state.fishes };
    // 2. Update that state
    fishes[key] = updatedFish;
    // 3. Set that to state
    this.setState({ fishes });
  };

  deleteFish = (key) => {
    // 1. take a copy of state
    const fishes = { ...this.state.fishes };
    // 2. update the state
    fishes[key] = null;
    // 3. update state
    this.setState({ fishes });
    console.log(this.state.fishes);
  };

  loadSampleFishes = () => {
    this.setState({ fishes: sampleFishes })
  };

  addToOrder = (key) => {
    // 1. Take a copy of state
    const order = { ...this.state.order };
    // 2. Euther add to the order, or update the number in our order
    order[key] = order[key] + 1 || 1;
    // 3. Call setState to update our state object
    this.setState({ order });
  }

  deleteFishFromOrder = (key) => {
    // 1. take a copy of state
    const order = { ...this.state.order };
    // 2. update the state
    if (order[key] > 1) {
      order[key] = order[key] - 1;
    } else {
      delete order[key];
    }
    // 3. update state
    this.setState({ order });
    console.log(this.state.order);
  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh seafood market" age={500} cool={true}/>
          <ul className="fishes">
            {Object.keys(this.state.fishes).map(key => <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder} />)}
          </ul>
        </div>
        <Order fishes={this.state.fishes} order={this.state.order}  deleteFishFromOrder={this.deleteFishFromOrder} />
        <Inventory addFish={this.addFish} updateFish={this.updateFish} loadSampleFishes={this.loadSampleFishes} fishes={this.state.fishes} deleteFish={this.deleteFish} storeId={this.props.match.params.storeId}/>
      </div>
    );
  }
}

export default App;