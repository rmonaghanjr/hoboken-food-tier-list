const router = require("express").Router();
const {MongoClient, ObjectId} = require("mongodb");
const client = new MongoClient("mongodb://localhost:27017/?readPreference=primary&ssl=false");

router.get("/add", async (req, res) => {
    try {
        await client.connect();

        const db = client.db("stevens-food-guide");
        const items = db.collection("items");

        let name = req.query.name;
        let website = req.query.website;

        if (name == undefined || website == undefined) {
            res.status(500).send("Empty parameters.");
        } else {
            let item = {
                score: 0,
                possible: 0,
                voteCount: 0,
                name: name,
                website: website
            }
    
            const result = await items.insertOne(item);
    
            if (result.insertedCount > 0) {
                const all = db.collection("all");
    
                let totalDB = await all.findOne({_id: ObjectId("60c19f2fee509c27d67970b2")});
    
                if (totalDB) {
                    totalDB.items.push(result.insertedId)
                    const updateResult = await all.updateOne({}, {$set: totalDB});
    
                    if (updateResult.modifiedCount > 0) {
                        res.status(200).send("Success!");
                    } else {
                        res.status(500).send("Internal server error. 4");
                    }
                } else {
                    res.status(500).send("Internal server error. 3");
                }
            } else {
                res.status(500).send("Internal server error. 2");
            }
        }

    } catch(e) {
        console.log(e);
        res.status(500).send("Internal server error. 1");
    }
});

module.exports = router;

