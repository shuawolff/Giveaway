import React from 'react';

function Header(props) {
  function toggle() {
    props.toggleLogin('loginModal')
  }
  return (
    <div>
      <header>
        <nav className="navbar" role="navigation" aria-label="dropdown navigation">
          {
            props.loggedIn
              ?
              <div className="navbar-item has-dropdown is-hoverable">
                <a className="navbar-link">
                  Account
          </a>
                <div className="navbar-dropdown is-right">
                  <a  onClick={props.createAdmin} className="navbar-item">
                    Create New Item
      </a>
                  <a onClick={props.admin} className="navbar-item">
                    Account Info
      </a>
                  <a onClick={props.logout} className="navbar-item">
                    Log Out
      </a>
                </div>
              </div>
              :
              <div className="navbar-item has-dropdown is-hoverable">
                <a className="navbar-link">
                  Log In
          </a>
                <div className="navbar-dropdown is-right">
                  <a onClick={toggle} className="navbar-item">
                    Log in
      </a>
                </div>
              </div>
          }
        </nav>
        <h1>Giveaway</h1>
        <div className="field is-grouped">
          <p className="control is-expanded">
            <input id="input" className="input" type="text" placeholder="Find an item" />
          </p>
          <p className="control">
            <a id="is-info" className="button is-info">
              Search
          </a>
          </p>
        </div>
        <a className="button">Create New Item</a>
      </header >
      <div className={props.active}>
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Log In</p>
            <button onClick={toggle} className="delete" aria-label="close"></button>
          </header>
          <section className="modal-card-body">
            <form>
              <label htmlFor="email">Email: </label>
              <br />
              <input
                name="email"
                onChange={props.handleChange}
                value={props.email}
                type="email"
              />
              <br /><br />
              <label htmlFor="password">Password:</label>
              <br />
              <input
                name="password"
                onChange={props.handleChange}
                value={props.password}
                type="password"
              />
            </form>
            <button onClick={props.register}>Register</button> | <button onClick={props.login}>Login</button>
            <br />
          </section>
          <footer className="modal-card-foot">
            <p>{props.footer}</p>
          </footer>
        </div>
      </div>
    </div>
  )
}

export default Header