Rails.application.configure do
  config.consider_all_requests_local = true
  config.action_dispatch.show_exceptions = :none
  config.action_controller.allow_forgery_protection = false
  config.secret_key_base = 'judge-test-secret-key-base'
end
