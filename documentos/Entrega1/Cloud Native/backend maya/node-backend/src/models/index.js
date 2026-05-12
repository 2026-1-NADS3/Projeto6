class Item {
    constructor(name, description) {
        this.name = name;
        this.description = description;
    }

    static validate(item) {
        if (!item.name || !item.description) {
            throw new Error('Invalid item: name and description are required.');
        }
    }
}

module.exports = Item;