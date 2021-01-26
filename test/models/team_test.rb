require "test_helper"

class TeamTest < ActiveSupport::TestCase
  test "should not save without description" do
    team = Team.new(member_ids: [1, 2])
    assert_not team.save
  end

  test "should not save without member ids" do
    team = Team.new(description: 'foo')
    assert_not team.save
  end

  test "team members must be at least 2" do
    team = Team.new(description: 'foo', member_ids: [1])
    assert_raises do
      team.save
    end
  end

  test "team members must be at most 20" do
    team = Team.new(description: 'foo', member_ids: (1..21).to_a)
    assert_raises do
      team.save
    end
  end

  test "team members ids must be unique" do
    team = Team.new(description: 'foo', member_ids: [1, 1, 2])
    assert_raises do
      team.save
    end
  end

  test "cached images must be at most 3" do
    team = Team.new(description: 'foo', member_ids: [1, 2], cached_images: (1..4).to_a)
    assert_raises do
      team.save
    end
  end

  test "cached images must be unique" do
    team = Team.new(description: 'foo', member_ids: [1, 2], cached_images: [1, 1, 2])
    assert_raises do
      team.save
    end
  end
end
