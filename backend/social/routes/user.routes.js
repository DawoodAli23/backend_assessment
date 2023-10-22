const {
  createUser,
  getUsers,
  getUserById,
  deleteUserById,
  updatedUserById,
} = require("../controller/user.controller");

const router = require("express").Router();

router
  .get("/", getUsers)
  .get("/:id", getUserById)
  .post("/", createUser)
  .patch("/:id", updatedUserById)
  .delete("/:id", deleteUserById);

module.exports = router;
