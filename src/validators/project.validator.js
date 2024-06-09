const { body, param } = require("express-validator");

exports.validateAddProject = [
    body("projectName")
        .notEmpty()
        .withMessage("This field is required. Thank you!"),
    body("reason").notEmpty().withMessage("This field is required. Thank you!"),
    body("type").notEmpty().withMessage("This field is required. Thank you!"),
    body("division")
        .notEmpty()
        .withMessage("This field is required. Thank you!"),
    body("category")
        .notEmpty()
        .withMessage("This field is required. Thank you!"),
    body("priority")
        .notEmpty()
        .withMessage("This field is required. Thank you!"),
    body("department")
        .notEmpty()
        .withMessage("This field is required. Thank you!"),
    body("startDate")
        .notEmpty()
        .withMessage("This field is required. Thank you!"),
    body("endDate")
        .notEmpty()
        .withMessage("This field is required. Thank you!"),
    body("location")
        .notEmpty()
        .withMessage("This field is required. Thank you!"),
];

exports.validateUpdateProject = [
    param("projectId")
        .notEmpty()
        .withMessage("This field is required. Thank you!"),
    body("projectName")
        .optional()
        .isString()
        .withMessage("This field must be a string. Thank you!"),
    body("reason")
        .optional()
        .isString()
        .withMessage("This field must be a string. Thank you!"),
    body("type")
        .optional()
        .isString()
        .withMessage("This field must be a string. Thank you!"),
    body("division")
        .optional()
        .isString()
        .withMessage("This field must be a string. Thank you!"),
    body("category")
        .optional()
        .isString()
        .withMessage("This field must be a string. Thank you!"),
    body("priority")
        .optional()
        .isString()
        .withMessage("This field must be a string. Thank you!"),
    body("department")
        .optional()
        .isString()
        .withMessage("This field must be a string. Thank you!"),
    body("startDate")
        .optional()
        .isString()
        .withMessage("This field must be a valid date. Thank you!"),
    body("endDate")
        .optional()
        .isString()
        .withMessage("This field must be a valid date. Thank you!"),
    body("location")
        .optional()
        .isString()
        .withMessage("This field must be a string. Thank you!"),
    body("tag")
        .optional()
        .isString()
        .withMessage("This field must be a string. Thank you!"),
];

exports.validateDeleteProject = [
    param("projectId")
        .notEmpty()
        .withMessage("This field is required. Thank you!"),
];
