const {Router} = require('express');
const router = Router();
const imageController = require("../controllers/images.js");

router.get("/images",imageController.getAllImages);

module.exports = router;