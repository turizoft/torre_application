Rails.application.routes.draw do
  root to: 'site#index'

  resources :teams, only: [:show, :new]

  namespace :api do
    resources :teams, only: :create
    resources :bios, only: :show
  end
end
