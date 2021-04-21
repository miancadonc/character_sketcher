class CreateEnvironments < ActiveRecord::Migration[6.0]
  def change
    create_table :environments do |t|
      t.string :name
      t.string :medium

      t.timestamps
    end
  end
end
