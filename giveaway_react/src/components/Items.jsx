import React, { Component } from 'react';
import Moment from 'react-moment';
import 'moment-timezone';
import OneItem from '../components/oneItem';

class Items extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: "modal",
      item: []
    }
    this.toggleShow = this.toggleShow.bind(this)
  }

  toggleShow(e) {
    e.preventDefault();
    console.log(e.target.id)
    // this.setState({
    //   showModal: "modal is-active",
    //   item: e.target.id
    // })
  }

  render() {
    return (
      <main>
        {this.props.items.map(item => {
          return (<div id={item.id} onClick={this.toggleShow} key={item.id} className="child">
            <p id={item.id}>{item.name}</p>
            <img className="img" id={item.id} src={item.image_url} alt="Item" /><br />
            Posted: <Moment id={item.id} fromNow>{item.created_at}</Moment>
          </div>)
        })}
        <OneItem active={this.state.showModal} />
      </main>
    )
  }
}

export default Items;