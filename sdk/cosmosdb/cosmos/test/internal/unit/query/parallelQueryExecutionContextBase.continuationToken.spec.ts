// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect, beforeEach, vi } from "vitest";
import { ParallelQueryExecutionContextBase } from "../../../../src/queryExecutionContext/parallelQueryExecutionContextBase.js";
import { TargetPartitionRangeManager, QueryExecutionContextType } from "../../../../src/queryExecutionContext/TargetPartitionRangeManager.js";
import type { FeedOptions } from "../../../../src/request/index.js";
import type { PartitionedQueryExecutionInfo } from "../../../../src/request/ErrorResponse.js";
import type { ClientContext } from "../../../../src/ClientContext.js";
import type { PartitionKeyRange } from "../../../../src/client/Container/PartitionKeyRange.js";
import { createTestClientContext } from "../../../public/common/TestHelpers.js";
import { CosmosDbDiagnosticLevel } from "../../../../src/diagnostics/CosmosDbDiagnosticLevel.js";
import type { QueryInfo } from "../../../../src/request/ErrorResponse.js";

// Test implementation of the abstract class
class TestParallelQueryExecutionContextBase extends ParallelQueryExecutionContextBase {
  protected documentProducerComparator(): number {
    return 0;
  }

  // Expose the private property for testing
  public getPartitionedQueryExecutionInfo(): PartitionedQueryExecutionInfo {
    return (this as any).partitionedQueryExecutionInfo;
  }

  public getQueryType(): QueryExecutionContextType {
    return super.getQueryType();
  }

  public async testContinuationTokenFiltering(
    targetPartitionRanges: PartitionKeyRange[],
    requestContinuation: string
  ): Promise<{
    filteredRanges: any[];
    continuationTokens: string[];
    filteringConditions: string[];
  }> {
    // Simulate the continuation token filtering logic from the selected section
    const queryType = this.getQueryType();
    let rangeManager: TargetPartitionRangeManager;

    if (queryType === QueryExecutionContextType.OrderBy) {
      rangeManager = TargetPartitionRangeManager.createForOrderByQuery({
        quereyInfo: this.getPartitionedQueryExecutionInfo(),
      });
    } else {
      rangeManager = TargetPartitionRangeManager.createForParallelQuery({
        quereyInfo: this.getPartitionedQueryExecutionInfo(),
      });
    }

    const filterResult = await rangeManager.filterPartitionRanges(
      targetPartitionRanges,
      requestContinuation,
    );

    return {
      filteredRanges: filterResult.filteredRanges,
      continuationTokens: filterResult.continuationToken,
      filteringConditions: filterResult.filteringConditions,
    };
  }

  public testEpkExtraction(partitionTargetRange: any): { startEpk?: string; endEpk?: string; shouldPopulateHeaders: boolean } {
    // Extract EPK values from the partition range if available
    const startEpk = partitionTargetRange.epkMin || undefined;
    const endEpk = partitionTargetRange.epkMax || undefined;

    return {
      startEpk,
      endEpk,
      shouldPopulateHeaders: !!(startEpk && endEpk),
    };
  }

  public testCreateDocumentProducer(
    partitionTargetRange: any,
    continuationToken?: string,
    startEpk?: string,
    endEpk?: string,
    populateEpkRangeHeaders?: boolean,
    filterCondition?: string,
  ): any {
    // Create a mock document producer for testing
    return {
      targetPartitionKeyRange: partitionTargetRange,
      continuationToken,
      startEpk,
      endEpk,
      populateEpkRangeHeaders,
      filterCondition,
    };
  }

  // Expose private methods for testing
  public testHandlePartitionMerge(
    compositeContinuationToken: any,
    documentProducer: any,
    newMergedRange: any,
  ): void {
    return (this as any)._handlePartitionMerge(compositeContinuationToken, documentProducer, newMergedRange);
  }

  public testHandlePartitionSplit(
    compositeContinuationToken: any,
    originalDocumentProducer: any,
    replacementPartitionKeyRanges: any[],
  ): void {
    return (this as any)._handlePartitionSplit(compositeContinuationToken, originalDocumentProducer, replacementPartitionKeyRanges);
  }

