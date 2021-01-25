class SiteController < ApplicationController
  def index
    recent_teams = Team.last(12)
    gon.push(recent_teams: recent_teams)
  end
end
