import React, { Component } from 'react';
import jwtDecode from 'jwt-decode';


class CreateItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      address: '',
      image_url: 'https://static.thenounproject.com/png/187803-200.png',
      categories: '',
      user_id: jwtDecode(localStorage.getItem("jwt")).sub
    }
    this.toggle = this.toggle.bind(this)
    this.onClick = this.onClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    let user = jwtDecode(localStorage.getItem("jwt")).sub;
    this.props.categories.map(c => {
      this.setState({
       [c.name]: false,
       user_id: user
     })
   })
  }
  toggle() {
    this.props.toggle('createModal')
    this.setState({
      name: '',
      description: '',
      address: '',
      image_url: 'https://static.thenounproject.com/png/187803-200.png',
      categories: '',
    })
    this.props.categories.map(c => {
       this.setState({
        [c.name]: false
      })
    })
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit(evt) {
    debugger
    evt.preventDefault();
    this.props.onSubmit(this.state);
    this.setState({
      name: '',
      description: '',
      address: '',
      image_url: 'https://static.thenounproject.com/png/187803-200.png',
      categories: ''
    })
    this.props.toggle('createModal');
  }


  onClick(e) {
    let num = e.target.value
    let name = e.target.name
    if (this.state[name]=== true) {
      this.setState(prevState => {
        prevState.categories = prevState.categories.replace(num, "")
      })
      this.setState({
        [name]: false
      })
    } else {
      this.setState(prevState => {
        prevState.categories += num
      })
      this.setState({
        [name]: true
      })
    }
  }

  render() {
    return (
      <React.Fragment>
        <aside>
          <a onClick={this.props.homepage}>Go To Homepage</a> <br />
          <a onClick={this.toggle} className="button">Create New Item</a>
        </aside>
        <div className={this.props.active}>
          <div className="modal-background"></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Create Item</p>
              <button onClick={this.toggle} className="delete" aria-label="close"></button>
            </header>
            <section className="modal-card-body">
              <form onSubmit={this.handleSubmit}>
                <label htmlFor="name">Item Name: </label>
                <input
                  name="name"
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
                <label htmlFor="Image_url">Select all categories that apply:</label>
                {this.props.categories.map(c => {
                  return (<div key={c.id}>
                    <label htmlFor={c.name}>{c.name}</label>
                    <input onClick={this.onClick} type="checkbox" name={c.name} value={c.id} checked={this.state[c.name]} /><br />
                  </div>)
                })}
              <br />
            <footer className="modal-card-foot">
              <button type="submit" value="Create Item" className="button is-success">Create Item</button>
              <button onClick={this.toggle} className="button">Cancel</button>
            </footer>
              </form>
            </section>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default CreateItem;