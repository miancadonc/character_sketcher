class EnvironmentsController < ApplicationController
    def index
        environments = Environment.all
        render json: EnvironmentSerializer.new(environments).to_serialized_json
    end

    def show
        environment = Environment.find(params[:id])
        render json: EnvironmentSerializer.new(environment).to_serialized_json
    end

    def create
    end
end
