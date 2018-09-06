const BASE_URL = 'http://localhost:3000';

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