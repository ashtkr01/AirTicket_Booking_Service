const { StatusCodes } = require('http-status-codes');

const { BookingService } = require('../services/index');

const { createChannel , publishMessage} = require('../utils/messageQueue');
const { REMINDER_BINDING_KEY } = require('../config/serverConfig');

const bookingService = new BookingService();

class BookingController{
    constructor(){
    }

    async sendMessageToQueue(req , res){
        console.log("Hello");
        const channel = await createChannel();
        console.log("Hi");
        const data = {message : 'Success'};
        publishMessage(channel , REMINDER_BINDING_KEY,JSON.stringify(data));
        return res.status(200).json({
            message : "Successfully published the event"
        });
    }

    async create(req , res) {
        try {
            const response = await bookingService.createBooking(req.body);
            // console.log("Booking Controller" , response);
            return res.status(StatusCodes.OK).json({
                message: 'Successfully Booking has been done',
                success: true,
                err: {},
                data: response
            });
        }
        catch (error) {
            // console.log("Booking Controller",error);
            return res.status(error.statusCode).json({
                message: error.message,
                suceess: false,
                err: error.explanation,
                data: {}
            });
        }
    }
}


module.exports = BookingController;