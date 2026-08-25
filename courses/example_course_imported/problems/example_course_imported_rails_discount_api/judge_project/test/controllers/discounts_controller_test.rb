require 'test_helper'

class DiscountsControllerTest < ActionDispatch::IntegrationTest
  test 'returns the subtotal without a discount' do
    get '/discount', params: { unit_price: 120, quantity: 3, discount_percent: 0 }

    assert_response :success
    assert_equal({ 'total' => 360 }, response.parsed_body)
  end

  test 'applies the discount percentage' do
    get '/discount', params: { unit_price: 500, quantity: 2, discount_percent: 20 }

    assert_response :success
    assert_equal({ 'total' => 800 }, response.parsed_body)
  end

  test 'returns zero for a quantity of zero' do
    get '/discount', params: { unit_price: 999, quantity: 0, discount_percent: 25 }

    assert_response :success
    assert_equal({ 'total' => 0 }, response.parsed_body)
  end

  test 'discards the fractional amount' do
    get '/discount', params: { unit_price: 101, quantity: 3, discount_percent: 10 }

    assert_response :success
    assert_equal({ 'total' => 272 }, response.parsed_body)
  end
end
