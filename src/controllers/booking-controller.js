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
        const payload = {
            data : {
                subject : 'This is Ticket 1',
                content : 'This is some content to be send in email',
                recipientEmail : 'ashishkumarkhateriya@gmail.com',
                notificationTime : '2023-03-03 20:39:40'
            },
            service : 'CREATE_TICKET'
        };
        publishMessage(channel , REMINDER_BINDING_KEY,JSON.stringify(payload));
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