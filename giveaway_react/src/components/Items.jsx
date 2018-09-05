import React from 'react';

function Items(props) {
    return (
        props.items.map(item => {
        return (<div key={item.id}>
            <p>{item.name}</p>
            </div>)
        })
    )
}

export default Items;