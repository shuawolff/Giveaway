Rails.application.routes.draw do
  post 'user_token' => 'user_token#create'
  post 'users' => 'users#create'
  get 'users/:id/items' => 'users#getItems'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :items do
    resources :categories
  end

  resources :categories do
    resources :items, only: :index
  end 
end