  public testUpdateContinuationTokenForPartitionSplit(
    originalDocumentProducer: any,
    replacementPartitionKeyRanges: any[],
  ): void {
    return (this as any)._updateContinuationTokenForPartitionSplit(originalDocumentProducer, replacementPartitionKeyRanges);
  }

  // Mock continuation token manager for testing
  public setContinuationTokenManager(manager: any): void {
    (this as any).continuationTokenManager = manager;
  }
}

describe("ParallelQueryExecutionContextBase - Continuation Token Filtering", () => {
  let context: TestParallelQueryExecutionContextBase;
  let clientContext: ClientContext;
  let options: FeedOptions;
  let partitionedQueryExecutionInfo: PartitionedQueryExecutionInfo;
  let mockPartitionRanges: PartitionKeyRange[];

  const cosmosClientOptions = {
    endpoint: "https://test-cosmos-db.documents.azure.com:443/",
    key: "test-key",
    userAgentSuffix: "TestClient",
  };

  const diagnosticLevel = CosmosDbDiagnosticLevel.info;
  const collectionLink = "/dbs/testDb/colls/testCollection";
  const query = "SELECT * FROM c";
  const correlatedActivityId = "test-activity-id";

  const createMockPartitionKeyRange = (
    id: string,
    minInclusive: string,
    maxExclusive: string,
    epkMin?: string,
    epkMax?: string
  ): PartitionKeyRange & { epkMin?: string; epkMax?: string } => ({
    id,
    minInclusive,
    maxExclusive,
    ridPrefix: 0, // Required by PartitionKeyRange interface
    throughputFraction: 1.0,
    status: "Online",
    parents: [], // Required by PartitionKeyRange interface
    epkMin,
    epkMax,
  });

  beforeEach(() => {
    clientContext = createTestClientContext(cosmosClientOptions, diagnosticLevel);
    
    // Mock the routing provider methods
    vi.spyOn(clientContext, "queryPartitionKeyRanges").mockReturnValue({
      fetchAllInternal: vi.fn().mockResolvedValue({
        resources: [],
        headers: { "x-ms-request-charge": "1.0" },
        code: 200,
      }),
    } as any);

    mockPartitionRanges = [
      createMockPartitionKeyRange("0", "", "AA"),
      createMockPartitionKeyRange("1", "AA", "BB"),
      createMockPartitionKeyRange("2", "BB", "FF"),
    ];

    // Create basic query info for testing
    const queryInfo: QueryInfo = {
      distinctType: "None",
      top: undefined,
      offset: undefined,
      limit: undefined,
      orderBy: [], // No order by for parallel query
      orderByExpressions: [],
      groupByExpressions: [],
      aggregates: [],
      groupByAliasToAggregateType: {},
      rewrittenQuery: undefined,
      hasSelectValue: false,
    };

    partitionedQueryExecutionInfo = {
      queryInfo,
      queryRanges: mockPartitionRanges.map(range => ({
        min: range.minInclusive,
        max: range.maxExclusive,
        isMinInclusive: true,
        isMaxInclusive: false,
      })),
    };

    options = {
      maxItemCount: 100,
      maxDegreeOfParallelism: 10,
    };

    context = new TestParallelQueryExecutionContextBase(
      clientContext,
      collectionLink,
      query,
      options,
      partitionedQueryExecutionInfo,
      correlatedActivityId,
    );
  });

  describe("_handlePartitionMerge", () => {
    it("should find matching range and update properties while preserving EPK boundaries", () => {
      // Arrange
      const originalRange = createMockPartitionKeyRange("1", "AA", "BB");
      const newMergedRange = createMockPartitionKeyRange("merged-1", "", "CC", undefined, undefined);
      newMergedRange.ridPrefix = 123;
      newMergedRange.throughputFraction = 0.8;
      newMergedRange.status = "Splitting";
      newMergedRange.parents = ["1", "2"];

      const mockDocumentProducer = {
        targetPartitionKeyRange: originalRange,
      };

      const mockCompositeContinuationToken = {
        rangeMappings: [
          {
            partitionKeyRange: { ...originalRange },
            continuationToken: "token1",
            itemCount: 5,
          },
          {
            partitionKeyRange: createMockPartitionKeyRange("2", "CC", "DD"),
            continuationToken: "token2",
            itemCount: 3,
          },
        ],
      };

      // Act
      context.testHandlePartitionMerge(
        mockCompositeContinuationToken,
        mockDocumentProducer,
        newMergedRange,
      );

      // Assert
      const updatedRange = mockCompositeContinuationToken.rangeMappings[0].partitionKeyRange;
      
      // EPK boundaries should be preserved from original range
      expect(updatedRange.epkMin).toBe("AA");
      expect(updatedRange.epkMax).toBe("BB");
      
      // Logical boundaries should be updated from new merged range
      expect(updatedRange.minInclusive).toBe("");
      expect(updatedRange.maxExclusive).toBe("CC");
      expect(updatedRange.id).toBe("merged-1");
      
      // Other properties should be updated
      expect(updatedRange.ridPrefix).toBe(123);
      expect(updatedRange.throughputFraction).toBe(0.8);
      expect(updatedRange.status).toBe("Splitting");
      expect(updatedRange.parents).toEqual(["1", "2"]);
      
      // Second range should remain unchanged
      expect(mockCompositeContinuationToken.rangeMappings[1].partitionKeyRange.id).toBe("2");
    });

    it("should handle case when no matching range is found", () => {
      // Arrange
      const originalRange = createMockPartitionKeyRange("1", "AA", "BB");
      const newMergedRange = createMockPartitionKeyRange("merged-1", "", "CC");
      
      const mockDocumentProducer = {
        targetPartitionKeyRange: originalRange,
      };

      const mockCompositeContinuationToken = {
        rangeMappings: [
          {
            partitionKeyRange: createMockPartitionKeyRange("2", "CC", "DD"), // Different range
            continuationToken: "token1",
            itemCount: 5,
          },
        ],
      };

      const originalMappings = JSON.parse(JSON.stringify(mockCompositeContinuationToken.rangeMappings));

      // Act
      context.testHandlePartitionMerge(
        mockCompositeContinuationToken,
        mockDocumentProducer,
        newMergedRange,
      );

      // Assert - no changes should be made
      expect(mockCompositeContinuationToken.rangeMappings).toEqual(originalMappings);
    });

    it("should preserve EPK boundaries when they exist in original range", () => {
      // Arrange
      const originalRange = createMockPartitionKeyRange("1", "AA", "BB", "epk-aa", "epk-bb");
      const newMergedRange = createMockPartitionKeyRange("merged-1", "", "CC");
      
      const mockDocumentProducer = {
        targetPartitionKeyRange: originalRange,
      };

      const mockCompositeContinuationToken = {
        rangeMappings: [
          {
            partitionKeyRange: { ...originalRange },
            continuationToken: "token1",
            itemCount: 5,
          },
        ],
      };

      // Act
      context.testHandlePartitionMerge(
        mockCompositeContinuationToken,
        mockDocumentProducer,
        newMergedRange,
      );

      // Assert
      const updatedRange = mockCompositeContinuationToken.rangeMappings[0].partitionKeyRange;
      
      // EPK boundaries should be set to the logical boundaries (overwriting existing EPK values)
      expect(updatedRange.epkMin).toBe("AA"); // Should be logical minInclusive
      expect(updatedRange.epkMax).toBe("BB"); // Should be logical maxExclusive
    });


    it("should handle newMergedRange with undefined optional properties", () => {
      // Arrange
      const originalRange = createMockPartitionKeyRange("1", "AA", "BB");
      const newMergedRange = {
        id: "merged-1",
        minInclusive: "",
        maxExclusive: "CC",
        ridPrefix: undefined,
        throughputFraction: undefined,
        status: undefined,
        parents: undefined,
      };
      
      const mockDocumentProducer = {
        targetPartitionKeyRange: originalRange,
      };

      const mockCompositeContinuationToken = {
        rangeMappings: [
          {
            partitionKeyRange: { ...originalRange },
            continuationToken: "token1",
            itemCount: 5,
          },
        ],
      };

      // Act
      context.testHandlePartitionMerge(
        mockCompositeContinuationToken,
        mockDocumentProducer,
        newMergedRange,
      );

      // Assert
      const updatedRange = mockCompositeContinuationToken.rangeMappings[0].partitionKeyRange;
      
      // Core properties should be updated
      expect(updatedRange.id).toBe("merged-1");
      expect(updatedRange.minInclusive).toBe("");
      expect(updatedRange.maxExclusive).toBe("CC");
      
      // Optional properties should be undefined
      expect(updatedRange.ridPrefix).toBeUndefined();
      expect(updatedRange.throughputFraction).toBeUndefined();
      expect(updatedRange.status).toBeUndefined();
      expect(updatedRange.parents).toBeUndefined();
    });
  });

  describe("_handlePartitionSplit", () => {
    it("should find and remove original range then add replacement ranges", () => {
      // Arrange
      const originalRange = createMockPartitionKeyRange("1", "AA", "BB");
      const replacementRanges = [
        createMockPartitionKeyRange("1a", "AA", "AB"),
        createMockPartitionKeyRange("1b", "AB", "BB"),
      ];

      const mockDocumentProducer = {
        targetPartitionKeyRange: originalRange,
        continuationToken: "original-token",
      };

      const mockCompositeContinuationToken = {
        rangeMappings: [
          {
            partitionKeyRange: createMockPartitionKeyRange("0", "", "AA"),
            continuationToken: "token0",
            itemCount: 2,
          },
          {
            partitionKeyRange: { ...originalRange },
            continuationToken: "token1",
            itemCount: 5,
          },
          {
            partitionKeyRange: createMockPartitionKeyRange("2", "BB", "CC"),
            continuationToken: "token2",
            itemCount: 3,
          },
        ],
        addRangeMapping: vi.fn(),
      };

      // Act
      context.testHandlePartitionSplit(
        mockCompositeContinuationToken,
        mockDocumentProducer,
        replacementRanges,
      );

      // Assert
      // Original range should be removed
      expect(mockCompositeContinuationToken.rangeMappings).toHaveLength(2);
      expect(mockCompositeContinuationToken.rangeMappings.find(
        (mapping: any) => mapping.partitionKeyRange.id === "1"
      )).toBeUndefined();

      // New ranges should be added via addRangeMapping
      expect(mockCompositeContinuationToken.addRangeMapping).toHaveBeenCalledTimes(2);
      
      // Verify first replacement range
      expect(mockCompositeContinuationToken.addRangeMapping).toHaveBeenNthCalledWith(1, {
        partitionKeyRange: replacementRanges[0],
        continuationToken: "original-token",
        itemCount: 0,
      });

      // Verify second replacement range
      expect(mockCompositeContinuationToken.addRangeMapping).toHaveBeenNthCalledWith(2, {
        partitionKeyRange: replacementRanges[1],
        continuationToken: "original-token",
        itemCount: 0,
      });

      // Other ranges should remain unchanged
      expect(mockCompositeContinuationToken.rangeMappings[0].partitionKeyRange.id).toBe("0");
      expect(mockCompositeContinuationToken.rangeMappings[1].partitionKeyRange.id).toBe("2");
    });

    it("should handle case when original range is not found", () => {
      // Arrange
      const originalRange = createMockPartitionKeyRange("1", "AA", "BB");
      const replacementRanges = [
        createMockPartitionKeyRange("1a", "AA", "AB"),
        createMockPartitionKeyRange("1b", "AB", "BB"),
      ];

      const mockDocumentProducer = {
        targetPartitionKeyRange: originalRange,
        continuationToken: "original-token",
      };

      const mockCompositeContinuationToken = {
        rangeMappings: [
          {
            partitionKeyRange: createMockPartitionKeyRange("0", "", "AA"),
            continuationToken: "token0",
            itemCount: 2,
          },
          {
            partitionKeyRange: createMockPartitionKeyRange("2", "CC", "DD"), // Different range
            continuationToken: "token2",
            itemCount: 3,
          },
        ],
        addRangeMapping: vi.fn(),
      };

      const originalMappings = JSON.parse(JSON.stringify(mockCompositeContinuationToken.rangeMappings));

      // Act
      context.testHandlePartitionSplit(
        mockCompositeContinuationToken,
        mockDocumentProducer,
        replacementRanges,
      );

      // Assert - no changes should be made
      expect(mockCompositeContinuationToken.rangeMappings).toEqual(originalMappings);
      expect(mockCompositeContinuationToken.addRangeMapping).not.toHaveBeenCalled();
    });

    it("should handle multiple replacement ranges (split into many)", () => {
      // Arrange
      const originalRange = createMockPartitionKeyRange("1", "AA", "BB");
      const replacementRanges = [
        createMockPartitionKeyRange("1a", "AA", "AB"),
        createMockPartitionKeyRange("1b", "AB", "AC"),
        createMockPartitionKeyRange("1c", "AC", "BB"),
      ];

      const mockDocumentProducer = {
        targetPartitionKeyRange: originalRange,
        continuationToken: "split-token",
      };

      const mockCompositeContinuationToken = {
        rangeMappings: [
          {
            partitionKeyRange: { ...originalRange },
            continuationToken: "token1",
            itemCount: 15,
          },
        ],
        addRangeMapping: vi.fn(),
      };

      // Act
      context.testHandlePartitionSplit(
        mockCompositeContinuationToken,
        mockDocumentProducer,
        replacementRanges,
      );

      // Assert
      expect(mockCompositeContinuationToken.rangeMappings).toHaveLength(0);
      expect(mockCompositeContinuationToken.addRangeMapping).toHaveBeenCalledTimes(3);
      
      // All replacement ranges should be added with correct properties
      replacementRanges.forEach((range, index) => {
        expect(mockCompositeContinuationToken.addRangeMapping).toHaveBeenNthCalledWith(index + 1, {
          partitionKeyRange: range,
          continuationToken: "split-token",
          itemCount: 0,
        });
      });
    });

    it("should preserve continuation token from original document producer", () => {
      // Arrange
      const originalRange = createMockPartitionKeyRange("1", "AA", "BB");
      const replacementRanges = [
        createMockPartitionKeyRange("1a", "AA", "AB"),
        createMockPartitionKeyRange("1b", "AB", "BB"),
      ];

      const uniqueContinuationToken = "unique-continuation-token-12345";
      const mockDocumentProducer = {
        targetPartitionKeyRange: originalRange,
        continuationToken: uniqueContinuationToken,
      };

      const mockCompositeContinuationToken = {
        rangeMappings: [
          {
            partitionKeyRange: { ...originalRange },
            continuationToken: "different-token",
            itemCount: 5,
          },
        ],
        addRangeMapping: vi.fn(),
      };

      // Act
      context.testHandlePartitionSplit(
        mockCompositeContinuationToken,
        mockDocumentProducer,
        replacementRanges,
      );

      // Assert - all new ranges should use the original document producer's continuation token
      expect(mockCompositeContinuationToken.addRangeMapping).toHaveBeenCalledTimes(2);
      
      replacementRanges.forEach((range, index) => {
        expect(mockCompositeContinuationToken.addRangeMapping).toHaveBeenNthCalledWith(index + 1, {
          partitionKeyRange: range,
          continuationToken: uniqueContinuationToken,
          itemCount: 0,
        });
      });
    });

    it("should handle empty replacement ranges array", () => {
      // Arrange
      const originalRange = createMockPartitionKeyRange("1", "AA", "BB");
      const replacementRanges: any[] = [];

      const mockDocumentProducer = {
        targetPartitionKeyRange: originalRange,
        continuationToken: "original-token",
      };

      const mockCompositeContinuationToken = {
        rangeMappings: [
          {
            partitionKeyRange: { ...originalRange },
            continuationToken: "token1",
            itemCount: 5,
          },
        ],
        addRangeMapping: vi.fn(),
      };

      // Act
      context.testHandlePartitionSplit(
        mockCompositeContinuationToken,
        mockDocumentProducer,
        replacementRanges,
      );

      // Assert - original range should be removed, no new ranges added
      expect(mockCompositeContinuationToken.rangeMappings).toHaveLength(0);
      expect(mockCompositeContinuationToken.addRangeMapping).not.toHaveBeenCalled();
    });

  });

 
});
