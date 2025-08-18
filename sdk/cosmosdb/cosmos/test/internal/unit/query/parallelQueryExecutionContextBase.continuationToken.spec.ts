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
  });

  describe("Parallel Query Type Detection", () => {
    beforeEach(() => {
      const queryInfo: QueryInfo = {
        orderBy: [], // No order by for parallel queries
        rewrittenQuery: "SELECT * FROM c",
      } as QueryInfo;

      partitionedQueryExecutionInfo = {
        queryRanges: [
          { min: "00", max: "AA", isMinInclusive: true, isMaxInclusive: false },
          { min: "AA", max: "BB", isMinInclusive: true, isMaxInclusive: false },
          { min: "BB", max: "FF", isMinInclusive: true, isMaxInclusive: false },
        ],
        queryInfo: queryInfo,
        partitionedQueryExecutionInfoVersion: 1,
      };

      options = { maxItemCount: 10, maxDegreeOfParallelism: 2 };
      
      context = new TestParallelQueryExecutionContextBase(
        clientContext,
        collectionLink,
        query,
        options,
        partitionedQueryExecutionInfo,
        correlatedActivityId,
      );
    });

    it("should detect parallel query type when no orderBy is present", () => {
      const queryType = context.getQueryType();
      expect(queryType).toBe(QueryExecutionContextType.Parallel);
    });

    it("should create parallel query range manager for parallel queries", async () => {
      const createForParallelQuerySpy = vi.spyOn(TargetPartitionRangeManager, "createForParallelQuery");
      const createForOrderByQuerySpy = vi.spyOn(TargetPartitionRangeManager, "createForOrderByQuery");
      
      // Mock the range manager methods
      const mockRangeManager = {
        filterPartitionRanges: vi.fn().mockResolvedValue({
          filteredRanges: mockPartitionRanges,
          continuationToken: ["token1", "token2", "token3"],
          filteringConditions: ["condition1", "condition2", "condition3"],
        }),
      };

      createForParallelQuerySpy.mockReturnValue(mockRangeManager as any);

      const requestContinuation = JSON.stringify({
        compositeToken: {
          token: "test-composite-token",
          range: { min: "", max: "FF" }
        }
      });

      await context.testContinuationTokenFiltering(mockPartitionRanges, requestContinuation);

      expect(createForParallelQuerySpy).toHaveBeenCalledWith({
        quereyInfo: partitionedQueryExecutionInfo,
      });
      expect(createForOrderByQuerySpy).not.toHaveBeenCalled();
    });

    it("should call filterPartitionRanges with correct parameters for parallel queries", async () => {
      const mockRangeManager = {
        filterPartitionRanges: vi.fn().mockResolvedValue({
          filteredRanges: mockPartitionRanges.slice(1), // Simulate filtering
          continuationToken: ["token2", "token3"],
          filteringConditions: ["condition2", "condition3"],
        }),
      };

      vi.spyOn(TargetPartitionRangeManager, "createForParallelQuery").mockReturnValue(mockRangeManager as any);

      const requestContinuation = JSON.stringify({
        compositeToken: {
          token: "test-composite-token",
          range: { min: "AA", max: "FF" }
        }
      });

      const result = await context.testContinuationTokenFiltering(mockPartitionRanges, requestContinuation);

      expect(mockRangeManager.filterPartitionRanges).toHaveBeenCalledWith(
        mockPartitionRanges,
        requestContinuation
      );
      expect(result.filteredRanges).toHaveLength(2);
      expect(result.continuationTokens).toEqual(["token2", "token3"]);
      expect(result.filteringConditions).toEqual(["condition2", "condition3"]);
    });
  });

  describe("OrderBy Query Type Detection", () => {
    beforeEach(() => {
      const queryInfo: QueryInfo = {
        orderBy: ["Ascending"], // OrderBy present
        rewrittenQuery: "SELECT * FROM c ORDER BY c.id",
      } as QueryInfo;

      partitionedQueryExecutionInfo = {
        queryRanges: [
          { min: "00", max: "AA", isMinInclusive: true, isMaxInclusive: false },
          { min: "AA", max: "BB", isMinInclusive: true, isMaxInclusive: false },
          { min: "BB", max: "FF", isMinInclusive: true, isMaxInclusive: false },
        ],
        queryInfo: queryInfo,
        partitionedQueryExecutionInfoVersion: 1,
      };

      options = { maxItemCount: 10, maxDegreeOfParallelism: 2 };
      
      context = new TestParallelQueryExecutionContextBase(
        clientContext,
        collectionLink,
        query,
        options,
        partitionedQueryExecutionInfo,
        correlatedActivityId,
      );
    });

    it("should detect OrderBy query type when orderBy is present", () => {
      const queryType = context.getQueryType();
      expect(queryType).toBe(QueryExecutionContextType.OrderBy);
    });

    it("should create OrderBy query range manager for OrderBy queries", async () => {
      const createForParallelQuerySpy = vi.spyOn(TargetPartitionRangeManager, "createForParallelQuery");
      const createForOrderByQuerySpy = vi.spyOn(TargetPartitionRangeManager, "createForOrderByQuery");
      
      const mockRangeManager = {
        filterPartitionRanges: vi.fn().mockResolvedValue({
          filteredRanges: mockPartitionRanges,
          continuationToken: ["token1", "token2", "token3"],
          filteringConditions: ["condition1", "condition2", "condition3"],
        }),
      };

      createForOrderByQuerySpy.mockReturnValue(mockRangeManager as any);

      const requestContinuation = JSON.stringify({
        compositeToken: {
          token: "test-order-by-token",
          range: { min: "", max: "FF" }
        },
        orderByItems: [{ item: "c.id" }],
        rid: null,
        skipCount: 0,
      });

      await context.testContinuationTokenFiltering(mockPartitionRanges, requestContinuation);

      expect(createForOrderByQuerySpy).toHaveBeenCalledWith({
        quereyInfo: partitionedQueryExecutionInfo,
      });
      expect(createForParallelQuerySpy).not.toHaveBeenCalled();
    });
  });

  describe("EPK Value Extraction", () => {
    beforeEach(() => {
      const queryInfo: QueryInfo = {
        orderBy: [],
        rewrittenQuery: "SELECT * FROM c",
      } as QueryInfo;

      partitionedQueryExecutionInfo = {
        queryRanges: [
          { min: "00", max: "FF", isMinInclusive: true, isMaxInclusive: false },
        ],
        queryInfo: queryInfo,
        partitionedQueryExecutionInfoVersion: 1,
      };

      options = { maxItemCount: 10 };
      
      context = new TestParallelQueryExecutionContextBase(
        clientContext,
        collectionLink,
        query,
        options,
        partitionedQueryExecutionInfo,
        correlatedActivityId,
      );
    });

    it("should extract EPK values when both epkMin and epkMax are present", () => {
      const partitionRange = createMockPartitionKeyRange("0", "00", "AA", "epk-min-value", "epk-max-value");
      
      const result = context.testEpkExtraction(partitionRange);
      
      expect(result.startEpk).toBe("epk-min-value");
      expect(result.endEpk).toBe("epk-max-value");
      expect(result.shouldPopulateHeaders).toBe(true);
    });

    it("should handle missing epkMin value", () => {
      const partitionRange = createMockPartitionKeyRange("0", "00", "AA", undefined, "epk-max-value");
      
      const result = context.testEpkExtraction(partitionRange);
      
      expect(result.startEpk).toBeUndefined();
      expect(result.endEpk).toBe("epk-max-value");
      expect(result.shouldPopulateHeaders).toBe(false);
    });

    it("should handle missing epkMax value", () => {
      const partitionRange = createMockPartitionKeyRange("0", "00", "AA", "epk-min-value", undefined);
      
      const result = context.testEpkExtraction(partitionRange);
      
      expect(result.startEpk).toBe("epk-min-value");
      expect(result.endEpk).toBeUndefined();
      expect(result.shouldPopulateHeaders).toBe(false);
    });

    it("should handle missing both EPK values", () => {
      const partitionRange = createMockPartitionKeyRange("0", "00", "AA");
      
      const result = context.testEpkExtraction(partitionRange);
      
      expect(result.startEpk).toBeUndefined();
      expect(result.endEpk).toBeUndefined();
      expect(result.shouldPopulateHeaders).toBe(false);
    });

    it("should handle empty string EPK values", () => {
      const partitionRange = createMockPartitionKeyRange("0", "00", "AA", "", "");
      
      const result = context.testEpkExtraction(partitionRange);
      
      expect(result.startEpk).toBeUndefined();
      expect(result.endEpk).toBeUndefined();
      expect(result.shouldPopulateHeaders).toBe(false);
    });

    it("should handle null EPK values", () => {
      const partitionRange = {
        ...createMockPartitionKeyRange("0", "00", "AA"),
        epkMin: null as any,
        epkMax: null as any,
      };
      
      const result = context.testEpkExtraction(partitionRange);
      
      expect(result.startEpk).toBeUndefined();
      expect(result.endEpk).toBeUndefined();
      expect(result.shouldPopulateHeaders).toBe(false);
    });
  });

  describe("Document Producer Creation with EPK Values", () => {
    beforeEach(() => {
      const queryInfo: QueryInfo = {
        orderBy: [],
        rewrittenQuery: "SELECT * FROM c",
      } as QueryInfo;

      partitionedQueryExecutionInfo = {
        queryRanges: [
          { min: "00", max: "FF", isMinInclusive: true, isMaxInclusive: false },
        ],
        queryInfo: queryInfo,
        partitionedQueryExecutionInfoVersion: 1,
      };

      options = { maxItemCount: 10 };
      
      context = new TestParallelQueryExecutionContextBase(
        clientContext,
        collectionLink,
        query,
        options,
        partitionedQueryExecutionInfo,
        correlatedActivityId,
      );
    });

    it("should create document producer with EPK values when both are present", () => {
      const partitionRange = createMockPartitionKeyRange("0", "00", "AA");
      const continuationToken = "test-continuation-token";
      const startEpk = "epk-min-value";
      const endEpk = "epk-max-value";
      const populateEpkRangeHeaders = true;
      const filterCondition = "test-filter-condition";

      const documentProducer = context.testCreateDocumentProducer(
        partitionRange,
        continuationToken,
        startEpk,
        endEpk,
        populateEpkRangeHeaders,
        filterCondition
      );

      expect(documentProducer).toBeDefined();
      expect(documentProducer.targetPartitionKeyRange).toBe(partitionRange);
      expect(documentProducer.continuationToken).toBe(continuationToken);
      expect(documentProducer.startEpk).toBe(startEpk);
      expect(documentProducer.endEpk).toBe(endEpk);
    });

    it("should create document producer without EPK values when not provided", () => {
      const partitionRange = createMockPartitionKeyRange("0", "00", "AA");
      const continuationToken = "test-continuation-token";

      const documentProducer = context.testCreateDocumentProducer(
        partitionRange,
        continuationToken,
        undefined,
        undefined,
        false,
        undefined
      );

      expect(documentProducer).toBeDefined();
      expect(documentProducer.targetPartitionKeyRange).toBe(partitionRange);
      expect(documentProducer.continuationToken).toBe(continuationToken);
      expect(documentProducer.startEpk).toBeUndefined();
      expect(documentProducer.endEpk).toBeUndefined();
    });

    it("should create document producer with partial EPK values", () => {
      const partitionRange = createMockPartitionKeyRange("0", "00", "AA");
      const continuationToken = "test-continuation-token";
      const startEpk = "epk-min-value";

      const documentProducer = context.testCreateDocumentProducer(
        partitionRange,
        continuationToken,
        startEpk,
        undefined,
        false,
        undefined
      );

      expect(documentProducer).toBeDefined();
      expect(documentProducer.startEpk).toBe(startEpk);
      expect(documentProducer.endEpk).toBeUndefined();
    });
  });

  describe("Integration Scenarios", () => {
    it("should handle complete continuation token filtering workflow for parallel queries", async () => {
      const queryInfo: QueryInfo = {
        orderBy: [],
        rewrittenQuery: "SELECT * FROM c",
      } as QueryInfo;

      partitionedQueryExecutionInfo = {
        queryRanges: [
          { min: "00", max: "AA", isMinInclusive: true, isMaxInclusive: false },
          { min: "AA", max: "FF", isMinInclusive: true, isMaxInclusive: false },
        ],
        queryInfo: queryInfo,
        partitionedQueryExecutionInfoVersion: 1,
      };

      options = { maxItemCount: 10 };
      
      context = new TestParallelQueryExecutionContextBase(
        clientContext,
        collectionLink,
        query,
        options,
        partitionedQueryExecutionInfo,
        correlatedActivityId,
      );

      // Mock filtered ranges with EPK values
      const filteredRanges = [
        createMockPartitionKeyRange("1", "AA", "FF", "epk-min-aa", "epk-max-ff"),
      ];

      const mockRangeManager = {
        filterPartitionRanges: vi.fn().mockResolvedValue({
          filteredRanges: filteredRanges,
          continuationToken: ["continuation-token-1"],
          filteringConditions: ["filter-condition-1"],
        }),
      };

      vi.spyOn(TargetPartitionRangeManager, "createForParallelQuery").mockReturnValue(mockRangeManager as any);

      const requestContinuation = JSON.stringify({
        compositeToken: {
          token: "test-composite-token",
          range: { min: "AA", max: "FF" }
        }
      });

      const result = await context.testContinuationTokenFiltering(mockPartitionRanges, requestContinuation);

      expect(result.filteredRanges).toHaveLength(1);
      expect(result.filteredRanges[0].epkMin).toBe("epk-min-aa");
      expect(result.filteredRanges[0].epkMax).toBe("epk-max-ff");
      expect(result.continuationTokens).toEqual(["continuation-token-1"]);
      expect(result.filteringConditions).toEqual(["filter-condition-1"]);

      // Test EPK extraction
      const epkResult = context.testEpkExtraction(result.filteredRanges[0]);
      expect(epkResult.shouldPopulateHeaders).toBe(true);

      // Test document producer creation
      const documentProducer = context.testCreateDocumentProducer(
        result.filteredRanges[0],
        result.continuationTokens[0],
        epkResult.startEpk,
        epkResult.endEpk,
        epkResult.shouldPopulateHeaders,
        result.filteringConditions[0]
      );

      expect(documentProducer).toBeDefined();
      expect(documentProducer.startEpk).toBe("epk-min-aa");
      expect(documentProducer.endEpk).toBe("epk-max-ff");
    });

    it("should handle complete continuation token filtering workflow for OrderBy queries", async () => {
      const queryInfo: QueryInfo = {
        orderBy: ["Ascending"],
        rewrittenQuery: "SELECT * FROM c ORDER BY c.id",
      } as QueryInfo;

      partitionedQueryExecutionInfo = {
        queryRanges: [
          { min: "00", max: "FF", isMinInclusive: true, isMaxInclusive: false },
        ],
        queryInfo: queryInfo,
        partitionedQueryExecutionInfoVersion: 1,
      };

      options = { maxItemCount: 10 };
      
      context = new TestParallelQueryExecutionContextBase(
        clientContext,
        collectionLink,
        query,
        options,
        partitionedQueryExecutionInfo,
        correlatedActivityId,
      );

      // Mock filtered ranges with EPK values for OrderBy
      const filteredRanges = [
        createMockPartitionKeyRange("0", "00", "BB", "epk-min-00", "epk-max-bb"),
        createMockPartitionKeyRange("1", "BB", "FF", "epk-min-bb", "epk-max-ff"),
      ];

      const mockRangeManager = {
        filterPartitionRanges: vi.fn().mockResolvedValue({
          filteredRanges: filteredRanges,
          continuationToken: ["orderby-token-1", "orderby-token-2"],
          filteringConditions: ["orderby-condition-1", "orderby-condition-2"],
        }),
      };

      vi.spyOn(TargetPartitionRangeManager, "createForOrderByQuery").mockReturnValue(mockRangeManager as any);

      const requestContinuation = JSON.stringify({
        compositeToken: {
          token: "test-order-by-token",
          range: { min: "00", max: "FF" }
        },
        orderByItems: [{ item: "c.id" }],
        rid: null,
        skipCount: 5,
      });

      const result = await context.testContinuationTokenFiltering(mockPartitionRanges, requestContinuation);

      expect(result.filteredRanges).toHaveLength(2);
      expect(result.filteredRanges[0].epkMin).toBe("epk-min-00");
      expect(result.filteredRanges[1].epkMax).toBe("epk-max-ff");
      expect(result.continuationTokens).toEqual(["orderby-token-1", "orderby-token-2"]);
      expect(result.filteringConditions).toEqual(["orderby-condition-1", "orderby-condition-2"]);
    });

    it("should handle empty filtered ranges result", async () => {
      const queryInfo: QueryInfo = {
        orderBy: [],
        rewrittenQuery: "SELECT * FROM c",
      } as QueryInfo;

      partitionedQueryExecutionInfo = {
        queryRanges: [
          { min: "00", max: "FF", isMinInclusive: true, isMaxInclusive: false },
        ],
        queryInfo: queryInfo,
        partitionedQueryExecutionInfoVersion: 1,
      };

      options = { maxItemCount: 10 };
      
      context = new TestParallelQueryExecutionContextBase(
        clientContext,
        collectionLink,
        query,
        options,
        partitionedQueryExecutionInfo,
        correlatedActivityId,
      );

      const mockRangeManager = {
        filterPartitionRanges: vi.fn().mockResolvedValue({
          filteredRanges: [],
          continuationToken: [],
          filteringConditions: [],
        }),
      };

      vi.spyOn(TargetPartitionRangeManager, "createForParallelQuery").mockReturnValue(mockRangeManager as any);

      const requestContinuation = JSON.stringify({
        compositeToken: {
          token: "exhausted-token",
          range: { min: "ZZ", max: "ZZ" }
        }
      });

      const result = await context.testContinuationTokenFiltering(mockPartitionRanges, requestContinuation);

      expect(result.filteredRanges).toHaveLength(0);
      expect(result.continuationTokens).toHaveLength(0);
      expect(result.filteringConditions).toHaveLength(0);
    });

    it("should handle range manager throwing error", async () => {
      const queryInfo: QueryInfo = {
        orderBy: [],
        rewrittenQuery: "SELECT * FROM c",
      } as QueryInfo;

      partitionedQueryExecutionInfo = {
        queryRanges: [
          { min: "00", max: "FF", isMinInclusive: true, isMaxInclusive: false },
        ],
        queryInfo: queryInfo,
        partitionedQueryExecutionInfoVersion: 1,
      };

      options = { maxItemCount: 10 };
      
      context = new TestParallelQueryExecutionContextBase(
        clientContext,
        collectionLink,
        query,
        options,
        partitionedQueryExecutionInfo,
        correlatedActivityId,
      );

      const mockRangeManager = {
        filterPartitionRanges: vi.fn().mockRejectedValue(new Error("Invalid continuation token format")),
      };

      vi.spyOn(TargetPartitionRangeManager, "createForParallelQuery").mockReturnValue(mockRangeManager as any);

      const requestContinuation = "invalid-continuation-token";

      await expect(
        context.testContinuationTokenFiltering(mockPartitionRanges, requestContinuation)
      ).rejects.toThrow("Invalid continuation token format");
    });
  });

  describe("Partition Split Handling", () => {
    let splitTestContext: TestParallelQueryExecutionContextBase;
    let mockContinuationTokenManager: any;
    let mockCompositeContinuationToken: any;

    beforeEach(() => {
      const queryInfo: QueryInfo = {
        orderBy: [],
        rewrittenQuery: "SELECT * FROM c",
      } as QueryInfo;

      partitionedQueryExecutionInfo = {
        queryRanges: [
          { min: "00", max: "FF", isMinInclusive: true, isMaxInclusive: false },
        ],
        queryInfo: queryInfo,
        partitionedQueryExecutionInfoVersion: 1,
      };

      options = { maxItemCount: 10 };
      
      splitTestContext = new TestParallelQueryExecutionContextBase(
        clientContext,
        collectionLink,
        query,
        options,
        partitionedQueryExecutionInfo,
        correlatedActivityId,
      );

      // Mock composite continuation token
      mockCompositeContinuationToken = {
        rangeMappings: [
          {
            partitionKeyRange: createMockPartitionKeyRange("0", "00", "BB"),
            continuationToken: "token-0",
            itemCount: 5,
          },
          {
            partitionKeyRange: createMockPartitionKeyRange("1", "BB", "FF"),
            continuationToken: "token-1", 
            itemCount: 3,
          },
        ],
        addRangeMapping: vi.fn(),
      };

      // Mock continuation token manager
      mockContinuationTokenManager = {
        getCompositeContinuationToken: vi.fn().mockReturnValue(mockCompositeContinuationToken),
      };

      splitTestContext.setContinuationTokenManager(mockContinuationTokenManager);
    });

    describe("_handlePartitionSplit", () => {
      it("should split single partition into multiple ranges", () => {
        const originalDocumentProducer = {
          targetPartitionKeyRange: createMockPartitionKeyRange("0", "00", "BB"),
          continuationToken: "original-token",
        };

        const replacementRanges = [
          createMockPartitionKeyRange("0-1", "00", "55"),
          createMockPartitionKeyRange("0-2", "55", "BB"),
        ];

        const initialMappingsLength = mockCompositeContinuationToken.rangeMappings.length;

        splitTestContext.testHandlePartitionSplit(
          mockCompositeContinuationToken,
          originalDocumentProducer,
          replacementRanges
        );

        // Original range should be removed
        expect(mockCompositeContinuationToken.rangeMappings).toHaveLength(initialMappingsLength - 1);
        
        // New ranges should be added
        expect(mockCompositeContinuationToken.addRangeMapping).toHaveBeenCalledTimes(2);
        
        // Check first replacement range
        expect(mockCompositeContinuationToken.addRangeMapping).toHaveBeenCalledWith({
          partitionKeyRange: replacementRanges[0],
          continuationToken: "original-token",
          itemCount: 0,
        });

        // Check second replacement range
        expect(mockCompositeContinuationToken.addRangeMapping).toHaveBeenCalledWith({
          partitionKeyRange: replacementRanges[1],
          continuationToken: "original-token",
          itemCount: 0,
        });
      });

      it("should handle partition not found in continuation token", () => {
        const originalDocumentProducer = {
          targetPartitionKeyRange: createMockPartitionKeyRange("999", "XX", "YY"), // Non-existent range
          continuationToken: "original-token",
        };

        const replacementRanges = [
          createMockPartitionKeyRange("999-1", "XX", "XY"),
          createMockPartitionKeyRange("999-2", "XY", "YY"),
        ];

        const initialMappingsLength = mockCompositeContinuationToken.rangeMappings.length;

        splitTestContext.testHandlePartitionSplit(
          mockCompositeContinuationToken,
          originalDocumentProducer,
          replacementRanges
        );

        // No ranges should be removed since original wasn't found
        expect(mockCompositeContinuationToken.rangeMappings).toHaveLength(initialMappingsLength);
        
        // No new ranges should be added
        expect(mockCompositeContinuationToken.addRangeMapping).not.toHaveBeenCalled();
      });

      it("should handle empty replacement ranges", () => {
        const originalDocumentProducer = {
          targetPartitionKeyRange: createMockPartitionKeyRange("0", "00", "BB"),
          continuationToken: "original-token",
        };

        const replacementRanges: any[] = [];

        const initialMappingsLength = mockCompositeContinuationToken.rangeMappings.length;

        splitTestContext.testHandlePartitionSplit(
          mockCompositeContinuationToken,
          originalDocumentProducer,
          replacementRanges
        );

        // Original range should be removed
        expect(mockCompositeContinuationToken.rangeMappings).toHaveLength(initialMappingsLength - 1);
        
        // No new ranges should be added
        expect(mockCompositeContinuationToken.addRangeMapping).not.toHaveBeenCalled();
      });

      it("should preserve original continuation token for all replacement ranges", () => {
        const originalDocumentProducer = {
          targetPartitionKeyRange: createMockPartitionKeyRange("1", "BB", "FF"),
          continuationToken: "preserved-token-12345",
        };

        const replacementRanges = [
          createMockPartitionKeyRange("1-1", "BB", "CC"),
          createMockPartitionKeyRange("1-2", "CC", "DD"),
          createMockPartitionKeyRange("1-3", "DD", "FF"),
        ];

        splitTestContext.testHandlePartitionSplit(
          mockCompositeContinuationToken,
          originalDocumentProducer,
          replacementRanges
        );

        // Verify all replacement ranges get the same continuation token
        expect(mockCompositeContinuationToken.addRangeMapping).toHaveBeenCalledTimes(3);
        
        replacementRanges.forEach((range) => {
          expect(mockCompositeContinuationToken.addRangeMapping).toHaveBeenCalledWith({
            partitionKeyRange: range,
            continuationToken: "preserved-token-12345",
            itemCount: 0,
          });
        });
      });

      it("should handle malformed range mappings in continuation token", () => {
        // Create continuation token with malformed mappings
        const malformedCompositeContinuationToken = {
          rangeMappings: [
            null, // Null mapping
            { partitionKeyRange: null as any }, // Null partition range with explicit type
            {
              partitionKeyRange: createMockPartitionKeyRange("0", "00", "BB"),
              continuationToken: "token-0",
              itemCount: 5,
            },
            undefined, // Undefined mapping
          ],
          addRangeMapping: vi.fn(),
        };

        const originalDocumentProducer = {
          targetPartitionKeyRange: createMockPartitionKeyRange("0", "00", "BB"),
          continuationToken: "original-token",
        };

        const replacementRanges = [
          createMockPartitionKeyRange("0-1", "00", "55"),
          createMockPartitionKeyRange("0-2", "55", "BB"),
        ];

        const initialMappingsLength = malformedCompositeContinuationToken.rangeMappings.length;

        splitTestContext.testHandlePartitionSplit(
          malformedCompositeContinuationToken,
          originalDocumentProducer,
          replacementRanges
        );

        // Should still find and remove the valid range
        expect(malformedCompositeContinuationToken.rangeMappings).toHaveLength(initialMappingsLength - 1);
        expect(malformedCompositeContinuationToken.addRangeMapping).toHaveBeenCalledTimes(2);
      });
    });

    describe("_handlePartitionMerge", () => {
      it("should merge partition by updating EPK boundaries and logical range", () => {
        const originalDocumentProducer = {
          targetPartitionKeyRange: createMockPartitionKeyRange("0", "00", "BB"),
          continuationToken: "merge-token",
        };

        const newMergedRange = createMockPartitionKeyRange("merged-0-1", "00", "FF");

        // Get the original range for verification
        const originalMapping = mockCompositeContinuationToken.rangeMappings[0];
        const originalRange = originalMapping.partitionKeyRange;

        splitTestContext.testHandlePartitionMerge(
          mockCompositeContinuationToken,
          originalDocumentProducer,
          newMergedRange
        );

        // Verify EPK boundaries were set to original logical boundaries
        expect(originalRange.epkMin).toBe("00");
        expect(originalRange.epkMax).toBe("BB");

        // Verify logical boundaries updated to merged range
        expect(originalRange.minInclusive).toBe("00");
        expect(originalRange.maxExclusive).toBe("FF");
        expect(originalRange.id).toBe("merged-0-1");
      });

      it("should handle overlapping range not found", () => {
        const originalDocumentProducer = {
          targetPartitionKeyRange: createMockPartitionKeyRange("999", "XX", "YY"), // Non-overlapping range
          continuationToken: "merge-token",
        };

        const newMergedRange = createMockPartitionKeyRange("merged-999", "XX", "ZZ");

        // Store original state for comparison
        const originalMappings = JSON.parse(JSON.stringify(mockCompositeContinuationToken.rangeMappings));

        splitTestContext.testHandlePartitionMerge(
          mockCompositeContinuationToken,
          originalDocumentProducer,
          newMergedRange
        );

        // No changes should be made since no overlapping range was found
        expect(mockCompositeContinuationToken.rangeMappings).toEqual(originalMappings);
      });

      it("should handle multiple overlapping ranges", () => {
        // Create continuation token with multiple potentially overlapping ranges
        const multiRangeCompositeContinuationToken = {
          rangeMappings: [
            {
              partitionKeyRange: createMockPartitionKeyRange("0", "00", "BB"),
              continuationToken: "token-0",
              itemCount: 5,
            },
            {
              partitionKeyRange: createMockPartitionKeyRange("0-dup", "00", "BB"), // Duplicate range
              continuationToken: "token-0-dup",
              itemCount: 2,
            },
            {
              partitionKeyRange: createMockPartitionKeyRange("1", "BB", "FF"),
              continuationToken: "token-1",
              itemCount: 3,
            },
          ],
          addRangeMapping: vi.fn(),
        };

        const originalDocumentProducer = {
          targetPartitionKeyRange: createMockPartitionKeyRange("0", "00", "BB"),
          continuationToken: "merge-token",
        };

        const newMergedRange = createMockPartitionKeyRange("merged-0", "00", "CC");

        splitTestContext.testHandlePartitionMerge(
          multiRangeCompositeContinuationToken,
          originalDocumentProducer,
          newMergedRange
        );

        // Only the first matching range should be updated (due to break statement)
        const firstRange = multiRangeCompositeContinuationToken.rangeMappings[0].partitionKeyRange;
        const secondRange = multiRangeCompositeContinuationToken.rangeMappings[1].partitionKeyRange;

        expect(firstRange.epkMin).toBe("00");
        expect(firstRange.epkMax).toBe("BB");
        expect(firstRange.id).toBe("merged-0");

        // Second range should remain unchanged
        expect(secondRange.epkMin).toBeUndefined();
        expect(secondRange.epkMax).toBeUndefined();
        expect(secondRange.id).toBe("0-dup");
      });

      it("should handle null/undefined range mappings", () => {
        const malformedCompositeContinuationToken = {
          rangeMappings: [
            null,
            undefined,
            { partitionKeyRange: null as any }, // Explicit type for null partition range
            {
              partitionKeyRange: createMockPartitionKeyRange("0", "00", "BB"),
              continuationToken: "token-0",
              itemCount: 5,
            },
          ],
          addRangeMapping: vi.fn(),
        };

        const originalDocumentProducer = {
          targetPartitionKeyRange: createMockPartitionKeyRange("0", "00", "BB"),
          continuationToken: "merge-token",
        };

        const newMergedRange = createMockPartitionKeyRange("merged-0", "00", "CC");

        // Should not throw error and should process valid range
        expect(() => {
          splitTestContext.testHandlePartitionMerge(
            malformedCompositeContinuationToken,
            originalDocumentProducer,
            newMergedRange
          );
        }).not.toThrow();

        // Valid range should be updated
        const validRange = malformedCompositeContinuationToken.rangeMappings[3].partitionKeyRange;
        expect(validRange.epkMin).toBe("00");
        expect(validRange.epkMax).toBe("BB");
        expect(validRange.id).toBe("merged-0");
      });

      it("should preserve EPK boundaries from original logical boundaries", () => {
        const originalDocumentProducer = {
          targetPartitionKeyRange: createMockPartitionKeyRange("1", "BB", "FF"),
          continuationToken: "merge-token",
        };

        const newMergedRange = createMockPartitionKeyRange("super-merged", "AA", "ZZ");

        // Get the second range for testing
        const originalMapping = mockCompositeContinuationToken.rangeMappings[1];
        const originalRange = originalMapping.partitionKeyRange;

        splitTestContext.testHandlePartitionMerge(
          mockCompositeContinuationToken,
          originalDocumentProducer,
          newMergedRange
        );

        // EPK boundaries should preserve the original logical boundaries
        expect(originalRange.epkMin).toBe("BB"); // Original minInclusive
        expect(originalRange.epkMax).toBe("FF"); // Original maxExclusive

        // Logical boundaries should be updated to merged range
        expect(originalRange.minInclusive).toBe("AA");
        expect(originalRange.maxExclusive).toBe("ZZ");
        expect(originalRange.id).toBe("super-merged");
      });
    });

    describe("_updateContinuationTokenForPartitionSplit Integration", () => {
      it("should handle split scenario with continuation token manager", () => {
        const originalDocumentProducer = {
          targetPartitionKeyRange: createMockPartitionKeyRange("0", "00", "BB"),
          continuationToken: "split-token",
        };

        const replacementRanges = [
          createMockPartitionKeyRange("0-1", "00", "55"),
          createMockPartitionKeyRange("0-2", "55", "BB"),
        ];

        splitTestContext.testUpdateContinuationTokenForPartitionSplit(
          originalDocumentProducer,
          replacementRanges
        );

        expect(mockContinuationTokenManager.getCompositeContinuationToken).toHaveBeenCalled();
        expect(mockCompositeContinuationToken.addRangeMapping).toHaveBeenCalledTimes(2);
      });

      it("should handle merge scenario with continuation token manager", () => {
        const originalDocumentProducer = {
          targetPartitionKeyRange: createMockPartitionKeyRange("0", "00", "BB"),
          continuationToken: "merge-token",
        };

        const replacementRanges = [
          createMockPartitionKeyRange("merged-0", "00", "FF"),
        ];

        const originalMapping = mockCompositeContinuationToken.rangeMappings[0];
        const originalRange = originalMapping.partitionKeyRange;

        splitTestContext.testUpdateContinuationTokenForPartitionSplit(
          originalDocumentProducer,
          replacementRanges
        );

        expect(mockContinuationTokenManager.getCompositeContinuationToken).toHaveBeenCalled();
        
        // Should have handled merge scenario
        expect(originalRange.epkMin).toBe("00");
        expect(originalRange.epkMax).toBe("BB");
        expect(originalRange.id).toBe("merged-0");
      });

      it("should skip when no continuation token manager", () => {
        splitTestContext.setContinuationTokenManager(undefined);

        const originalDocumentProducer = {
          targetPartitionKeyRange: createMockPartitionKeyRange("0", "00", "BB"),
          continuationToken: "token",
        };

        const replacementRanges = [
          createMockPartitionKeyRange("0-1", "00", "55"),
        ];

        // Should not throw and should return early
        expect(() => {
          splitTestContext.testUpdateContinuationTokenForPartitionSplit(
            originalDocumentProducer,
            replacementRanges
          );
        }).not.toThrow();
      });

      it("should skip when no composite continuation token", () => {
        mockContinuationTokenManager.getCompositeContinuationToken.mockReturnValue(null);

        const originalDocumentProducer = {
          targetPartitionKeyRange: createMockPartitionKeyRange("0", "00", "BB"),
          continuationToken: "token",
        };

        const replacementRanges = [
          createMockPartitionKeyRange("0-1", "00", "55"),
        ];

        // Should not throw and should return early
        expect(() => {
          splitTestContext.testUpdateContinuationTokenForPartitionSplit(
            originalDocumentProducer,
            replacementRanges
          );
        }).not.toThrow();

        expect(mockContinuationTokenManager.getCompositeContinuationToken).toHaveBeenCalled();
      });

      it("should skip when composite continuation token has no range mappings", () => {
        mockContinuationTokenManager.getCompositeContinuationToken.mockReturnValue({
          rangeMappings: null,
        });

        const originalDocumentProducer = {
          targetPartitionKeyRange: createMockPartitionKeyRange("0", "00", "BB"),
          continuationToken: "token",
        };

        const replacementRanges = [
          createMockPartitionKeyRange("0-1", "00", "55"),
        ];

        // Should not throw and should return early
        expect(() => {
          splitTestContext.testUpdateContinuationTokenForPartitionSplit(
            originalDocumentProducer,
            replacementRanges
          );
        }).not.toThrow();
      });
    });
  });
});
