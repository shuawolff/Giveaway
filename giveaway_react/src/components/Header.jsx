import React from 'react';

function Header(props) {
  return (
    <div>
      <header>
        <nav class="navbar" role="navigation" aria-label="dropdown navigation">
          {
            props.loggedIn
              ?
              <div class="navbar-item has-dropdown is-hoverable">
                <a class="navbar-link">
                  Account
          </a>
                <div class="navbar-dropdown is-right">
                  <a onClick={props.admin} class="navbar-item">
                    Account Info
      </a>
                  <a onClick={props.logout} class="navbar-item">
                    Log Out
      </a>
                </div>
              </div>
              :
              <div class="navbar-item has-dropdown is-hoverable">
                <a class="navbar-link">
                  Log In
          </a>
                <div class="navbar-dropdown is-right">
                  <a onClick={props.toggleLogin} class="navbar-item">
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
            <button onClick={props.toggleLogin} className="delete" aria-label="close"></button>
          </header>
          <section className="modal-card-body">
            <form>
              <label htmlFor="email">Email: </label>
              <br />
              <input
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