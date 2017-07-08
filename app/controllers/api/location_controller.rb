class Api::LocationController < ApplicationController
  def show
    render json: Geocoder.coordinates(params[:address])
  end
end
