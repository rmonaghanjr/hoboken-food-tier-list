const express = require("express");
const http = require("http");
const cors = require("cors");
const fs = require("fs");

const app = express();
const server = http.createServer(app);
const apiRoutes = require("./routes");

const PORT = 8000;

if (!fs.existsSync("./ratelimit.json")) {
    fs.writeFileSync("./ratelimit.json", JSON.stringify({
        voting: {},
        adding: {}
    }))
}

app.set('trust proxy', true);

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.use((req, res, next) => {
    let ratelimit = JSON.parse(fs.readFileSync("./ratelimit.json", "utf8"));
    let ip = req.ip.replace("::ffff:", "").split(".").join("");
    if (req.url == "/api/items/add") {
        if (!(ratelimit.adding[ip+""] == undefined || ratelimit.adding[ip+""] == -1)) {
            let currDate = new Date();
            ratelimit.adding[ip+""] = new Date(currDate.getTime() + 5*60000);
            next();
        } else {
            if (ratelimit.adding[ip+""] >= new Date()) {
                ratelimit.adding[ip+""] = -1;
                next();
            } else {
                res.status(401).send("You are being ratelimited. Try again in 5 minutes.");
            }
        }
    } else if (req.url.split("/vote/").length > 1) {
        if (!(ratelimit.voting[ip+""] == undefined || ratelimit.voting[ip+""] == -1)) {
            let currDate = new Date();
            ratelimit.voting[ip+""] = new Date(currDate.getTime() + 60000);
            next();
        } else {
            if (ratelimit.voting[ip+""] >= new Date()) {
                ratelimit.voting[ip+""] = -1;
                next();
            } else {
                res.status(401).send("You are being ratelimited. Try again in 1 minute.");
            }
        }
    } else {
        next();
    }
    console.log(ratelimit);
    fs.writeFileSync("./ratelimit.json", JSON.stringify(ratelimit));
});

app.use("/api", apiRoutes);

server.listen(PORT, () => {
    console.log("listening on *:"+PORT);
})