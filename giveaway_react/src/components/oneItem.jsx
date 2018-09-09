import React from 'react';
import Moment from 'react-moment';
import 'moment-timezone';
import EditItem from './EditItem';

function OneItem(props) {
  // Calls the function to toggle the edit modal
  function toggleEdit() {
    props.toggle('editModal')
  }

return (
  <div className={props.active}>
    <div className="modal-background"></div>
    <div className="modal-card">
      <header className="modal-card-head">
        <p className="modal-card-title">Item Details</p>
        <button onClick={props.toggleShow} className="delete" aria-label="close"></button>
      </header>
      <section className="modal-card-body">
        <p>{props.item.name}</p>
        <img id="img" src={props.item.image_url} alt="Item" /><br />
        <p>Description: <br />{props.item.description}</p>
        <p>Pickup at: {props.item.address}</p>
        Posted: <Moment fromNow>{props.item.created_at}</Moment>
      </section>
      <footer className="modal-card-foot">
      {/* Conditionally renders the Edit button if this is the users item */}
        {props.edit ?
          <button onClick={toggleEdit}>Edit</button>
          :
          null
        }
      </footer>
    </div>
    <EditItem active={props.editModal} toggle={toggleEdit} name={props.item.name} address={props.item.address} description={props.item.description} image_url={props.item.image_url} id={props.item.id} update={props.update} delete={props.delete}/>
  </div>
)
}

export default OneItem