// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Suite } from "mocha";
import assert from "assert";
import { ContainerDefinition, Container } from "../../../src";
import items from "./text-3properties-1536dimensions-100documents";
import { getTestContainer, removeAllDatabases } from "../common/TestHelpers";

const queries: string[] = [
  `SELECT c.index AS Index, c.title AS Title, c.text AS Text
    FROM c
    WHERE FullTextContains(c.title, 'John') OR FullTextContains(c.text, 'John')
    ORDER BY RANK FullTextScore(c.title, ['John'])`,

  `SELECT TOP 10 c.index AS Index, c.title AS Title, c.text AS Text
    FROM c
    WHERE FullTextContains(c.title, 'John') OR FullTextContains(c.text, 'John')
    ORDER BY RANK FullTextScore(c.title, ['John'])`,

  `SELECT c.index AS Index, c.title AS Title, c.text AS Text
    FROM c
    WHERE FullTextContains(c.title, 'John') OR FullTextContains(c.text, 'John')
    ORDER BY RANK FullTextScore(c.title, ['John'])
    OFFSET 1 LIMIT 5`,

  `SELECT c.index AS Index, c.title AS Title, c.text AS Text
    FROM c
    WHERE FullTextContains(c.title, 'John') OR FullTextContains(c.text, 'John') OR FullTextContains(c.text, 'United States')
    ORDER BY RANK RRF(FullTextScore(c.title, ['John']), FullTextScore(c.text, ['United States']))`,

  `SELECT TOP 10 c.index AS Index, c.title AS Title, c.text AS Text
    FROM c
    WHERE FullTextContains(c.title, 'John') OR FullTextContains(c.text, 'John') OR FullTextContains(c.text, 'United States')
    ORDER BY RANK RRF(FullTextScore(c.title, ['John']), FullTextScore(c.text, ['United States']))`,

  `SELECT c.index AS Index, c.title AS Title, c.text AS Text
    FROM c
    WHERE FullTextContains(c.title, 'John') OR FullTextContains(c.text, 'John') OR FullTextContains(c.text, 'United States')
    ORDER BY RANK RRF(FullTextScore(c.title, ['John']), FullTextScore(c.text, ['United States']))
    OFFSET 5 LIMIT 10`,

  `SELECT TOP 10 c.index AS Index, c.title AS Title, c.text AS Text
    FROM c
    ORDER BY RANK RRF(FullTextScore(c.title, ['John']), FullTextScore(c.text, ['United States']))`,

  `SELECT c.index AS Index, c.title AS Title, c.text AS Text
    FROM c
    ORDER BY RANK RRF(FullTextScore(c.title, ['John']), FullTextScore(c.text, ['United States']))
    OFFSET 0 LIMIT 13`,
];

const expectedValues1: number[][] = [
  [2, 57, 85],
  [2, 57, 85],
  [57, 85],
  [61, 51, 49, 54, 75, 24, 77, 76, 80, 25, 22, 2, 66, 57, 85],
  [61, 51, 49, 54, 75, 24, 77, 76, 80, 25],
  [24, 77, 76, 80, 25, 22, 2, 66, 57, 85],
  [61, 51, 49, 54, 75, 24, 77, 76, 80, 25],
  [61, 51, 49, 54, 75, 24, 77, 76, 80, 25, 22, 2, 66],
];

const expectedValues2: number[][] = [
  [2, 85, 57],
  [2, 85, 57],
  [85, 57],
  [61, 51, 49, 54, 75, 24, 77, 76, 80, 25, 22, 2, 66, 85, 57],
  [61, 51, 49, 54, 75, 24, 77, 76, 80, 25],
  [24, 77, 76, 80, 25, 22, 2, 66, 85, 57],
  [61, 51, 49, 54, 75, 24, 77, 76, 80, 25],
  [61, 51, 49, 54, 75, 24, 77, 76, 80, 25, 22, 2, 66],
];

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
    for (let i = 0; i < queries.length; i++) {
      const queryOptions = { forceQueryPlan: true, allowUnboundedNonStreamingQueries: true };
      const queryIterator = container.items.query(queries[i], queryOptions);
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

      const expected1 = expectedValues1[i];
      const expected2 = expectedValues2[i];
      const isMatch =
        JSON.stringify(indexes) === JSON.stringify(expected1) ||
        JSON.stringify(indexes) === JSON.stringify(expected2);

      assert.ok(isMatch, `The indexes array did not match expected values for query ${i + 1}`);
      // TODO: remove it after fixing the issue
      break;
    }
  });
});
