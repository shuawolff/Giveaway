import React, { Component } from 'react';

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: "",
    }
    this.onClick = this.onClick.bind(this)
  }
  // When checkbox is clicked it adds the value to the string in state and removes from the string when unchecked
  onClick(e) {
    let num = e.target.value
    if (e.target.checked) {
      this.setState(prevState => {
        prevState.checked += num
      })
    } else {
      this.setState(prevState => {
        prevState.checked = prevState.checked.replace(num, "")
      })
    }
  }
// Calls the function to fetch items with the checked items passed in
  FilterItems() {
    this.props.onSubmit(this.state.checked);
  }
  render() {
    return (
      <aside>
        <h2>Filter Items:</h2>
        <br/>
        <form onSubmit={e => {
          e.preventDefault()
          this.FilterItems();
        }
        }>
          {this.props.categories.map(c => {
            return (<div key={c.id}>
              <label htmlFor={c.name}>{c.name}</label>
              <input onClick={this.onClick} type="checkbox" name={c.name} value={c.id} /><br />
            </div>)
          })}
          <br/>
          <input type="submit" value="Filter" />
        </form>
      </aside>
    )
  }
}

export default Filter;