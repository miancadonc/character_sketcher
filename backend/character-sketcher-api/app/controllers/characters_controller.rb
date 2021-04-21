class CharactersController < ApplicationController

    def index
        characters = Character.all
        render json: CharacterSerializer.new(characters).to_serialized_json
    end

    def show
        character = Character.find(params[:id])
        render json: CharacterSerializer.new(character).to_serialized_json
    end

    def create
        character = Character.new(name: params[:name], age: params[:age], gender: params[:gender], description: params[:description], goals: params[:goals], backstory: params[:backstory])
        if params[:id] > 1
            Environment.find(params[:id]).characters << character
        end

        Environment.find(1).characters << character

        character.save
    end

    def destroy
        character = Character.find(params[:char_id])
        character.destroy
    end
end
