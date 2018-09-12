import React, { Component } from 'react';

class EditItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Item_name: this.props.name,
      description: this.props.description,
      address: this.props.address,
      image_url: this.props.image_url,
      id: this.props.id
    }
    this.toggle = this.toggle.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  componentDidUpdate(prevProps) {
    // Checks if the props changed and if so resets the state
    if (this.props.id !== prevProps.id) {
      this.setState({
        Item_name: this.props.name,
        description: this.props.description,
        address: this.props.address,
        image_url: this.props.image_url,
        id: this.props.id
      })
    }
  }
// Toggle the modal closed and resets the form
  toggle() {
    this.props.toggle('editModal')
    this.setState({
      Item_name: '',
      description: '',
      address: '',
      image_url: '',
    })
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.props.update(this.state);
    this.props.toggle('editModal');
  }

  handleDelete(e) {
    e.preventDefault();
    this.props.delete(this.state.id)
    this.toggle();
  }

  render() {
    return (
      <React.Fragment>
        <div className={this.props.active} >
          <div className="modal-background"></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Edit Item</p>
              <button onClick={this.toggle} className="delete" aria-label="close"></button>
            </header>
            <section className="modal-card-body">
              <form onSubmit={this.handleSubmit}>
                <label htmlFor="name">Item Name: </label>
                <input
                  name="Item_name"
                  onChange={this.handleChange}
                  value={this.state.name}
                  required="required"
                  type="name"
                  placeholder="Name"
                />
                <br /><br />
                <label htmlFor="description">Description:</label>
                <input
                  name="description"
                  onChange={this.handleChange}
                  required="required"
                  value={this.state.description}
                  type="description"
                  placeholder="Description"
                />
                <br />
                <label htmlFor="address">Address:</label>
                <input
                  name="address"
                  onChange={this.handleChange}
                  value={this.state.address}
                  required="required"
                  type="address"
                  placeholder="address"
                />
                <br />
                <label htmlFor="Image_url">Image URL:</label>
                <input
                  name="image_url"
                  onChange={this.handleChange}
                  value={this.state.image_url}
                  required="required"
                  type="image_url"
                  placeholder="image_url"
                />
                <br />
                <footer className="modal-card-foot">
                  <button type="submit" value="Edit Item" className="button is-success">Submit</button>
                  <button onClick={this.toggle} className="button">Cancel</button>
                  <button onClick={this.handleDelete} className="button is-danger">Delete Item</button>
                </footer>
              </form>
            </section>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default EditItem;