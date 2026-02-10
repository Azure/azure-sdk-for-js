// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert, vi } from "vitest";
import { ExecutionContextFactory } from "../../../../src/queryExecutionContext/executionContextFactory.js";
import { PipelinedQueryExecutionContext } from "../../../../src/queryExecutionContext/pipelinedQueryExecutionContext.js";
import { HybridQueryExecutionContext } from "../../../../src/queryExecutionContext/hybridQueryExecutionContext.js";
import type { PartitionedQueryExecutionInfo } from "../../../../src/request/ErrorResponse.js";
import type { ClientContext } from "../../../../src/ClientContext.js";
import type { PartitionKeyRangeCache } from "../../../../src/routing/partitionKeyRangeCache.js";
import type { FeedOptions } from "../../../../src/request/FeedOptions.js";

function createMockClientContext(): ClientContext {
  return {
    partitionKeyRangeCache: {} as PartitionKeyRangeCache,
  } as unknown as ClientContext;
}

function createMockPartitionKeyRangeCache(): PartitionKeyRangeCache {
  return {
    onCollectionRoutingMap: vi.fn().mockResolvedValue({
      getOrderedParitionKeyRanges: () => [{ minInclusive: "00", maxExclusive: "FF" }],
    }),
  } as unknown as PartitionKeyRangeCache;
}

describe("ExecutionContextFactory", () => {
  const collectionLink = "/dbs/testDb/colls/testCollection";
  const query = "SELECT * FROM c";
  const options: FeedOptions = { maxItemCount: 10 };
  const correlatedActivityId = "test-activity-id";

  describe("create", () => {
    it("should create a PipelinedQueryExecutionContext for standard queries", async () => {
      const clientContext = createMockClientContext();
      const pkRangeCache = createMockPartitionKeyRangeCache();

      const factory = new ExecutionContextFactory(
        clientContext,
        collectionLink,
        query,
        options,
        pkRangeCache,
      );

      const queryPlan: PartitionedQueryExecutionInfo = {
        partitionedQueryExecutionInfoVersion: 1,
        queryInfo: {
          distinctType: "None",
          hasSelectValue: false,
          groupByAliasToAggregateType: {},
          rewrittenQuery: "SELECT * FROM c",
          hasNonStreamingOrderBy: false,
          orderBy: ["Ascending"],
          aggregates: [],
          groupByExpressions: [],
        },
        queryRanges: [{ min: "00", max: "FF", isMinInclusive: true, isMaxInclusive: false }],
      };

      const context = await factory.create(queryPlan, correlatedActivityId);
      assert.instanceOf(context, PipelinedQueryExecutionContext);
    });

    it("should create a HybridQueryExecutionContext for hybrid search queries", async () => {
      const clientContext = createMockClientContext();
      const pkRangeCache = createMockPartitionKeyRangeCache();

      const factory = new ExecutionContextFactory(
        clientContext,
        collectionLink,
        query,
        options,
        pkRangeCache,
      );

      const queryPlan: PartitionedQueryExecutionInfo = {
        partitionedQueryExecutionInfoVersion: 1,
        queryInfo: {
          distinctType: "None",
          hasSelectValue: false,
          groupByAliasToAggregateType: {},
          hasNonStreamingOrderBy: false,
        },
        hybridSearchQueryInfo: {
          globalStatisticsQuery: "SELECT * FROM c",
          componentQueryInfos: [
            {
              distinctType: "None",
              hasSelectValue: true,
              groupByAliasToAggregateType: {},
              rewrittenQuery: "SELECT VALUE c FROM c ORDER BY c.score",
              hasNonStreamingOrderBy: true,
              orderBy: ["Descending"],
              orderByExpressions: ["c.score"],
              top: 10,
            },
          ],
          take: 10,
          skip: 0,
          requiresGlobalStatistics: false,
        },
        queryRanges: [{ min: "00", max: "FF", isMinInclusive: true, isMaxInclusive: false }],
      };

      const context = await factory.create(queryPlan, correlatedActivityId);
      assert.instanceOf(context, HybridQueryExecutionContext);
    });

    it("should throw for aggregate queries without VALUE keyword", async () => {
      const clientContext = createMockClientContext();
      const pkRangeCache = createMockPartitionKeyRangeCache();

      const factory = new ExecutionContextFactory(
        clientContext,
        collectionLink,
        query,
        options,
        pkRangeCache,
      );

      const queryPlan: PartitionedQueryExecutionInfo = {
        partitionedQueryExecutionInfoVersion: 1,
        queryInfo: {
          distinctType: "None",
          hasSelectValue: false,
          groupByAliasToAggregateType: {},
          hasNonStreamingOrderBy: false,
          aggregates: ["Count"],
        },
        queryRanges: [{ min: "00", max: "FF", isMinInclusive: true, isMaxInclusive: false }],
      };

      try {
        await factory.create(queryPlan, correlatedActivityId);
        assert.fail("Expected error was not thrown");
      } catch (err: any) {
        assert.include(err.message, "Aggregate queries must use the VALUE keyword");
      }
    });

    it("should resolve partition key ranges for hybrid queries", async () => {
      const clientContext = createMockClientContext();
      const pkRangeCache = createMockPartitionKeyRangeCache();

      const factory = new ExecutionContextFactory(
        clientContext,
        collectionLink,
        query,
        options,
        pkRangeCache,
      );

      const queryPlan: PartitionedQueryExecutionInfo = {
        partitionedQueryExecutionInfoVersion: 1,
        queryInfo: {
          distinctType: "None",
          hasSelectValue: false,
          groupByAliasToAggregateType: {},
          hasNonStreamingOrderBy: false,
        },
        hybridSearchQueryInfo: {
          globalStatisticsQuery: "SELECT * FROM c",
          componentQueryInfos: [
            {
              distinctType: "None",
              hasSelectValue: true,
              groupByAliasToAggregateType: {},
              rewrittenQuery: "SELECT VALUE c FROM c ORDER BY c.score",
              hasNonStreamingOrderBy: true,
              orderBy: ["Descending"],
              orderByExpressions: ["c.score"],
              top: 10,
            },
          ],
          take: 10,
          skip: 0,
          requiresGlobalStatistics: false,
        },
        queryRanges: [{ min: "00", max: "FF", isMinInclusive: true, isMaxInclusive: false }],
      };

      await factory.create(queryPlan, correlatedActivityId);
      assert.strictEqual(
        (pkRangeCache.onCollectionRoutingMap as ReturnType<typeof vi.fn>).mock.calls.length,
        1,
      );
    });
  });
});
