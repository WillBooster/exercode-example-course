Rails.application.routes.draw do
  get '/discount', to: 'discounts#show'
end
