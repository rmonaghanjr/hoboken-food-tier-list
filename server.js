const express = require("express");
const http = require("http");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const apiRoutes = require("./routes");

const PORT = 8000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.use("/api", apiRoutes);

server.listen(PORT, () => {
    console.log("listening on *:"+PORT);
})