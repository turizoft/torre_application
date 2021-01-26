class TeamsControllerTest < ActionDispatch::IntegrationTest
  test "should create team" do
    assert_difference("Team.count") do
      post api_teams_url, params: { team: { description: 'foo', member_ids: [1, 2] } }, xhr: true
    end
  end

  test "should return team id" do
    post api_teams_url, params: { team: { description: 'foo', member_ids: [1, 2] } }, xhr: true
    assert_match /"id":".*"/, @response.body
    assert_equal "application/json", @response.media_type
  end
end
