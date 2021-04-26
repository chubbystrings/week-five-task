"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = __importDefault(require("../task/app"));
var mock_1 = require("./mock");
var firstMultipleShuffle = [
    { name: 'passenger51', location: 'Abuja' },
    { name: 'passenger52', location: 'Benue' },
    { name: 'passenger53', location: 'Katsina' },
    { name: 'passenger54', location: 'Lagos' },
    { name: 'passenger55', location: 'Sambisa' },
    { name: 'passenger56', location: 'Abuja' },
    { name: 'passenger57', location: 'Benue' },
    { name: 'passenger58', location: 'Katsina' },
    { name: 'passenger59', location: 'Lagos' },
    { name: 'passenger60', location: 'Sambisa' }
];
var secondMultipleShuffle = [
    { name: 'passenger101', location: 'Abuja' },
    { name: 'passenger102', location: 'Benue' },
    { name: 'passenger103', location: 'Katsina' },
    { name: 'passenger104', location: 'Lagos' },
    { name: 'passenger105', location: 'Sambisa' }
];
var thirdMultipleShuffle = [
    { name: 'passenger151', location: 'Abuja' },
    { name: 'passenger152', location: 'Benue' },
    { name: 'passenger153', location: 'Katsina' },
    { name: 'passenger154', location: 'Lagos' },
    { name: 'passenger155', location: 'Sambisa' }
];
var fourthMultipleShuffle = [
    { name: 'passenger201', location: 'Abuja' },
    { name: 'passenger202', location: 'Benue' },
    { name: 'passenger203', location: 'Katsina' },
    { name: 'passenger204', location: 'Lagos' },
    { name: 'passenger205', location: 'Sambisa' }
];
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
