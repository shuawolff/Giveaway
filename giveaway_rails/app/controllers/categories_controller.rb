class CategoriesController < ApplicationController
    def index 
        if params[:item_id]
            item = Item.find(params[:item_id])
            render json: {categories: item.categories}
        else
            render json: {categories: Category.all}
        end
    end

    def show
        id = params[:id]
        render json: {category: Category.find(id)}
    end

end
