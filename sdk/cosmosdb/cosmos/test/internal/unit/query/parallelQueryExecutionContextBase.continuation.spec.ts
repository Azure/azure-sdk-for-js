// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  FeedOptions,
  PartitionKeyRange,
  QueryInfo,
  QueryIterator,
  Resource,
} from "../../../../src/index.js";
import { CosmosDbDiagnosticLevel } from "../../../../src/index.js";
import type { ClientContext } from "../../../../src/index.js";
import { TestParallelQueryExecutionContext } from "../common/TestParallelQueryExecutionContext.js";
import {
  createTestClientContext,
} from "../../../public/common/TestHelpers.js";
import { describe, it, assert, expect, beforeEach, vi, afterEach } from "vitest";
import { SmartRoutingMapProvider } from "../../../../src/routing/smartRoutingMapProvider.js";
import type { PartitionedQueryExecutionInfo } from "../../../../src/request/ErrorResponse.js";
import type { SqlQuerySpec } from "../../../../src/queryExecutionContext/SqlQuerySpec.js";
import type { DocumentProducer } from "../../../../src/queryExecutionContext/documentProducer.js";

describe("ParallelQueryExecutionContextBase Constructor Tests", () => {
  const collectionLink = "/dbs/testDb/colls/testCollection";
  const cosmosClientOptions = {
    endpoint: "https://your-cosmos-db.documents.azure.com:443/",
    key: "your-cosmos-db-key",
    userAgentSuffix: "MockClient",
  };
  const diagnosticLevel = CosmosDbDiagnosticLevel.info;
  const correlatedActivityId = "sample-activity-id";

  // Common test data structures to reduce repetition
  interface TestScenarioConfig {
    name: string;
    queryType: "parallel" | "orderBy";
    continuationToken?: string;
    expectedError?: string;
    mockTargetRanges: TestPartitionRange[];
    mockSplitMergeScenario?: "split" | "merge" | "none";
    expectedEpkRanges?: boolean;
    expectedFilterConditions?: string[];
    expectedProducerCount: number;
    expectedProducersWithTokens?: number;
    expectedUpdatedRanges?: number;
  }

  interface TestPartitionRange {
    id: string;
    minInclusive: string;
    maxExclusive: string;
  }

  interface MockContinuationRange {
    range: TestPartitionRange;
    continuationToken?: string;
    epkMin?: string;
    epkMax?: string;
  }

  // Helper functions to reduce code duplication
  const createMockPartitionKeyRange = (
    id: string,
    minInclusive: string,
    maxExclusive: string,
  ): PartitionKeyRange => ({
    id,
    _rid: `range-rid-${id}`,
    minInclusive,
    maxExclusive,
    _etag: "sample-etag",
    _self: `/dbs/sample-db/colls/sample-collection/pkranges/${id}`,
    throughputFraction: 1.0,
    status: "Online",
    ridPrefix: `ridPrefix-${id}`,
    parents: [],
  } as unknown as PartitionKeyRange);

  const createMockDocument = (id: string, name: string, value: string): any => ({
    id,
    _rid: `doc-rid-${id}`,
    _ts: Date.now(),
    _self: `/dbs/sample-db/colls/sample-collection/docs/${id}`,
    _etag: `etag-${id}`,
    name,
    value,
  });

  const createQueryInfo = (isOrderBy: boolean): QueryInfo => ({
    orderBy: isOrderBy ? ["Ascending"] : [],
    rewrittenQuery: "SELECT * FROM c",
    distinctType: "None",
    top: null,
    offset: null,
    limit: null,
    groupByExpressions: [],
    aggregates: [],
    groupByAliasToAggregateType: {},
    hasNonStreamingOrderBy: isOrderBy,
    hasSelectValue: false,
  } as QueryInfo);

  const createPartitionedQueryExecutionInfo = (isOrderBy: boolean): PartitionedQueryExecutionInfo => ({
    queryRanges: [
      { min: "00", max: "AA", isMinInclusive: true, isMaxInclusive: false },
      { min: "AA", max: "BB", isMinInclusive: true, isMaxInclusive: false },
      { min: "BB", max: "FF", isMinInclusive: true, isMaxInclusive: false },
    ],
    queryInfo: createQueryInfo(isOrderBy),
    partitionedQueryExecutionInfoVersion: 1,
  });

  const createParallelQueryContinuationToken = (ranges: MockContinuationRange[]): string => {
    const rangeMappings = ranges.map(r => ({
      queryRange: {
        min: r.epkMin || r.range.minInclusive,
        max: r.epkMax || r.range.maxExclusive,
        isMinInclusive: true,
        isMaxInclusive: false,
      },
      continuationToken: r.continuationToken || null,
    }));

    return JSON.stringify({
      rid: collectionLink,
      rangeMappings,
    });
  };

  const createOrderByQueryContinuationToken = (
    ranges: MockContinuationRange[],
    orderByItems: any[] = [{ "item": "value" }],
    rid: string = "test-rid",
    skipCount: number = 0,
  ): string => {
    const rangeMappings = ranges.map(r => ({
      queryRange: {
        min: r.epkMin || r.range.minInclusive,
        max: r.epkMax || r.range.maxExclusive,
        isMinInclusive: true,
        isMaxInclusive: false,
      },
      continuationToken: r.continuationToken || null,
    }));

    return JSON.stringify({
      rangeMappings,
      orderByItems,
      rid,
      skipCount,
    });
  };

  const setupMockClientContext = (
    targetRanges: TestPartitionRange[],
    splitMergeScenario: "split" | "merge" | "none" = "none",
  ): ClientContext => {
    const clientContext = createTestClientContext(cosmosClientOptions, diagnosticLevel);
    
    const mockPartitionRanges = targetRanges.map(r => 
      createMockPartitionKeyRange(r.id, r.minInclusive, r.maxExclusive)
    );

    const fetchAllInternalStub = vi.fn().mockResolvedValue({
      resources: mockPartitionRanges,
      headers: { "x-ms-request-charge": "1.23" },
      code: 200,
    });

    vi.spyOn(clientContext, "queryPartitionKeyRanges").mockReturnValue({
      fetchAllInternal: fetchAllInternalStub,
    } as unknown as QueryIterator<PartitionKeyRange>);

    vi.spyOn(clientContext, "queryFeed").mockResolvedValue({
      result: [createMockDocument("1", "doc1", "value1")] as unknown as Resource,
      headers: {
        "x-ms-request-charge": "2.5",
        "x-ms-continuation": "next-page-token",
      },
      code: 200,
    });

    // Mock SmartRoutingMapProvider for split/merge scenarios
    const mockGetOverlappingRanges = vi.fn();
    
    if (splitMergeScenario === "split") {
      // One range splits into multiple ranges
      mockGetOverlappingRanges.mockImplementation(async (_collectionLink, queryRanges) => {
        const queryRange = queryRanges[0];
        if (queryRange.min === "00" && queryRange.max === "BB") {
          // Split the "00-BB" range into "00-AA" and "AA-BB"
          return [
            createMockPartitionKeyRange("0", "00", "AA"),
            createMockPartitionKeyRange("1", "AA", "BB"),
          ];
        }
        return mockPartitionRanges.filter(r => 
          r.minInclusive >= queryRange.min && r.maxExclusive <= queryRange.max
        );
      });
    } else if (splitMergeScenario === "merge") {
      // Multiple ranges merge into one range
      mockGetOverlappingRanges.mockImplementation(async (_collectionLink, queryRanges) => {
        const queryRange = queryRanges[0];
        if (queryRange.min === "00" && queryRange.max === "AA") {
          // Range "00-AA" is now part of merged range "00-BB" 
          return [createMockPartitionKeyRange("merged", "00", "BB")];
        }
        return mockPartitionRanges.filter(r => 
          r.minInclusive >= queryRange.min && r.maxExclusive <= queryRange.max
        );
      });
    } else {
      // No split/merge - return matching ranges
      mockGetOverlappingRanges.mockResolvedValue(mockPartitionRanges);
    }

    vi.spyOn(SmartRoutingMapProvider.prototype, "getOverlappingRanges")
      .mockImplementation(mockGetOverlappingRanges);

    return clientContext;
  };

  // Test scenarios configuration
  const testScenarios: TestScenarioConfig[] = [
    {
      name: "parallel query without continuation token",
      queryType: "parallel",
      mockTargetRanges: [
        { id: "0", minInclusive: "00", maxExclusive: "AA" },
        { id: "1", minInclusive: "AA", maxExclusive: "BB" },
        { id: "2", minInclusive: "BB", maxExclusive: "FF" },
      ],
      mockSplitMergeScenario: "none",
      expectedEpkRanges: false,
      expectedProducerCount: 3,
    },
    {
      name: "order by query without continuation token",
      queryType: "orderBy",
      mockTargetRanges: [
        { id: "0", minInclusive: "00", maxExclusive: "AA" },
        { id: "1", minInclusive: "AA", maxExclusive: "BB" },
        { id: "2", minInclusive: "BB", maxExclusive: "FF" },
      ],
      mockSplitMergeScenario: "none",
      expectedEpkRanges: false,
      expectedProducerCount: 3,
    },
    {
      name: "parallel query with continuation token - no split/merge",
      queryType: "parallel",
      mockTargetRanges: [
        { id: "0", minInclusive: "00", maxExclusive: "AA" },
        { id: "1", minInclusive: "AA", maxExclusive: "BB" },
        { id: "2", minInclusive: "BB", maxExclusive: "FF" },
      ],
      mockSplitMergeScenario: "none",
      expectedEpkRanges: false,
      expectedProducerCount: 3,
      expectedProducersWithTokens: 2, // Based on continuation token setup
    },
    {
      name: "order by query with continuation token - no split/merge", 
      queryType: "orderBy",
      mockTargetRanges: [
        { id: "0", minInclusive: "00", maxExclusive: "AA" },
        { id: "1", minInclusive: "AA", maxExclusive: "BB" },
        { id: "2", minInclusive: "BB", maxExclusive: "FF" },
      ],
      mockSplitMergeScenario: "none",
      expectedEpkRanges: false,
      expectedProducerCount: 3,
      expectedProducersWithTokens: 2, // Based on continuation token setup
    },
    {
      name: "parallel query with continuation token - partition split scenario",
      queryType: "parallel",
      mockTargetRanges: [
        { id: "0", minInclusive: "00", maxExclusive: "AA" },
        { id: "1", minInclusive: "AA", maxExclusive: "BB" },
        { id: "2", minInclusive: "BB", maxExclusive: "FF" },
      ],
      mockSplitMergeScenario: "split",
      expectedEpkRanges: false,
      expectedProducerCount: 4, // Original 3 + 1 from split
      expectedProducersWithTokens: 2, // Based on continuation token setup
      expectedUpdatedRanges: 1, // One range updated due to split
    },
    {
      name: "order by query with continuation token - partition merge scenario",
      queryType: "orderBy",
      mockTargetRanges: [
        { id: "merged", minInclusive: "00", maxExclusive: "BB" },
        { id: "2", minInclusive: "BB", maxExclusive: "FF" },
      ],
      mockSplitMergeScenario: "merge",
      expectedEpkRanges: true, // Merge scenarios should include EPK ranges
      expectedProducerCount: 2, // Target ranges after merge
      expectedProducersWithTokens: 1, // Based on continuation token setup for merge
      expectedUpdatedRanges: 1, // One range updated due to merge
    },
    {
      name: "parallel query with continuation token - partition merge scenario",
      queryType: "parallel",
      mockTargetRanges: [
        { id: "merged", minInclusive: "00", maxExclusive: "BB" },
        { id: "2", minInclusive: "BB", maxExclusive: "FF" },
      ],
      mockSplitMergeScenario: "merge",
      expectedEpkRanges: true, // Merge scenarios should include EPK ranges
      expectedProducerCount: 2, // Target ranges after merge
      expectedProducersWithTokens: 1, // Based on continuation token setup for merge
      expectedUpdatedRanges: 1, // One range updated due to merge
    },
  ];

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("Error Scenarios", () => {
    it("should throw error when continuation token is provided without enableQueryControl", () => {
      const options: FeedOptions = { 
        maxItemCount: 10, 
        maxDegreeOfParallelism: 2,
        enableQueryControl: false, // This should cause an error
        continuationToken: "some-token",
      };
      const clientContext = setupMockClientContext([
        { id: "0", minInclusive: "00", maxExclusive: "FF" }
      ]);

      expect(() => {
        new TestParallelQueryExecutionContext(
          clientContext,
          collectionLink,
          "SELECT * FROM c",
          options,
          createPartitionedQueryExecutionInfo(false),
          correlatedActivityId,
        );
      }).toThrow("Continuation tokens are supported when enableQueryControl is set true in FeedOptions");
    });

    it("should throw error for malformed continuation token", async () => {
      const options: FeedOptions = { 
        maxItemCount: 10, 
        maxDegreeOfParallelism: 2,
        enableQueryControl: true,
        continuationToken: "invalid-json-{malformed}",
      };
      const clientContext = setupMockClientContext([
        { id: "0", minInclusive: "00", maxExclusive: "FF" }
      ]);

      // Create context and check for error after async initialization
      const context = new TestParallelQueryExecutionContext(
        clientContext,
        collectionLink,
        "SELECT * FROM c",
        options,
        createPartitionedQueryExecutionInfo(false),
        correlatedActivityId,
      );

      // Wait for async initialization to complete
      await new Promise(resolve => setTimeout(resolve, 200));

      // Should have error stored in context for malformed continuation token
      assert.exists(context["err"]);
      assert.match(context["err"].message, /Invalid.*continuation token format/);
    });
  });

  testScenarios.forEach((scenario) => {
    describe(`${scenario.name}`, () => {
      let clientContext: ClientContext;
      let options: FeedOptions;
      let query: string | SqlQuerySpec;
      let partitionedQueryExecutionInfo: PartitionedQueryExecutionInfo;
      let continuationToken: string | undefined;

      beforeEach(() => {
        clientContext = setupMockClientContext(
          scenario.mockTargetRanges,
          scenario.mockSplitMergeScenario
        );

        options = {
          maxItemCount: 10,
          maxDegreeOfParallelism: 2,
          enableQueryControl: true,
        };

        query = scenario.queryType === "orderBy" 
          ? "SELECT * FROM c ORDER BY c.name ASC"
          : "SELECT * FROM c";

        partitionedQueryExecutionInfo = createPartitionedQueryExecutionInfo(
          scenario.queryType === "orderBy"
        );

        // Create continuation token if specified in scenario
        if (scenario.continuationToken !== undefined || 
            (scenario.mockSplitMergeScenario && scenario.mockSplitMergeScenario !== "none")) {
          
          const mockRanges: MockContinuationRange[] = [
            {
              range: { id: "0", minInclusive: "00", maxExclusive: scenario.mockSplitMergeScenario === "merge" ? "BB" : "AA" },
              continuationToken: "token-for-range-0",
              epkMin: scenario.expectedEpkRanges ? "00" : undefined,
              epkMax: scenario.expectedEpkRanges ? (scenario.mockSplitMergeScenario === "merge" ? "BB" : "AA") : undefined,
            },
          ];

          if (scenario.mockSplitMergeScenario !== "merge") {
            mockRanges.push({
              range: { id: "1", minInclusive: "AA", maxExclusive: "BB" },
              continuationToken: "token-for-range-1",
            });
          }

          continuationToken = scenario.queryType === "orderBy"
            ? createOrderByQueryContinuationToken(mockRanges)
            : createParallelQueryContinuationToken(mockRanges);
          
          options.continuationToken = continuationToken;
        }
      });

      it("should create context with proper initialization", async () => {
        const context = new TestParallelQueryExecutionContext(
          clientContext,
          collectionLink,
          query,
          options,
          partitionedQueryExecutionInfo,
          correlatedActivityId,
        );

        // Wait for async initialization to complete
        await new Promise(resolve => setTimeout(resolve, 200));

        // Verify context is created without errors
        assert.isUndefined(context["err"]);
        assert.exists(context["unfilledDocumentProducersQueue"]);
        assert.exists(context["bufferedDocumentProducersQueue"]);
        assert.equal(context["buffer"].length, 0);
      });

      it("should properly determine query type", async () => {
        const context = new TestParallelQueryExecutionContext(
          clientContext,
          collectionLink,
          query,
          options,
          partitionedQueryExecutionInfo,
          correlatedActivityId,
        );

        // Wait for async initialization to complete
        await new Promise(resolve => setTimeout(resolve, 200));

        const queryType = context["getQueryType"]();
        const expectedType = scenario.queryType === "orderBy" ? "OrderBy" : "Parallel";
        assert.equal(queryType, expectedType);
      });

      it("should create correct number of document producers", async () => {
        const context = new TestParallelQueryExecutionContext(
          clientContext,
          collectionLink,
          query,
          options,
          partitionedQueryExecutionInfo,
          correlatedActivityId,
        );

        // Wait for async initialization to complete
        await new Promise(resolve => setTimeout(resolve, 200));

        const totalProducers = context["unfilledDocumentProducersQueue"].size() + 
                              context["bufferedDocumentProducersQueue"].size();
        
        assert.equal(
          totalProducers, 
          scenario.expectedProducerCount, 
          `Should have exactly ${scenario.expectedProducerCount} document producers for ${scenario.mockSplitMergeScenario || 'normal'} scenario`
        );
      });

      it("should properly handle EPK ranges in merge scenarios", async () => {
        if (!scenario.expectedEpkRanges || scenario.mockSplitMergeScenario !== "merge") {
          return; // Skip this test for scenarios that don't expect EPK ranges
        }

        const context = new TestParallelQueryExecutionContext(
          clientContext,
          collectionLink,
          query,
          options,
          partitionedQueryExecutionInfo,
          correlatedActivityId,
        );

        // Wait for async initialization to complete
        await new Promise(resolve => setTimeout(resolve, 200));

        // Check that at least one document producer has EPK ranges set
        let producersWithEpkRanges = 0;
        // Extract all producers to check EPK ranges
        const allProducers: DocumentProducer[] = [];
        while (context["unfilledDocumentProducersQueue"].size() > 0) {
          allProducers.push(context["unfilledDocumentProducersQueue"].deq());
        }
        while (context["bufferedDocumentProducersQueue"].size() > 0) {
          allProducers.push(context["bufferedDocumentProducersQueue"].deq());
        }

        for (const producer of allProducers) {
          if (producer.startEpk && producer.endEpk) {
            producersWithEpkRanges++;
          }
        }

        assert.equal(
          producersWithEpkRanges, 
          1, 
          "Exactly one document producer should have EPK ranges in merge scenario"
        );
      });

      it("should track updated continuation ranges for split/merge scenarios", async () => {
        if (!scenario.mockSplitMergeScenario || scenario.mockSplitMergeScenario === "none" || !scenario.expectedUpdatedRanges) {
          return; // Skip for scenarios without split/merge or expected ranges
        }

        const context = new TestParallelQueryExecutionContext(
          clientContext,
          collectionLink,
          query,
          options,
          partitionedQueryExecutionInfo,
          correlatedActivityId,
        );

        // Wait for async initialization to complete
        await new Promise(resolve => setTimeout(resolve, 200));

        const updatedRanges = context["updatedContinuationRanges"];
        
        assert.equal(
          updatedRanges.size, 
          scenario.expectedUpdatedRanges, 
          `Should track exactly ${scenario.expectedUpdatedRanges} updated continuation range(s) for ${scenario.mockSplitMergeScenario} scenario`
        );
      });

      it("should properly filter ranges using TargetPartitionRangeManager", async () => {
        if (!continuationToken) {
          return; // Skip for scenarios without continuation tokens
        }

        const context = new TestParallelQueryExecutionContext(
          clientContext,
          collectionLink,
          query,
          options,
          partitionedQueryExecutionInfo,
          correlatedActivityId,
        );

        // Wait for async initialization to complete
        await new Promise(resolve => setTimeout(resolve, 200));

        // Verify that the filtering logic was applied
        const totalProducers = context["unfilledDocumentProducersQueue"].size() + 
                              context["bufferedDocumentProducersQueue"].size();

        assert.equal(
          totalProducers, 
          scenario.expectedProducerCount, 
          `Should have exactly ${scenario.expectedProducerCount} producers after filtering for ${scenario.mockSplitMergeScenario || 'normal'} scenario`
        );
      });

      it("should correctly set continuation tokens on document producers", async () => {
        if (!continuationToken || !scenario.expectedProducersWithTokens) {
          return; // Skip for scenarios without continuation tokens or expected count
        }

        const context = new TestParallelQueryExecutionContext(
          clientContext,
          collectionLink,
          query,
          options,
          partitionedQueryExecutionInfo,
          correlatedActivityId,
        );

        // Check that document producers have continuation tokens
        let producersWithTokens = 0;
        const allProducers: DocumentProducer[] = [];

        while (context["unfilledDocumentProducersQueue"].size() > 0) {
          allProducers.push(context["unfilledDocumentProducersQueue"].deq());
        }
        while (context["bufferedDocumentProducersQueue"].size() > 0) {
          allProducers.push(context["bufferedDocumentProducersQueue"].deq());
        }

        for (const producer of allProducers) {
          if (producer.continuationToken) {
            producersWithTokens++;
          }
        }

        assert.equal(
          producersWithTokens, 
          scenario.expectedProducersWithTokens, 
          `Should have exactly ${scenario.expectedProducersWithTokens} document producers with continuation tokens for ${scenario.mockSplitMergeScenario || 'normal'} scenario`
        );
      });

      it("should maintain proper partition range ordering", async () => {
        const context = new TestParallelQueryExecutionContext(
          clientContext,
          collectionLink,
          query,
          options,
          partitionedQueryExecutionInfo,
          correlatedActivityId,
        );

        // Wait for async initialization
        await new Promise(resolve => setTimeout(resolve, 200));

        // Extract ranges in order from unfilled queue
        const rangeOrder: string[] = [];
        const tempQueue = [];

        while (context["unfilledDocumentProducersQueue"].size() > 0) {
          const producer = context["unfilledDocumentProducersQueue"].deq();
          rangeOrder.push(producer.targetPartitionKeyRange.minInclusive);
          tempQueue.push(producer);
        }

        // Restore queue
        tempQueue.forEach(producer => {
          context["unfilledDocumentProducersQueue"].enq(producer);
        });

        // Verify lexicographic ordering
        for (let i = 1; i < rangeOrder.length; i++) {
          assert.isAtMost(
            rangeOrder[i - 1].localeCompare(rangeOrder[i]),
            0,
            "Partition ranges should be ordered lexicographically"
          );
        }
      });
    });
  });

  describe("Edge Cases and Boundary Conditions", () => {
    it("should handle empty query ranges", async () => {
      const partitionedQueryExecutionInfo = {
        queryRanges: [] as any[], // Empty ranges
        queryInfo: createQueryInfo(false),
        partitionedQueryExecutionInfoVersion: 1,
      };

      const clientContext = setupMockClientContext([]);
      const options: FeedOptions = { maxItemCount: 10, maxDegreeOfParallelism: 2 };

      const context = new TestParallelQueryExecutionContext(
        clientContext,
        collectionLink,
        "SELECT * FROM c",
        options,
        partitionedQueryExecutionInfo,
        correlatedActivityId,
      );

      // Wait for async initialization to complete
      await new Promise(resolve => setTimeout(resolve, 200));

      // Should handle empty ranges gracefully
      assert.equal(context["unfilledDocumentProducersQueue"].size(), 0, "Should have no producers for empty ranges");
      assert.equal(context["bufferedDocumentProducersQueue"].size(), 0, "Should have no buffered producers for empty ranges");
    });

    it("should handle single partition range", async () => {
      const mockRanges = [{ id: "0", minInclusive: "", maxExclusive: "FF" }];
      const clientContext = setupMockClientContext(mockRanges);
      const options: FeedOptions = { maxItemCount: 10, maxDegreeOfParallelism: 2 };

      const context = new TestParallelQueryExecutionContext(
        clientContext,
        collectionLink,
        "SELECT * FROM c",
        options,
        createPartitionedQueryExecutionInfo(false),
        correlatedActivityId,
      );

      // Wait for async initialization to complete
      await new Promise(resolve => setTimeout(resolve, 200));

      const totalProducers = context["unfilledDocumentProducersQueue"].size() + 
                            context["bufferedDocumentProducersQueue"].size();
      assert.equal(totalProducers, 1, "Should have exactly one producer for single range");
    });

    it("should handle maxDegreeOfParallelism greater than partition count", async () => {
      const mockRanges = [
        { id: "0", minInclusive: "00", maxExclusive: "AA" },
        { id: "1", minInclusive: "AA", maxExclusive: "FF" },
      ];
      const clientContext = setupMockClientContext(mockRanges);
      const options: FeedOptions = { 
        maxItemCount: 10, 
        maxDegreeOfParallelism: 10, // Much higher than partition count
      };

      const context = new TestParallelQueryExecutionContext(
        clientContext,
        collectionLink,
        "SELECT * FROM c",
        options,
        createPartitionedQueryExecutionInfo(false),
        correlatedActivityId,
      );

      // Wait for async initialization to complete
      await new Promise(resolve => setTimeout(resolve, 200));

      // Should not create more producers than partitions
      const totalProducers = context["unfilledDocumentProducersQueue"].size() + 
                            context["bufferedDocumentProducersQueue"].size();
      assert.equal(totalProducers, mockRanges.length, "Should have exactly same number of producers as partition count");
    });

    it("should handle undefined maxDegreeOfParallelism", async () => {
      const mockRanges = [
        { id: "0", minInclusive: "00", maxExclusive: "AA" },
        { id: "1", minInclusive: "AA", maxExclusive: "BB" },
        { id: "2", minInclusive: "BB", maxExclusive: "FF" },
      ];
      const clientContext = setupMockClientContext(mockRanges);
      const options: FeedOptions = { 
        maxItemCount: 10, 
        maxDegreeOfParallelism: undefined, // Should default to range count
      };

      const context = new TestParallelQueryExecutionContext(
        clientContext,
        collectionLink,
        "SELECT * FROM c",
        options,
        createPartitionedQueryExecutionInfo(false),
        correlatedActivityId,
      );

      // Wait for async initialization to complete
      await new Promise(resolve => setTimeout(resolve, 200));

      // Should use all available ranges when maxDegreeOfParallelism is undefined
      const totalProducers = context["unfilledDocumentProducersQueue"].size() + 
                            context["bufferedDocumentProducersQueue"].size();
      assert.equal(totalProducers, mockRanges.length, "Should use all ranges when maxDegreeOfParallelism is undefined");
    });
  });

  describe("Complex Continuation Token Scenarios", () => {
    it("should handle continuation token with mixed exhausted and active ranges", async () => {
      const mockRanges = [
        { id: "0", minInclusive: "00", maxExclusive: "AA" },
        { id: "1", minInclusive: "AA", maxExclusive: "BB" },
        { id: "2", minInclusive: "BB", maxExclusive: "FF" },
      ];

      const continuationRanges: MockContinuationRange[] = [
        {
          range: { id: "0", minInclusive: "00", maxExclusive: "AA" },
          continuationToken: undefined, // Exhausted range
        },
        {
          range: { id: "1", minInclusive: "AA", maxExclusive: "BB" },
          continuationToken: "active-token-1",
        },
        {
          range: { id: "2", minInclusive: "BB", maxExclusive: "FF" },
          continuationToken: "active-token-2",
        },
      ];

      const clientContext = setupMockClientContext(mockRanges);
      const options: FeedOptions = { 
        maxItemCount: 10, 
        maxDegreeOfParallelism: 2,
        enableQueryControl: true,
        continuationToken: createParallelQueryContinuationToken(continuationRanges),
      };

      const context = new TestParallelQueryExecutionContext(
        clientContext,
        collectionLink,
        "SELECT * FROM c",
        options,
        createPartitionedQueryExecutionInfo(false),
        correlatedActivityId,
      );

      // Wait for async initialization to complete
      await new Promise(resolve => setTimeout(resolve, 200));

      // Should create producers for all ranges, but only active ones should have continuation tokens
      const totalProducers = context["unfilledDocumentProducersQueue"].size() + 
                            context["bufferedDocumentProducersQueue"].size();
      assert.equal(totalProducers, 3, "Should have exactly 3 producers for 3 ranges");
      
      // Count producers with tokens
      let producersWithTokens = 0;
      const allProducers: DocumentProducer[] = [];
      while (context["unfilledDocumentProducersQueue"].size() > 0) {
        allProducers.push(context["unfilledDocumentProducersQueue"].deq());
      }
      while (context["bufferedDocumentProducersQueue"].size() > 0) {
        allProducers.push(context["bufferedDocumentProducersQueue"].deq());
      }

      for (const producer of allProducers) {
        if (producer.continuationToken) {
          producersWithTokens++;
        }
      }
      
      assert.equal(producersWithTokens, 2, "Should have exactly 2 producers with continuation tokens (active ranges)");
    });

    it("should handle order by continuation token with skipCount and rid", async () => {
      const mockRanges = [{ id: "0", minInclusive: "00", maxExclusive: "FF" }];
      const clientContext = setupMockClientContext(mockRanges);
      
      const orderByToken = createOrderByQueryContinuationToken(
        [{ 
          range: mockRanges[0], 
          continuationToken: "order-by-token" 
        }],
        [{ "name": "test-value" }], // orderByItems
        "test-document-rid", // rid
        5 // skipCount
      );

      const options: FeedOptions = { 
        maxItemCount: 10, 
        maxDegreeOfParallelism: 1,
        enableQueryControl: true,
        continuationToken: orderByToken,
      };

      const context = new TestParallelQueryExecutionContext(
        clientContext,
        collectionLink,
        "SELECT * FROM c ORDER BY c.name ASC",
        options,
        createPartitionedQueryExecutionInfo(true),
        correlatedActivityId,
      );

      await new Promise(resolve => setTimeout(resolve, 200));

      // Should parse ORDER BY specific fields correctly
      const totalProducers = context["unfilledDocumentProducersQueue"].size() + 
                            context["bufferedDocumentProducersQueue"].size();
      assert.equal(totalProducers, 1, "Should have exactly 1 producer for ORDER BY query with single range");
    });

    it("should properly handle filtering conditions in rewritten queries", async () => {
      // Create partitioned query execution info with rewritten query
      const partitionedQueryExecutionInfo = {
        queryRanges: [
          { min: "00", max: "FF", isMinInclusive: true, isMaxInclusive: false },
        ],
        queryInfo: {
          ...createQueryInfo(true),
          rewrittenQuery: "SELECT * FROM c WHERE {documentdb-formattableorderbyquery-filter} ORDER BY c.name ASC",
        },
        partitionedQueryExecutionInfoVersion: 1,
      };

      const clientContext = setupMockClientContext([
        { id: "0", minInclusive: "00", maxExclusive: "FF" }
      ]);

      const options: FeedOptions = { 
        maxItemCount: 10, 
        maxDegreeOfParallelism: 1,
        enableQueryControl: true,
        continuationToken: createOrderByQueryContinuationToken([{
          range: { id: "0", minInclusive: "00", maxExclusive: "FF" },
          continuationToken: "token-with-filter"
        }]),
      };

      const context = new TestParallelQueryExecutionContext(
        clientContext,
        collectionLink,
        "SELECT * FROM c ORDER BY c.name ASC",
        options,
        partitionedQueryExecutionInfo,
        correlatedActivityId,
      );

      // Wait for async initialization to complete
      await new Promise(resolve => setTimeout(resolve, 200));

      // Should handle rewritten query with filter placeholder
      const totalProducers = context["unfilledDocumentProducersQueue"].size() + 
                            context["bufferedDocumentProducersQueue"].size();
      assert.equal(totalProducers, 1, "Should create producer with filtered query");
    });
  });
});
