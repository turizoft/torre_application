class Api::BiosController < ApplicationController
  def show
    response = BioFetcher.fetch(params[:id])
    render json: response, status: :ok
  rescue BioFetcher::InvalidResponse
    render json: { error: 'Error fetching bio from external service' }, status: :internal_server_error
  end
end
