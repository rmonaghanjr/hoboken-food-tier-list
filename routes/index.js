const router = require("express").Router();
const ratingsRouter = require("./ratings");
const statsRouter = require("./stats");
const itemRouter = require("./items");

router.use("/ratings", ratingsRouter);
router.use("/stats", statsRouter);
router.use("/items", itemRouter);

module.exports = router;

