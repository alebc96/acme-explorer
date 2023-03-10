"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTrip = exports.updateTrip = exports.getTrip = exports.getAllTrips = exports.addTrip = void 0;
const trip_1 = __importDefault(require("../models/trip"));
//create trip
const addTrip = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.title || !req.body.description) {
        return res.status(400).json({ msg: "Plase insert a valid Trip" });
    }
    try {
        const newTrip = new trip_1.default(req.body);
        yield newTrip.save();
        return res.status(201).json(newTrip);
    }
    catch (error) {
        return res.status(500).send(error);
    }
});
exports.addTrip = addTrip;
//get all trips
const getAllTrips = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const trpList = yield trip_1.default.find();
        return res.send(trpList);
    }
    catch (error) {
        return res.status(500).send(error);
    }
});
exports.getAllTrips = getAllTrips;
//get a trip by id
const getTrip = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const tripFound = yield trip_1.default.findById(id);
        if (tripFound === null) {
            return res.status(404).send("Trip not found");
        }
        else
            return res.send(tripFound);
    }
    catch (error) {
        if (error.name === "CastError") {
            return res.status(400).send("Introduce valid id");
        }
        return res.status(500).send(error);
    }
});
exports.getTrip = getTrip;
//update actor
const updateTrip = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const { title, description, price, list_of_requirements, start_date, end_date, pictures, cancelled, reason, } = req.body;
        const newTrip = yield trip_1.default.updateOne({ _id: id }, {
            $set: {
                title,
                description,
                price,
                list_of_requirements,
                start_date,
                end_date,
                pictures,
                cancelled,
                reason,
            },
        });
        return res.send(newTrip);
    }
    catch (error) {
        if (error.name == "ValidationError") {
            res.status(422).send(error);
        }
        return res.status(500).send(error);
    }
});
exports.updateTrip = updateTrip;
//remove actor
const deleteTrip = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const result = yield trip_1.default.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).json({ msg: "Trip not found" });
        }
        return res.status(200).send(result);
    }
    catch (error) {
        return res.status(500).send(error);
    }
});
exports.deleteTrip = deleteTrip;
