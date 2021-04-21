class CreateEnvironmentCharacters < ActiveRecord::Migration[6.0]
  def change
    create_table :environment_characters do |t|
      t.references :environment, null: false, foreign_key: true
      t.references :character, null: false, foreign_key: true

      t.timestamps
    end
  end
end
