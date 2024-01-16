// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { Container, ContainerDefinition } from "../../../../src";
import { bulkInsertItems, getTestContainer, removeAllDatabases } from "../../common/TestHelpers";
import assert from "assert";
import groupBySnapshot from "./groupBy.snapshot";
import { Context } from "mocha";

const options = {
  maxItemCount: 100,
};

const items = [
  {
    id: "01",
    name: "John",
    age: 11,
    gender: "M",
    team: "A",
    address: { city: "Orlando", state: "FL", zip: 32802 },
  },
  {
    id: "02",
    name: "Mady",
    age: 15,
    gender: "F",
    team: "C",
    address: { city: "Chicago", state: "IL", zip: 60292 },
  },
  {
    id: "03",
    name: "John",
    age: 13,
    gender: "M",
    team: "A",
    address: { city: "Chicago", state: "IL", zip: 60292 },
  },
  {
    id: "04",
    name: "Mary",
    age: 18,
    gender: "F",
    team: "D",
    address: { city: "Orlando", state: "FL", zip: 32802 },
  },
  {
    id: "05",
    name: "Fred",
    age: 17,
    gender: "M",
    team: "C",
    address: { city: "Chicago", state: "IL", zip: 60292 },
  },
  {
    id: "06",
    name: "Adam",
    age: 16,
    gender: "M",
    team: "A",
    address: { city: "Orlando", state: "FL", zip: 32802 },
  },
  {
    id: "07",
    name: "Alex",
    age: 13,
    gender: "M",
    team: "B",
    address: { city: "Atlanta", state: "GA", zip: 30301 },
  },
  {
    id: "08",
    name: "Fred",
    age: 12,
    gender: "M",
    team: "C",
    address: { city: "Seattle", state: "WA", zip: 98102 },
  },
  {
    id: "09",
    name: "Fred",
    age: 15,
    gender: "M",
    team: "D",
    address: { city: "Atlanta", state: "GA", zip: 30301 },
  },
  {
    id: "10",
    name: "Mary",
    age: 18,
    gender: "F",
    team: "A",
    address: { city: "Atlanta", state: "GA", zip: 30301 },
  },
  {
    id: "11",
    name: "Fred",
    age: 18,
    gender: "M",
    team: "D",
    address: { city: "Seattle", state: "WA", zip: 98102 },
  },
  {
    id: "12",
    name: "Abby",
    age: 17,
    gender: "F",
    team: "C",
    address: { city: "Atlanta", state: "GA", zip: 30302 },
  },
  {
    id: "13",
    name: "John",
    age: 16,
    gender: "M",
    team: "A",
    address: { city: "Orlando", state: "FL", zip: 32801 },
  },
  {
    id: "14",
    name: "Ella",
    age: 16,
    gender: "F",
    team: "B",
    address: { city: "Chicago", state: "IL", zip: 60291 },
  },
  {
    id: "15",
    name: "Mary",
    age: 18,
    gender: "F",
    team: "D",
    address: { city: "Seattle", state: "WA", zip: 98102 },
  },
  {
    id: "16",
    name: "Carl",
    age: 17,
    gender: "M",
    team: "C",
    address: { city: "Atlanta", state: "GA", zip: 30302 },
  },
  {
    id: "17",
    name: "Mady",
    age: 18,
    gender: "F",
    team: "C",
    address: { city: "Chicago", state: "IL", zip: 60292 },
  },
  {
    id: "18",
    name: "Mike",
    age: 15,
    gender: "M",
    team: "C",
    address: { city: "Seattle", state: "WA", zip: 98101 },
  },
  {
    id: "19",
    name: "Eric",
    age: 16,
    gender: "M",
    team: "A",
    address: { city: "Orlando", state: "FL", zip: 32801 },
  },
  {
    id: "20",
    name: "Ryan",
    age: 11,
    gender: "M",
    team: "C",
    address: { city: "Orlando", state: "FL", zip: 32802 },
  },
  {
    id: "21",
    name: "Alex",
    age: 14,
    gender: "M",
    team: "C",
    address: { city: "Seattle", state: "WA", zip: 98102 },
  },
  {
    id: "22",
    name: "Mike",
    age: 15,
    gender: "M",
    team: "B",
    address: { city: "Atlanta", state: "GA", zip: 30301 },
  },
  {
    id: "23",
    name: "John",
    age: 14,
    gender: "M",
    team: "C",
    address: { city: "Seattle", state: "WA", zip: 98102 },
  },
  {
    id: "24",
    name: "Dave",
    age: 15,
    gender: "M",
    team: "A",
    address: { city: "Atlanta", state: "GA", zip: 30302 },
  },
  {
    id: "25",
    name: "Lisa",
    age: 11,
    gender: "F",
    team: "A",
    address: { city: "Orlando", state: "FL", zip: 32801 },
  },
  {
    id: "26",
    name: "Zara",
    age: 11,
    gender: "F",
    team: "D",
    address: { city: "Atlanta", state: "GA", zip: 30301 },
  },
  {
    id: "27",
    name: "Abby",
    age: 17,
    gender: "F",
    team: "B",
    address: { city: "Seattle", state: "WA", zip: 98101 },
  },
  {
    id: "28",
    name: "Abby",
    age: 13,
    gender: "F",
    team: "C",
    address: { city: "Chicago", state: "IL", zip: 60291 },
  },
  {
    id: "29",
    name: "Lucy",
    age: 14,
    gender: "F",
    team: "B",
    address: { city: "Chicago", state: "IL", zip: 60292 },
  },
  {
    id: "30",
    name: "Lucy",
    age: 14,
    gender: "F",
    team: "B",
    address: { city: "Atlanta", state: "GA", zip: 30301 },
  },
  {
    id: "31",
    name: "Bill",
    age: 13,
    gender: "M",
    team: "A",
    address: { city: "Chicago", state: "IL", zip: 60292 },
  },
  {
    id: "32",
    name: "Bill",
    age: 11,
    gender: "M",
    team: "B",
    address: { city: "Orlando", state: "FL", zip: 32802 },
  },
  {
    id: "33",
    name: "Zara",
    age: 12,
    gender: "F",
    team: "C",
    address: { city: "Chicago", state: "IL", zip: 60291 },
  },
  {
    id: "34",
    name: "Adam",
    age: 13,
    gender: "M",
    team: "D",
    address: { city: "Chicago", state: "IL", zip: 60291 },
  },
  {
    id: "35",
    name: "Bill",
    age: 13,
    gender: "M",
    team: "D",
    address: { city: "Seattle", state: "WA", zip: 98101 },
  },
  {
    id: "36",
    name: "Alex",
    age: 15,
    gender: "M",
    team: "D",
    address: { city: "Chicago", state: "IL", zip: 60291 },
  },
  {
    id: "37",
    name: "Lucy",
    age: 14,
    gender: "F",
    team: "A",
    address: { city: "Atlanta", state: "GA", zip: 30302 },
  },
  {
    id: "38",
    name: "Alex",
    age: 11,
    gender: "M",
    team: "C",
    address: { city: "Seattle", state: "WA", zip: 98102 },
  },
  {
    id: "39",
    name: "Mike",
    age: 15,
    gender: "M",
    team: "B",
    address: { city: "Orlando", state: "FL", zip: 32801 },
  },
  {
    id: "40",
    name: "Eric",
    age: 11,
    gender: "M",
    team: "B",
    address: { city: "Orlando", state: "FL", zip: 32802 },
  },
  {
    id: "41",
    name: "John",
    age: 12,
    gender: "M",
    team: "B",
    address: { city: "Chicago", state: "IL", zip: 60291 },
  },
  {
    id: "42",
    name: "Ella",
    age: 17,
    gender: "F",
    team: "B",
    address: { city: "Chicago", state: "IL", zip: 60291 },
  },
  {
    id: "43",
    name: "Lucy",
    age: 12,
    gender: "F",
    team: "D",
    address: { city: "Atlanta", state: "GA", zip: 30302 },
  },
  {
    id: "44",
    name: "Mady",
    age: 14,
    gender: "F",
    team: "A",
    address: { city: "Orlando", state: "FL", zip: 32802 },
  },
  {
    id: "45",
    name: "Lori",
    age: 17,
    gender: "F",
    team: "D",
    address: { city: "Atlanta", state: "GA", zip: 30301 },
  },
  {
    id: "46",
    name: "Gary",
    age: 17,
    gender: "M",
    team: "B",
    address: { city: "Atlanta", state: "GA", zip: 30301 },
  },
  {
    id: "47",
    name: "Eric",
    age: 18,
    gender: "M",
    team: "B",
    address: { city: "Orlando", state: "FL", zip: 32801 },
  },
  {
    id: "48",
    name: "Mary",
    age: 15,
    gender: "F",
    team: "C",
    address: { city: "Atlanta", state: "GA", zip: 30302 },
  },
  {
    id: "49",
    name: "Zara",
    age: 17,
    gender: "F",
    team: "A",
    address: { city: "Atlanta", state: "GA", zip: 30302 },
  },
  {
    id: "50",
    name: "Carl",
    age: 17,
    gender: "M",
    team: "C",
    address: { city: "Seattle", state: "WA", zip: 98101 },
  },
  {
    id: "51",
    name: "Lori",
    age: 11,
    gender: "F",
    team: "D",
    address: { city: "Seattle", state: "WA", zip: 98102 },
  },
  {
    id: "52",
    name: "Adam",
    age: 13,
    gender: "M",
    team: "A",
    address: { city: "Orlando", state: "FL", zip: 32801 },
  },
  {
    id: "53",
    name: "Bill",
    age: 16,
    gender: "M",
    team: "D",
    address: { city: "Atlanta", state: "GA", zip: 30302 },
  },
  {
    id: "54",
    name: "Zara",
    age: 12,
    gender: "F",
    team: "B",
    address: { city: "Atlanta", state: "GA", zip: 30302 },
  },
  {
    id: "55",
    name: "Lisa",
    age: 16,
    gender: "F",
    team: "A",
    address: { city: "Seattle", state: "WA", zip: 98101 },
  },
  {
    id: "56",
    name: "Ryan",
    age: 12,
    gender: "M",
    team: "B",
    address: { city: "Chicago", state: "IL", zip: 60292 },
  },
  {
    id: "57",
    name: "Abby",
    age: 12,
    gender: "F",
    team: "B",
    address: { city: "Seattle", state: "WA", zip: 98102 },
  },
  {
    id: "58",
    name: "John",
    age: 16,
    gender: "M",
    team: "C",
    address: { city: "Orlando", state: "FL", zip: 32801 },
  },
  {
    id: "59",
    name: "Mary",
    age: 15,
    gender: "F",
    team: "A",
    address: { city: "Seattle", state: "WA", zip: 98101 },
  },
  {
    id: "60",
    name: "John",
    age: 16,
    gender: "M",
    team: "D",
    address: { city: "Orlando", state: "FL", zip: 32802 },
  },
  {
    id: "61",
    name: "Mary",
    age: 17,
    gender: "F",
    team: "B",
    address: { city: "Atlanta", state: "GA", zip: 30301 },
  },
  {
    id: "62",
    name: "Lucy",
    age: 12,
    gender: "F",
    team: "C",
    address: { city: "Atlanta", state: "GA", zip: 30302 },
  },
  {
    id: "63",
    name: "Rose",
    age: 14,
    gender: "F",
    team: "B",
    address: { city: "Orlando", state: "FL", zip: 32802 },
  },
  {
    id: "64",
    name: "Gary",
    age: 14,
    gender: "M",
    team: "C",
    address: { city: "Atlanta", state: "GA", zip: 30301 },
  },
];

