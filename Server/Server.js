const express = require("express");
const dotenv = require("dotenv").config();
const server = express();
const userRoutes = require("./Src/Routes/UserRoutes");
const errorMiddleWare = require("./Src/MiddleWares/errorMiddleware");
PORT = process.env.PORT;

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use("/", userRoutes);

server.use(errorMiddleWare);

server.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
