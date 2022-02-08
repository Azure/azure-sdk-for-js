// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

const snapshot: Record<string, unknown> = {};

snapshot["Cross partition GROUP BY by number 1"] = [
  {
    age: 11,
  },
  {
    age: 12,
  },
  {
    age: 13,
  },
  {
    age: 14,
  },
  {
    age: 15,
  },
  {
    age: 16,
  },
  {
    age: 17,
  },
  {
    age: 18,
  },
];

snapshot["Cross partition GROUP BY by string 1"] = [
  {
    name: "Abby",
  },
  {
    name: "Adam",
  },
  {
    name: "Alex",
  },
  {
    name: "Bill",
  },
  {
    name: "Carl",
  },
  {
    name: "Dave",
  },
  {
    name: "Ella",
  },
  {
    name: "Eric",
  },
  {
    name: "Fred",
  },
  {
    name: "Gary",
  },
  {
    name: "John",
  },
  {
    name: "Lisa",
  },
  {
    name: "Lori",
  },
  {
    name: "Lucy",
  },
  {
    name: "Mady",
  },
  {
    name: "Mary",
  },
  {
    name: "Mike",
  },
  {
    name: "Rose",
  },
  {
    name: "Ryan",
  },
  {
    name: "Zara",
  },
];

snapshot["Cross partition GROUP BY by id 1"] = [
  {
    id: "01",
  },
  {
    id: "02",
  },
  {
    id: "03",
  },
  {
    id: "04",
  },
  {
    id: "05",
  },
  {
    id: "06",
  },
  {
    id: "07",
  },
  {
    id: "08",
  },
  {
    id: "09",
  },
  {
    id: "10",
  },
  {
    id: "11",
  },
  {
    id: "12",
  },
  {
    id: "13",
  },
  {
    id: "14",
  },
  {
    id: "15",
  },
  {
    id: "16",
  },
  {
    id: "17",
  },
  {
    id: "18",
  },
  {
    id: "19",
  },
  {
    id: "20",
  },
  {
    id: "21",
  },
  {
    id: "22",
  },
  {
    id: "23",
  },
  {
    id: "24",
  },
  {
    id: "25",
  },
  {
    id: "26",
  },
  {
    id: "27",
  },
  {
    id: "28",
  },
  {
    id: "29",
  },
  {
    id: "30",
  },
  {
    id: "31",
  },
  {
    id: "32",
  },
  {
    id: "33",
  },
  {
    id: "34",
  },
  {
    id: "35",
  },
  {
    id: "36",
  },
  {
    id: "37",
  },
  {
    id: "38",
  },
  {
    id: "39",
  },
  {
    id: "40",
  },
  {
    id: "41",
  },
  {
    id: "42",
  },
  {
    id: "43",
  },
  {
    id: "44",
  },
  {
    id: "45",
  },
  {
    id: "46",
  },
  {
    id: "47",
  },
  {
    id: "48",
  },
  {
    id: "49",
  },
  {
    id: "50",
  },
  {
    id: "51",
  },
  {
    id: "52",
  },
  {
    id: "53",
  },
  {
    id: "54",
  },
  {
    id: "55",
  },
  {
    id: "56",
  },
  {
    id: "57",
  },
  {
    id: "58",
  },
  {
    id: "59",
  },
  {
    id: "60",
  },
  {
    id: "61",
  },
  {
    id: "62",
  },
  {
    id: "63",
  },
  {
    id: "64",
  },
];

