class Api::TeamsController < ApplicationController
  def create
    new_team = Team.create!(team_params)
    render json: { id: new_team.id }, status: :created
  end

  private

  def team_params
    params
      .require(:team)
      .permit(
        :description,
        member_ids: [],
        cached_images: []
      )
  end
end
