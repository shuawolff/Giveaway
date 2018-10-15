const BASE_URL = 'https://hidden-bastion-24577.herokuapp.com';

export function getAllItems() {
    return fetch(BASE_URL + '/items')
        .then(resp => resp.json())
}

export function getAllCategories() {
    return fetch(BASE_URL + '/categories')
        .then(resp => resp.json())
}

export function FilteredItems(categories) {
    return fetch(BASE_URL + `/categories/${categories}/items`)
        .then(resp => resp.json())
}

export function oneItem(id) {
    return fetch(BASE_URL + `/items/${id}`)
        .then(resp => resp.json())
}

export function userItems(id) {
    return fetch(BASE_URL + `/users/${id}/items`)
        .then(resp => resp.json())
}

export function saveItem(item) {
    const opts = {
      method: 'POST',
      body: JSON.stringify(item),
      headers: {
        'Content-Type': 'application/json'
      }
    };
  
    return fetch(`${BASE_URL}/items`, opts)
      .then(resp => resp.json());
  };

  export function updateItem(item) {
    const opts = {
      method: 'PUT',
      body: JSON.stringify(item),
      headers: {
        'Content-Type': 'application/json'
      }
    }
    return fetch(`${BASE_URL}/items/${item.id}`, opts)
      .then(resp => resp.json());
  };

  export function deleteItem(itemId) {
    const opts ={
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }
    return fetch(`${BASE_URL}/items/${itemId}`, opts)
    .then(resp => "deleted")
    .catch(err => {
      throw Error(err);
    })
  };