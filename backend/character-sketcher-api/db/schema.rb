# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_04_14_173552) do

  create_table "characters", force: :cascade do |t|
    t.string "name"
    t.string "age"
    t.string "gender"
    t.string "description"
    t.string "goals"
    t.string "backstory"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "environment_characters", force: :cascade do |t|
    t.integer "environment_id", null: false
    t.integer "character_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["character_id"], name: "index_environment_characters_on_character_id"
    t.index ["environment_id"], name: "index_environment_characters_on_environment_id"
  end

  create_table "environments", force: :cascade do |t|
    t.string "name"
    t.string "medium"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  add_foreign_key "environment_characters", "characters"
  add_foreign_key "environment_characters", "environments"
end
