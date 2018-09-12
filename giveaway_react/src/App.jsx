import React, { Component } from 'react';
import { getAllItems, getAllCategories, FilteredItems, saveItem } from './services/api';
import Header from './components/Header';
import Filter from './components/Filter';
import Items from './components/Items';
import Create from './components/createItem';
import UserItems from './components/showUserItems'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      categories: [],
      loginModal: "modal",
      createModal: "modal",
      editModal: "modal",
      email: '',
      password: '',
      isLoggedIn: !!localStorage.getItem("jwt"),
      registering: '',
      currentView: 'Homepage',
      rerender: true,
      searchBar: ''
    }
    this.itemFilters = this.itemFilters.bind(this)
    this.toggleModal = this.toggleModal.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
    this.register = this.register.bind(this)
    this.setAdmin = this.setAdmin.bind(this)
    this.setHomepage = this.setHomepage.bind(this)
    this.setAdminCreate = this.setAdminCreate.bind(this)
    this.saveItem = this.saveItem.bind(this)
    this.rerenderAfterDelete = this.rerenderAfterDelete.bind(this)
  }
  componentDidMount() {
    getAllItems()
      .then(data => this.setState({ items: data.items }));
    getAllCategories()
      .then(data => this.setState({ categories: data.categories }));
  }

  componentDidUpdate(prevProps, prevState) {
    // Checks if the state changed and a new and if so rerenders the items
    if (this.state.createModal !== prevState.createModal) {
      getAllItems()
      .then(data => this.setState({ items: data.items }));
  }
  if (this.state.rerender !== prevState.rerender) {
    getAllItems()
    .then(data => this.setState({ items: data.items }));
}

}

// If any of the filter boxes are checked only fetch items in those categories otherwise fetch all items
  itemFilters(categories) {
    if (categories) {
      FilteredItems(categories)
        .then(data => this.setState({ items: data.items }));
    } else {
      getAllItems()
        .then(data => this.setState({ items: data.items }));
    }
  }

// Toggles the modal
  toggleModal(modal) {
    this.state[modal] === "modal is-active" ?
      this.setState({
        [modal]: "modal",
        registering: ''
      })
      :
      this.setState({
        [modal]: "modal is-active",
        registering: ''
      })
  }

  // Handles form inputs
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  // Saves new items and resets state with new items
  saveItem(item) {
    saveItem({"name": item.name, "address": item.address, "description": item.description, "user_id": item.user_id, "image_url": item.image_url, "categories": item.categories})
    .then(data => {
      getAllItems()
      .then(data => this.setState({ 
        items: data.items,
        rerender: !this.state.rerender 
      }));
    })
  }

  // Logs out and removes token
  logout() {
    localStorage.removeItem("jwt")
    this.setState({
      isLoggedIn: false,
      password: "",
      email: "",
      currentView: "Homepage"
    })
  }

  // When called switches to the admin view
  setAdmin() {
    this.setState({
      currentView: 'Admin'
    })
  }
// Switches to admin and opens the create modal
  setAdminCreate() {
    this.setState({
      currentView: 'Admin',
      createModal: 'modal is-active'
    })
  }
// Switches view to the Homepage
  setHomepage() {
    this.setState({
      currentView: 'Homepage'
    })
  }
// Changes state so page is rerendered after an item is deleted
  rerenderAfterDelete() {
    this.setState({
      rerender: !this.state.rerender
    })
  }

  // Logs in a user or lets them know the credentials were invalid
  login() {
    const url = `http://localhost:3000/user_token`;
    const body = { "auth": { "email": this.state.email, "password": this.state.password } }
    const init = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      mode: 'cors',
      body: JSON.stringify(body),
    }
    fetch(url, init)
      .then(res => res.json())
      .then(res => localStorage.setItem("jwt", res.jwt))
      .then(() => this.setState({
        isLoggedIn: true,
        registering: ''
      }))
      .then(() => {
        return this.state.isLoggedIn === true
          ?
          this.toggleModal('loginModal')
          :
          null
      })
      .catch(err => {
        this.setState({
          registering: "Credentials are invalid"
        })
      })
  }

  // Registers a new user
  register() {
    const url = `http://localhost:3000/users`
    const body = { "user": { "email": this.state.email, "password": this.state.password } }
    const init = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      mode: 'cors',
      body: JSON.stringify(body)
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

  // Renders a view dependant on the currentView in State
  switchView() {
    switch (this.state.currentView) {
      case 'Homepage':
        return (
          <React.Fragment>
            <Filter categories={this.state.categories} onSubmit={this.itemFilters} isLoggedIn={this.state.isLoggedIn} toggleLogin={this.toggleModal} />
            <Items items={this.state.items} toggle={this.toggleModal} search={this.state.searchBar}/>
          </React.Fragment>
        )
      case 'Admin':
        return (
          <React.Fragment>
          <Create homepage={this.setHomepage} active={this.state.createModal} toggle={this.toggleModal} categories={this.state.categories} onSubmit={this.saveItem}/>
          <UserItems editModal={this.state.editModal} toggle={this.toggleModal} rerender={this.rerenderAfterDelete} rerenderCreate={this.state.rerender} search={this.state.searchBar}/>
          </React.Fragment>
        )
        default: 
        return (
          <React.Fragment>
            <Filter categories={this.state.categories} onSubmit={this.itemFilters} isLoggedIn={this.state.isLoggedIn} toggleLogin={this.toggleModal} />
            <Items items={this.state.items} toggle={this.toggleModal} search={this.state.searchBar}/>
          </React.Fragment>
        )
    }
  }

  render() {
    return (
      <div className="grid">
        <Header toggleLogin={this.toggleModal}
          active={this.state.loginModal}
          handleChange={this.handleChange}
          email={this.state.email}
          password={this.state.password}
          login={this.login}
          loggedIn={this.state.isLoggedIn}
          logout={this.logout}
          register={this.register}
          footer={this.state.registering}
          admin={this.setAdmin}
          createAdmin={this.setAdminCreate}
        />
        {this.switchView()}
        <h1 className="Footer"> Created</h1>
      </div>
    );
  }
}

export default App;
