import React, { Component } from 'react';
import { getAllItems, getAllCategories, FilteredItems } from './services/api';
import Header from './components/Header';
import Filter from './components/Filter';
import Items from './components/Items';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      categories: []
    }
    this.itemFilters = this.itemFilters.bind(this)
  }
  componentDidMount() {
    getAllItems()
      .then(data => this.setState({ items: data.items }));
    getAllCategories()
      .then(data => this.setState({ categories: data.categories }));
  }

  itemFilters(categories) {
    if (categories) {
      FilteredItems(categories)
        .then(data => this.setState({ items: data.items }));
    } else {
      getAllItems()
        .then(data => this.setState({ items: data.items }));
    }
  }
  render() {
    return (
      <div className="App">
        <Header />
        <Filter categories={this.state.categories} onSubmit={this.itemFilters} />
        <Items items={this.state.items} />
      </div>
    );
  }
}

export default App;
