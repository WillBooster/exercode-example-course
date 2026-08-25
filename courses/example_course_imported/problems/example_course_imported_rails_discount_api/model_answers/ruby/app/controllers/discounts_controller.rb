class DiscountsController < ApplicationController
  def show
    unit_price = Integer(params.require(:unit_price))
    quantity = Integer(params.require(:quantity))
    discount_percent = Integer(params.require(:discount_percent))
    subtotal = unit_price * quantity

    render json: { total: subtotal * (100 - discount_percent) / 100 }
  end
end
