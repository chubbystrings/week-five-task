"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var taskOne = function (passengers, shuffle) {
    //complete your work here
    var _a = passengersTask(passengers, shuffle), boarded = _a.boarded, reservation = _a.reservation, count = _a.count;
    return {
        boarded: boarded,
        reservation: reservation,
        count: count
    };
};
var passengersTask = function (passengers, shuffle) {
    // generate all passengers and push to reservation
    var reservation = generatePassengers(passengers);
    // return all passengers if passengers' number < 5
    if (passengers < 5) {
        return {
            boarded: [],
            reservation: reservation,
            count: 0
        };
    }
    // get first trip using total number of passengers and number of passengers in reservation
    var _a = getFirstTrip(passengers, reservation), count = _a.count, boarded = _a.boarded, newReservation = _a.newReservation;
    reservation = newReservation;
    // console.log(boarded.length, reservation.length, count);
    // if shuffle is 0 return
    if (shuffle === 0) {
        return {
            boarded: boarded,
            reservation: reservation,
            count: count
        };
    }
    // if shuffle != 0 and passengers is not more than 5
    // break out of loop if passengers are less than 5 or shuffle is equal to 0
    while (shuffle > 0 && reservation.length >= 5) {
        var multiple = getMultipleOfFive(reservation.length).multiple;
        if (multiple > 10) {
            boarded = reservation.splice(0, 50);
            shuffle--;
            count++;
        }
        else {
            boarded = reservation.splice(0, multiple * 5);
            shuffle--;
            count++;
        }
    }
    return { boarded: boarded, reservation: reservation, count: count };
};
//Generate array of passengers and put them all in reservation
var generatePassengers = function (passengers) {
    var reservation = [];
    var count = 0;
    var locations = ['Abuja', 'Benue', 'Katsina', 'Lagos', 'Sambisa',];
    for (var i = 0; i < passengers; i++) {
        var person = { name: "passenger" + (i + 1), location: locations[count] };
        reservation.push(person);
        count === 4 ? count = 0 : count++;
    }
    return reservation;
};
// calculate multiples of 5 in reservation
var getMultipleOfFive = function (number) {
    var multiple = 0;
    var newNum = number;
    if (number === 0) {
        return { multiple: 0, remainder: 0 };
    }
    for (var i = 5; i <= number; i += 5) {
        multiple++;
        newNum -= 5;
    }
    return { multiple: multiple, remainder: newNum };
};
// calculate first trip
var getFirstTrip = function (passengers, reservation) {
    var remainderAfterFirstTrip = 0;
    var boarded = [];
    if (passengers >= 50) {
        boarded = reservation.splice(0, 50);
        remainderAfterFirstTrip = passengers - 50;
    }
    else {
        var firstTripMultiple = getMultipleOfFive(passengers);
        boarded = reservation.splice(0, firstTripMultiple.multiple * 5);
    }
    return { count: 1, boarded: boarded, newReservation: reservation, remainderAfterFirstTrip: remainderAfterFirstTrip };
};
// passengersTask(100, 2)
exports.default = taskOne;
