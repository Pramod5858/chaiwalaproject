const express = require("express");
const verifyToken = require("../Middleware/verifyToken");

const chaiwalaController = require("../Controller/items");

const usersController = require("../Controller/users");

//const transferget = require("../Middleware/verifyToken");

const route = express.Router();

//route.post("/chaiwalaorder", transferget, chaiwalaController.chaiwalaorder);

route.get("/chaiwala", chaiwalaController.getchaiwala);
route.get("/chaiwala/:_id",verifyToken, chaiwalaController.getItemdetails);
route.put("/chaiwala/:_id",verifyToken, chaiwalaController.putdetails);
route.post("/postitems", verifyToken, chaiwalaController.postitems);
route.delete("/postitems/:id",verifyToken, chaiwalaController.deleteitems);
route.get("/usersdetails",  usersController.usersdetails);


route.post("/signup", usersController.userssignup);
route.post("/verifyotp", usersController.verifyotp);
route.post("/login", usersController.postLogin);

module.exports = route;