class Character < ApplicationRecord
    has_many :environment_characters
    has_many :environments, through: :environment_characters
end