snapshot["Cross partition GROUP BY with multiple fields 1"] = [
  {
    age: 11,
    name: "Alex",
  },
  {
    age: 11,
    name: "Bill",
  },
  {
    age: 11,
    name: "Eric",
  },
  {
    age: 11,
    name: "John",
  },
  {
    age: 11,
    name: "Lisa",
  },
  {
    age: 11,
    name: "Lori",
  },
  {
    age: 11,
    name: "Ryan",
  },
  {
    age: 11,
    name: "Zara",
  },
  {
    age: 12,
    name: "Abby",
  },
  {
    age: 12,
    name: "Fred",
  },
  {
    age: 12,
    name: "John",
  },
  {
    age: 12,
    name: "Lucy",
  },
  {
    age: 12,
    name: "Ryan",
  },
  {
    age: 12,
    name: "Zara",
  },
  {
    age: 13,
    name: "Abby",
  },
  {
    age: 13,
    name: "Adam",
  },
  {
    age: 13,
    name: "Alex",
  },
  {
    age: 13,
    name: "Bill",
  },
  {
    age: 13,
    name: "John",
  },
  {
    age: 14,
    name: "Alex",
  },
  {
    age: 14,
    name: "Gary",
  },
  {
    age: 14,
    name: "John",
  },
  {
    age: 14,
    name: "Lucy",
  },
  {
    age: 14,
    name: "Mady",
  },
  {
    age: 14,
    name: "Rose",
  },
  {
    age: 15,
    name: "Alex",
  },
  {
    age: 15,
    name: "Dave",
  },
  {
    age: 15,
    name: "Fred",
  },
  {
    age: 15,
    name: "Mady",
  },
  {
    age: 15,
    name: "Mary",
  },
  {
    age: 15,
    name: "Mike",
  },
  {
    age: 16,
    name: "Adam",
  },
  {
    age: 16,
    name: "Bill",
  },
  {
    age: 16,
    name: "Ella",
  },
  {
    age: 16,
    name: "Eric",
  },
  {
    age: 16,
    name: "John",
  },
  {
    age: 16,
    name: "Lisa",
  },
  {
    age: 17,
    name: "Abby",
  },
  {
    age: 17,
    name: "Carl",
  },
  {
    age: 17,
    name: "Ella",
  },
  {
    age: 17,
    name: "Fred",
  },
  {
    age: 17,
    name: "Gary",
  },
  {
    age: 17,
    name: "Lori",
  },
  {
    age: 17,
    name: "Mary",
  },
  {
    age: 17,
    name: "Zara",
  },
  {
    age: 18,
    name: "Eric",
  },
  {
    age: 18,
    name: "Fred",
  },
  {
    age: 18,
    name: "Mady",
  },
  {
    age: 18,
    name: "Mary",
  },
];

snapshot["Cross partition GROUP BY with COUNT 1"] = [
  {
    age: 11,
    count: 8,
  },
  {
    age: 12,
    count: 8,
  },
  {
    age: 13,
    count: 7,
  },
  {
    age: 14,
    count: 8,
  },
  {
    age: 15,
    count: 9,
  },
  {
    age: 16,
    count: 8,
  },
  {
    age: 17,
    count: 10,
  },
  {
    age: 18,
    count: 6,
  },
];

snapshot["Cross partition GROUP BY with MIN 1"] = [
  {
    name: "Abby",
    min_age: 12,
  },
  {
    name: "Adam",
    min_age: 13,
  },
  {
    name: "Alex",
    min_age: 11,
  },
  {
    name: "Bill",
    min_age: 11,
  },
  {
    name: "Carl",
    min_age: 17,
  },
  {
    name: "Dave",
    min_age: 15,
  },
  {
    name: "Ella",
    min_age: 16,
  },
  {
    name: "Eric",
    min_age: 11,
  },
  {
    name: "Fred",
    min_age: 12,
  },
  {
    name: "Gary",
    min_age: 14,
  },
  {
    name: "John",
    min_age: 11,
  },
  {
    name: "Lisa",
    min_age: 11,
  },
  {
    name: "Lori",
    min_age: 11,
  },
  {
    name: "Lucy",
    min_age: 12,
  },
  {
    name: "Mady",
    min_age: 14,
  },
  {
    name: "Mary",
    min_age: 15,
  },
  {
    name: "Mike",
    min_age: 15,
  },
  {
    name: "Rose",
    min_age: 14,
  },
  {
    name: "Ryan",
    min_age: 11,
  },
  {
    name: "Zara",
    min_age: 11,
  },
];

