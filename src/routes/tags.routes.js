// libs
const { Router } = require("express");

// imported variables
const TagsController = require("../controllers/TagsController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const TagsRoutes = Router();

const tagsController = new TagsController();

TagsRoutes.get("/", ensureAuthenticated, tagsController.index)

module.exports = TagsRoutes;