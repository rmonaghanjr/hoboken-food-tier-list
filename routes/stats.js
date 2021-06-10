const router = require("express").Router();
const {MongoClient, ObjectId} = require("mongodb");
const client = new MongoClient("mongodb://localhost:27017/?readPreference=primary&ssl=false");

router.get("/", async (req, res) => {
    try {
        await client.connect();

        const db = client.db("hoboken-food-tier-list");
        const all = db.collection("all");

        let totalDB = await all.findOne({_id: ObjectId("60c19f2fee509c27d67970b2")});

        if (totalDB) {
            let stats = {
                rateCount: totalDB.rateCount,
                viewCount: totalDB.viewCount,
                resturantCount: totalDB.items.length
            }

            res.status(200).json(stats)
        } else {
            res.status(500).send("Internal server error.");
        }

    } catch(e) {
        console.log(e);
        res.status(500).send("Internal server error.");
    }
});

router.get("/increment/rateCount", async (req, res) => {
    try {
        await client.connect();

        const db = client.db("hoboken-food-tier-list");
        const all = db.collection("all");

        let totalDB = await all.findOne({_id: ObjectId("60c19f2fee509c27d67970b2")});

        if (totalDB) {
            totalDB.rateCount++;

            const result = await all.updateOne({_id: ObjectId("60c19f2fee509c27d67970b2")}, {$set: totalDB});

            if (result.modifiedCount > 0) {
                res.status(200).send("Done");
            } else {
                res.status(500).send("Internal server error.");
            }

        } else {
            res.status(500).send("Internal server error.");
        }

    } catch(e) {
        console.log(e);
        res.status(500).send("Internal server error.");
    }
});

router.get("/increment/viewCount", async (req, res) => {
    try {
        await client.connect();

        const db = client.db("hoboken-food-tier-list");
        const all = db.collection("all");

        let totalDB = await all.findOne({_id: ObjectId("60c19f2fee509c27d67970b2")});

        if (totalDB) {
            totalDB["viewCount"]++;

            const result = await all.updateOne({_id: ObjectId("60c19f2fee509c27d67970b2")}, {$set: totalDB});

            if (result.modifiedCount > 0) {
                res.status(200).send("Done");
            } else {
                res.status(500).send("Internal server error. 3");
            }

        } else {
            res.status(500).send("Internal server error. 2");
        }

    } catch(e) {
        console.log(e);
        res.status(500).send("Internal server error. 1");
    }
});

module.exports = router;

