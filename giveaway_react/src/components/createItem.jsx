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
  }
    render() {
      return (
        <React.Fragment>
          <aside>
            <a onClick={this.props.homepage}>Go To Homepage</a> <br />
            <a className="button">Create New Item</a>
          </aside>
          <div className="modal">
            <div className="modal-background"></div>
            <div className="modal-card">
              <header className="modal-card-head">
                <p className="modal-card-title">Create Item</p>
                <button onClick={this.props.toggleLogin} className="delete" aria-label="close"></button>
              </header>
              <section className="modal-card-body">
                <form>
                  <label htmlFor="email">Email: </label>
                  <br />
                  {/* <input
                      name="email"
                      onChange={props.handleChange}
                      value={props.email.value}
                      type="email"
                    />
                    <br /><br />
                    <label htmlFor="password">Password:</label>
                    <br />
                    <input
                      name="password"
                      onChange={props.handleChange}
                      value={props.password.value}
                      type="password"
                    /> */}
                </form>
                <button onClick={this.props.register}>Register</button> | <button onClick={this.props.login}>Login</button>
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