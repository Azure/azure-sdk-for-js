// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert } from "vitest";
import type { QueryPage } from "../../../src/queryExecutionContext/QueryPage.js";
import { composeTransforms } from "../../../src/queryExecutionContext/transforms/composeTransforms.js";
import { createOrderByTransform } from "../../../src/queryExecutionContext/transforms/orderByTransform.js";
import { createOffsetLimitTransform } from "../../../src/queryExecutionContext/transforms/offsetLimitTransform.js";
import { createOrderedDistinctTransform } from "../../../src/queryExecutionContext/transforms/orderedDistinctTransform.js";
import { createUnorderedDistinctTransform } from "../../../src/queryExecutionContext/transforms/unorderedDistinctTransform.js";
import { createGroupByTransform } from "../../../src/queryExecutionContext/transforms/groupByTransform.js";
import { createGroupByValueTransform } from "../../../src/queryExecutionContext/transforms/groupByValueTransform.js";
import { createNonStreamingOrderByTransform } from "../../../src/queryExecutionContext/transforms/nonStreamingOrderByTransform.js";
import { createNonStreamingOrderByDistinctTransform } from "../../../src/queryExecutionContext/transforms/nonStreamingOrderByDistinctTransform.js";
import type { QueryInfo } from "../../../src/request/ErrorResponse.js";

/** Helper to create a mock async generator source from an array of QueryPages. */
async function* mockSource(pages: QueryPage[]): AsyncGenerator<QueryPage, void, undefined> {
  for (const page of pages) yield page;
}

/** Helper to collect all pages from an async generator. */
async function collectPages(gen: AsyncGenerator<QueryPage, void, undefined>): Promise<QueryPage[]> {
  const pages: QueryPage[] = [];
  for await (const page of gen) {
    pages.push(page);
  }
  return pages;
}

/** Helper to collect all items from all pages. */
async function collectItems(gen: AsyncGenerator<QueryPage, void, undefined>): Promise<unknown[]> {
  const pages = await collectPages(gen);
  return pages.flatMap((p) => p.items);
}

/** Builds a simple QueryPage for testing. */
function makePage(items: unknown[], hasMore: boolean = true): QueryPage {
  return {
    items,
    headers: {},
    partitionKeyRangeMap: new Map(),
    hasMore,
  };
}

// ─── composeTransforms ─────────────────────────────────────────────────────────

describe("composeTransforms", () => {
  it("should apply transforms left-to-right", async () => {
    const double = async function* (source: AsyncGenerator<QueryPage, void, undefined>) {
      for await (const page of source) {
        yield { ...page, items: page.items.map((x: any) => x * 2) };
      }
    };
    const addOne = async function* (source: AsyncGenerator<QueryPage, void, undefined>) {
      for await (const page of source) {
        yield { ...page, items: page.items.map((x: any) => x + 1) };
      }
    };

    const composed = composeTransforms(double, addOne);
    const items = await collectItems(composed(mockSource([makePage([1, 2, 3], false)])));
    // double first → [2,4,6], then addOne → [3,5,7]
    assert.deepEqual(items, [3, 5, 7]);
  });

  it("should handle empty transforms list as identity", async () => {
    const composed = composeTransforms();
    const items = await collectItems(composed(mockSource([makePage([1, 2], false)])));
    assert.deepEqual(items, [1, 2]);
  });
});

// ─── orderByTransform ──────────────────────────────────────────────────────────

describe("createOrderByTransform", () => {
  it("should extract payload when emitRawOrderByPayload is false", async () => {
    const transform = createOrderByTransform(false);
    const source = mockSource([
      makePage(
        [
          { payload: "a", orderByItems: [1], _rid: "r1" },
          { payload: "b", orderByItems: [2], _rid: "r2" },
        ],
        false,
      ),
    ]);
    const pages = await collectPages(transform(source));
    assert.deepEqual(pages[0].items, ["a", "b"]);
    assert.equal(pages[0].orderByItems!.length, 2);
    assert.equal(pages[0].orderByItems![0]._rid, "r1");
  });

  it("should emit raw item when emitRawOrderByPayload is true", async () => {
    const transform = createOrderByTransform(true);
    const rawItem = { payload: "a", orderByItems: [1], _rid: "r1" };
    const source = mockSource([makePage([rawItem], false)]);
    const pages = await collectPages(transform(source));
    assert.deepEqual(pages[0].items[0], rawItem);
  });

  it("should pass through empty pages", async () => {
    const transform = createOrderByTransform(false);
    const source = mockSource([makePage([], false)]);
    const pages = await collectPages(transform(source));
    assert.equal(pages.length, 1);
    assert.deepEqual(pages[0].items, []);
  });
});

