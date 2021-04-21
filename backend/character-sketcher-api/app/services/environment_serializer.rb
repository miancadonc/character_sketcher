class EnvironmentSerializer

    def initialize(environment_object)
        @environment_object = environment_object
    end

    def to_serialized_json
        options = {
            include: {
                characters: {
                    except: [:created_at, :updated_at]
                }
            },
            except: [:created_at, :updated_at]
        }

        @environment_object.to_json(options)
    end

end