import React, { Component } from 'react';

class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: "",
        }
        this.onClick = this.onClick.bind(this)
    }
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
    FilterItems() {
        this.props.onSubmit(this.state.checked);
    }
    render() {
        return (
            <aside>
            <form onSubmit={e => {
                e.preventDefault()
                console.log(this.state.checked)
                this.FilterItems();
            }
            }>
                {this.props.categories.map(c => {
                    return (<div key={c.id}>
                        <label htmlFor={c.name}>{c.name}</label>
                        <input onClick={this.onClick} type="checkbox" name={c.name} value={c.id} /><br />
                    </div>)
                })}
                <input type="submit" value="Filter" />
            </form>
            </aside>
        )
    }
}

export default Filter;