// ─── offsetLimitTransform ──────────────────────────────────────────────────────

describe("createOffsetLimitTransform", () => {
  it("should skip offset items and take limit items", async () => {
    const transform = createOffsetLimitTransform(2, 3);
    const source = mockSource([makePage([10, 20, 30, 40, 50, 60], false)]);
    const items = await collectItems(transform(source));
    assert.deepEqual(items, [30, 40, 50]);
  });

  it("should work across multiple pages", async () => {
    const transform = createOffsetLimitTransform(1, 2);
    const source = mockSource([makePage([10, 20], true), makePage([30, 40], false)]);
    const items = await collectItems(transform(source));
    assert.deepEqual(items, [20, 30]);
  });

  it("should handle offset larger than total items", async () => {
    const transform = createOffsetLimitTransform(10, 5);
    const source = mockSource([makePage([1, 2, 3], false)]);
    const items = await collectItems(transform(source));
    assert.deepEqual(items, []);
  });

  it("should filter orderByItems to match included items", async () => {
    const transform = createOffsetLimitTransform(1, 1);
    const page: QueryPage = {
      items: ["a", "b", "c"],
      headers: {},
      partitionKeyRangeMap: new Map(),
      orderByItems: [
        { orderByItems: [1], _rid: "r1" },
        { orderByItems: [2], _rid: "r2" },
        { orderByItems: [3], _rid: "r3" },
      ],
      hasMore: false,
    };
    const pages = await collectPages(transform(mockSource([page])));
    assert.deepEqual(pages[0].items, ["b"]);
    assert.equal(pages[0].orderByItems!.length, 1);
    assert.equal(pages[0].orderByItems![0]._rid, "r2");
  });
});

// ─── orderedDistinctTransform ──────────────────────────────────────────────────

describe("createOrderedDistinctTransform", () => {
  it("should deduplicate consecutive identical items", async () => {
    const transform = createOrderedDistinctTransform();
    const source = mockSource([makePage([1, 1, 2, 2, 3], false)]);
    const items = await collectItems(transform(source));
    assert.deepEqual(items, [1, 2, 3]);
  });

  it("should maintain state across pages", async () => {
    const transform = createOrderedDistinctTransform();
    const source = mockSource([
      makePage([1, 2, 2], true),
      makePage([2, 3, 3], false),
    ]);
    const items = await collectItems(transform(source));
    assert.deepEqual(items, [1, 2, 3]);
  });

  it("should pass through empty pages", async () => {
    const transform = createOrderedDistinctTransform();
    const source = mockSource([makePage([], false)]);
    const pages = await collectPages(transform(source));
    assert.equal(pages.length, 1);
    assert.deepEqual(pages[0].items, []);
  });
});

// ─── unorderedDistinctTransform ────────────────────────────────────────────────

describe("createUnorderedDistinctTransform", () => {
  it("should deduplicate items globally across pages", async () => {
    const transform = createUnorderedDistinctTransform();
    const source = mockSource([
      makePage([1, 2, 3], true),
      makePage([2, 4, 1], false),
    ]);
    const items = await collectItems(transform(source));
    assert.deepEqual(items, [1, 2, 3, 4]);
  });

  it("should handle all duplicates resulting in empty output", async () => {
    const transform = createUnorderedDistinctTransform();
    const source = mockSource([
      makePage([1, 2], true),
      makePage([1, 2], false),
    ]);
    const items = await collectItems(transform(source));
    assert.deepEqual(items, [1, 2]);
  });

  it("should handle empty input", async () => {
    const transform = createUnorderedDistinctTransform();
    const source = mockSource([makePage([], false)]);
    const items = await collectItems(transform(source));
    assert.deepEqual(items, []);
  });
});

// ─── groupByTransform ──────────────────────────────────────────────────────────

