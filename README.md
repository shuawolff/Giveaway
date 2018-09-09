# Giveaway

Givaway is an app for people to post items they want to give away and for people to look if there is anything they need. Authorized users can post items and communicate with people who are giving things away to find out more or set up a pickup time.

### User Stories

1. As a user instead of throwing good quality items away I would like to give them away to people who will use them.
2. As a user who needs something I would like to see if there is a free good-quality item being given away instead of buying a new one.
3. As a user I want to be able to easily upload an item picture and description to be given away.
4. As a user I want to be able to filter for items I need and see if there is anything being given away that fits what I need.

### Technologies Used

I built this project with a Ruby on Rails server backend and React client side frontend. Bulma was used for styling along with CSS Grid. I also used the React-moment and jwt-decode npm packages in the project. 

### Code Example

This is the function that I used to keep track of which checkboxes were checked to filter by category. When a checkbox was clicked I added the value to a string in state and when unclicked I removed it. This string was then used in a fetch request to the server to retreive all items from those categories.
```
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
```

### M.V.P.

A site where a user can upload an item to be given away. It will display items filtered by category and have contact information so a pickup time can be set up to get the item. Once an item is picked up the user can check that it was given away and it will then no longer show as available.
There will be CRUD on items and a good filter for categories.

### Post M.V.P.

I would like to add messaging in the app so the users can communicate about the items directly in the app. Along with an embedded map so people can see exactly how far the item is from them. 
At first it would be strictly for free item giveaways, possibly later we can add the ability to sell items and pay directly within the app with paypal or something similar.

### ERD

![screen shot 2018-09-04 at 9 50 17 am](https://user-images.githubusercontent.com/30534934/45035464-0c84a480-b028-11e8-96d6-f13a5c586d1d.png)

### Wireframes
![screen shot 2018-09-09 at 5 30 27 pm](https://user-images.githubusercontent.com/30534934/45269105-207c3c00-b456-11e8-9ba9-11000cdfade2.png)
![screen shot 2018-09-09 at 5 30 27 pm](https://user-images.githubusercontent.com/30534934/45269105-207c3c00-b456-11e8-9ba9-11000cdfade2.png)

