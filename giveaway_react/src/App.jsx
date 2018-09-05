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
      categories: [],
      showModal: "modal is-active"
    }
    this.itemFilters = this.itemFilters.bind(this)
    this.toggleModal = this.toggleModal.bind(this)
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
  toggleModal() {
    this.setState({
      showModal: "modal"
    })
  }
  render() {
    return (
      <div className="grid">
        <Header />
        <Filter categories={this.state.categories} onSubmit={this.itemFilters} />
        <Items items={this.state.items} toggle={this.toggleModal} />
        <h1 className="Footer"> Created</h1>
      </div>
    );
  }
}

export default App;
