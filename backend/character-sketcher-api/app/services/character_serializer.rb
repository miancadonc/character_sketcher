class CharacterSerializer

    def initialize(character_object)
        @character_object = character_object
    end

    def to_serialized_json
        options = {
            except: [:created_at, :updated_at]
        }

        @character_object.to_json(options)
    end

end