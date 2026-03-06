// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert } from "vitest";
import type { QueryPage } from "../../../src/queryExecutionContext/QueryPage.js";
import type { ExecutionContext } from "../../../src/queryExecutionContext/ExecutionContext.js";
import type { DiagnosticNodeInternal } from "../../../src/diagnostics/DiagnosticNodeInternal.js";
import type { AsyncQuerySource } from "../../../src/queryExecutionContext/AsyncQuerySource.js";
import type { Response } from "../../../src/request/index.js";
import { GeneratorPipelinedQueryExecutionContext } from "../../../src/queryExecutionContext/GeneratorPipelinedQueryExecutionContext.js";
import { PipelinedQueryExecutionContext } from "../../../src/queryExecutionContext/pipelinedQueryExecutionContext.js";
import type { PipelineTransform } from "../../../src/queryExecutionContext/PipelineTransform.js";
import type { QueryInfo } from "../../../src/request/ErrorResponse.js";

// ─── Test helpers ──────────────────────────────────────────────────────────────

/** Builds a simple QueryPage for testing. */
function makePage(items: unknown[], hasMore: boolean = true): QueryPage {
  return {
    items,
    headers: {},
    partitionKeyRangeMap: new Map(),
    hasMore,
  };
}

/** Dummy diagnostic node for tests. */
const dummyDiagnostic = {} as DiagnosticNodeInternal;

/** Creates a mock ExecutionContext with pages() that yields the given QueryPages. */
function createMockContextWithPages(pages: QueryPage[]): ExecutionContext {
  let done = false;
  let pageIndex = 0;

  return {
    hasMoreResults(): boolean {
      return !done && pageIndex < pages.length;
    },
    async fetchMore(): Promise<Response<unknown>> {
      if (pageIndex >= pages.length) {
        done = true;
        return { result: undefined, headers: {} };
      }
      const page = pages[pageIndex++];
      if (pageIndex >= pages.length) done = true;
      return { result: page.items, headers: page.headers };
    },
    pages(_diagnosticNode: DiagnosticNodeInternal): AsyncQuerySource {
      return (async function* () {
        for (const page of pages) {
          yield page;
        }
      })();
    },
    dispose(): void {
      done = true;
    },
  };
}

/** Creates a mock ExecutionContext WITHOUT pages() — only fetchMore(). */
function createLegacyMockContext(pages: QueryPage[]): ExecutionContext {
  let pageIndex = 0;

  return {
    hasMoreResults(): boolean {
      return pageIndex < pages.length;
    },
    async fetchMore(): Promise<Response<unknown>> {
      if (pageIndex >= pages.length) {
        return { result: undefined, headers: {} };
      }
      const page = pages[pageIndex++];
      return { result: page.items, headers: page.headers };
    },
    dispose(): void {
      pageIndex = pages.length;
    },
  };
}

// ─── GeneratorPipelinedQueryExecutionContext ────────────────────────────────────

