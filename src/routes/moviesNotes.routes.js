// libs
const { Router } = require("express");

// imported variables
const MoviesNotesController = require("../controllers/MoviesNotesController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const MoviesNotesRoutes = Router();

const moviesNotesController = new MoviesNotesController();

MoviesNotesRoutes.use(ensureAuthenticated);

MoviesNotesRoutes.post("/", moviesNotesController.create);
MoviesNotesRoutes.get("/:id", moviesNotesController.show);
MoviesNotesRoutes.delete("/:id", moviesNotesController.delete);
MoviesNotesRoutes.get("/", moviesNotesController.index);

module.exports = MoviesNotesRoutes;