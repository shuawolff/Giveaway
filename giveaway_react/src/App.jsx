import React, { Component } from 'react';
import { getAllItems, getAllCategories, FilteredItems } from './services/api';
import Header from './components/Header';
import Filter from './components/Filter';
import Items from './components/Items';
import './App.css';

console.log(localStorage.getItem("jwt"));
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      categories: [],
      loginModal: "modal",
      email: '',
      password:'',
      isLoggedIn: !!localStorage.getItem("jwt"),
      registering: ''
    }
    this.itemFilters = this.itemFilters.bind(this)
    this.toggleloginModal = this.toggleloginModal.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
    this.register = this.register.bind(this)
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

  toggleloginModal() {
    this.state.loginModal === "modal is-active" ?
    this.setState({
      loginModal: "modal"
    })
    :
    this.setState({
      loginModal: "modal is-active"
    })
  }

  handleChange(e) {
    this.setState({
      [e.target.name]:e.target.value
    })
  }

  logout() {
    localStorage.removeItem("jwt")
    this.setState({
     isLoggedIn: false,
     name:"",
     email:"",
    })
  }

  login() {
    const url = `http://localhost:3000/user_token`;
    const body = {"auth": {"email": this.state.email, "password": this.state.password} }
    const init = { method: 'POST',
                   headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
                   mode: 'cors',
                   body:JSON.stringify(body),
                   }
    fetch(url, init)
    .then(res => res.json())
    .then(res => localStorage.setItem("jwt", res.jwt))
    .then(() => this.setState({
      isLoggedIn: true,
      registering: ''
    }))
    .then(() => {
      this.state.isLoggedIn === true ?
    this.toggleloginModal()
    :
    null
    })
    .catch(err => console.log(err))
  }

  register() {
    const url = `http://localhost:3000/users`
    const body = {"user": {"email": this.state.email, "password":this.state.password}}
    const init = { method: 'POST',
                   headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
                   mode: 'cors',
                   body:JSON.stringify(body)
                 }
    fetch(url, init)
    .then(res => res.json())
    .then(res => {
      this.setState({
        registering: "Please use your new credentials to log in"
      })
    })
    .catch(err => err.message)
  }

  render() {
    return (
      <div className="grid">
        <Header toggleLogin={this.toggleloginModal} 
        active={this.state.loginModal} 
        handleChange={this.handleChange} 
        email={this.state.email} 
        password={this.state.password} 
        login={this.login}
        loggedIn={this.state.isLoggedIn}
        logout={this.logout}
        register={this.register}
        footer={this.state.registering}
        />
        <Filter categories={this.state.categories} onSubmit={this.itemFilters} />
        <Items items={this.state.items} toggle={this.toggleModal} />
        <h1 className="Footer"> Created</h1>
      </div>
    );
  }
}

export default App;
