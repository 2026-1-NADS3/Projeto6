class ItemService {
    constructor(itemModel) {
        this.itemModel = itemModel;
    }

    async getAllItems() {
        return await this.itemModel.find();
    }

    async getItemById(id) {
        return await this.itemModel.findById(id);
    }

    async createItem(data) {
        const newItem = new this.itemModel(data);
        return await newItem.save();
    }

    async updateItem(id, data) {
        return await this.itemModel.findByIdAndUpdate(id, data, { new: true });
    }

    async deleteItem(id) {
        return await this.itemModel.findByIdAndDelete(id);
    }
}

export default ItemService;