class CreateCharacters < ActiveRecord::Migration[6.0]
  def change
    create_table :characters do |t|
      t.string :name
      t.string :age
      t.string :gender
      t.string :description
      t.string :goals
      t.string :backstory

      t.timestamps
    end
  end
end
