class ItemsController < ApplicationController
  # before_action :authenticate_user
    def index
      if params[:category_id]
        ids = params[:category_id].to_s.split("").map(&:to_i)
        render json: {items: Item.includes(:categories).where(categories: {id: ids}).order({created_at: :desc})}
      else
        render json: {items: Item.all.order({created_at: :desc})}
      end
    end

    def show
        id = params[:id]
        render json: {item: Item.find(id)}
    end

    def create
      new_item = Item.new("name": item_params["name"], "description": item_params["description"],"image_url": item_params["image_url"], "address": item_params["address"]  )
        if new_item.save
          item = Item.last
          categories = item_params["categories"].split("").map(&:to_i)
          categories.map{|c| item.categories << Category.find(c)} 
          render json: new_item.to_json()
        else
          render json: { message: 'Some fields are invalid', errors: @new_item.errors}, status: :bad_request 
        end
    end

    def update
      item = Item.find(params[:id])
        if item.update(item_params)
          render json: item.to_json()
        else
          render json: { message: 'Some fields are invalid', errors: item.errors}, status: :bad_request 
        end
      end

    def destroy
        item = Item.find(params[:id])
        item.destroy
        render json: { message: "Item #{params[:id]} deleted"}
    end


    private
    def item_params
        params
          .permit(
            :name,
            :description,
            :image_url,
            :address,
            :categories,
            :user_id
          )
      end
end
