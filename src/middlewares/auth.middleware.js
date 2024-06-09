const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const { asyncHandler, apiError, sendResponse } = require("../utils/helper.utils");

/**
 * Middleware function to authenticate user using JWT token.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function in the stack.
 * @throws Will throw an error if token is invalid or not provided.
 * @returns {void}
 */
exports.isAuthenticated = asyncHandler(async (req, res, next) => {
    let user;
    const token = req.cookies["access-token"];
    if (!token) throw new apiError(403, "Access Denied:Invalid access token");
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET_KEY);
    if (decoded) {
        user = await userModel.findById(decoded.user._id);
    }

    if (!user) {
        throw new apiError(401, "Access Denied:Unauthorized request");
    }

    req.user = user;
    next();
});

/**
 * Middleware function to check if the authenticated user is a client.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function in the stack.
 * @throws Will throw an error if the user is not a client.
 * @returns {void}
 */
exports.isClient = asyncHandler(async (req, res, next) => {
    if (req.user.userType!== 1) {
        return sendResponse(
            res,
            403,
            null,
            "You don't have permission to perform this action error code:1",
        );
    }
    next();
});
