const router = require("express").Router();
const {MongoClient} = require("mongodb");
const client = new MongoClient("mongodb://localhost:27017/?readPreference=primary&ssl=false");

router.get("/", async (req, res) => {
    try {
        await client.connect();

        const db = client.db("hoboken-tier-list");
        const all = db.collection("all");

        let totalDB = await all.findOne({});

        if (totalDB) {
            let stats = {
                rateCount: totalDB.rateCount,
                viewCount: totalDB.viewCount,
                resturantCount: totalDB.items.length
            }

            res.status(200).json(stats)
        } else {
            res.status(500)
        }

    } catch(e) {
        console.log(e);
        res.status(500)
    }
});

router.post("/increment/rateCount", (req, res) => {
    try {
        await client.connect();

        const db = client.db("hoboken-tier-list");
        const all = db.collection("all");

        let totalDB = await all.findOne({});

        if (totalDB) {
            totalDB.rateCount++;

            const result = await all.updateOne({}, {$set: totalDB});

            if (result.modifiedCount > 0) {
                res.status(200)
            } else {
                res.status(500)
            }

        } else {
            res.status(500)
        }

    } catch(e) {
        console.log(e);
        res.status(500)
    }
});

router.post("/increment/viewCount", (req, res) => {
    try {
        await client.connect();

        const db = client.db("hoboken-tier-list");
        const all = db.collection("all");

        let totalDB = await all.findOne({});

        if (totalDB) {
            totalDB.viewCount++;

            const result = await all.updateOne({}, {$set: totalDB});

            if (result.modifiedCount > 0) {
                res.status(200)
            } else {
                res.status(500)
            }

        } else {
            res.status(500)
        }

    } catch(e) {
        console.log(e);
        res.status(500)
    }
});

module.exports = router;

