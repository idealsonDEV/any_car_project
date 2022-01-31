const router = require("express").Router();
const {catchErrors} = require("../handlers/errorhandlers");
const carController = require("../controllers/carControllers");
const multer = require("multer");

const auth = require("../middlewares/auth");

router.get("/", catchErrors(carController.getAll));
router.get("/car/:id", catchErrors(carController.get));

const upload = multer();

router.post("/car",upload.single("file"), auth, catchErrors(carController.post));

module.exports = router;
