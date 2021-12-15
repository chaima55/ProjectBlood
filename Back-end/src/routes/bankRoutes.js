const express = require("express");
const router = express.Router();
const bankController = require("../controllers/bankController");

//insert  blood
router.post("/insert",bankController.insertBlood);
//update blood
router.post("/transfer",bankController.transferBlood);
//get all 
router.get("/all",bankController.getAll);
// get Count
router.get("/:cat/:subcat/:c", bankController.getCount);
// get pourcentage
router.get("/:cat/:subcat/:c/:p", bankController.getPourcentage);


module.exports = router;
