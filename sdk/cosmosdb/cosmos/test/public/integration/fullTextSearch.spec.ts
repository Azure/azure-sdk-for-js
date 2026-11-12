// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContainerDefinition, Container, SqlQuerySpec } from "../../../src/index.js";
import { getTestContainer, readAndParseJSONFile } from "../common/TestHelpers.js";
import { describe, it, assert, beforeAll, afterAll } from "vitest";

describe("FTSQuery", { timeout: 20000 }, () => {
  // Stable partition placement keeps document RID tie-breaking reproducible across runs.
  const partitionKey = "index";
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

  const sampleVector = [
    0.02, 0, -0.02, 0, -0.04, -0.01, -0.04, -0.01, 0.06, 0.08, -0.05, -0.04, -0.03, 0.05, -0.03, 0,
    -0.03, 0, 0.05, 0, 0.03, 0.02, 0, 0.04, 0.05, 0.03, 0, 0, 0, -0.03, -0.01, 0.01, 0, -0.01,
    -0.03, -0.02, -0.05, 0.01, 0, 0.01, 0, 0.01, -0.03, -0.02, 0.02, 0.02, 0.04, 0.01, 0.04, 0.02,
    -0.01, -0.01, 0.02, 0.01, 0.02, -0.04, -0.01, 0.06, -0.01, -0.03, -0.04, -0.01, -0.01, 0, 0.03,
    -0.02, 0.03, 0.05, 0.01, 0.04, 0.05, -0.05, -0.01, 0.03, 0.02, -0.02, 0, -0.02, -0.02, -0.04,
    0.01, -0.05, 0.01, 0.05, 0, -0.02, 0.03, -0.07, 0.05, 0.02, 0.03, 0.05, 0.05, -0.01, 0.03,
    -0.08, -0.01, -0.03, 0.04, -0.01, -0.02, -0.01, -0.02, -0.03, 0.03, 0.03, -0.04, 0.04, 0.02, 0,
    0.03, -0.02, -0.04, 0.02, 0.01, 0.02, -0.01, 0.03, 0.02, 0.01, -0.02, 0, 0.02, 0, -0.01, 0.02,
    -0.05, 0.03, 0.03, 0.04, -0.02, 0.04, -0.04, 0.03, 0.03, -0.03, 0, 0.02, 0.06, 0.02, 0.02,
    -0.01, 0.03, 0, -0.03, -0.06, 0.02, 0, 0.02, -0.04, -0.05, 0.01, 0.02, 0.02, 0.07, 0.05, -0.01,
    0.03, -0.03, -0.06, 0.04, 0.01, -0.01, 0.04, 0.02, 0.03, -0.03, 0.03, -0.01, 0.03, -0.04, -0.02,
    0.02, -0.02, -0.03, -0.02, 0.02, -0.01, -0.05, -0.07, 0.02, -0.01, 0, -0.01, -0.02, -0.02,
    -0.03, -0.03, 0, -0.08, -0.01, 0, -0.01, -0.03, 0.01, 0, -0.02, -0.03, -0.04, -0.01, 0.02, 0, 0,
    -0.04, 0.04, -0.01, 0.04, 0, -0.06, 0.02, 0.03, 0.01, 0.06, -0.02, 0, 0.01, 0.01, 0.01, 0,
    -0.02, 0.03, 0.02, 0.01, -0.01, -0.05, 0.03, -0.04, 0, 0.01, -0.02, -0.04, 0.02, 0, 0.09, -0.04,
    -0.01, 0.02, 0.01, -0.03, 0.04, 0.02, -0.02, -0.02, -0.01, 0.01, -0.04, -0.01, 0.02, 0, 0, 0.07,
    0.02, 0, 0, -0.01, 0.01, 0.03, -0.02, 0, 0.03, -0.02, -0.07, -0.04, -0.03, 0, -0.03, -0.02, 0,
    -0.02, -0.02, -0.05, -0.02, 0, 0.05, 0.01, -0.01, -0.04, 0.02, 0, 0, 0.03, 0.02, -0.03, -0.01,
    -0.02, 0.06, -0.02, 0.01, 0.01, 0.04, -0.04, 0.06, -0.02, 0.01, 0.03, 0.01, 0.02, -0.02, 0.01,
    -0.04, 0.05, -0.03, 0.01, -0.01, 0, -0.03, -0.03, 0.04, 0.02, -0.03, -0.03, -0.02, 0.06, 0.04,
    -0.01, 0.01, 0.01, -0.01, -0.02, -0.02, 0.04, 0.01, -0.01, 0.01, -0.01, 0, 0.01, -0.04, 0.01, 0,
    -0.04, 0.05, 0.01, 0.01, 0.09, -0.04, -0.02, 0.04, 0, 0.04, -0.04, -0.04, 0, 0, -0.01, 0.05,
    -0.01, 0.02, 0.01, -0.03, 0, -0.06, 0.02, 0.04, 0.01, 0.03, 0.01, -0.04, 0, 0.01, 0.05, 0.02,
    -0.02, 0.02, 0, -0.02, -0.04, -0.07, -0.02, -0.05, 0.06, 0.01, 0.02, -0.03, 0.06, -0.01, -0.02,
    -0.02, -0.01, 0, -0.05, 0.06, -0.05, 0, -0.02, -0.02, 0, -0.01, 0.01, 0, -0.01, 0.05, 0.02, 0,
    0.02, -0.02, 0.02, 0, 0.08, -0.02, 0.01, -0.03, 0.02, -0.03, 0, -0.01, -0.02, -0.04, 0.06, 0.01,
    -0.03, -0.03, 0.01, -0.01, 0.01, -0.01, 0.02, -0.03, 0.03, 0.04, 0.02, -0.02, 0.04, 0.01, 0.01,
    0.02, 0.01, 0, -0.03, 0.03, -0.02, -0.03, -0.02, 0.02, 0, -0.01, -0.02, -0.02, 0, -0.01, -0.03,
    0.02, -0.01, 0.01, -0.08, 0.01, -0.04, -0.05, 0.02, -0.01, -0.03, 0.02, 0.01, -0.03, 0.01, 0.02,
    0.03, 0.04, -0.04, 0.02, 0, 0.02, 0.02, 0.04, -0.04, -0.1, 0, 0.05, -0.01, 0.03, 0.05, 0.03,
    -0.02, 0.01, 0.02, -0.05, 0.01, 0, 0.05, -0.01, 0.03, -0.01, 0, 0.04, 0, 0, 0.08, 0.01, 0,
    -0.04, -0.03, 0, -0.02, -0.01, 0.02, 0.03, 0, -0.01, 0, 0, 0, 0.06, 0, 0, 0.01, -0.01, 0.01,
    0.04, 0.07, -0.01, 0.01, 0, -0.01, -0.02, 0.01, 0.01, 0, 0.02, 0.01, 0, -0.02, 0.03, 0.02, 0.06,
    0.02, -0.01, 0.03, 0.02, -0.02, 0.01, -0.01, 0.03, 0.05, 0.02, 0.01, 0, 0, 0.01, 0.03, -0.03,
    -0.01, -0.04, 0.03, -0.02, 0.02, -0.02, -0.01, -0.02, 0.01, -0.04, 0.01, -0.04, 0.03, -0.02,
    -0.02, -0.01, -0.01, 0.07, 0.04, -0.01, 0.08, -0.04, -0.04, 0, 0, -0.01, -0.01, 0.03, -0.04,
    0.02, -0.01, -0.04, 0.02, -0.07, -0.02, 0.02, -0.01, 0.02, 0.01, 0, 0.07, -0.01, 0.03, 0.01,
    -0.05, 0.02, 0.02, -0.01, 0.02, 0.02, -0.03, -0.02, 0.03, -0.01, 0.02, 0, 0, 0.02, -0.01, -0.02,
    0.05, 0.02, 0.01, 0.01, -0.03, -0.05, -0.03, 0.01, 0.03, -0.02, -0.01, -0.01, -0.01, 0.03,
    -0.01, -0.03, 0.02, -0.02, -0.03, -0.02, -0.01, -0.01, -0.01, 0, -0.01, -0.04, -0.02, -0.02,
    -0.03, 0.04, 0.03, 0, -0.02, -0.01, -0.03, -0.01, -0.04, -0.04, 0.02, 0.01, -0.05, 0.04, -0.03,
    0.01, -0.01, -0.03, 0.01, 0.01, 0.01, 0.02, -0.01, -0.02, -0.03, -0.01, -0.01, -0.01, -0.01,
    -0.03, 0, 0.01, -0.02, -0.01, -0.01, 0.01, 0, -0.04, 0.01, -0.01, 0.02, 0, 0, -0.01, 0, 0, 0.03,
    -0.01, -0.06, -0.04, -0.01, 0, 0.02, -0.05, -0.02, 0.02, -0.01, 0.01, 0.01, -0.01, -0.02, 0,
    0.02, -0.01, -0.02, 0.04, -0.01, 0, -0.02, -0.04, -0.03, -0.03, 0, 0.03, -0.01, -0.02, 0, 0.01,
    -0.01, -0.04, 0.01, -0.03, 0.01, 0.03, 0, -0.02, 0, -0.04, -0.02, -0.02, 0.03, -0.02, 0.05,
    0.02, 0.03, -0.02, -0.05, -0.01, 0.02, -0.04, 0.02, 0.01, -0.03, 0.01, 0.02, 0, 0.04, 0, -0.01,
    0.02, 0.01, 0.02, 0.02, -0.02, 0.04, -0.01, 0, -0.01, 0, 0.01, -0.02, -0.04, 0.06, 0.01, 0,
    0.01, -0.02, 0.02, 0.05, 0, 0.03, -0.02, 0.02, -0.03, -0.02, 0.01, 0, 0.06, -0.01, 0, -0.02,
    -0.02, 0.01, -0.01, 0, -0.03, 0.02, 0, -0.01, -0.02, -0.01, 0.03, -0.03, 0, 0, 0, -0.03, -0.06,
    0.04, 0.02, -0.03, -0.06, -0.03, -0.01, -0.03, -0.02, -0.04, 0.01, 0, -0.01, 0.02, -0.01, 0.03,
    0.02, -0.02, -0.01, -0.02, -0.03, -0.01, 0.01, -0.04, 0.04, 0.03, 0.02, 0, -0.07, -0.02, -0.01,
    0, 0.03, -0.01, -0.03, 0, 0.03, 0, -0.01, 0.02, 0.01, 0.02, -0.03, 0, 0.01, -0.02, 0.04, -0.04,
    0, -0.05, 0, -0.02, -0.01, 0.03, 0.01, 0, -0.02, 0, -0.05, 0.01, -0.01, 0, -0.08, -0.01, -0.02,
    0.02, 0.01, -0.01, -0.01, -0.01, 0, 0, -0.01, -0.03, 0, 0, -0.02, 0.05, -0.03, 0.02, 0.01,
    -0.02, 0.01, 0.01, 0, 0.01, -0.01, 0, -0.04, -0.06, 0.03, -0.02, 0, -0.02, 0.01, 0.03, 0.03,
    -0.03, -0.01, 0, 0, 0.01, -0.02, -0.01, -0.01, -0.03, -0.02, 0.03, -0.02, 0.03, 0.01, 0.04,
    -0.04, 0.02, 0.02, 0.02, 0.03, 0, 0.06, -0.01, 0.02, -0.01, 0.01, -0.01, -0.01, -0.03, -0.01,
    0.02, 0.01, 0.01, 0, -0.02, 0.03, 0.02, -0.01, -0.02, 0.01, 0.01, 0.04, -0.01, -0.05, 0, -0.01,
    0, 0.03, -0.01, 0.02, 0.02, -0.04, 0.01, -0.03, -0.02, 0, 0.02, 0, -0.01, 0.02, 0.01, 0.04,
    -0.04, 0, -0.01, -0.02, 0, -0.02, 0.01, -0.02, 0, 0, 0.03, 0.04, -0.01, 0, 0, 0.03, -0.02, 0.01,
    -0.02, 0, -0.03, 0.04, 0, 0.01, 0.04, 0, 0.03, -0.02, 0.01, 0.01, -0.02, 0.02, -0.05, 0.03,
    -0.02, -0.01, 0.01, -0.01, 0.02, 0.04, 0.02, 0, -0.02, 0.02, -0.01, -0.03, -0.06, -0.01, -0.01,
    -0.04, 0.01, -0.01, -0.01, -0.01, -0.02, 0.03, -0.03, 0.05, 0, -0.01, -0.03, 0.03, 0.01, -0.01,
    -0.01, 0, 0.01, 0.01, 0.02, -0.01, 0.02, -0.02, -0.03, 0.03, -0.02, 0.01, 0, -0.03, 0.02, 0.02,
    -0.02, 0.01, 0.02, -0.01, 0.02, 0, 0.02, 0.01, 0, 0.05, -0.03, 0.01, 0.03, 0.04, 0.01, 0.01,
    -0.01, 0.02, -0.03, 0.02, 0.01, 0, -0.01, -0.03, -0.01, 0.02, 0.03, 0, 0.03, 0.02, 0, 0.01,
    0.01, 0.02, 0.01, 0.02, 0.03, 0.01, -0.03, 0.02, 0.01, 0.02, 0.03, -0.01, 0.01, -0.03, -0.01,
    -0.02, 0.01, 0, 0, -0.01, -0.02, -0.01, -0.01, 0.01, 0.06, 0.01, 0, -0.01, 0.01, 0, 0, -0.01,
    -0.01, 0, -0.02, -0.02, -0.01, -0.02, -0.01, -0.05, -0.02, 0.03, 0.02, 0, 0.03, -0.03, -0.03,
    0.03, 0, 0.02, -0.03, 0.04, -0.04, 0, -0.04, 0.04, 0.01, -0.03, 0.01, -0.02, -0.01, -0.04, 0.02,
    -0.01, 0.01, 0.01, 0.02, -0.02, 0.03, -0.01, 0, 0.01, 0, 0.02, 0.01, 0.01, 0.03, -0.06, 0.02, 0,
    -0.02, 0, 0.04, -0.03, 0, 0, -0.02, 0.06, 0.01, -0.03, -0.02, -0.01, -0.03, -0.04, 0.04, 0.03,
    -0.02, 0, 0.03, -0.04, -0.01, -0.02, -0.02, -0.01, 0.02, 0.02, 0.01, 0.01, 0.01, -0.02, -0.02,
    -0.03, -0.01, 0.01, 0, 0, 0, 0.02, -0.04, -0.01, -0.01, 0.04, -0.01, 0.01, -0.01, 0.01, -0.03,
    0.01, -0.01, 0, -0.01, 0.01, 0, 0.01, -0.04, 0.01, 0, 0, 0, 0, 0.02, 0.04, 0.01, 0.01, -0.01,
    -0.02, 0, 0, 0.01, -0.01, 0.01, -0.01, 0, 0.04, -0.01, -0.02, -0.01, -0.01, -0.01, 0, 0, 0.01,
    0.01, 0.04, -0.01, -0.01, 0, -0.03, -0.01, 0.01, -0.01, -0.02, 0.01, -0.02, 0.01, -0.03, 0.02,
    0, 0.03, 0.01, -0.03, -0.01, -0.01, 0.02, 0.01, 0, -0.01, 0.03, -0.04, 0.01, -0.01, -0.03,
    -0.02, 0.02, -0.01, 0, -0.01, 0.02, 0.02, 0.01, 0.03, 0, -0.03, 0, 0.02, -0.03, -0.01, 0.01,
    0.06, -0.01, -0.02, 0.01, 0, 0.04, -0.04, 0.01, -0.02, 0, -0.04, 0, 0.02, 0.02, -0.02, 0.04,
    -0.01, 0.01, 0, 0.03, -0.03, 0.04, -0.01, -0.02, -0.02, 0.01, -0.02, -0.01, 0, -0.03, -0.01,
    0.02, -0.01, -0.05, 0.02, 0.01, 0, -0.02, -0.03, 0, 0, 0, -0.01, 0.02, 0, 0.02, 0.03, -0.02,
    0.02, -0.02, 0.02, -0.01, 0.02, 0, -0.07, -0.01, 0.01, 0.01, -0.01, 0.02, 0, -0.01, 0, 0.01,
    0.01, -0.06, 0.04, 0, -0.04, -0.01, -0.03, -0.04, -0.01, -0.01, 0.03, -0.02, -0.01, 0.02, 0,
    -0.04, 0.01, 0.01, -0.01, 0.02, 0.01, 0.03, -0.01, 0, -0.02, -0.02, -0.01, 0.04, -0.02, 0.06, 0,
    0, -0.02, 0, 0.01, 0, -0.02, 0.02, 0.02, -0.06, -0.02, 0, 0.02, 0.01, -0.01, 0, 0, -0.01, 0.01,
    -0.04, -0.01, -0.01, 0.01, -0.02, -0.03, 0.01, 0.03, -0.01, -0.01, 0, -0.01, 0, -0.01, 0.05,
    0.02, 0, 0, 0.02, -0.01, 0.02, -0.03, -0.01, -0.02, 0.02, 0, 0.01, -0.06, -0.01, 0.01, 0.01,
    0.02, 0.02, -0.02, 0.03, 0.01, -0.01, -0.01, 0, 0, 0.03, 0.05, 0.05, -0.01, 0.01, -0.03, 0,
    -0.01, -0.01, 0, -0.02, 0.02, 0, 0.02, -0.01, 0.01, -0.02, 0.01, 0, -0.02, 0.02, 0.01, -0.03,
    0.03, -0.04, -0.02, -0.01, 0.01, -0.04, -0.03, -0.02, -0.03, 0.01, 0, 0, -0.02, -0.01, 0.02,
    0.01, -0.01, 0.01, 0.03, -0.01, -0.02, -0.01, 0, 0, -0.03, 0, 0.02, 0.03, 0.01, -0.01, 0.02,
    0.04, -0.04, 0.02, 0.01, -0.02, -0.01, 0.03, -0.04, -0.01, 0, 0.01, 0.01, 0, 0.03, 0.05, 0, 0,
    0.05, 0.01, -0.01, 0, -0.01, 0, -0.01, -0.01, 0.03, -0.01, 0.02, 0, 0, -0.01, 0, -0.02, -0.02,
    0.05, -0.02, -0.01, -0.01, -0.01, 0.02, 0, -0.01, 0, 0, 0, -0.02, -0.04, 0.01, 0.01, -0.01,
    0.01, 0, -0.06, -0.01, -0.04, -0.03, 0.01, 0, -0.01, 0.03, -0.04, -0.01, 0, 0.04, 0.03,
  ];

  const queriesMap: Array<[string | SqlQuerySpec, { expected1: number[]; expected2: number[] }]> = [
    [
      `SELECT c.index AS Index, c.title AS Title, c.text AS Text
        FROM c
        WHERE FullTextContains(c.title, 'John') OR FullTextContains(c.text, 'John')
        ORDER BY RANK FullTextScore(c.title, 'John')`,
      {
        expected1: [2, 57, 85],
        expected2: [2, 85, 57],
      },
    ],
    [
      `SELECT TOP 10 c.index AS Index, c.title AS Title, c.text AS Text
        FROM c
        WHERE FullTextContains(c.title, 'John') OR FullTextContains(c.text, 'John')
        ORDER BY RANK FullTextScore(c.title, 'John')`,
      {
        expected1: [2, 57, 85],
        expected2: [2, 85, 57],
      },
    ],
    [
      `SELECT c.index AS Index, c.title AS Title, c.text AS Text
        FROM c
        WHERE FullTextContains(c.title, 'John') OR FullTextContains(c.text, 'John')
        ORDER BY RANK FullTextScore(c.title, 'John')
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
        ORDER BY RANK RRF(FullTextScore(c.title, 'John'), FullTextScore(c.text, 'United States'))`,
      {
        expected1: [51, 49, 61, 75, 77, 2, 24, 76, 54, 80, 22, 85, 57],
        expected2: [51, 49, 61, 75, 77, 2, 24, 76, 54, 80, 22, 85, 57],
      },
    ],
    [
      `SELECT TOP 10 c.index AS Index, c.title AS Title, c.text AS Text
        FROM c
        WHERE FullTextContains(c.title, 'John') OR FullTextContains(c.text, 'John') OR FullTextContains(c.text, 'United States')
        ORDER BY RANK RRF(FullTextScore(c.title, 'John'), FullTextScore(c.text, 'United States'))`,
      {
        expected1: [51, 49, 61, 75, 77, 2, 24, 76, 54, 80],
        expected2: [51, 49, 61, 75, 77, 2, 24, 76, 54, 80],
      },
    ],
    [
      `SELECT c.index AS Index, c.title AS Title, c.text AS Text
        FROM c
        WHERE FullTextContains(c.title, 'John') OR FullTextContains(c.text, 'John') OR FullTextContains(c.text, 'United States')
        ORDER BY RANK RRF(FullTextScore(c.title, 'John'), FullTextScore(c.text, 'United States'))
        OFFSET 5 LIMIT 10`,
      {
        expected1: [2, 24, 76, 54, 80, 22, 85, 57],
        expected2: [2, 24, 76, 54, 80, 22, 85, 57],
      },
    ],
    [
      `SELECT TOP 10 c.index AS Index, c.title AS Title, c.text AS Text
        FROM c
        ORDER BY RANK RRF(FullTextScore(c.title, 'John'), FullTextScore(c.text, 'United States'))`,
      {
        expected1: [51, 98, 97, 93, 90, 83, 74, 55, 47, 75],
        expected2: [51, 98, 97, 93, 90, 83, 74, 55, 47, 75],
      },
    ],
    [
      `SELECT c.index AS Index, c.title AS Title, c.text AS Text
        FROM c
        ORDER BY RANK RRF(FullTextScore(c.title, 'John'), FullTextScore(c.text, 'United States'))
        OFFSET 0 LIMIT 11`,
      {
        expected1: [51, 98, 97, 93, 90, 83, 74, 55, 47, 75, 49],
        expected2: [51, 98, 97, 93, 90, 83, 74, 55, 47, 75, 49],
      },
    ],
    [
      {
        query: `SELECT TOP 10 c.index AS Index, c.title AS Title, c.text AS Text
        FROM c
        ORDER BY RANK RRF(VectorDistance(c.vector, @inputVector), FullTextScore(c.title, 'John'), FullTextScore(c.text, 'United States'))`,
        parameters: [{ name: "@inputVector", value: sampleVector }],
      },
      {
        expected1: [98, 55, 75, 93, 26, 49, 24, 90, 51, 41],
        expected2: [98, 55, 75, 93, 26, 49, 24, 90, 51, 41],
      },
    ],
    [
      {
        query: `SELECT TOP 10 c.index AS Index, c.title AS Title, c.text AS Text
        FROM c
        ORDER BY RANK
            RRF(
                VectorDistance(c.vector, @inputVector), 
                FullTextScore(c.title, @inputTitle), 
                VectorDistance(c.image, @inputImage), 
                VectorDistance(c.backup_image, @inputBackupImage), 
                FullTextScore(c.text, @inputText)
            )`,
        parameters: [
          { name: "@inputVector", value: sampleVector },
          { name: "@inputTitle", value: "John" },
          { name: "@inputImage", value: sampleVector },
          { name: "@inputBackupImage", value: sampleVector },
          { name: "@inputText", value: "United States" },
        ],
      },
      {
        expected1: [98, 93, 55, 90, 97, 51, 74, 26, 41, 83],
        expected2: [98, 93, 55, 90, 97, 51, 74, 26, 41, 83],
      },
    ],
    [
      {
        query: `SELECT TOP 10 c.index AS Index, c.title AS Title, c.text AS Text
        FROM c
        WHERE FullTextContains(c.title, @searchTitle) OR FullTextContains(c.text, @searchTitle) OR FullTextContains(c.text, @searchText)
        ORDER BY RANK RRF(FullTextScore(c.title, @searchTitle), FullTextScore(c.text, @searchText))`,
        parameters: [
          { name: "@searchTitle", value: "John" },
          { name: "@searchText", value: "United States" },
        ],
      },
      {
        expected1: [51, 49, 61, 75, 77, 2, 24, 76, 54, 80],
        expected2: [51, 49, 61, 75, 77, 2, 24, 76, 54, 80],
      },
    ],
    [
      {
        query: `SELECT c.index AS Index, c.title AS Title, c.text AS Text
        FROM c
        WHERE FullTextContains(c.title, @titleParam) OR FullTextContains(c.text, @textParam)
        ORDER BY RANK FullTextScore(c.title, @titleParam)`,
        parameters: [
          { name: "@titleParam", value: "John" },
          { name: "@textParam", value: "John" },
        ],
      },
      {
        expected1: [2, 57, 85],
        expected2: [2, 85, 57],
      },
    ],
    [
      {
        query: `SELECT TOP 10 c[@Prop1] AS Index, c[@prop2] AS Title, c[@PROP3] AS Text
        FROM c
        WHERE FullTextContains(c[@prop2], @searchTitle) OR FullTextContains(c[@PROP3], @searchTitle) OR FullTextContains(c[@PROP3], @searchText)
        ORDER BY RANK RRF(FullTextScore(c[@prop2], @searchTitle), FullTextScore(c[@PROP3], @searchText))`,
        parameters: [
          { name: "@Prop1", value: "index" },
          { name: "@prop2", value: "title" },
          { name: "@PROP3", value: "text" },
          { name: "@searchTitle", value: "John" },
          { name: "@searchText", value: "United States" },
        ],
      },
      {
        expected1: [51, 49, 61, 75, 77, 2, 24, 76, 54, 80],
        expected2: [51, 49, 61, 75, 77, 2, 24, 76, 54, 80],
      },
    ],
    // TODO: Add test case of just RRF with vector search no FullTextScore
  ];

  const weightedRRFQueriesMap: Array<
    [string | SqlQuerySpec, { expected1: number[]; expected2: number[] }]
  > = [
    [
      `SELECT c.index AS Index, c.title AS Title, c.text AS Text
        FROM c
        WHERE FullTextContains(c.title, 'John') OR FullTextContains(c.text, 'John') OR FullTextContains(c.text, 'United States')
        ORDER BY RANK RRF(FullTextScore(c.title, ['John']), FullTextScore(c.text, ['United States']), [1, 1])`,
      {
        expected1: [61, 51, 49, 54, 75, 24, 77, 76, 80, 25, 22, 2, 66, 57, 85],
        expected2: [61, 51, 49, 54, 75, 24, 77, 76, 80, 25, 22, 2, 66, 85, 57],
      },
    ],
    [
      `
        SELECT c.index AS Index, c.title AS Title, c.text AS Text
        FROM c
        WHERE FullTextContains(c.title, 'John') OR FullTextContains(c.text, 'John') OR FullTextContains(c.text, 'United States')
        ORDER BY RANK RRF(FullTextScore(c.title, ['John']), FullTextScore(c.text, ['United States']), [0.1, 0.1])`,
      {
        expected1: [61, 51, 49, 54, 75, 24, 77, 76, 80, 25, 22, 2, 66, 57, 85],
        expected2: [61, 51, 49, 54, 75, 24, 77, 76, 80, 25, 22, 2, 66, 85, 57],
      },
    ],
    [
      `SELECT c.index AS Index, c.title AS Title, c.text AS Text  FROM c WHERE FullTextContains(c.title, 'John') OR FullTextContains(c.text, 'John') OR FullTextContains(c.text, 'United States')
       ORDER BY RANK RRF(FullTextScore(c.title, ['John']), FullTextScore(c.text, ['United States']), [10, 10])`,
      {
        expected1: [61, 51, 49, 54, 75, 24, 77, 76, 80, 25, 22, 2, 66, 57, 85],
        expected2: [61, 51, 49, 54, 75, 24, 77, 76, 80, 25, 22, 2, 66, 85, 57],
      },
    ],
    [
      `SELECT c.index AS Index, c.title AS Title, c.text AS Text
                    FROM c
                    WHERE FullTextContains(c.title, 'John') OR FullTextContains(c.text, 'John') OR FullTextContains(c.text, 'United States')
                    ORDER BY RANK RRF(FullTextScore(c.title, ['John']), FullTextScore(c.text, ['United States']), [-1, -1])`,
      {
        expected1: [85, 57, 2, 66, 22, 25, 80, 76, 77, 24, 75, 54, 49, 51, 61],
        expected2: [85, 57, 2, 66, 22, 25, 77, 76, 80, 75, 24, 49, 54, 51, 61],
      },
    ],
  ];

  const containerOptions = { offerThroughput: 25000 };

  beforeAll(async () => {
    container = await getTestContainer(
      "Validate FTS Query",
      undefined,
      containerDefinition,
      containerOptions,
    );

    // Read and Parse JSON file
    const fileName = "text-3properties-1536dimensions-100documents.json";
    const items = readAndParseJSONFile(fileName);

    try {
      for (const item of items) {
        await container.items.create(item);
      }
    } catch (error) {
      console.error("Error inserting items:", error);
    }
  });

  afterAll(async () => {
    await container.database.delete();
  });

  it("FetchNext: should return correct expected values for all the queries", async () => {
    for (const [query, { expected1, expected2 }] of queriesMap) {
      const queryOptions = { allowUnboundedNonStreamingQueries: true, forceQueryPlan: true };
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

      assert.ok(
        isMatch,
        `Query failed.\nActual: ${JSON.stringify(indexes)}\nExpected1: ${JSON.stringify(expected1)}\nExpected2: ${JSON.stringify(expected2)}\nQuery:\n${typeof query === "string" ? query : query.query}`,
      );
    }
  });
  it("FetchNext: should return correct expected values for all the queries with enableQueryControl", async () => {
    for (const [query, { expected1, expected2 }] of queriesMap) {
      const queryOptions = {
        allowUnboundedNonStreamingQueries: true,
        forceQueryPlan: true,
        enableQueryControl: true,
      };
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

      assert.ok(
        isMatch,
        `Query failed.\nActual: ${JSON.stringify(indexes)}\nExpected1: ${JSON.stringify(expected1)}\nExpected2: ${JSON.stringify(expected2)}\nQuery:\n${typeof query === "string" ? query : query.query}`,
      );
    }
  });

  it("FetchNext: should return correct expected values for all the queries with enableQueryControl and hybrid query plan optimization disabled", async () => {
    for (const [query, { expected1, expected2 }] of queriesMap) {
      const queryOptions = {
        allowUnboundedNonStreamingQueries: true,
        forceQueryPlan: true,
        enableQueryControl: true,
        disableHybridSearchQueryPlanOptimization: true,
      };
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

      assert.ok(
        isMatch,
        `Query failed.\nActual: ${JSON.stringify(indexes)}\nExpected1: ${JSON.stringify(expected1)}\nExpected2: ${JSON.stringify(expected2)}\nQuery:\n${typeof query === "string" ? query : query.query}`,
      );
    }
  });

  it("FetchAll: should return correct expected values for all the queries", async () => {
    for (const [query, { expected1, expected2 }] of queriesMap) {
      const queryOptions = { allowUnboundedNonStreamingQueries: true };
      const queryIterator = container.items.query(query, queryOptions);

      const { resources: results } = await queryIterator.fetchAll();

      const indexes = results.map((result) => result.Index);
      const isMatch =
        JSON.stringify(indexes) === JSON.stringify(expected1) ||
        JSON.stringify(indexes) === JSON.stringify(expected2);

      assert.ok(
        isMatch,
        `Query failed.\nActual: ${JSON.stringify(indexes)}\nExpected1: ${JSON.stringify(expected1)}\nExpected2: ${JSON.stringify(expected2)}\nQuery:\n${typeof query === "string" ? query : query.query}`,
      );
    }
  });

  it("FetchAll: should return correct expected values for all the queries with hybrid query plan optimization disabled", async () => {
    for (const [query, { expected1, expected2 }] of queriesMap) {
      const queryOptions = {
        allowUnboundedNonStreamingQueries: true,
        disableHybridSearchQueryPlanOptimization: true,
      };
      const queryIterator = container.items.query(query, queryOptions);

      const { resources: results } = await queryIterator.fetchAll();

      const indexes = results.map((result) => result.Index);
      const isMatch =
        JSON.stringify(indexes) === JSON.stringify(expected1) ||
        JSON.stringify(indexes) === JSON.stringify(expected2);

      assert.ok(
        isMatch,
        `Query failed.\nActual: ${JSON.stringify(indexes)}\nExpected1: ${JSON.stringify(expected1)}\nExpected2: ${JSON.stringify(expected2)}\nQuery:\n${typeof query === "string" ? query : query.query}`,
      );
    }
  });

  describe.skip("Weighted RRF queries (needs emulator refresh)", () => {
    it("FetchAll: should return correct expected values for weighted RRF queries", async () => {
      for (const [query, { expected1, expected2 }] of weightedRRFQueriesMap) {
        const queryOptions = { allowUnboundedNonStreamingQueries: true };
        const queryIterator = container.items.query(query, queryOptions);

        const { resources: results } = await queryIterator.fetchAll();

        const indexes = results.map((result) => result.Index);
        const isMatch =
          JSON.stringify(indexes) === JSON.stringify(expected1) ||
          JSON.stringify(indexes) === JSON.stringify(expected2);

        assert.ok(
          isMatch,
          `Query failed.\nActual: ${JSON.stringify(indexes)}\nExpected1: ${JSON.stringify(expected1)}\nExpected2: ${JSON.stringify(expected2)}\nQuery:\n${typeof query === "string" ? query : query.query}`,
        );
      }
    });
  });
});
