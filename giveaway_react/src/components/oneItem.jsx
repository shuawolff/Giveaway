import React from 'react';
import Moment from 'react-moment';
import 'moment-timezone';

function OneItem(props) {
  return (
    <div class={props.active}>
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Modal title</p>
          <button class="delete" aria-label="close"></button>
        </header>
        <section class="modal-card-body">
        {/* <p>{props.item.name}</p>
            <img id="img" src={item.image_url} alt="Item"/><br/>
            Posted: <Moment fromNow>{item.created_at}</Moment> */}
        </section>
        <footer class="modal-card-foot">
        </footer>
      </div>
    </div>
  )
}

export default OneItem