snapshot["Cross partition GROUP BY with MAX 1"] = [
  {
    name: "Abby",
    min_age: 17,
  },
  {
    name: "Adam",
    min_age: 16,
  },
  {
    name: "Alex",
    min_age: 15,
  },
  {
    name: "Bill",
    min_age: 16,
  },
  {
    name: "Carl",
    min_age: 17,
  },
  {
    name: "Dave",
    min_age: 15,
  },
  {
    name: "Ella",
    min_age: 17,
  },
  {
    name: "Eric",
    min_age: 18,
  },
  {
    name: "Fred",
    min_age: 18,
  },
  {
    name: "Gary",
    min_age: 17,
  },
  {
    name: "John",
    min_age: 16,
  },
  {
    name: "Lisa",
    min_age: 16,
  },
  {
    name: "Lori",
    min_age: 17,
  },
  {
    name: "Lucy",
    min_age: 14,
  },
  {
    name: "Mady",
    min_age: 18,
  },
  {
    name: "Mary",
    min_age: 18,
  },
  {
    name: "Mike",
    min_age: 15,
  },
  {
    name: "Rose",
    min_age: 14,
  },
  {
    name: "Ryan",
    min_age: 12,
  },
  {
    name: "Zara",
    min_age: 17,
  },
];

snapshot["Cross partition GROUP BY with SUM 1"] = [
  {
    name: "Abby",
    min_age: 59,
  },
  {
    name: "Adam",
    min_age: 42,
  },
  {
    name: "Alex",
    min_age: 53,
  },
  {
    name: "Bill",
    min_age: 53,
  },
  {
    name: "Carl",
    min_age: 34,
  },
  {
    name: "Dave",
    min_age: 15,
  },
  {
    name: "Ella",
    min_age: 33,
  },
  {
    name: "Eric",
    min_age: 45,
  },
  {
    name: "Fred",
    min_age: 62,
  },
  {
    name: "Gary",
    min_age: 31,
  },
  {
    name: "John",
    min_age: 98,
  },
  {
    name: "Lisa",
    min_age: 27,
  },
  {
    name: "Lori",
    min_age: 28,
  },
  {
    name: "Lucy",
    min_age: 66,
  },
  {
    name: "Mady",
    min_age: 47,
  },
  {
    name: "Mary",
    min_age: 101,
  },
  {
    name: "Mike",
    min_age: 45,
  },
  {
    name: "Rose",
    min_age: 14,
  },
  {
    name: "Ryan",
    min_age: 23,
  },
  {
    name: "Zara",
    min_age: 52,
  },
];

snapshot["Cross partition GROUP BY with AVG 1"] = [
  {
    name: "Abby",
    min_age: 14.75,
  },
  {
    name: "Adam",
    min_age: 14,
  },
  {
    name: "Alex",
    min_age: 13.25,
  },
  {
    name: "Bill",
    min_age: 13.25,
  },
  {
    name: "Carl",
    min_age: 17,
  },
  {
    name: "Dave",
    min_age: 15,
  },
  {
    name: "Ella",
    min_age: 16.5,
  },
  {
    name: "Eric",
    min_age: 15,
  },
  {
    name: "Fred",
    min_age: 15.5,
  },
  {
    name: "Gary",
    min_age: 15.5,
  },
  {
    name: "John",
    min_age: 14,
  },
  {
    name: "Lisa",
    min_age: 13.5,
  },
  {
    name: "Lori",
    min_age: 14,
  },
  {
    name: "Lucy",
    min_age: 13.2,
  },
  {
    name: "Mady",
    min_age: 15.666666666666666,
  },
  {
    name: "Mary",
    min_age: 16.833333333333332,
  },
  {
    name: "Mike",
    min_age: 15,
  },
  {
    name: "Rose",
    min_age: 14,
  },
  {
    name: "Ryan",
    min_age: 11.5,
  },
  {
    name: "Zara",
    min_age: 13,
  },
];