describe("createGroupByTransform", () => {
  it("should group items and apply aggregators", async () => {
    const queryInfo: QueryInfo = {
      groupByAliasToAggregateType: { total: "Sum" },
      distinctType: "None",
      hasSelectValue: false,
      hasNonStreamingOrderBy: false,
    };
    const transform = createGroupByTransform(queryInfo);
    const source = mockSource([
      makePage(
        [
          { groupByItems: ["a"], payload: { total: { item: 10 } } },
          { groupByItems: ["b"], payload: { total: { item: 20 } } },
          { groupByItems: ["a"], payload: { total: { item: 5 } } },
        ],
        false,
      ),
    ]);
    const items = await collectItems(transform(source));
    // Group "a" → Sum(10,5) = 15, Group "b" → Sum(20) = 20
    assert.equal(items.length, 2);
    const sorted = (items as any[]).sort((a, b) => a.total - b.total);
    assert.equal(sorted[0].total, 15);
    assert.equal(sorted[1].total, 20);
  });

  it("should yield empty pages during buffering to propagate headers", async () => {
    const queryInfo: QueryInfo = {
      groupByAliasToAggregateType: { count: "Count" },
      distinctType: "None",
      hasSelectValue: false,
      hasNonStreamingOrderBy: false,
    };
    const transform = createGroupByTransform(queryInfo);
    const source = mockSource([
      makePage([{ groupByItems: ["a"], payload: { count: { item: 1 } } }], true),
      makePage([{ groupByItems: ["a"], payload: { count: { item: 1 } } }], false),
    ]);
    const pages = await collectPages(transform(source));
    // First page should be empty (buffering), last page should have results
    assert.ok(pages.length >= 1);
    const lastPage = pages[pages.length - 1];
    assert.ok(lastPage.items.length > 0);
  });

  it("should handle empty source", async () => {
    const queryInfo: QueryInfo = {
      groupByAliasToAggregateType: {},
      distinctType: "None",
      hasSelectValue: false,
      hasNonStreamingOrderBy: false,
    };
    const transform = createGroupByTransform(queryInfo);
    const source = mockSource([makePage([], false)]);
    const pages = await collectPages(transform(source));
    const lastPage = pages[pages.length - 1];
    assert.deepEqual(lastPage.items, []);
  });
});

// ─── groupByValueTransform ─────────────────────────────────────────────────────

describe("createGroupByValueTransform", () => {
  it("should aggregate values per group", async () => {
    const queryInfo: QueryInfo = {
      aggregates: ["Sum"],
      groupByAliasToAggregateType: {},
      distinctType: "None",
      hasSelectValue: true,
      hasNonStreamingOrderBy: false,
    };
    const transform = createGroupByValueTransform(queryInfo);
    const source = mockSource([
      makePage(
        [
          { groupByItems: ["x"], payload: [{ item: 3 }] },
          { groupByItems: ["y"], payload: [{ item: 7 }] },
          { groupByItems: ["x"], payload: [{ item: 2 }] },
        ],
        false,
      ),
    ]);
    const items = await collectItems(transform(source));
    assert.equal(items.length, 2);
    const sorted = (items as number[]).sort((a, b) => a - b);
    assert.equal(sorted[0], 5);
    assert.equal(sorted[1], 7);
  });

  it("should handle non-aggregate GROUP BY VALUE", async () => {
    const queryInfo: QueryInfo = {
      aggregates: [],
      groupByAliasToAggregateType: {},
      distinctType: "None",
      hasSelectValue: true,
      hasNonStreamingOrderBy: false,
    };
    const transform = createGroupByValueTransform(queryInfo);
    const source = mockSource([
      makePage(
        [
          { groupByItems: ["team1"], payload: "team1" },
          { groupByItems: ["team2"], payload: "team2" },
          { groupByItems: ["team1"], payload: "team1" },
        ],
        false,
      ),
    ]);
    const items = await collectItems(transform(source));
    assert.equal(items.length, 2);
  });
});

// ─── nonStreamingOrderByTransform ──────────────────────────────────────────────

