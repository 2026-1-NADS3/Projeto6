const express = require('express');
const IndexController = require('../controllers/index');

const router = express.Router();
const indexController = new IndexController();

function setRoutes(app) {
    router.get('/items', indexController.getItems.bind(indexController));
    router.post('/items', indexController.createItem.bind(indexController));
    
    app.use('/api', router);
}

module.exports = setRoutes;