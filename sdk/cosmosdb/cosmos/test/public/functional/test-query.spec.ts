// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// write tests for testing a group by query
import { assert } from "chai";
import { getTestContainer } from "../common/TestHelpers";

describe("Group-By-Query", function () {
  it("should return the correct result for a group by query", async function () {
    // create database container and some itmes to for group by response
    const container = await getTestContainer("Test", undefined, {
      partitionKey: "/name",
      throughput: 10000,
    });
    await Promise.all([
      container.items.create({ id: "1", name: "foo" }),
      container.items.create({ id: "2", name: "bar" }),
      container.items.create({ id: "3", name: "foo" }),
    ]);
    const querySpec = {
      query: "SELECT c.id, COUNT(1) AS count FROM c GROUP BY c.id",
    };
    const { resources: results } = await container.items.query(querySpec).fetchAll();
    assert.strictEqual(results.length, 3);
    assert.strictEqual(results[0].count, 1);
    assert.strictEqual(results[1].count, 1);
    assert.strictEqual(results[2].count, 1);
  });
});
