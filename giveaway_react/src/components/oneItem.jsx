import React from 'react';
import Moment from 'react-moment';
import 'moment-timezone';

function OneItem(props) {
  return (
    <div className={props.active}>
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Item Details</p>
          <button onClick={props.toggle} className="delete" aria-label="close"></button>
        </header>
        <section className="modal-card-body">
        <p>{props.item.name}</p>
            <img id="img" src={props.item.image_url} alt="Item"/><br/>
            <p>Description: <br/>{props.item.description}</p>
            <p>Pickup at: {props.item.address}</p>
            Posted: <Moment fromNow>{props.item.created_at}</Moment>
        </section>
        <footer className="modal-card-foot">
        </footer>
      </div>
    </div>
  )
}

export default OneItem