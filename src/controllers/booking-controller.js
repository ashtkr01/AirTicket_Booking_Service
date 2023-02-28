const { StatusCodes } = require('http-status-codes');

const { BookingService } = require('../services/index');

const bookingService = new BookingService();

const create = async (req , res) => {
    try {
        const response = await bookingService.createBooking(req.body);
        // console.log("Booking Controller" , response);
        return res.status(StatusCodes.OK).json({
            message: 'Successfully Booking has been done',
            success: true,
            err: {},
            data: response
        });
    } catch (error) {
        // console.log("Booking Controller",error);
        return res.status(error.statusCode).json({
            message: error.message,
            suceess: false,
            err: error.explanation,
            data: {}
        });
    }
}

module.exports = {
    create
}