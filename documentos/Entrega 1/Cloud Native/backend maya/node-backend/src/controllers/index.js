class IndexController {
    getItems(req, res) {
        // Logic to retrieve items
        res.send("Retrieve items");
    }

    createItem(req, res) {
        // Logic to create a new item
        res.send("Create item");
    }
}

module.exports = IndexController;