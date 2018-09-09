import React, { Component } from 'react';
import Moment from 'react-moment';
import 'moment-timezone';
import OneItem from './oneItem';
import { userItems, oneItem, updateItem, deleteItem } from '../services/api';
import jwtDecode from 'jwt-decode';

class UserItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: "modal",
      items: [],
      item: [],
    }
    this.toggleShow = this.toggleShow.bind(this)
    this.toggleShowModal = this.toggleShowModal.bind(this)
    this.handeUpdate = this.handeUpdate.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }
  componentDidMount() {
    let user = jwtDecode(localStorage.getItem("jwt")).sub;
    userItems(user)
      .then(data => this.setState({ items: data.items }));
  }

  componentDidUpdate(prevProps, prevState) {
    // Checks if the props changed and if so resets the state
    let user = jwtDecode(localStorage.getItem("jwt")).sub;
    if (this.props.rerenderCreate !== prevProps.rerenderCreate) {
        userItems(user)
        .then(data => {
          this.setState({
          items: data.items 
        });
      })
  }
}

handeUpdate(item) {
  let user = jwtDecode(localStorage.getItem("jwt")).sub;
  updateItem(item)
    .then(data => {
      this.setState({
        item: data
      })
      userItems(user)
        .then(data => this.setState({ items: data.items }));
    });
}

handleDelete(id) {
  let user = jwtDecode(localStorage.getItem("jwt")).sub;
  deleteItem(id)
    .then(data => {
      this.props.rerender();
      this.setState({
        showModal: 'modal'
      })
      userItems(user)
        .then(data => this.setState({ items: data.items }));
    })
    this.props.rerender();
}

toggleShow(e) {
  e.preventDefault();
  oneItem(e.target.id)
    .then(data => this.setState({ item: data.item }));
  this.setState({
    showModal: "modal is-active",
    item: e.target.id
  })
}

toggleShowModal() {
  this.state.showModal === "modal is-active" ?
    this.setState({
      showModal: "modal"
    })
    :
    this.setState({
      showModal: "modal is-active"
    })
}

render() {
  let items = this.state.items.filter(item => item.name.toLowerCase().includes(this.props.search.toLowerCase()));
  return (
    <main>
      {items.map(item => {
        return (<div id={item.id} onClick={this.toggleShow} key={item.id} className="child">
          <p id={item.id}>{item.name}</p>
          <img className="img" id={item.id} src={item.image_url} alt="Item" /><br />
          Posted: <Moment id={item.id} fromNow>{item.created_at}</Moment>
        </div>)
      })}
      <OneItem active={this.state.showModal} item={this.state.item} toggle={this.props.toggle} toggleShow={this.toggleShowModal} edit={true} editModal={this.props.editModal} update={this.handeUpdate} delete={this.handleDelete} />
    </main>
  )
}
}

export default UserItems;