snapshot["Cross partition GROUP BY with multiple aggregates 1"] = [
  {
    name: "Abby",
    count: 4,
    min_age: 12,
    max_age: 17,
  },
  {
    name: "Adam",
    count: 3,
    min_age: 13,
    max_age: 16,
  },
  {
    name: "Alex",
    count: 4,
    min_age: 11,
    max_age: 15,
  },
  {
    name: "Bill",
    count: 4,
    min_age: 11,
    max_age: 16,
  },
  {
    name: "Carl",
    count: 2,
    min_age: 17,
    max_age: 17,
  },
  {
    name: "Dave",
    count: 1,
    min_age: 15,
    max_age: 15,
  },
  {
    name: "Ella",
    count: 2,
    min_age: 16,
    max_age: 17,
  },
  {
    name: "Eric",
    count: 3,
    min_age: 11,
    max_age: 18,
  },
  {
    name: "Fred",
    count: 4,
    min_age: 12,
    max_age: 18,
  },
  {
    name: "Gary",
    count: 2,
    min_age: 14,
    max_age: 17,
  },
  {
    name: "John",
    count: 7,
    min_age: 11,
    max_age: 16,
  },
  {
    name: "Lisa",
    count: 2,
    min_age: 11,
    max_age: 16,
  },
  {
    name: "Lori",
    count: 2,
    min_age: 11,
    max_age: 17,
  },
  {
    name: "Lucy",
    count: 5,
    min_age: 12,
    max_age: 14,
  },
  {
    name: "Mady",
    count: 3,
    min_age: 14,
    max_age: 18,
  },
  {
    name: "Mary",
    count: 6,
    min_age: 15,
    max_age: 18,
  },
  {
    name: "Mike",
    count: 3,
    min_age: 15,
    max_age: 15,
  },
  {
    name: "Rose",
    count: 1,
    min_age: 14,
    max_age: 14,
  },
  {
    name: "Ryan",
    count: 2,
    min_age: 11,
    max_age: 12,
  },
  {
    name: "Zara",
    count: 4,
    min_age: 11,
    max_age: 17,
  },
];

snapshot["Cross partition GROUP BY with VALUE with string 1"] = ["A", "B", "C", "D"];

snapshot["Cross partition GROUP BY with VALUE with number 1"] = [11, 12, 13, 14, 15, 16, 17, 18];

snapshot["Cross partition GROUP BY with VALUE and aggregate 1"] = [
  14.277777777777779, 14.444444444444445, 14.533333333333333, 14.846153846153847,
];

snapshot["Cross partition GROUP BY with aggregates and fields that do not exist 1"] = [
  {
    age: 11,
    undefined_count: 0,
    undefined_sum: 0,
    undefined_min: undefined,
    undefined_max: undefined,
    undefined_avg: undefined,
  },
  {
    age: 12,
    undefined_count: 0,
    undefined_sum: 0,
    undefined_min: undefined,
    undefined_max: undefined,
    undefined_avg: undefined,
  },
  {
    age: 13,
    undefined_count: 0,
    undefined_sum: 0,
    undefined_min: undefined,
    undefined_max: undefined,
    undefined_avg: undefined,
  },
  {
    age: 14,
    undefined_count: 0,
    undefined_sum: 0,
    undefined_min: undefined,
    undefined_max: undefined,
    undefined_avg: undefined,
  },
  {
    age: 15,
    undefined_count: 0,
    undefined_sum: 0,
    undefined_min: undefined,
    undefined_max: undefined,
    undefined_avg: undefined,
  },
  {
    age: 16,
    undefined_count: 0,
    undefined_sum: 0,
    undefined_min: undefined,
    undefined_max: undefined,
    undefined_avg: undefined,
  },
  {
    age: 17,
    undefined_count: 0,
    undefined_sum: 0,
    undefined_min: undefined,
    undefined_max: undefined,
    undefined_avg: undefined,
  },
  {
    age: 18,
    undefined_count: 0,
    undefined_sum: 0,
    undefined_min: undefined,
    undefined_max: undefined,
    undefined_avg: undefined,
  },
];

snapshot["Cross partition GROUP BY with missing aggregate field 1"] = [
  {
    avg_asdf: undefined,
  },
  {
    avg_asdf: undefined,
  },
  {
    avg_asdf: undefined,
  },
  {
    avg_asdf: undefined,
  },
  {
    avg_asdf: undefined,
  },
  {
    avg_asdf: undefined,
  },
  {
    avg_asdf: undefined,
  },
  {
    avg_asdf: undefined,
  },
];

snapshot["Cross partition GROUP BY with missing GROUP BY projection 1"] = [
  {
    age: 11,
  },
  {
    age: 12,
  },
  {
    age: 13,
  },
  {
    age: 14,
  },
  {
    age: 15,
  },
  {
    age: 16,
  },
  {
    age: 17,
  },
  {
    age: 18,
  },
];

export default snapshot;