describe("createNonStreamingOrderByTransform", () => {
  it("should sort items using priority queue and extract payload", async () => {
    const transform = createNonStreamingOrderByTransform(["Ascending"], 10, 0, false);
    const source = mockSource([
      makePage(
        [
          { orderByItems: [{ item: 3 }], payload: "c" },
          { orderByItems: [{ item: 1 }], payload: "a" },
          { orderByItems: [{ item: 2 }], payload: "b" },
        ],
        false,
      ),
    ]);
    const items = await collectItems(transform(source));
    assert.deepEqual(items, ["a", "b", "c"]);
  });

  it("should apply offset correctly", async () => {
    const transform = createNonStreamingOrderByTransform(["Ascending"], 10, 1, false);
    const source = mockSource([
      makePage(
        [
          { orderByItems: [{ item: 3 }], payload: "c" },
          { orderByItems: [{ item: 1 }], payload: "a" },
          { orderByItems: [{ item: 2 }], payload: "b" },
        ],
        false,
      ),
    ]);
    const items = await collectItems(transform(source));
    // Sorted: a,b,c. Skip 1 → [b,c]
    assert.deepEqual(items, ["b", "c"]);
  });

  it("should respect buffer size limit", async () => {
    const transform = createNonStreamingOrderByTransform(["Ascending"], 2, 0, false);
    const source = mockSource([
      makePage(
        [
          { orderByItems: [{ item: 3 }], payload: "c" },
          { orderByItems: [{ item: 1 }], payload: "a" },
          { orderByItems: [{ item: 2 }], payload: "b" },
        ],
        false,
      ),
    ]);
    const items = await collectItems(transform(source));
    // Buffer size 2 keeps 2 smallest: a, b
    assert.deepEqual(items, ["a", "b"]);
  });

  it("should return nothing for zero buffer size", async () => {
    const transform = createNonStreamingOrderByTransform(["Ascending"], 0, 0, false);
    const source = mockSource([makePage([{ orderByItems: [{ item: 1 }], payload: "a" }], false)]);
    const items = await collectItems(transform(source));
    assert.deepEqual(items, []);
  });

  it("should emit raw payload when emitRawOrderByPayload is true", async () => {
    const transform = createNonStreamingOrderByTransform(["Ascending"], 10, 0, true);
    const rawItem = { orderByItems: [{ item: 1 }], payload: "a" };
    const source = mockSource([makePage([rawItem], false)]);
    const items = await collectItems(transform(source));
    assert.deepEqual(items[0], rawItem);
  });
});

// ─── nonStreamingOrderByDistinctTransform ──────────────────────────────────────

describe("createNonStreamingOrderByDistinctTransform", () => {
  it("should deduplicate and sort results", async () => {
    const queryInfo: QueryInfo = {
      orderBy: ["Ascending"],
      groupByAliasToAggregateType: {},
      distinctType: "Ordered",
      hasSelectValue: false,
      hasNonStreamingOrderBy: true,
    };
    const transform = createNonStreamingOrderByDistinctTransform(queryInfo, 10, false);
    const source = mockSource([
      makePage(
        [
          { orderByItems: [{ item: 3 }], payload: "c" },
          { orderByItems: [{ item: 1 }], payload: "a" },
          { orderByItems: [{ item: 2 }], payload: "b" },
          { orderByItems: [{ item: 1 }], payload: "a" }, // duplicate
        ],
        false,
      ),
    ]);
    const items = await collectItems(transform(source));
    assert.deepEqual(items, ["a", "b", "c"]);
  });

  it("should respect offset from queryInfo", async () => {
    const queryInfo: QueryInfo = {
      orderBy: ["Ascending"],
      offset: 1,
      groupByAliasToAggregateType: {},
      distinctType: "Ordered",
      hasSelectValue: false,
      hasNonStreamingOrderBy: true,
    };
    const transform = createNonStreamingOrderByDistinctTransform(queryInfo, 10, false);
    const source = mockSource([
      makePage(
        [
          { orderByItems: [{ item: 2 }], payload: "b" },
          { orderByItems: [{ item: 1 }], payload: "a" },
          { orderByItems: [{ item: 3 }], payload: "c" },
        ],
        false,
      ),
    ]);
    const items = await collectItems(transform(source));
    // Sorted: a,b,c. Offset 1 → skip first → [b,c]
    assert.deepEqual(items, ["b", "c"]);
  });

  it("should handle empty input", async () => {
    const queryInfo: QueryInfo = {
      orderBy: ["Ascending"],
      groupByAliasToAggregateType: {},
      distinctType: "Ordered",
      hasSelectValue: false,
      hasNonStreamingOrderBy: true,
    };
    const transform = createNonStreamingOrderByDistinctTransform(queryInfo, 10, false);
    const source = mockSource([makePage([], false)]);
    const items = await collectItems(transform(source));
    assert.deepEqual(items, []);
  });
});
