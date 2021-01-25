Rails.application.routes.draw do
  root to: 'site#index'

  resources :teams, only: [:show, :new]

  namespace :api do
    resources :teams, only: :create
  end
end
