const express = require("express");
const http = require("http");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const apiRoutes = require("./routes");

const PORT = 8000;

let IP_ADDR_ALLOW_ADDITION = {};
let IP_ADDR_ALLOW_VOTING = {};

app.set('trust proxy', true);

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.use((req, res, next) => {
    console.log(IP_ADDR_ALLOW_ADDITION, IP_ADDR_ALLOW_VOTING);
    let ip = req.ip.replace("::ffff:", "").split(".").join("");
    console.log(req.url);
    if (req.url == "/api/items/add") {
        if (!(IP_ADDR_ALLOW_ADDITION[ip+""] == undefined || IP_ADDR_ALLOW_ADDITION[ip+""] == -1)) {
            let currDate = new Date();
            IP_ADDR_ALLOW_ADDITION[ip+""] = new Date(currDate.getTime() + 5*60000);
            next();
        } else {
            if (IP_ADDR_ALLOW_ADDITION[ip+""] >= new Date()) {
                IP_ADDR_ALLOW_ADDITION[ip+""] = -1;
                next();
            } else {
                res.status(401).send("You are being ratelimited. Try again in 5 minutes.");
            }
        }
    } else if (req.url.includes("/vote/")) {
        if (!(IP_ADDR_ALLOW_VOTING[ip+""] == undefined || IP_ADDR_ALLOW_VOTING[ip+""] == -1)) {
            let currDate = new Date();
            IP_ADDR_ALLOW_VOTING[ip+""] = new Date(currDate.getTime() + 60000);
            next();
        } else {
            if (IP_ADDR_ALLOW_VOTING[ip+""] >= new Date()) {
                IP_ADDR_ALLOW_VOTING[ip+""] = -1;
                next();
            } else {
                res.status(401).send("You are being ratelimited. Try again in 1 minute.");
            }
        }
    } else {
        next();
    }
});

app.use("/api", apiRoutes);

server.listen(PORT, () => {
    console.log("listening on *:"+PORT);
})