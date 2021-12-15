const mongoose = require("mongoose");
const dotenv = require("dotenv");
const http = require("http");
const { createServer } = require("http");

dotenv.config({ path: "./config.env" });
const app = require("./app");
const server = http.createServer(app);

const DB = process.env.DATABASE.replace(
    "<password>",
    process.env.DATABASE_PASSWORD
 );

mongoose
   .connect(DB, {
      useNewUrlParser: true ,useUnifiedTopology: true
   })
   .then(() => console.log("DB connection successful!"));

const port = process.env.PORT;

server.listen(port, () => {
    console.log(`App running on port ${port}...`);
 });