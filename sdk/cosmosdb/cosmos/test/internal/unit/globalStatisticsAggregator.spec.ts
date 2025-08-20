// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { GlobalStatisticsAggregator } from "$internal/queryExecutionContext/Aggregators/GlobalStatisticsAggregator.js";
import type { GlobalStatistics } from "$internal/request/globalStatistics.js";
import { describe, it, assert, beforeEach } from "vitest";

describe("global statistics aggregator", { timeout: 10000 }, () => {
  let aggregator: GlobalStatisticsAggregator;

  beforeEach(async () => {
    aggregator = new GlobalStatisticsAggregator();
  });

  it("should aggregate document count and full text statistics", async () => {
    const stats1: GlobalStatistics = {
      documentCount: 2,
      fullTextStatistics: [
        { totalWordCount: 100, hitCounts: [1, 2, 3] },
        { totalWordCount: 150, hitCounts: [4, 5, 6] },
      ],
    };

    const stats2: GlobalStatistics = {
      documentCount: 3,
      fullTextStatistics: [
        { totalWordCount: 200, hitCounts: [1, 1, 8] },
        { totalWordCount: 250, hitCounts: [2, 2, 2] },
      ],
    };

    aggregator.aggregate(stats1);
    aggregator.aggregate(stats2);

    const result = aggregator.getResult();

    assert.strictEqual(result.documentCount, 5);
    assert.strictEqual(result.fullTextStatistics.length, 2);
    assert.strictEqual(result.fullTextStatistics[0].totalWordCount, 300);
    assert.strictEqual(result.fullTextStatistics[1].totalWordCount, 400);
    assert.deepStrictEqual(result.fullTextStatistics[0].hitCounts, [2, 3, 11]);
    assert.deepStrictEqual(result.fullTextStatistics[1].hitCounts, [6, 7, 8]);
  });

  it("should handle empty full text statistics correctly", async () => {
    const stats: GlobalStatistics = {
      documentCount: 1,
      fullTextStatistics: [],
    };

    aggregator.aggregate(stats);
    const result = aggregator.getResult();

    assert.strictEqual(result.documentCount, 1);
    assert.deepStrictEqual(result.fullTextStatistics, []);
  });

  it("should handle one Global Statistics correctly", async () => {
    const stats1: GlobalStatistics = {
      documentCount: 2,
      fullTextStatistics: [
        { totalWordCount: 100, hitCounts: [1, 2] },
        { totalWordCount: 150, hitCounts: [4, 5, 6, 7] },
      ],
    };

    aggregator.aggregate(stats1);
    const result = aggregator.getResult();

    assert.strictEqual(result.documentCount, 2);
    assert.strictEqual(result.fullTextStatistics.length, 2);
    assert.strictEqual(result.fullTextStatistics[0].totalWordCount, 100);
    assert.strictEqual(result.fullTextStatistics[1].totalWordCount, 150);
    assert.deepStrictEqual(result.fullTextStatistics[0].hitCounts, [1, 2]);
    assert.deepStrictEqual(result.fullTextStatistics[1].hitCounts, [4, 5, 6, 7]);
  });

  it("should handle null and undefined Global Statistics correctly", async () => {
    const stats1: GlobalStatistics = {
      documentCount: 2,
      fullTextStatistics: [
        { totalWordCount: 100, hitCounts: [1, 2] },
        { totalWordCount: 150, hitCounts: [4, 5, 6, 7] },
      ],
    };
    const stats2 = null as any;
    const stats3 = undefined as any;

    aggregator.aggregate(stats1);
    aggregator.aggregate(stats2);
    aggregator.aggregate(stats3);

    const result = aggregator.getResult();

    assert.strictEqual(result.documentCount, 2);
    assert.strictEqual(result.fullTextStatistics.length, 2);
    assert.strictEqual(result.fullTextStatistics[0].totalWordCount, 100);
    assert.strictEqual(result.fullTextStatistics[1].totalWordCount, 150);
    assert.deepStrictEqual(result.fullTextStatistics[0].hitCounts, [1, 2]);
    assert.deepStrictEqual(result.fullTextStatistics[1].hitCounts, [4, 5, 6, 7]);
  });
});
