
const express = require('express');

const userController = require('../controllers/user');

const router = express.Router();

// /admin/add-product => GET

router.get('/getUsers', userController.getUsers);

 router.post('/addUser', userController.addUser);

router.put('/updateUser/:userId', userController.updateUser);

router.delete('/deleteUser/:userId', userController.deleteUser);

module.exports = router;