describe("Cross partition GROUP BY", () => {
  const containerDefinition: ContainerDefinition = {
    id: "sample container",
    partitionKey: {
      paths: ["/id"],
    },
  };

  const containerOptions = { offerThroughput: 25100 };

  let container: Container;

  let currentTestTitle: string;
  let snapshotNumber: number;

  const snapshot = (actual: unknown): void => {
    assert.deepStrictEqual(actual, groupBySnapshot[`${currentTestTitle} ${snapshotNumber++}`]);
  };

  beforeEach(function (this: Context) {
    currentTestTitle = this.currentTest.fullTitle();
    snapshotNumber = 1;
  });

  before(async () => {
    await removeAllDatabases();
    container = await getTestContainer(
      "GROUP BY Query",
      undefined,
      containerDefinition,
      containerOptions
    );
    await bulkInsertItems(container, items);
  });

  it("by number", async () => {
    const queryIterator = container.items.query("SELECT c.age FROM c GROUP BY c.age", options);
    const result = await queryIterator.fetchAll();

    snapshot(result.resources.sort((a, b) => a.age - b.age));
  });

  it("by string", async () => {
    const queryIterator = container.items.query("SELECT c.name FROM c GROUP BY c.name", options);
    const result = await queryIterator.fetchAll();

    snapshot(result.resources.sort((a, b) => a.name.localeCompare(b.name)));
  });

  it("by id", async () => {
    const queryIterator = container.items.query("SELECT c.id FROM c GROUP BY c.id", options);
    const result = await queryIterator.fetchAll();

    snapshot(result.resources.sort((a, b) => a.id.localeCompare(b.id)));
  });

  it("with multiple fields", async () => {
    const queryIterator = container.items.query(
      "SELECT c.age, c.name FROM c GROUP BY c.age, c.name",
      options
    );

    const result = await queryIterator.fetchAll();
    snapshot(result.resources.sort((a, b) => a.age - b.age || a.name.localeCompare(b.name)));
  });

  it("with COUNT", async () => {
    const queryIterator = container.items.query(
      "SELECT c.age, COUNT(1) as count FROM c GROUP BY c.age",
      options
    );
    const result = await queryIterator.fetchAll();
    snapshot(result.resources.sort((a, b) => a.age - b.age));
  });

  it("with MIN", async () => {
    const queryIterator = container.items.query(
      "SELECT c.name, MIN(c.age) AS min_age FROM c GROUP BY c.name",
      options
    );
    const result = await queryIterator.fetchAll();
    snapshot(result.resources.sort((a, b) => a.name.localeCompare(b.name)));
  });

  it("with MAX", async () => {
    const queryIterator = container.items.query(
      "SELECT c.name, MAX(c.age) AS min_age FROM c GROUP BY c.name",
      options
    );
    const result = await queryIterator.fetchAll();
    snapshot(result.resources.sort((a, b) => a.name.localeCompare(b.name)));
  });

  it("with SUM", async () => {
    const queryIterator = container.items.query(
      "SELECT c.name, SUM(c.age) AS min_age FROM c GROUP BY c.name",
      options
    );
    const result = await queryIterator.fetchAll();
    snapshot(result.resources.sort((a, b) => a.name.localeCompare(b.name)));
  });

  it("with AVG", async () => {
    const queryIterator = container.items.query(
      "SELECT c.name, AVG(c.age) AS min_age FROM c GROUP BY c.name",
      options
    );
    const result = await queryIterator.fetchAll();
    snapshot(
      result.resources.sort((a, b) => {
        return a.name.localeCompare(b.name);
      })
    );
  });

  it("with multiple aggregates", async () => {
    const queryIterator = container.items.query(
      "SELECT c.name, Count(1) AS count, Min(c.age) AS min_age, Max(c.age) AS max_age FROM c GROUP BY c.name",
      options
    );
    const result = await queryIterator.fetchAll();
    snapshot(
      result.resources.sort((a, b) => {
        return a.name.localeCompare(b.name);
      })
    );
  });

  it("with VALUE with string", async () => {
    const queryIterator = container.items.query(
      "SELECT VALUE c.team FROM c GROUP BY c.team",
      options
    );
    const result = await queryIterator.fetchAll();
    snapshot(result.resources.sort());
  });

  it("with VALUE with number", async () => {
    const queryIterator = container.items.query(
      "SELECT VALUE c.age FROM c GROUP BY c.age",
      options
    );
    const result = await queryIterator.fetchAll();
    snapshot(result.resources.sort());
  });

  it("with VALUE and aggregate", async () => {
    const queryIterator = container.items.query(
      "SELECT VALUE AVG(c.age) FROM c GROUP BY c.team",
      options
    );
    const result = await queryIterator.fetchAll();
    snapshot(result.resources.sort());
  });

  it("with aggregates and fields that do not exist", async () => {
    const queryIterator = container.items.query(
      `SELECT
        c.age,
        AVG(c.doesNotExist) as undefined_avg,
        MIN(c.doesNotExist) as undefined_min,
        MAX(c.doesNotExist) as undefined_max,
        COUNT(c.doesNotExist) as undefined_count,
        SUM(c.doesNotExist) as undefined_sum
      FROM c
      GROUP BY c.age`,
      options
    );
    const result = await queryIterator.fetchAll();
    snapshot(result.resources.sort((a, b) => a.age - b.age));
  });

  it("with missing aggregate field", async () => {
    const queryIterator = container.items.query(
      'SELECT AVG("asdf") as avg_asdf FROM c GROUP BY c.age',
      options
    );
    const result = await queryIterator.fetchAll();
    snapshot(result.resources.sort((a, b) => a.age - b.age));
  });

  it("with missing GROUP BY projection", async () => {
    const queryIterator = container.items.query(
      "SELECT c.age, c.doesNotExist FROM c GROUP BY c.age, c.doesNotExist",
      options
    );
    const result = await queryIterator.fetchAll();
    snapshot(result.resources.sort((a, b) => a.age - b.age));
  });

  it("ensure first result is populated", async () => {
    const queryIterator = container.items.query("SELECT c.age FROM c GROUP BY c.age", options);
    const result = await queryIterator.fetchNext();
    assert(result.resources.length > 0);
    assert(result.requestCharge > 0);
  });

  it("ensure first result is populated - VALUE", async () => {
    const queryIterator = container.items.query("SELECT c.age FROM c GROUP BY c.age", options);
    const result = await queryIterator.fetchNext();
    assert(result.resources.length > 0);
    assert(result.requestCharge > 0);
  });

  it("works with TOP", async () => {
    const queryIterator = container.items.query(
      "SELECT TOP 1 c.age FROM c GROUP BY c.age",
      options
    );
    const result = await queryIterator.fetchNext();
    assert(result.resources.length === 1);
    assert(result.requestCharge > 0);
  });
});
