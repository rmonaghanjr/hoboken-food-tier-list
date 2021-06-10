const router = require("express").Router();
const ratingsRouter = require("./ratings");
const statsRouter = require("./stats");

router.use("/ratings", ratingsRouter);
router.use("/stats", statsRouter);

module.exports = router;

