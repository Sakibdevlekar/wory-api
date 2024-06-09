const projectModel = require("../models/projects.model");
const {
    asyncHandler,
    apiError,
    sendResponse,
} = require("../utils/helper.utils");

/**
 * @function addProject
 * @async
 * @param {import("express").Request} req - Express request object
 * @param {import("express").Response} res - Express response object
 * @throws {ApiError} Throws an ApiError if project creation fails
 * @description This asynchronous function handles adding a new project. It extracts project details from the request body,
 * creates a new project in the database, and sends a response indicating the creation status along with the new project details.
 */
exports.addProject = asyncHandler(async (req, res) => {
    const {
        projectName,
        reason,
        type,
        division,
        category,
        department,
        startDate,
        endDate,
        location,
        tag,
    } = req.body;

    // Create a new project with the provided details
    const newProject = await projectModel.create({
        projectName,
        clientId: req.user._id,
        reason,
        type,
        division,
        category,
        priority: req.body.priority.toUpperCase(),
        department,
        startDate,
        endDate,
        location,
        tag,
    });

    // If project creation fails, throw an error
    if (!newProject) {
        throw new apiError(
            400,
            "Something went wrong while creating the project",
        );
    }

    // Send a success response with the new project details
    sendResponse(res, 201, newProject, "Project created successfully");
});

/**
 * @function updateProjectStatus
 * @async
 * @param {import("express").Request} req - Express request object
 * @param {import("express").Response} res - Express response object
 * @throws {ApiError} Throws an ApiError if the project is not found
 * @description This asynchronous function handles updating the status of an existing project. It finds the project by its ID,
 * updates its status, and sends a response indicating the update status along with the updated project details.
 */
exports.updateProject = asyncHandler(async (req, res) => {
    const {
        projectName,
        priority,
        reason,
        type,
        division,
        category,
        department,
        startDate,
        endDate,
        location,
        tag,
    } = req.body;

    // Find the project by its ID
    const project = await projectModel.findOne({
        _id: req.params.projectId,
        clientId: req.user._id,
    });
    if (!project) {
        throw new apiError(404, "Project not found");
    }

    // Update the project's status
    const newStatus = await projectModel.findByIdAndUpdate(
        req.params.projectId,
        {
            projectName,
            reason,
            type,
            division,
            category,
            priority: priority ? priority.toUpperCase() : undefined,
            department,
            startDate,
            endDate,
            location,
            tag: tag ? tag.toUpperCase() : undefined,
        },
        { new: true },
    );

    // Send a success response with the updated project details
    sendResponse(res, 200, newStatus, "Project status updated successfully");
});

/**
 * @function getAllProjects
 * @async
 * @param {import("express").Request} req - Express request object
 * @param {import("express").Response} res - Express response object
 * @description This asynchronous function handles fetching all projects based on search criteria, status, sorting, and pagination.
 * It builds a query to filter projects, retrieves the matching projects from the database, sorts them based on a specified field,
 * and sends a response with the projects and pagination details.
 */

exports.getAllProjects = asyncHandler(async (req, res) => {
    const { search, tag } = req.query;
    const pageNumber = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const skip = (pageNumber - 1) * pageSize;
    let dbQuery = {
        clientId: req.user._id,
    };

    // Build  query based on project tag
    if (tag) {
        dbQuery.tag = tag.toUpperCase();
    }

    // Build search query based on user input
    if (search) {
        const searchRegex = new RegExp(search.trim(), "i");
        dbQuery.$or = [
            { projectName: { $regex: searchRegex } },
            { projectName: { $regex: searchRegex } },
        ];
    }

    // Count the total number of documents matching the query
    const dataCount = await projectModel.countDocuments(dbQuery);

    // Retrieve the projects matching the query, sort them based on the specified field, and paginate the results
    const projects = await projectModel
        .find(dbQuery)
        .skip(skip)
        .limit(pageSize);

    const startItem = skip + 1;
    const endItem = Math.min(
        startItem + pageSize - 1,
        startItem + projects.length - 1,
    );
    const totalPages = Math.ceil(dataCount / pageSize);

    // Send a response with the projects and pagination details
    sendResponse(
        res,
        200,
        {
            content: projects,
            startItem,
            endItem,
            totalPages,
            pageSize: projects.length,
            totalDoc: dataCount,
        },
        "Projects fetched successfully",
    );
});

/**
 * @function deleteProject
 * @async
 * @param {import("express").Request} req - Express request object
 * @param {import("express").Response} res - Express response object
 * @throws {ApiError} Throws an ApiError if the project is not found
 * @description This asynchronous function handles deleting a project. It finds the project by its ID and the user's ID,
 * deletes the project from the database, and sends a response indicating the deletion status.
 */
exports.deleteProject = asyncHandler(async (req, res) => {
    const { projectId } = req.params; // Extract the project ID from the request parameters

    // Find the project by its ID and the user's ID
    const project = await projectModel.findOne({
        _id: projectId,
        clientId: req.user._id,
    });

    // If the project is not found, throw an error
    if (!project) {
        throw new apiError(404, "Project not found");
    }

    // Delete the project from the database
    await projectModel.findByIdAndDelete(projectId);

    // Send a success response indicating the project deletion
    sendResponse(res, 200, null, "Project deleted successfully");
});
