import React, { Component } from 'react';
import Moment from 'react-moment';
import 'moment-timezone';
import OneItem from '../components/oneItem';
import {userItems} from '../services/api';
import jwtDecode from 'jwt-decode';

class UserItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: "modal",
      items: []
    }
    // this.toggleShow = this.toggleShow.bind(this)
    this.toggleModal = this.toggleModal.bind(this)
  }
  componentDidMount() {
    let user = jwtDecode(localStorage.getItem("jwt")).sub;
    userItems(user)
      .then(data => this.setState({ items: data.items }));
  }


//   toggleShow(e) {
//     e.preventDefault();
//     .then(data => this.setState({ item: data.item }));
//     this.setState({
//       showModal: "modal is-active",
//       item: e.target.id
//     })
//   }
  toggleloginModal() {
    this.state.loginModal === "modal is-active" ?
    this.setState({
      showModal: "modal"
    })
    :
    this.setState({
      showModal: "modal is-active"
    })
  }

  toggleModal() {
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
    return (
      <main>
        {this.state.items.map(item => {
          return (<div id={item.id} onClick={this.toggleShow} key={item.id} className="child">
            <p id={item.id}>{item.name}</p>
            <img className="img" id={item.id} src={item.image_url} alt="Item" /><br />
            Posted: <Moment id={item.id} fromNow>{item.created_at}</Moment>
          </div>)
        })}
        {/* <OneItem active={this.state.showModal} item={this.state.item} toggle={this.toggleModal} /> */}
      </main>
    )
  }
}

export default UserItems;