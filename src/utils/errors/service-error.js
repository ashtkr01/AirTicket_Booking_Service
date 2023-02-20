const { StatusCodes } = require('http-status-codes');

class ServiceError extends Error {
    constructor(
        message = "Something wrong in Service Layer",
        explanation = "Service layer error",
        statusCode = StatusCodes.INTERNAL_SERVER_ERROR
    ){
        this.name = "Service Error";
        this.message = message;
        this.explanation = explanation;
        this.statusCode = statusCode;
    }
}

module.exports = ServiceError;