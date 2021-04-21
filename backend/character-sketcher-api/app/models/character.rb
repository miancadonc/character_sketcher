class Character < ApplicationRecord
    has_many :environment_characters, dependent: :destroy
    has_many :environments, through: :environment_characters
end
