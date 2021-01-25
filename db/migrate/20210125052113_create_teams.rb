class CreateTeams < ActiveRecord::Migration[6.1]
  def change
    create_table :teams, id: :uuid, default: -> { "gen_random_uuid()" } do |t|
      t.string :description, null: false
      t.string :member_ids, null: false

      t.timestamps
    end
  end
end
