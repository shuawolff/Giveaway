import React, { Component } from 'react';
import Moment from 'react-moment';
import 'moment-timezone';
import OneItem from '../components/oneItem';
import {oneItem} from '../services/api';

class Items extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: "modal",
      item: []
    }
    this.toggleShow = this.toggleShow.bind(this)
    this.toggleModal = this.toggleModal.bind(this)
  }
// Opens the showOne modal and sets the item selected to state
  toggleShow(e) {
    e.preventDefault();
    oneItem(e.target.id)
    .then(data => this.setState({ item: data.item }));
    this.setState({
      showModal: "modal is-active",
      item: e.target.id
    })
  }

  // Toggles the showOne Modal
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
    // FIlters items by what is being searched
    let items = this.props.items.filter(item => item.name.toLowerCase().includes(this.props.search.toLowerCase()));
    return (
      <main>
        {items.map(item => {
          return (<div id={item.id} onClick={this.toggleShow} key={item.id} className="child">
            <p id={item.id}><strong>{item.name}</strong></p>
            <img className="img" id={item.id} src={item.image_url} alt="Item" /><br />
            Posted: <Moment id={item.id} fromNow>{item.created_at}</Moment>
          </div>)
        })}
        <OneItem active={this.state.showModal} item={this.state.item} toggleShow={this.toggleModal} editModal="modal" />
      </main>
    )
  }
}

export default Items;