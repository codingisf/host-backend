const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController.js');
const middleware = require('../controllers/authMiddleware.js');

router.post('/',middleware,todoController.createTodo);
router.get('/',middleware,todoController.getTodo);
router.delete('/:id',middleware,todoController.deleteTodo);
router.put('/:id',middleware,todoController.updateTodo);




module.exports = router;