// libs
const { Router } = require("express");
const multer = require("multer");

// imported variables
const UsersController = require("../controllers/UserControllers");
const UserAvatarController = require("../controllers/userAvatarController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const uploadConfig = require("../configs/upload");

const usersRoutes = Router();
const upload = multer(uploadConfig.MULTER);

const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

usersRoutes.post("/", usersController.create);
usersRoutes.delete("/", ensureAuthenticated, usersController.delete);
usersRoutes.put("/", ensureAuthenticated, usersController.update);
usersRoutes.patch("/avatar", ensureAuthenticated, upload.single("avatar"), userAvatarController.update);

module.exports = usersRoutes;