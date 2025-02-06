const express = require('express');
const router = express.Router();
const { authenticate, authorizeAdmin } = require('../middlewares/auth');
const userController = require('../controllers/userController');

// Protect all routes after this middleware
router.use(authenticate);

// Only admin have permission to access these routes
router.post('/', authorizeAdmin, userController.createUser);
router.get('/', authorizeAdmin, userController.getUsers);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;