class TeamsController < ApplicationController
  def new; end

  def show
    team = Team.find(params[:id])
    gon.push(team_member_ids: team.member_ids)
  end
end
