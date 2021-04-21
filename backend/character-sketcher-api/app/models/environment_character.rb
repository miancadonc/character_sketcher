class EnvironmentCharacter < ApplicationRecord
  belongs_to :environment
  belongs_to :character
end
