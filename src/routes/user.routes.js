const router = require("express").Router();
const userController = require("../controllers/user.controller");
const {
    validateUserRegister,
    validateUserLogin,
} = require("../validators/user.validator");
const { dataValidationResult } = require("../validators/validationResult");
const { isAuthenticated } = require("../middlewares/auth.middleware");

router.post(
    "/register",
    [validateUserRegister, dataValidationResult],
    userController.registerUser,
);

router.post(
    "/login",
    [validateUserLogin, dataValidationResult],
    userController.login,
);

/* Protected Route*/
router.use(isAuthenticated);

router.get("/get-current-user", userController.getCurrentUser);

router.post("/logout", userController.logout);
module.exports = { userRoutes: router };