describe("GeneratorPipelinedQueryExecutionContext", () => {
  describe("basic pipeline creation and fetchMore", () => {
    it("should yield items from base context through fetchMore", async () => {
      const baseCtx = createMockContextWithPages([
        makePage([1, 2, 3], true),
        makePage([4, 5], false),
      ]);
      const ctx = new GeneratorPipelinedQueryExecutionContext(baseCtx, [], dummyDiagnostic);

      assert.isTrue(ctx.hasMoreResults());

      const r1 = await ctx.fetchMore(dummyDiagnostic);
      assert.deepEqual((r1.result as any).buffer, [1, 2, 3]);

      const r2 = await ctx.fetchMore(dummyDiagnostic);
      assert.deepEqual((r2.result as any).buffer, [4, 5]);

      // After last page with hasMore=false, generator is exhausted
      const r3 = await ctx.fetchMore(dummyDiagnostic);
      assert.isUndefined(r3.result);
      assert.isFalse(ctx.hasMoreResults());
    });

    it("should yield pages via pages() method", async () => {
      const baseCtx = createMockContextWithPages([
        makePage([10, 20], true),
        makePage([30], false),
      ]);
      const ctx = new GeneratorPipelinedQueryExecutionContext(baseCtx, [], dummyDiagnostic);

      const pagesGen = ctx.pages(dummyDiagnostic);
      const collected: QueryPage[] = [];
      for await (const page of pagesGen) {
        collected.push(page);
      }

      assert.equal(collected.length, 2);
      assert.deepEqual(collected[0].items, [10, 20]);
      assert.deepEqual(collected[1].items, [30]);
    });
  });

  describe("pipeline composition with transforms", () => {
    it("should apply a single transform", async () => {
      const doubleTransform: PipelineTransform = async function* (source) {
        for await (const page of source) {
          yield { ...page, items: page.items.map((x: any) => x * 2) };
        }
      };

      const baseCtx = createMockContextWithPages([makePage([1, 2, 3], false)]);
      const ctx = new GeneratorPipelinedQueryExecutionContext(
        baseCtx,
        [doubleTransform],
        dummyDiagnostic,
      );

      const r = await ctx.fetchMore(dummyDiagnostic);
      assert.deepEqual((r.result as any).buffer, [2, 4, 6]);
    });

    it("should compose multiple transforms left-to-right", async () => {
      const double: PipelineTransform = async function* (source) {
        for await (const page of source) {
          yield { ...page, items: page.items.map((x: any) => x * 2) };
        }
      };
      const addTen: PipelineTransform = async function* (source) {
        for await (const page of source) {
          yield { ...page, items: page.items.map((x: any) => x + 10) };
        }
      };

      const baseCtx = createMockContextWithPages([makePage([1, 2, 3], false)]);
      const ctx = new GeneratorPipelinedQueryExecutionContext(
        baseCtx,
        [double, addTen],
        dummyDiagnostic,
      );

      const r = await ctx.fetchMore(dummyDiagnostic);
      // double first → [2,4,6], then addTen → [12,14,16]
      assert.deepEqual((r.result as any).buffer, [12, 14, 16]);
    });

    it("should work with filter transforms that reduce items", async () => {
      const filterEven: PipelineTransform = async function* (source) {
        for await (const page of source) {
          yield { ...page, items: page.items.filter((x: any) => x % 2 === 0) };
        }
      };

      const baseCtx = createMockContextWithPages([makePage([1, 2, 3, 4, 5, 6], false)]);
      const ctx = new GeneratorPipelinedQueryExecutionContext(
        baseCtx,
        [filterEven],
        dummyDiagnostic,
      );

      const r = await ctx.fetchMore(dummyDiagnostic);
      assert.deepEqual((r.result as any).buffer, [2, 4, 6]);
    });
  });

  describe("dispose() cleanup", () => {
    it("should set hasMoreResults to false after dispose", () => {
      const baseCtx = createMockContextWithPages([makePage([1], true)]);
      const ctx = new GeneratorPipelinedQueryExecutionContext(baseCtx, [], dummyDiagnostic);

      assert.isTrue(ctx.hasMoreResults());
      ctx.dispose();
      assert.isFalse(ctx.hasMoreResults());
    });

    it("should throw on fetchMore after dispose", async () => {
      const baseCtx = createMockContextWithPages([makePage([1], false)]);
      const ctx = new GeneratorPipelinedQueryExecutionContext(baseCtx, [], dummyDiagnostic);

      ctx.dispose();
      try {
        await ctx.fetchMore(dummyDiagnostic);
        assert.fail("Expected error after dispose");
      } catch (e: any) {
        assert.include(e.message, "disposed");
      }
    });

    it("should be idempotent — calling dispose twice does not throw", () => {
      const baseCtx = createMockContextWithPages([makePage([1], false)]);
      const ctx = new GeneratorPipelinedQueryExecutionContext(baseCtx, [], dummyDiagnostic);

      ctx.dispose();
      ctx.dispose(); // should not throw
      assert.isFalse(ctx.hasMoreResults());
    });

    it("should dispose the base context", () => {
      let baseDisposed = false;
      const baseCtx: ExecutionContext = {
        hasMoreResults: () => !baseDisposed,
        fetchMore: async () => ({ result: undefined, headers: {} }),
        pages: function* () {} as any,
        dispose: () => {
          baseDisposed = true;
        },
      };

      const ctx = new GeneratorPipelinedQueryExecutionContext(baseCtx, [], dummyDiagnostic);
      ctx.dispose();
      assert.isTrue(baseDisposed);
    });
  });

  describe("hasMoreResults() state tracking", () => {
    it("should return true initially for non-empty source", () => {
      const baseCtx = createMockContextWithPages([makePage([1], false)]);
      const ctx = new GeneratorPipelinedQueryExecutionContext(baseCtx, [], dummyDiagnostic);
      assert.isTrue(ctx.hasMoreResults());
    });

    it("should return false after all pages consumed", async () => {
      const baseCtx = createMockContextWithPages([makePage([1], false)]);
      const ctx = new GeneratorPipelinedQueryExecutionContext(baseCtx, [], dummyDiagnostic);

      await ctx.fetchMore(dummyDiagnostic);
      // The page had hasMore=false, so after consuming it, hasMoreResults should be false
      assert.isFalse(ctx.hasMoreResults());
    });

    it("should return true between pages", async () => {
      const baseCtx = createMockContextWithPages([
        makePage([1], true),
        makePage([2], false),
      ]);
      const ctx = new GeneratorPipelinedQueryExecutionContext(baseCtx, [], dummyDiagnostic);

      await ctx.fetchMore(dummyDiagnostic);
      assert.isTrue(ctx.hasMoreResults());

      await ctx.fetchMore(dummyDiagnostic);
      assert.isFalse(ctx.hasMoreResults());
    });
  });

  describe("empty source handling", () => {
    it("should handle source with no pages", async () => {
      const baseCtx = createMockContextWithPages([]);
      const ctx = new GeneratorPipelinedQueryExecutionContext(baseCtx, [], dummyDiagnostic);

      const r = await ctx.fetchMore(dummyDiagnostic);
      assert.isUndefined(r.result);
      assert.isFalse(ctx.hasMoreResults());
    });

    it("should handle source with empty items", async () => {
      const baseCtx = createMockContextWithPages([makePage([], false)]);
      const ctx = new GeneratorPipelinedQueryExecutionContext(baseCtx, [], dummyDiagnostic);

      const r = await ctx.fetchMore(dummyDiagnostic);
      assert.deepEqual((r.result as any).buffer, []);
    });
  });

  describe("legacy fetchMore fallback", () => {
    it("should wrap fetchMore when pages() is not available", async () => {
      const baseCtx = createLegacyMockContext([
        makePage([10, 20], true),
        makePage([30], false),
      ]);
      const ctx = new GeneratorPipelinedQueryExecutionContext(baseCtx, [], dummyDiagnostic);

      const r1 = await ctx.fetchMore(dummyDiagnostic);
      assert.deepEqual((r1.result as any).buffer, [10, 20]);

      const r2 = await ctx.fetchMore(dummyDiagnostic);
      assert.deepEqual((r2.result as any).buffer, [30]);
    });

    it("should apply transforms over legacy fetchMore fallback", async () => {
      const double: PipelineTransform = async function* (source) {
        for await (const page of source) {
          yield { ...page, items: page.items.map((x: any) => x * 2) };
        }
      };

      const baseCtx = createLegacyMockContext([makePage([5, 10], false)]);
      const ctx = new GeneratorPipelinedQueryExecutionContext(
        baseCtx,
        [double],
        dummyDiagnostic,
      );

      const r = await ctx.fetchMore(dummyDiagnostic);
      assert.deepEqual((r.result as any).buffer, [10, 20]);
    });
  });
});

