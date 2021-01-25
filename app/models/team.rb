class Team < ApplicationRecord
  serialize :member_ids, Array
end
