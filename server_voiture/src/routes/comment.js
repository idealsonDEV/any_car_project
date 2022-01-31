const router = require("express").Router();
const {catchErrors} = require("../handlers/errorhandlers");
const commentController = require("../controllers/commentController");

const auth = require("../middlewares/auth");

router.get("/car/:id/comment", auth, catchErrors(commentController.get));
router.post("/car/:id/comment", auth, catchErrors(commentController.post));

module.exports = router;
