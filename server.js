const express = require("express");
const http = require("http");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const apiRoutes = require("./routes");

const PORT = 8000;

let IP_ADDR_ALLOW = {};

app.set('trust proxy', true);

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.use((req, res, next) => {
    if (req.url == "/api/items/add" || req.url.includes("/vote/")) {
        if (!(IP_ADDR_ALLOW[req.ip+""] == undefined || IP_ADDR_ALLOW[req.ip+""] == -1)) {
            let currDate = new Date();
            IP_ADDR_ALLOW[req.ip+""] = new Date(currDate.getTime() + 30*60000);
            next();
        } else {
            if (IP_ADDR_ALLOW[req.ip+""] >= new Date()) {
                IP_ADDR_ALLOW[req.ip+""] = -1;
                next();
            } else {
                res.status(401).send("You are being ratelimited. Try again in 5 minutes.");
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