class DiscountsController < ApplicationController
  def show
    render json: { total: 0 }
  end
end
