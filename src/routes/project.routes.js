const router = require("express").Router();
const {
    addProject,
    updateProject,
    getAllProjects,
    deleteProject,
} = require("../controllers/project.controller");
const {
    validateAddProject,
    validateUpdateProject,
    validateDeleteProject,
} = require("../validators/project.validator");
const { dataValidationResult } = require("../validators/validationResult");
const { isAuthenticated, isClient } = require("../middlewares/auth.middleware");

/* Protected Routes*/
router.use(isAuthenticated);
router.use(isClient);

router.post("/add", [validateAddProject, dataValidationResult], addProject);

router.put(
    "/update/:projectId",
    [validateUpdateProject, dataValidationResult],
    updateProject,
);

router.get("/get-all", getAllProjects);

router.delete("/delete/:projectId", validateDeleteProject, deleteProject);

module.exports = { projectRoutes: router };
