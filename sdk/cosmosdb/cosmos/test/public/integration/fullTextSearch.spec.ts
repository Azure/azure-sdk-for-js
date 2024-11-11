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
        expected1: [61, 51, 49, 54, 75, 24, 77, 76, 80, 25, 22, 2, 66, 57, 85], // [ 61, 75, 54, 80,  2, 51, 49, 76, 77, 24, 66, 22, 57, 25, 85]
        expected2: [61, 51, 49, 54, 75, 24, 77, 76, 80, 25, 22, 2, 66, 85, 57],

        /**
         * 
         * rrfScores array [
  { rid: '7oh8AIMy9ekIAAAAAAAAAg==', rrfScore: 0.03252247488101534 },
  { rid: '7oh8AIMy9ekUAAAAAAAADA==', rrfScore: 0.031009615384615385 },
  { rid: '7oh8AIMy9ekPAAAAAAAADA==', rrfScore: 0.031009615384615385 },
  { rid: '7oh8AIMy9ekUAAAAAAAABA==', rrfScore: 0.03036576949620428 },
  { rid: '7oh8AIMy9ekBAAAAAAAAAA==', rrfScore: 0.03009207275993712 },
  { rid: '7oh8AIMy9ekMAAAAAAAAAA==', rrfScore: 0.030017921146953404 },
  { rid: '7oh8AIMy9ekIAAAAAAAACA==', rrfScore: 0.029957522915269395 },
  { rid: '7oh8AIMy9ekPAAAAAAAAAA==', rrfScore: 0.029857397504456328 },
  { rid: '7oh8AIMy9ekTAAAAAAAABA==', rrfScore: 0.029850746268656716 },
  { rid: '7oh8AIMy9ekHAAAAAAAADA==', rrfScore: 0.028665028665028666 },
  { rid: '7oh8AIMy9ekJAAAAAAAAAg==', rrfScore: 0.028594771241830064 },
  { rid: '7oh8AIMy9ekGAAAAAAAADA==', rrfScore: 0.028577260665441927 },
  { rid: '7oh8AIMy9ekNAAAAAAAAAA==', rrfScore: 0.027799227799227798 },
  { rid: '7oh8AIMy9ekIAAAAAAAAAA==', rrfScore: 0.02761904761904762 },
  { rid: '7oh8AIMy9ekNAAAAAAAAAg==', rrfScore: 0.027031963470319637 }
]

 [
  75, 77, 22, 51,  2, 61,
  80, 24, 49, 25, 76, 54,
  57, 85, 66
]

rrfScores array [
  { rid: 'JfY-AKTpHRQNAAAAAAAAAA==', rrfScore: 0.03125763125763126 },
  { rid: 'JfY-AKTpHRQUAAAAAAAABA==', rrfScore: 0.03055037313432836 },
  { rid: 'JfY-AKTpHRQEAAAAAAAAAg==', rrfScore: 0.03021353930031804 },
  { rid: 'JfY-AKTpHRQNAAAAAAAACA==', rrfScore: 0.03021353930031804 },
  { rid: 'JfY-AKTpHRQBAAAAAAAABA==', rrfScore: 0.03009207275993712 },
  { rid: 'JfY-AKTpHRQLAAAAAAAAAg==', rrfScore: 0.03009207275993712 },
  { rid: 'JfY-AKTpHRQRAAAAAAAADA==', rrfScore: 0.02964426877470356 },
  { rid: 'JfY-AKTpHRQCAAAAAAAADA==', rrfScore: 0.02964426877470356 },
  { rid: 'JfY-AKTpHRQIAAAAAAAADA==', rrfScore: 0.029386529386529386 },
  { rid: 'JfY-AKTpHRQFAAAAAAAAAg==', rrfScore: 0.028991596638655463 },
  { rid: 'JfY-AKTpHRQPAAAAAAAADA==', rrfScore: 0.028991596638655463 },
  { rid: 'JfY-AKTpHRQJAAAAAAAADA==', rrfScore: 0.028958333333333336 },
  { rid: 'JfY-AKTpHRQNAAAAAAAABA==', rrfScore: 0.0288981288981289 },
  { rid: 'JfY-AKTpHRQWAAAAAAAABA==', rrfScore: 0.028258706467661692 },
  { rid: 'JfY-AKTpHRQMAAAAAAAADA==', rrfScore: 0.027777777777777776 }
]

  [
  75, 51, 80, 77,  2, 49,
  61, 24, 22, 54, 66, 76,
  57, 25, 85
]rrfScores array [
  { rid: 'CeBWAKZEhGkVAAAAAAAABA==', rrfScore: 0.03125763125763126 },
  { rid: 'CeBWAKZEhGkNAAAAAAAABA==', rrfScore: 0.031054405392392875 },
  { rid: 'CeBWAKZEhGkPAAAAAAAADA==', rrfScore: 0.030621785881252923 },
  { rid: 'CeBWAKZEhGkOAAAAAAAADA==', rrfScore: 0.030309988518943745 },
  { rid: 'CeBWAKZEhGkCAAAAAAAACA==', rrfScore: 0.03009207275993712 },
  { rid: 'CeBWAKZEhGkHAAAAAAAAAA==', rrfScore: 0.029957522915269395 },
  { rid: 'CeBWAKZEhGkNAAAAAAAADA==', rrfScore: 0.029906956136464335 },
  { rid: 'CeBWAKZEhGkGAAAAAAAAAg==', rrfScore: 0.029857397504456328 },
  { rid: 'CeBWAKZEhGkFAAAAAAAAAg==', rrfScore: 0.029709507042253523 },
  { rid: 'CeBWAKZEhGkIAAAAAAAAAA==', rrfScore: 0.029513888888888888 },
  { rid: 'CeBWAKZEhGkKAAAAAAAAAA==', rrfScore: 0.02904040404040404 },
  { rid: 'CeBWAKZEhGkJAAAAAAAACA==', rrfScore: 0.02803921568627451 },
  { rid: 'CeBWAKZEhGkGAAAAAAAACA==', rrfScore: 0.028006267136701922 },
  { rid: 'CeBWAKZEhGkHAAAAAAAAAg==', rrfScore: 0.027984344422700584 },
  { rid: 'CeBWAKZEhGkNAAAAAAAAAA==', rrfScore: 0.02761904761904762 }
]

  */
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
    // TODO: Add test case of just RRF with vector search no FullTextScore
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
      const queryOptions = { allowUnboundedNonStreamingQueries: true };
      const queryIterator = container.items.query(query, queryOptions);

      const results: any[] = [];
      while (queryIterator.hasMoreResults()) {
        const { resources: result } = await queryIterator.fetchNext();
        if (result !== undefined) {
          results.push(...result);
        }
      }

      const indexes = results.map((result) => result.Index);
      const isMatch =
        JSON.stringify(indexes) === JSON.stringify(expected1) ||
        JSON.stringify(indexes) === JSON.stringify(expected2);

      assert.ok(isMatch, `The indexes array did not match expected values for query:\n${query}`);
    }
  });
});
