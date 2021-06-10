const router = require("express").Router();
const {MongoClient, ObjectId} = require("mongodb");
const client = new MongoClient("mongodb://localhost:27017/?readPreference=primary&ssl=false");

router.get("/all", async (req, res) => {
    try {
        await client.connect();

        const db = client.db("hoboken-food-tier-list");
        const all = db.collection("all");

        let totalDB = await all.findOne({});

        if (totalDB) {
            const items = db.collection("items");

            let promises = totalDB.items.map(async (item) => {
                return await items.findOne({_id: ObjectId(item)});
            }); 

            Promise.all(promises).then(values => {
                console.log(values);
                res.status(200).json({items: values});
            })
        } else {
            res.status(500).send("Internal server error.");
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
            res.status(404).send("Not found!");
        }
    } catch(e) {
        console.log(e);
    }
});

router.get("/:id/vote/:vote", async (req, res) => {
    try {
        await client.connect();

        const db = client.db("hoboken-food-tier-list");
        const items = db.collection("items");

        let vote = req.params.vote;
        let id = req.params.id;

        let item = await items.findOne({_id: ObjectId(id)});

        if (item) {
            switch(vote) {
                case "s": {
                    item["score"] += 6;
                    break;
                }
                case "a": {
                    item["score"] += 5;
                    break;
                }
                case "b": {
                    item["score"] += 4;
                    break;
                }
                case "c": {
                    item["score"] += 3;
                    break;
                }
                case "d": {
                    item["score"] += 2;
                    break;
                }
                case "f": {
                    item["score"] += 1;
                    break;
                }
                default:
                    res.status(500).send("Internal server error.");
                    return;
            }
            item["possible"] += 6;
            item["voteCount"]++;
            if (item[vote] == undefined) {
                item[vote] = 0;
            }
            item[vote]++;

            const result = await items.updateOne({_id: ObjectId(id)}, {$set: item});

            if (result.modifiedCount > 0) {
                res.status(200).send("Success!");
            } else {
                res.status(500).send("Internal server error.");
            }
        } else {
            res.status(404).send("Not found!");
        }
    } catch(e) {
        console.log(e);
        res.status(500).send("Internal server error.");
    }
});

module.exports = router;

