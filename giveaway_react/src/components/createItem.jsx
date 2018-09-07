import React, { Component } from 'react';

class CreateItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      address: '',
      image_url: 'https://static.thenounproject.com/png/187803-200.png'
    }
    this.toggle = this.toggle.bind(this)
  }
  toggle() {
    this.props.toggle('createModal')
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
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
              <form>
                <label htmlFor="name">Item Name: </label>
                <br />
                <input
                      name="name"
                      onChange={this.handleChange}
                      value={this.state.name}
                      type="name"
                    />
                    <br /><br />
                    <label htmlFor="description">Description:</label>
                    <br />
                    <input
                      name="description"
                      onChange={this.handleChange}
                      value={this.state.description}
                      type="description"
                    />
              </form>
              <br />
            </section>
            <footer className="modal-card-foot">
              <p>{this.props.footer}</p>
            </footer>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default CreateItem;