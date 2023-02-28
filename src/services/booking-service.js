const axios = require('axios');

const { FLIGHT_SERVICE_PATH } = require('../config/serverConfig');
const { BookingRepository } = require('../repository/index');

const { ServiceError } = require('../utils/errors');

class BookingService{
    constructor(){
        this.bookingRepository = new BookingRepository();
    }

    async createBooking(data){
        try {
            const flightId = data.flightId;
            // console.log("Flight ID " , flightId);
            // console.log("From Booking Service");
            
            const getFlightRequestURL = `${FLIGHT_SERVICE_PATH}/api/v1/flight/${flightId}`;
            const response = await axios.get(getFlightRequestURL);
            const flightData = response.data.data;
            let priceOfTheFlight = flightData.price;
            if(data.noOfSeats > flightData.totalSeats){
                throw new ServiceError('Something went wrong int Booking Service','Insufficient Seats in the flight');
            }
            const totalCost = priceOfTheFlight * data.noOfSeats;
            const bookingPayload = {...data , totalCost};

            const booking = await this.bookingRepository.create(bookingPayload);
            const updateFlightRequestURL = `${FLIGHT_SERVICE_PATH}/api/v1/flight/${booking.flightId}`;
            await axios.patch(updateFlightRequestURL,{totalSeats: flightData.totalSeats - booking.noOfSeats});

            const finalBooking = await this.bookingRepository.update(booking.id , {status: "Booked"});

            // console.log(flight.data.data);
            // return flight.data.data;
            return finalBooking;
        } catch (error) {
            if(error.name == 'Repository Error' || error.name == 'Validation Error'){
                throw error;
            }
            throw new ServiceError();
            // throw error;
        }
    }
}

module.exports = BookingService;