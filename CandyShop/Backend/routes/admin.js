
const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

// /admin/add-product => GET

router.get('/getCandies', adminController.getcandies);

 router.post('/addCandy', adminController.addcandy);

router.put('/updateCandy/:candyId', adminController.updatecandy);


module.exports = router;
