import task, { person, locationsTuple } from "../task/app";
import { prefilled } from "./mock";

interface frequency {
  [propName: string]: number;
}

interface data {
  boarded: person[];
  reservation: person[];
  count: number
}


const generateMockPassengers = (start:number, end:number,): person[] => {
  const passengers:person[] = [];
  let count:number = 0;
  const locations: locationsTuple = [ 'Abuja', 'Benue', 'Katsina', 'Lagos', 'Sambisa']
  for (let i=start; i <= end; i++) {
      const person = { name: `passenger${i}`, location: locations[count] };
      passengers.push(person);
      count === 4 ? count = 0 : count++;
  }
  return passengers
}

const firstMultipleShuffle: person[] = generateMockPassengers(51, 60)

const secondMultipleShuffle : person[] = generateMockPassengers(101, 105)

const thirdMultipleShuffle: person[] = generateMockPassengers(151, 155)

const fourthMultipleShuffle: person[] = generateMockPassengers(201, 205)


const locations:string[] = ['Sambisa', 'Abuja', 'Benue', 'Lagos', 'Katsina'].sort()

describe("Test for function structure", () => {
  it("Returns an object for even distro", () => {
    const expected: data = task(14, 4)
    expect(expected).toHaveProperty('count')
    expect(expected).toHaveProperty('boarded')
    expect(expected).toHaveProperty('reservation')
    
  });

  it("checks that the function is called with 2 arguments", () => {
    const length: number = task.length
    expect(length).toEqual(2)
  });
});

describe("Test for function expected value", () => {
  it("Returns evenly distributed values for boarded", () => {
    const { boarded }: {boarded: person[]} = task(14, 4)
    const obj = boarded.map((m) => m.location).reduce((tally: frequency, item:string) => {
      tally[item] = (tally[item] || 0) + 1;
      return tally
    }, {})

    const expected: boolean = locations.every((location) => obj[location] === boarded.length / 5)
    expect(expected).toBe(true)

  });

  it("Returns reservation list for uneven distro", () => {
  const {reservation }: {reservation: person[]} = task(14, 4)
    expect(reservation.length).toBeGreaterThan(0)
    expect(reservation).toHaveLength(4)
  });

  it("boarded does not exceed 50 people for 60 passengers with shuffle of 0", () => {
    const { boarded}: {boarded: person[]} = task(60, 0)
    expect(boarded.length).toBe(50)
  });
});

describe("test for shuffle", () => {
  it("Single shuffle works ", () => {
    const { count, boarded }: { count: number, boarded: person[]} = task(60, 1)
    expect(count).toBe(2)
    expect(boarded).toStrictEqual(firstMultipleShuffle)
  });

  it("first multiple shuffle works ", () => {
    const { count, boarded }: { count: number, boarded: person[]} = task(105, 2)
    expect(count).toBe(3)
    expect(boarded).toStrictEqual(secondMultipleShuffle)
  });

  it("second multiple shuffle works ", () => {
    const { count, boarded }: { count: number, boarded: person[]} = task(155, 3)
    expect(count).toBe(4)
    expect(boarded).toStrictEqual(thirdMultipleShuffle)

  });

  it("third multiple shuffle works ", () => {
    const { count, boarded }: { count: number, boarded: person[]} = task(205, 4)
    expect(count).toBe(5)
    expect(boarded).toStrictEqual(fourthMultipleShuffle)
  });
});

describe("test for boarded value with passengers of 50 and shuffle 0", () => {
  let passengers = 50;
  let shuffle = 0;

  const expected: { boarded: person[]; reservation: person[]; count: number} = task(passengers, shuffle);
  expect(expected.boarded).toStrictEqual(prefilled);
});