// ─── buildTransformPipeline ────────────────────────────────────────────────────

describe("PipelinedQueryExecutionContext.buildTransformPipeline", () => {
  it("should return empty array for simple query with no transforms", () => {
    const queryInfo: QueryInfo = {
      groupByAliasToAggregateType: {},
      distinctType: "None",
      hasSelectValue: false,
      hasNonStreamingOrderBy: false,
    };
    const transforms = PipelinedQueryExecutionContext.buildTransformPipeline(queryInfo, false);
    assert.deepEqual(transforms, []);
  });

  it("should include orderBy transform when sortOrders present", () => {
    const queryInfo: QueryInfo = {
      orderBy: ["Ascending"],
      groupByAliasToAggregateType: {},
      distinctType: "None",
      hasSelectValue: false,
      hasNonStreamingOrderBy: false,
    };
    const transforms = PipelinedQueryExecutionContext.buildTransformPipeline(queryInfo, false);
    assert.equal(transforms.length, 1);
  });

  it("should include orderedDistinct transform", () => {
    const queryInfo: QueryInfo = {
      groupByAliasToAggregateType: {},
      distinctType: "Ordered",
      hasSelectValue: false,
      hasNonStreamingOrderBy: false,
    };
    const transforms = PipelinedQueryExecutionContext.buildTransformPipeline(queryInfo, false);
    assert.equal(transforms.length, 1);
  });

  it("should include unorderedDistinct transform", () => {
    const queryInfo: QueryInfo = {
      groupByAliasToAggregateType: {},
      distinctType: "Unordered",
      hasSelectValue: false,
      hasNonStreamingOrderBy: false,
    };
    const transforms = PipelinedQueryExecutionContext.buildTransformPipeline(queryInfo, false);
    assert.equal(transforms.length, 1);
  });

  it("should include groupBy transform", () => {
    const queryInfo: QueryInfo = {
      groupByAliasToAggregateType: { count: "Count" },
      groupByExpressions: ["c.category"],
      distinctType: "None",
      hasSelectValue: false,
      hasNonStreamingOrderBy: false,
    };
    const transforms = PipelinedQueryExecutionContext.buildTransformPipeline(queryInfo, false);
    assert.equal(transforms.length, 1);
  });

  it("should include groupByValue transform when hasSelectValue is true", () => {
    const queryInfo: QueryInfo = {
      aggregates: ["Sum"],
      groupByAliasToAggregateType: {},
      groupByExpressions: ["c.category"],
      distinctType: "None",
      hasSelectValue: true,
      hasNonStreamingOrderBy: false,
    };
    const transforms = PipelinedQueryExecutionContext.buildTransformPipeline(queryInfo, false);
    assert.equal(transforms.length, 1);
  });

  it("should include offsetLimit transform for TOP", () => {
    const queryInfo: QueryInfo = {
      top: 10,
      groupByAliasToAggregateType: {},
      distinctType: "None",
      hasSelectValue: false,
      hasNonStreamingOrderBy: false,
    };
    const transforms = PipelinedQueryExecutionContext.buildTransformPipeline(queryInfo, false);
    assert.equal(transforms.length, 1);
  });

  it("should include offsetLimit transform for OFFSET+LIMIT", () => {
    const queryInfo: QueryInfo = {
      offset: 5,
      limit: 10,
      groupByAliasToAggregateType: {},
      distinctType: "None",
      hasSelectValue: false,
      hasNonStreamingOrderBy: false,
    };
    const transforms = PipelinedQueryExecutionContext.buildTransformPipeline(queryInfo, false);
    assert.equal(transforms.length, 1);
  });

  it("should include both TOP and OFFSET+LIMIT transforms when both present", () => {
    const queryInfo: QueryInfo = {
      top: 20,
      offset: 5,
      limit: 10,
      groupByAliasToAggregateType: {},
      distinctType: "None",
      hasSelectValue: false,
      hasNonStreamingOrderBy: false,
    };
    const transforms = PipelinedQueryExecutionContext.buildTransformPipeline(queryInfo, false);
    assert.equal(transforms.length, 2);
  });

  it("should build full streaming pipeline: orderBy + distinct + top", () => {
    const queryInfo: QueryInfo = {
      orderBy: ["Ascending"],
      top: 5,
      groupByAliasToAggregateType: {},
      distinctType: "Ordered",
      hasSelectValue: false,
      hasNonStreamingOrderBy: false,
    };
    const transforms = PipelinedQueryExecutionContext.buildTransformPipeline(queryInfo, false);
    // orderBy + orderedDistinct + top
    assert.equal(transforms.length, 3);
  });

  it("should use non-streaming path when hasNonStreamingOrderBy is true", () => {
    const queryInfo: QueryInfo = {
      orderBy: ["Ascending"],
      top: 10,
      groupByAliasToAggregateType: {},
      distinctType: "None",
      hasSelectValue: false,
      hasNonStreamingOrderBy: true,
    };
    const transforms = PipelinedQueryExecutionContext.buildTransformPipeline(queryInfo, false);
    // Non-streaming path produces exactly one transform
    assert.equal(transforms.length, 1);
  });

  it("should use non-streaming distinct path when distinctType != None", () => {
    const queryInfo: QueryInfo = {
      orderBy: ["Ascending"],
      top: 10,
      groupByAliasToAggregateType: {},
      distinctType: "Ordered",
      hasSelectValue: false,
      hasNonStreamingOrderBy: true,
    };
    const transforms = PipelinedQueryExecutionContext.buildTransformPipeline(queryInfo, false);
    assert.equal(transforms.length, 1);
  });

  it("should respect continuation token overrides for TOP", () => {
    const queryInfo: QueryInfo = {
      top: 100,
      groupByAliasToAggregateType: {},
      distinctType: "None",
      hasSelectValue: false,
      hasNonStreamingOrderBy: false,
    };
    const continuationFields = { limit: 50 };
    const transforms = PipelinedQueryExecutionContext.buildTransformPipeline(
      queryInfo,
      false,
      continuationFields,
    );
    assert.equal(transforms.length, 1);
  });
});
