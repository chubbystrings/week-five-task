
export interface person {
    name: string;
    location: string
}

interface data {
    boarded: person[];
    reservation: person[];
    count: number
}

export type locationsTuple = ['Abuja', 'Benue', 'Katsina', 'Lagos', 'Sambisa',]


const taskOne = (passengers:number, shuffle:number): data  =>{
    //complete your work here
    let { boarded, reservation, count}: {boarded: person[]; reservation: person[]; count: number} = passengersTask(passengers, shuffle)
    return {
        boarded,
        reservation,
        count
    }
}


const passengersTask = (passengers:number, shuffle:number): data => {
    // generate all passengers and push to reservation
    let reservation: person[] = generatePassengers(passengers);
    // return all passengers if passengers' number < 5
    if (passengers < 5) {
        return {
            boarded:[],
            reservation,
            count:0
        }
    }

    // get first trip using total number of passengers and number of passengers in reservation
    let { count, boarded, newReservation }: {count: number; boarded: person[]; newReservation: person[]} = getFirstTrip(passengers, reservation);
    reservation = newReservation;
    // console.log(boarded.length, reservation.length, count);

    // if shuffle is 0 return
    if (shuffle === 0) {
        return {
            boarded,
            reservation,
            count
        }
    }

    // if shuffle != 0 and passengers is not more than 5
    // break out of loop if passengers are less than 5 or shuffle is equal to 0
    while (shuffle > 0 && reservation.length >= 5) {
        const { multiple }: { multiple: number } = getMultipleOfFive(reservation.length);
        if (multiple > 10) {
            boarded = reservation.splice(0, 50);
            shuffle--;
            count++;
        } else {
            boarded = reservation.splice(0, multiple * 5);
            shuffle--;
            count++;
        }
    }
    return {boarded, reservation, count};
}


//Generate array of passengers and put them all in reservation
const generatePassengers = (passengers:number): person[] => {
    const reservation:person[] = [];
    let count:number = 0;
    const locations: locationsTuple = ['Abuja', 'Benue', 'Katsina', 'Lagos', 'Sambisa',]
    for (let i=0; i < passengers; i++) {
        const person: person = { name: `passenger${i + 1}`, location: locations[count] };
        reservation.push(person);
        count === 4 ? count = 0 : count++;
    }
    return reservation
}
// calculate multiples of 5 in reservation
const getMultipleOfFive = (number: number): { multiple:number, remainder:number} => {
    let multiple = 0
    let newNum = number
    if(number === 0 ){
       return {multiple: 0, remainder: 0}
    }
    for (let i = 5; i <= number; i +=5 ){
        multiple++
        newNum -= 5
    }
    return {multiple, remainder: newNum}
}

// calculate first trip
const getFirstTrip = (passengers:number, reservation: person[]): {count: number, boarded: person[], newReservation: person[], remainderAfterFirstTrip: number} => {
    let remainderAfterFirstTrip:number = 0;
    let boarded: person[] = []
    if (passengers >= 50) {
        boarded = reservation.splice(0, 50);
        remainderAfterFirstTrip = passengers - 50;
    } else {
        const firstTripMultiple: {multiple: number, remainder: number} = getMultipleOfFive(passengers);
        boarded = reservation.splice(0, firstTripMultiple.multiple * 5);
    }
    return {count: 1, boarded, newReservation: reservation, remainderAfterFirstTrip}
}
// passengersTask(100, 2)


export default taskOne;