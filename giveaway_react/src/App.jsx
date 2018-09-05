import React, { Component } from 'react';
import { getAllItems, getAllCategories } from './services/api';
import Header from './components/Header';
import Filter from './components/Filter';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allItems: [],
      categories: []
    }
  }
  componentDidMount() {
    getAllItems()
      .then(data => this.setState({ allItems: data.items }));
    getAllCategories()
      .then(data => this.setState({categories: data.categories}));
  }
  render() {
    return (
      <div className="App">
        <Header />
        <Filter categories={this.state.categories}/>
      </div>
    );
  }
}

export default App;
