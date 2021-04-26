import task, { person } from "../task/app";
import { prefilled } from "./mock";

interface frequency {
  [propName: string]: number;
}

interface data {
  boarded: person[];
  reservation: person[];
  count: number
}



const firstMultipleShuffle: person[] = [
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

const secondMultipleShuffle : person[] = [
  { name: 'passenger101', location: 'Abuja' }, 
  { name: 'passenger102', location: 'Benue' }, 
  { name: 'passenger103', location: 'Katsina' }, 
  { name: 'passenger104', location: 'Lagos' }, 
  { name: 'passenger105', location: 'Sambisa' }
]

const thirdMultipleShuffle: person[] =[

  { name: 'passenger151', location: 'Abuja' }, 
  { name: 'passenger152', location: 'Benue' }, 
  { name: 'passenger153', location: 'Katsina' }, 
  { name: 'passenger154', location: 'Lagos' }, 
  { name: 'passenger155', location: 'Sambisa' }
]

const fourthMultipleShuffle: person[] = [

  { name: 'passenger201', location: 'Abuja' }, 
  { name: 'passenger202', location: 'Benue' }, 
  { name: 'passenger203', location: 'Katsina' }, 
  { name: 'passenger204', location: 'Lagos' }, 
  { name: 'passenger205', location: 'Sambisa' }
]

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
