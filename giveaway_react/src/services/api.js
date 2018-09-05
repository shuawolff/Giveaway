const BASE_URL = 'http://localhost:3000';

export function getAllItems() {
    return fetch(BASE_URL + '/items')
        .then(resp => resp.json())
}

export function getAllCategories() {
    return fetch(BASE_URL + '/categories')
        .then(resp => resp.json())
}