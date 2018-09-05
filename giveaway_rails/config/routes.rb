Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :items do
    resources :categories
  end

  resources :categories do
    resources :items, only: :index
  end 
end
