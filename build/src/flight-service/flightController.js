import axios from 'axios';
import Flight from './flightModel.js';
import User from '../user-service/userModel.js';
const create = async (req, res) => {
    console.log("create controller");
    try {
        const { origin, destination, price, userId } = req.body;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send("User not found");
        }
        const newFlight = {
            origin,
            destination,
            price,
        };
        const flight = new Flight(newFlight);
        await flight.save();
        res.status(201).send(newFlight);
    }
    catch (error) {
        console.log(error, "oops");
        return res.status(error.status || 500).send({ message: error.message, userMessage: "Something went wrong" });
    }
};
const get = async (req, res) => {
    const flights = await Flight.find();
    res.status(200).send(flights); // Respond with the list of flights
};
const getByID = async (req, res) => {
    const flightId = req.params.id;
    try {
        const flight = await Flight.findById(flightId);
        if (!flight) {
            return res.status(404).send({ message: 'Flight not found' });
        }
        res.status(200).send(flight); // Respond with the found flight
    }
    catch (error) {
        res.status(500).send(error);
    }
};
const remove = async (req, res) => {
    const flightId = req.params.id;
    await Flight.findByIdAndDelete(flightId);
    res.status(204).send(); // Respond with no content
};
const updateById = async (req, res) => {
    try {
        const { id } = req.params;
        const { origin, destination, price, userId } = req.body;
        await axios.get(`http://localhost:${process.env.USER_SERVICES_PATH}/users/${userId}`);
        const updatedFight = await Flight.findByIdAndUpdate(id, {
            origin,
            destination,
            price
        }, { new: true });
        res.status(200).send(updatedFight);
    }
    catch (error) {
        console.log(error);
        res.status(error.status || 500).send(error.message || "Somthing went wrong");
    }
};
export default { get, getByID, create, remove, updateById };
