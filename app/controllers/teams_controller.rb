class TeamsController < ApplicationController
  def new; end

  def show
    team = Team.find(params[:id])
    gon.push(team: team)
  end
end
