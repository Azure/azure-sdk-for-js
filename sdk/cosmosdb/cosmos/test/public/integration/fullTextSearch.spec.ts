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

const expectedValues: number[][] = [
  [2, 57, 85],
  [2, 57, 85],
  [57, 85],
  [61, 51, 49, 54, 75, 24, 77, 76, 80, 25, 22, 2, 66, 57, 85],
  [61, 51, 49, 54, 75, 24, 77, 76, 80, 25],
  [24, 77, 76, 80, 25, 22, 2, 66, 57, 85],
  [61, 51, 49, 54, 75, 24, 77, 76, 80, 25],
  [61, 51, 49, 54, 75, 24, 77, 76, 80, 25, 22, 2, 66],
];

const queries1: string[] = [`SELECT c.index AS Index FROM c order by c.index`];
const expectedValues1: number[][] = [
  [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26,
    27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
    51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74,
    75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98,
    99, 100,
  ],
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
    for (let i = 0; i < queries1.length; i++) {
      const queryIterator = container.items.query(queries1[i]);
      const { resources: results } = await queryIterator.fetchAll();

      const indexes = results.map((result) => result.Index);
      assert.deepStrictEqual(indexes, expectedValues1[i]);

      if (queries) {
        if (expectedValues) {
          console.log("yo");
        }
      }
    }
  });
});
