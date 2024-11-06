// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Suite } from "mocha";
import assert from "assert";
import { ContainerDefinition, Container } from "../../../src";
import items from "./text-3properties-1536dimensions-100documents";
import { getTestContainer, removeAllDatabases } from "../common/TestHelpers";

describe("Validate full text search queries", function (this: Suite) {
  this.timeout(process.env.MOCHA_TIMEOUT || 20000);

  const partitionKey = "id";
  let container: Container;
  const containerDefinition: ContainerDefinition = {
    id: "sample container",
    indexingPolicy: {
      includedPaths: [
        {
          path: "/*",
        },
      ],
      compositeIndexes: [
        [
          { path: "/index", order: "ascending" },
          { path: "/mixedTypefield", order: "ascending" },
        ],
      ],
    },
    partitionKey: {
      paths: ["/" + partitionKey],
    },
  };

  const queriesMap = new Map([
    [
      `SELECT c.index AS Index, c.title AS Title, c.text AS Text
        FROM c
        WHERE FullTextContains(c.title, 'John') OR FullTextContains(c.text, 'John')
        ORDER BY RANK FullTextScore(c.title, ['John'])`,
      {
        expected1: [2, 57, 85],
        expected2: [2, 85, 57],
      },
    ],
    [
      `SELECT TOP 10 c.index AS Index, c.title AS Title, c.text AS Text
        FROM c
        WHERE FullTextContains(c.title, 'John') OR FullTextContains(c.text, 'John')
        ORDER BY RANK FullTextScore(c.title, ['John'])`,
      {
        expected1: [2, 57, 85],
        expected2: [2, 85, 57],
      },
    ],
    [
      `SELECT c.index AS Index, c.title AS Title, c.text AS Text
        FROM c
        WHERE FullTextContains(c.title, 'John') OR FullTextContains(c.text, 'John')
        ORDER BY RANK FullTextScore(c.title, ['John'])
        OFFSET 1 LIMIT 5`,
      {
        expected1: [57, 85],
        expected2: [85, 57],
      },
    ],
    [
      `SELECT c.index AS Index, c.title AS Title, c.text AS Text
        FROM c
        WHERE FullTextContains(c.title, 'John') OR FullTextContains(c.text, 'John') OR FullTextContains(c.text, 'United States')
        ORDER BY RANK RRF(FullTextScore(c.title, ['John']), FullTextScore(c.text, ['United States']))`,
      {
        expected1: [61, 51, 49, 54, 75, 24, 77, 76, 80, 25, 22, 2, 66, 57, 85],
        expected2: [61, 51, 49, 54, 75, 24, 77, 76, 80, 25, 22, 2, 66, 85, 57],
      },
    ],
    [
      `SELECT TOP 10 c.index AS Index, c.title AS Title, c.text AS Text
        FROM c
        WHERE FullTextContains(c.title, 'John') OR FullTextContains(c.text, 'John') OR FullTextContains(c.text, 'United States')
        ORDER BY RANK RRF(FullTextScore(c.title, ['John']), FullTextScore(c.text, ['United States']))`,
      {
        expected1: [61, 51, 49, 54, 75, 24, 77, 76, 80, 25],
        expected2: [61, 51, 49, 54, 75, 24, 77, 76, 80, 25],
      },
    ],
    [
      `SELECT c.index AS Index, c.title AS Title, c.text AS Text
        FROM c
        WHERE FullTextContains(c.title, 'John') OR FullTextContains(c.text, 'John') OR FullTextContains(c.text, 'United States')
        ORDER BY RANK RRF(FullTextScore(c.title, ['John']), FullTextScore(c.text, ['United States']))
        OFFSET 5 LIMIT 10`,
      {
        expected1: [24, 77, 76, 80, 25, 22, 2, 66, 57, 85],
        expected2: [24, 77, 76, 80, 25, 22, 2, 66, 85, 57],
      },
    ],
    [
      `SELECT TOP 10 c.index AS Index, c.title AS Title, c.text AS Text
        FROM c
        ORDER BY RANK RRF(FullTextScore(c.title, ['John']), FullTextScore(c.text, ['United States']))`,
      {
        expected1: [61, 51, 49, 54, 75, 24, 77, 76, 80, 25],
        expected2: [61, 51, 49, 54, 75, 24, 77, 76, 80, 25],
      },
    ],
    [
      `SELECT c.index AS Index, c.title AS Title, c.text AS Text
        FROM c
        ORDER BY RANK RRF(FullTextScore(c.title, ['John']), FullTextScore(c.text, ['United States']))
        OFFSET 0 LIMIT 13`,
      {
        expected1: [61, 51, 49, 54, 75, 24, 77, 76, 80, 25, 22, 2, 66],
        expected2: [61, 51, 49, 54, 75, 24, 77, 76, 80, 25, 22, 2, 66],
      },
    ],
  ]);

  const containerOptions = { offerThroughput: 25000 };

  before(async function () {
    await removeAllDatabases();
    container = await getTestContainer(
      "Validate FTS Query",
      undefined,
      containerDefinition,
      containerOptions,
    );
    for (const item of items) {
      await container.items.create(item);
    }
  });

  it("should return correct expected values for all the queries", async function () {
    for (const [query, { expected1, expected2 }] of queriesMap) {
      const queryOptions = { forceQueryPlan: true, allowUnboundedNonStreamingQueries: true };
      const queryIterator = container.items.query(query, queryOptions);
      const results: any[] = [];
      while (queryIterator.hasMoreResults()) {
        const { resources: result } = await queryIterator.fetchNext();
        console.log("fetchNext result - final", result);
        if (result !== undefined) {
          results.push(...result);
        }
      }

      const indexes = results.map((result) => result.Index);
      console.log("indexes", indexes);

      const isMatch =
        JSON.stringify(indexes) === JSON.stringify(expected1) ||
        JSON.stringify(indexes) === JSON.stringify(expected2);

      assert.ok(isMatch, `The indexes array did not match expected values for query:\n${query}`);
    }
  });
});
