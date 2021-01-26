class Team < ApplicationRecord
  serialize :member_ids, Array
  serialize :cached_images, Array

  validates :description, :member_ids, presence: true

  before_save :validate_member_ids,
              :validate_cached_images

  private

  def validate_member_ids
    raise 'team size must be at least 2' if member_ids.size < 2
    raise 'team size is greater than expected' if member_ids.size > 20
    raise 'member_ids can not be repeated' if member_ids.uniq.size != member_ids.size
  end

  def validate_cached_images
    raise 'cached_images number is greater than expected' if cached_images.size > 3
    raise 'cached_images can not be repeated' if cached_images.uniq.size != cached_images.size
  end
end
