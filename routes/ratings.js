const router = require("express").Router();
const {MongoClient, ObjectId} = require("mongodb");
const client = new MongoClient("mongodb://localhost:27017/?readPreference=primary&ssl=false");

router.get("/all", async (req, res) => {
    try {
        await client.connect();

        const db = client.db("hoboken-tier-list");
        const all = db.collection("all");

        let totalDB = await all.findOne({});

        if (totalDB) {
            const items = db.collection("items");

            let promises = totalDB.items.map((item) => {
                return await items.findOne({_id: ObjectId(item)});
            }); 

            let resolved = await Promise.resolve(promises);
            res.status(200).json({items: resolved});
        } else {
            res.status(500);
        }
    } catch(e) {
        console.log(e);
    }
});

router.get("/:id", async (req, res) => {
    try {
        await client.connect();

        const db = client.db("hoboken-tier-list");
        const items = db.collection("items");

        let item = await items.findOne({_id: ObjectId(item)});

        if (item) {
            res.status(200).json({item: item});
        } else {
            res.status(404);
        }
    } catch(e) {
        console.log(e);
    }
});

router.post("/:id/vote/:vote", async (req, res) => {
    try {
        await client.connect();

        const db = client.db("hoboken-food-tier-list");
        const items = db.collection("items");

        let vote = req.params.vote;
        let id = req.params.id;

        let item = items.findOne({_id: ObjectId(id)});

        if (item) {
            let score = vote == "up" ? 1 : 0;

            item.score += score;
            item.possible++;

            const result = await items.updateOne({_id: ObjectId(id)}, {$set: item});

            if (result.modifiedCount > 0) {
                res.status(200);
            } else {
                res.status(500);
            }
        } else {
            res.status(404);
        }
    } catch(e) {
        console.log(e);
        res.status(500);
    }
});

module.exports = router;

