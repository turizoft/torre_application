Rails.application.routes.draw do
  root to: 'site#index'

  resources :teams, only: :new
end
