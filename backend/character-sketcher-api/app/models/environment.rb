class Environment < ApplicationRecord
    has_many :environment_characters
    has_many :characters, through: :environment_characters
end
