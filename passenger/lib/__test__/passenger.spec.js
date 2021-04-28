"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = __importDefault(require("../task/app"));
var mock_1 = require("./mock");
var generateMockPassengers = function (start, end) {
    var passengers = [];
    var count = 0;
    var locations = ['Abuja', 'Benue', 'Katsina', 'Lagos', 'Sambisa'];
    for (var i = start; i <= end; i++) {
        var person = { name: "passenger" + i, location: locations[count] };
        passengers.push(person);
        count === 4 ? count = 0 : count++;
    }
    return passengers;
};
var firstMultipleShuffle = generateMockPassengers(51, 60);
var secondMultipleShuffle = generateMockPassengers(101, 105);
var thirdMultipleShuffle = generateMockPassengers(151, 155);
var fourthMultipleShuffle = generateMockPassengers(201, 205);
var locations = ['Sambisa', 'Abuja', 'Benue', 'Lagos', 'Katsina'].sort();
describe("Test for function structure", function () {
    it("Returns an object for even distro", function () {
        var expected = app_1.default(14, 4);
        expect(expected).toHaveProperty('count');
        expect(expected).toHaveProperty('boarded');
        expect(expected).toHaveProperty('reservation');
    });
    it("checks that the function is called with 2 arguments", function () {
        var length = app_1.default.length;
        expect(length).toEqual(2);
    });
});
describe("Test for function expected value", function () {
    it("Returns evenly distributed values for boarded", function () {
        var boarded = app_1.default(14, 4).boarded;
        var obj = boarded.map(function (m) { return m.location; }).reduce(function (tally, item) {
            tally[item] = (tally[item] || 0) + 1;
            return tally;
        }, {});
        var expected = locations.every(function (location) { return obj[location] === boarded.length / 5; });
        expect(expected).toBe(true);
    });
    it("Returns reservation list for uneven distro", function () {
        var reservation = app_1.default(14, 4).reservation;
        expect(reservation.length).toBeGreaterThan(0);
        expect(reservation).toHaveLength(4);
    });
    it("boarded does not exceed 50 people for 60 passengers with shuffle of 0", function () {
        var boarded = app_1.default(60, 0).boarded;
        expect(boarded.length).toBe(50);
    });
});
describe("test for shuffle", function () {
    it("Single shuffle works ", function () {
        var _a = app_1.default(60, 1), count = _a.count, boarded = _a.boarded;
        expect(count).toBe(2);
        expect(boarded).toStrictEqual(firstMultipleShuffle);
    });
    it("first multiple shuffle works ", function () {
        var _a = app_1.default(105, 2), count = _a.count, boarded = _a.boarded;
        expect(count).toBe(3);
        expect(boarded).toStrictEqual(secondMultipleShuffle);
    });
    it("second multiple shuffle works ", function () {
        var _a = app_1.default(155, 3), count = _a.count, boarded = _a.boarded;
        expect(count).toBe(4);
        expect(boarded).toStrictEqual(thirdMultipleShuffle);
    });
    it("third multiple shuffle works ", function () {
        var _a = app_1.default(205, 4), count = _a.count, boarded = _a.boarded;
        expect(count).toBe(5);
        expect(boarded).toStrictEqual(fourthMultipleShuffle);
    });
});
describe("test for boarded value with passengers of 50 and shuffle 0", function () {
    var passengers = 50;
    var shuffle = 0;
    var expected = app_1.default(passengers, shuffle);
    expect(expected.boarded).toStrictEqual(mock_1.prefilled);
});
