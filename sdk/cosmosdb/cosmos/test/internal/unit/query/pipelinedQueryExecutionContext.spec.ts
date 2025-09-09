// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDbDiagnosticLevel } from "../../../../src/diagnostics/CosmosDbDiagnosticLevel.js";
import { PipelinedQueryExecutionContext } from "../../../../src/queryExecutionContext/pipelinedQueryExecutionContext.js";
import type { QueryInfo } from "../../../../src/request/ErrorResponse.js";
import { getEmptyCosmosDiagnostics } from "../../../../src/utils/diagnostics.js";
import {
  createDummyDiagnosticNode,
  createTestClientContext,
} from "../../../public/common/TestHelpers.js";
import { describe, it, assert, vi } from "vitest";

describe("PipelineQueryExecutionContext", () => {
  describe("_enableQueryControlFetchMoreImplementation", () => {
    const collectionLink = "/dbs/testDb/colls/testCollection";
    const query = "SELECT * FROM c";
    const correlatedActivityId = "sample-activity-id";

    const queryInfo: QueryInfo = {
      distinctType: "None",
      top: null,
      offset: null,
      limit: null,
      orderBy: [],
      rewrittenQuery: "SELECT * FROM c",
      groupByExpressions: [],
      aggregates: [],
      groupByAliasToAggregateType: {},
      hasNonStreamingOrderBy: false,
      hasSelectValue: false,
    };

    const partitionedQueryExecutionInfo = {
      queryRanges: [
        { min: "00", max: "AA", isMinInclusive: true, isMaxInclusive: false },
        { min: "AA", max: "BB", isMinInclusive: true, isMaxInclusive: false },
      ],
      queryInfo: queryInfo,
      partitionedQueryExecutionInfoVersion: 1,
    };

    const cosmosClientOptions = {
      endpoint: "https://test-cosmos.documents.azure.com:443/",
      key: "test-key",
      userAgentSuffix: "TestClient",
    };

    const diagnosticLevel = CosmosDbDiagnosticLevel.info;

    const createMockDocument = (id: string, name: string, value: string): any => ({
      id,
      _rid: `sample-rid-${id}`,
      _ts: Date.now(),
      _self: `/dbs/sample-db/colls/sample-collection/docs/${id}`,
      _etag: `sample-etag-${id}`,
      name,
      value,
    });

    const createMockQueryRangeMapping = (rangeId: string): any => ({
      rangeId,
      continuationToken: `token-${rangeId}`,
      processedDocumentCount: 0,
      totalDocumentCount: 10,
    });

    it("should process existing buffer when buffer has items and unprocessed ranges exist", async () => {
      const options = { maxItemCount: 5, enableQueryControl: true };
      const clientContext = createTestClientContext(cosmosClientOptions, diagnosticLevel);
      const context = new PipelinedQueryExecutionContext(
        clientContext,
        collectionLink,
        query,
        options,
        partitionedQueryExecutionInfo,
        correlatedActivityId,
        false,
      );

      // Setup initial buffer with documents
      context["fetchBuffer"] = [
        createMockDocument("1", "doc1", "value1"),
        createMockDocument("2", "doc2", "value2"),
        createMockDocument("3", "doc3", "value3"),
        createMockDocument("4", "doc4", "value4"),
        createMockDocument("5", "doc5", "value5"),
        createMockDocument("6", "doc6", "value6"),
      ];

      // Mock continuation token manager
      const mockHasUnprocessedRanges = vi.fn().mockReturnValue(true);
      const mockSetContinuationTokenInHeaders = vi.fn();
      const mockRemovePartitionRangeMapping = vi.fn();

      context["continuationTokenManager"] = {
        hasUnprocessedRanges: mockHasUnprocessedRanges,
        setContinuationTokenInHeaders: mockSetContinuationTokenInHeaders,
        removePartitionRangeMapping: mockRemovePartitionRangeMapping,
        processRangesForCurrentPage: vi.fn().mockReturnValue({
          endIndex: 3,
          processedRanges: ["range1", "range2"],
        }),
      } as any;

      const result = await context["_enableQueryControlFetchMoreImplementation"](
        createDummyDiagnosticNode(),
      );

      // Verify results
      assert.strictEqual(result.result.length, 3);
      assert.strictEqual(result.result[0].id, "1");
      assert.strictEqual(result.result[1].id, "2");
      assert.strictEqual(result.result[2].id, "3");

      // Verify buffer was updated
      assert.strictEqual(context["fetchBuffer"].length, 3);
      assert.strictEqual(context["fetchBuffer"][0].id, "4");

      // Verify processed ranges were removed
      assert.strictEqual(mockRemovePartitionRangeMapping.mock.calls.length, 2);
      assert.strictEqual(mockRemovePartitionRangeMapping.mock.calls[0][0], "range1");
      assert.strictEqual(mockRemovePartitionRangeMapping.mock.calls[1][0], "range2");

      // Verify headers were updated
      assert.strictEqual(mockSetContinuationTokenInHeaders.mock.calls.length, 1);
    });

    it("should fetch from endpoint when buffer is empty", async () => {
      const options = { maxItemCount: 5, enableQueryControl: true };
      const clientContext = createTestClientContext(cosmosClientOptions, diagnosticLevel);
      const context = new PipelinedQueryExecutionContext(
        clientContext,
        collectionLink,
        query,
        options,
        partitionedQueryExecutionInfo,
        correlatedActivityId,
        false,
      );

      // Empty buffer
      context["fetchBuffer"] = [];

      // Mock endpoint response
      const mockEndpointResponse = {
        result: {
          buffer: [
            createMockDocument("7", "doc7", "value7"),
            createMockDocument("8", "doc8", "value8"),
          ],
          partitionKeyRangeMap: new Map([["range3", createMockQueryRangeMapping("range3")]]),
          orderByItemsArray: [{ item: "orderByValue" }],
        },
        headers: { "x-ms-continuation": "continuation-token" },
        diagnostics: getEmptyCosmosDiagnostics(),
      };

      const mockEndpoint = {
        fetchMore: vi.fn().mockResolvedValue(mockEndpointResponse),
        hasMoreResults: vi.fn().mockReturnValue(true),
      };

      context["endpoint"] = mockEndpoint as any;

      // Mock continuation token manager
      const mockHasUnprocessedRanges = vi.fn().mockReturnValue(false);
      const mockSetContinuationTokenInHeaders = vi.fn();
      const mockSetPartitionKeyRangeMap = vi.fn();
      const mockSetOrderByItemsArray = vi.fn();
      const mockRemovePartitionRangeMapping = vi.fn();

      context["continuationTokenManager"] = {
        hasUnprocessedRanges: mockHasUnprocessedRanges,
        setContinuationTokenInHeaders: mockSetContinuationTokenInHeaders,
        setPartitionKeyRangeMap: mockSetPartitionKeyRangeMap,
        setOrderByItemsArray: mockSetOrderByItemsArray,
        removePartitionRangeMapping: mockRemovePartitionRangeMapping,
        processRangesForCurrentPage: vi.fn().mockReturnValue({
          endIndex: 2,
          processedRanges: ["range3"],
        }),
      } as any;

      const result = await context["_enableQueryControlFetchMoreImplementation"](
        createDummyDiagnosticNode(),
      );

      // Verify endpoint was called
      assert.strictEqual(mockEndpoint.fetchMore.mock.calls.length, 1);

      // Verify continuation token manager methods were called
      assert.strictEqual(mockSetPartitionKeyRangeMap.mock.calls.length, 1);
      assert.strictEqual(mockSetOrderByItemsArray.mock.calls.length, 1);

      // Verify result
      assert.strictEqual(result.result.length, 2);
      assert.strictEqual(result.result[0].id, "7");
      assert.strictEqual(result.result[1].id, "8");

      // Verify buffer was cleared after processing
      assert.strictEqual(context["fetchBuffer"].length, 0);
    });

    it("should return empty result when endpoint returns no data", async () => {
      const options = { maxItemCount: 5, enableQueryControl: true };
      const clientContext = createTestClientContext(cosmosClientOptions, diagnosticLevel);
      const context = new PipelinedQueryExecutionContext(
        clientContext,
        collectionLink,
        query,
        options,
        partitionedQueryExecutionInfo,
        correlatedActivityId,
        false,
      );

      context["fetchBuffer"] = [];

      // Mock endpoint returning no data
      const mockEndpoint = {
        fetchMore: vi.fn().mockResolvedValue(null),
        hasMoreResults: vi.fn().mockReturnValue(false),
      };

      context["endpoint"] = mockEndpoint as any;

      const mockSetContinuationTokenInHeaders = vi.fn();
      context["continuationTokenManager"] = {
        hasUnprocessedRanges: vi.fn().mockReturnValue(false),
        setContinuationTokenInHeaders: mockSetContinuationTokenInHeaders,
      } as any;

      const result = await context["_enableQueryControlFetchMoreImplementation"](
        createDummyDiagnosticNode(),
      );

      // Verify empty result
      assert.strictEqual(result.result.length, 0);
      assert.strictEqual(mockSetContinuationTokenInHeaders.mock.calls.length, 1);
    });

    it("should return empty result when endpoint response has no buffer", async () => {
      const options = { maxItemCount: 5, enableQueryControl: true };
      const clientContext = createTestClientContext(cosmosClientOptions, diagnosticLevel);
      const context = new PipelinedQueryExecutionContext(
        clientContext,
        collectionLink,
        query,
        options,
        partitionedQueryExecutionInfo,
        correlatedActivityId,
        false,
      );

      context["fetchBuffer"] = [];

      // Mock endpoint response without buffer
      const mockEndpointResponse = {
        result: {
          // No buffer property
          partitionKeyRangeMap: new Map(),
        },
        headers: { "x-ms-continuation": "continuation-token" },
        diagnostics: getEmptyCosmosDiagnostics(),
      };

      const mockEndpoint = {
        fetchMore: vi.fn().mockResolvedValue(mockEndpointResponse),
        hasMoreResults: vi.fn().mockReturnValue(false),
      };

      context["endpoint"] = mockEndpoint as any;

      const mockSetContinuationTokenInHeaders = vi.fn();
      context["continuationTokenManager"] = {
        hasUnprocessedRanges: vi.fn().mockReturnValue(false),
        setContinuationTokenInHeaders: mockSetContinuationTokenInHeaders,
      } as any;

      const result = await context["_enableQueryControlFetchMoreImplementation"](
        createDummyDiagnosticNode(),
      );

      // Verify empty result
      assert.strictEqual(result.result.length, 0);
      assert.strictEqual(mockSetContinuationTokenInHeaders.mock.calls.length, 2);
    });

    it("should return empty result when endpoint response buffer is empty", async () => {
      const options = { maxItemCount: 5, enableQueryControl: true };
      const clientContext = createTestClientContext(cosmosClientOptions, diagnosticLevel);
      const context = new PipelinedQueryExecutionContext(
        clientContext,
        collectionLink,
        query,
        options,
        partitionedQueryExecutionInfo,
        correlatedActivityId,
        false,
      );

      context["fetchBuffer"] = [];

      // Mock endpoint response with empty buffer
      const mockEndpointResponse = {
        result: {
          buffer: [] as any[], // Empty buffer
          partitionKeyRangeMap: new Map(),
        },
        headers: { "x-ms-continuation": "continuation-token" },
        diagnostics: getEmptyCosmosDiagnostics(),
      };

      const mockEndpoint = {
        fetchMore: vi.fn().mockResolvedValue(mockEndpointResponse),
        hasMoreResults: vi.fn().mockReturnValue(false),
      };

      context["endpoint"] = mockEndpoint as any;

      const mockSetContinuationTokenInHeaders = vi.fn();
      const mockSetPartitionKeyRangeMap = vi.fn();

      context["continuationTokenManager"] = {
        hasUnprocessedRanges: vi.fn().mockReturnValue(false),
        setContinuationTokenInHeaders: mockSetContinuationTokenInHeaders,
        setPartitionKeyRangeMap: mockSetPartitionKeyRangeMap,
      } as any;

      const result = await context["_enableQueryControlFetchMoreImplementation"](
        createDummyDiagnosticNode(),
      );

      // Verify empty result
      assert.strictEqual(result.result.length, 0);
      assert.strictEqual(mockSetContinuationTokenInHeaders.mock.calls.length, 1);
      assert.strictEqual(mockSetPartitionKeyRangeMap.mock.calls.length, 1);
    });

    it("should handle buffer with items but no unprocessed ranges", async () => {
      const options = { maxItemCount: 5, enableQueryControl: true };
      const clientContext = createTestClientContext(cosmosClientOptions, diagnosticLevel);
      const context = new PipelinedQueryExecutionContext(
        clientContext,
        collectionLink,
        query,
        options,
        partitionedQueryExecutionInfo,
        correlatedActivityId,
        false,
      );

      // Setup buffer with documents but no unprocessed ranges
      context["fetchBuffer"] = [
        createMockDocument("1", "doc1", "value1"),
        createMockDocument("2", "doc2", "value2"),
      ];

      // Mock endpoint response
      const mockEndpointResponse = {
        result: {
          buffer: [createMockDocument("3", "doc3", "value3")],
          partitionKeyRangeMap: new Map([["range1", createMockQueryRangeMapping("range1")]]),
        },
        headers: { "x-ms-continuation": "continuation-token" },
        diagnostics: getEmptyCosmosDiagnostics(),
      };

      const mockEndpoint = {
        fetchMore: vi.fn().mockResolvedValue(mockEndpointResponse),
        hasMoreResults: vi.fn().mockReturnValue(true),
      };

      context["endpoint"] = mockEndpoint as any;

      // Mock continuation token manager - no unprocessed ranges
      const mockHasUnprocessedRanges = vi.fn().mockReturnValue(false);
      const mockSetContinuationTokenInHeaders = vi.fn();
      const mockSetPartitionKeyRangeMap = vi.fn();
      const mockRemovePartitionRangeMapping = vi.fn();

      context["continuationTokenManager"] = {
        hasUnprocessedRanges: mockHasUnprocessedRanges,
        setContinuationTokenInHeaders: mockSetContinuationTokenInHeaders,
        setPartitionKeyRangeMap: mockSetPartitionKeyRangeMap,
        removePartitionRangeMapping: mockRemovePartitionRangeMapping,
        processRangesForCurrentPage: vi.fn().mockReturnValue({
          endIndex: 1,
          processedRanges: ["range1"],
        }),
      } as any;

      const result = await context["_enableQueryControlFetchMoreImplementation"](
        createDummyDiagnosticNode(),
      );

      // Should go to else branch and fetch from endpoint
      assert.strictEqual(mockEndpoint.fetchMore.mock.calls.length, 1);
      assert.strictEqual(result.result.length, 1);
      assert.strictEqual(result.result[0].id, "3");
    });

    it("should process partial buffer when endIndex is less than buffer length", async () => {
      const options = { maxItemCount: 2, enableQueryControl: true };
      const clientContext = createTestClientContext(cosmosClientOptions, diagnosticLevel);
      const context = new PipelinedQueryExecutionContext(
        clientContext,
        collectionLink,
        query,
        options,
        partitionedQueryExecutionInfo,
        correlatedActivityId,
        false,
      );

      // Setup buffer with more documents than pageSize
      context["fetchBuffer"] = [
        createMockDocument("1", "doc1", "value1"),
        createMockDocument("2", "doc2", "value2"),
        createMockDocument("3", "doc3", "value3"),
        createMockDocument("4", "doc4", "value4"),
      ];

      const mockHasUnprocessedRanges = vi.fn().mockReturnValue(true);
      const mockSetContinuationTokenInHeaders = vi.fn();
      const mockRemovePartitionRangeMapping = vi.fn();

      context["continuationTokenManager"] = {
        hasUnprocessedRanges: mockHasUnprocessedRanges,
        setContinuationTokenInHeaders: mockSetContinuationTokenInHeaders,
        removePartitionRangeMapping: mockRemovePartitionRangeMapping,
        processRangesForCurrentPage: vi.fn().mockReturnValue({
          endIndex: 2, // Only process first 2 items
          processedRanges: ["range1"],
        }),
      } as any;

      const result = await context["_enableQueryControlFetchMoreImplementation"](
        createDummyDiagnosticNode(),
      );

      // Verify only first 2 items returned
      assert.strictEqual(result.result.length, 2);
      assert.strictEqual(result.result[0].id, "1");
      assert.strictEqual(result.result[1].id, "2");

      // Verify remaining items stay in buffer
      assert.strictEqual(context["fetchBuffer"].length, 2);
      assert.strictEqual(context["fetchBuffer"][0].id, "3");
      assert.strictEqual(context["fetchBuffer"][1].id, "4");
    });

    it("should handle endpoint response with orderByItemsArray but no partitionKeyRangeMap", async () => {
      const options = { maxItemCount: 5, enableQueryControl: true };
      const clientContext = createTestClientContext(cosmosClientOptions, diagnosticLevel);
      const context = new PipelinedQueryExecutionContext(
        clientContext,
        collectionLink,
        query,
        options,
        partitionedQueryExecutionInfo,
        correlatedActivityId,
        false,
      );

      context["fetchBuffer"] = [];

      // Mock endpoint response with orderByItemsArray but no partitionKeyRangeMap
      const mockEndpointResponse = {
        result: {
          buffer: [createMockDocument("1", "doc1", "value1")],
          orderByItemsArray: [{ item: "orderByValue" }],
          // No partitionKeyRangeMap
        },
        headers: { "x-ms-continuation": "continuation-token" },
        diagnostics: getEmptyCosmosDiagnostics(),
      };

      const mockEndpoint = {
        fetchMore: vi.fn().mockResolvedValue(mockEndpointResponse),
        hasMoreResults: vi.fn().mockReturnValue(true),
      };

      context["endpoint"] = mockEndpoint as any;

      const mockSetContinuationTokenInHeaders = vi.fn();
      const mockSetOrderByItemsArray = vi.fn();
      const mockRemovePartitionRangeMapping = vi.fn();

      context["continuationTokenManager"] = {
        hasUnprocessedRanges: vi.fn().mockReturnValue(false),
        setContinuationTokenInHeaders: mockSetContinuationTokenInHeaders,
        setOrderByItemsArray: mockSetOrderByItemsArray,
        removePartitionRangeMapping: mockRemovePartitionRangeMapping,
        processRangesForCurrentPage: vi.fn().mockReturnValue({
          endIndex: 1,
          processedRanges: [],
        }),
      } as any;

      const result = await context["_enableQueryControlFetchMoreImplementation"](
        createDummyDiagnosticNode(),
      );

      // Verify orderByItemsArray was processed
      assert.strictEqual(mockSetOrderByItemsArray.mock.calls.length, 1);
      assert.deepStrictEqual(mockSetOrderByItemsArray.mock.calls[0][0], [{ item: "orderByValue" }]);

      // Verify result
      assert.strictEqual(result.result.length, 1);
      assert.strictEqual(result.result[0].id, "1");
    });
  });

  describe.skip("fetchMore", () => {
    const collectionLink = "/dbs/testDb/colls/testCollection"; // Sample collection link
    const query = "SELECT * FROM c"; // Example query string or SqlQuerySpec object
    const queryInfo: QueryInfo = {
      distinctType: "None",
      top: null,
      offset: null,
      limit: null,
      orderBy: ["Ascending"],
      rewrittenQuery: "SELECT * FROM c",
      groupByExpressions: [],
      aggregates: [],
      groupByAliasToAggregateType: {},
      hasNonStreamingOrderBy: false,
      hasSelectValue: false,
    };
    const partitionedQueryExecutionInfo = {
      queryRanges: [
        {
          min: "00",
          max: "AA",
          isMinInclusive: true, // Whether the minimum value is inclusive
          isMaxInclusive: false,
        },
        {
          min: "AA",
          max: "BB",
          isMinInclusive: true, // Whether the minimum value is inclusive
          isMaxInclusive: false,
        },
        {
          min: "BB",
          max: "FF",
          isMinInclusive: true, // Whether the minimum value is inclusive
          isMaxInclusive: false,
        },
      ],
      queryInfo: queryInfo,
      partitionedQueryExecutionInfoVersion: 1,
    };
    const correlatedActivityId = "sample-activity-id"; // Example correlated activity ID
    // Mock dependencies for ClientContext
    const cosmosClientOptions = {
      endpoint: "https://your-cosmos-db.documents.azure.com:443/",
      key: "your-cosmos-db-key",
      userAgentSuffix: "MockClient",
    };

    const diagnosticLevel = CosmosDbDiagnosticLevel.info;

    const createMockDocument = (
      id: string,
      name: string,
      value: string,
    ): {
      id: string;
      _rid: string;
      _ts: number;
      _self: string;
      _etag: string;
      name: string;
      value: string;
    } => ({
      id,
      _rid: "sample-rid-2",
      _ts: Date.now(),
      _self: "/dbs/sample-db/colls/sample-collection/docs/sample-id-2",
      _etag: "sample-etag-2",
      name: name,
      value: value,
    });

    it("should fetch more with enableQueryControl false as deafult", async () => {
      const options = { maxItemCount: 10, maxDegreeOfParallelism: 1 };
      const clientContext = createTestClientContext(cosmosClientOptions, diagnosticLevel);
      const context = new PipelinedQueryExecutionContext(
        clientContext,
        collectionLink,
        query,
        options,
        partitionedQueryExecutionInfo,
        correlatedActivityId,
        false,
      );
      // Mock the endpoint's fetchMore method to return 3 documents in every call
      context["endpoint"] = {
        fetchMore: async () => {
          return {
            result: [
              createMockDocument("1", "doc1", "value1"),
              createMockDocument("2", "doc2", "value2"),
              createMockDocument("3", "doc3", "value3"),
            ],
            headers: {},
            diagnostics: getEmptyCosmosDiagnostics(),
          };
        },
        nextItem: async () => null,
        hasMoreResults: () => false,
      };

      const response = await context.fetchMore(createDummyDiagnosticNode());
      const result = response.result;

      // Verify the result
      assert.strictEqual(result.length, 10);
      assert.strictEqual(result[0].id, "1");
      assert.strictEqual(result[1].id, "2");
      assert.strictEqual(result[2].id, "3");
    });

    it("should fetch more when empty resutls are retuned initially by document producers", async () => {
      const options = { maxItemCount: 10, maxDegreeOfParallelism: 1 };
      const clientContext = createTestClientContext(cosmosClientOptions, diagnosticLevel);
      const context = new PipelinedQueryExecutionContext(
        clientContext,
        collectionLink,
        query,
        options,
        partitionedQueryExecutionInfo,
        correlatedActivityId,
        false,
      );
      let i = 0;
      context["endpoint"] = {
        fetchMore: async () => {
          if (i < 3) {
            i++;
            return {
              result: [],
              headers: {},
              diagnostics: getEmptyCosmosDiagnostics(),
            };
          }
          return {
            result: [
              createMockDocument("1", "doc1", "value1"),
              createMockDocument("2", "doc2", "value2"),
              createMockDocument("3", "doc3", "value3"),
            ],
            headers: {},
            diagnostics: getEmptyCosmosDiagnostics(),
          };
        },
        nextItem: async () => null,
        hasMoreResults: () => true,
      };

      const response = await context.fetchMore(createDummyDiagnosticNode());

      const result = response.result;
      assert.strictEqual(result.length, 10);
    });

    it("should return result when result size < maxItemCount", async () => {
      const options = { maxItemCount: 10, maxDegreeOfParallelism: 1 };
      const clientContext = createTestClientContext(cosmosClientOptions, diagnosticLevel);
      const context = new PipelinedQueryExecutionContext(
        clientContext,
        collectionLink,
        query,
        options,
        partitionedQueryExecutionInfo,
        correlatedActivityId,
        false,
      );
      let i = 0;
      context["endpoint"] = {
        fetchMore: async () => {
          if (i < 1) {
            i++;
            return {
              result: [
                createMockDocument("1", "doc1", "value1"),
                createMockDocument("2", "doc2", "value2"),
                createMockDocument("3", "doc3", "value3"),
              ],
              headers: {},
              diagnostics: getEmptyCosmosDiagnostics(),
            };
          }
          return {
            result: undefined,
            headers: {},
            diagnostics: getEmptyCosmosDiagnostics(),
          };
        },
        nextItem: async () => null,
        hasMoreResults: () => true,
      };

      const response = await context.fetchMore(createDummyDiagnosticNode());
      const result = response.result;
      assert.strictEqual(result.length, 3);
    });

    it("should return undefined when backend has no data", async () => {
      const options = { maxItemCount: 10, maxDegreeOfParallelism: 1 };
      const clientContext = createTestClientContext(cosmosClientOptions, diagnosticLevel);
      const context = new PipelinedQueryExecutionContext(
        clientContext,
        collectionLink,
        query,
        options,
        partitionedQueryExecutionInfo,
        correlatedActivityId,
        false,
      );
      context["endpoint"] = {
        fetchMore: async () => {
          return {
            result: undefined,
            headers: {},
            diagnostics: getEmptyCosmosDiagnostics(),
          };
        },
        nextItem: async () => null,
        hasMoreResults: () => false,
      };

      const response = await context.fetchMore(createDummyDiagnosticNode());
      const result = response.result;
      assert.strictEqual(result, undefined);
    });

    it("should stop on empty array when backend returns empty array and enableQueryControl is true", async () => {
      const options = { maxItemCount: 10, maxDegreeOfParallelism: 1, enableQueryControl: true };
      const clientContext = createTestClientContext(cosmosClientOptions, diagnosticLevel);
      const context = new PipelinedQueryExecutionContext(
        clientContext,
        collectionLink,
        query,
        options,
        partitionedQueryExecutionInfo,
        correlatedActivityId,
        true,
      );
      let i = 0;
      context["endpoint"] = {
        fetchMore: async () => {
          if (i < 1) {
            i++;
            return {
              result: [],
              headers: {},
              diagnostics: getEmptyCosmosDiagnostics(),
            };
          }
          return {
            result: [
              createMockDocument("1", "doc1", "value1"),
              createMockDocument("2", "doc2", "value2"),
              createMockDocument("3", "doc3", "value3"),
            ],
            headers: {},
            diagnostics: getEmptyCosmosDiagnostics(),
          };
        },
        nextItem: async () => null,
        hasMoreResults: () => true,
      };

      const response = await context.fetchMore(createDummyDiagnosticNode());
      const result = response.result;
      assert.strictEqual(result.length, 0);

      const response2 = await context.fetchMore(createDummyDiagnosticNode());
      const result2 = response2.result;
      assert.strictEqual(result2.length, 3);
    });

    it("enableQueryControl is true and returned data is greater than maxItemCount", async () => {
      const options = { maxItemCount: 2, maxDegreeOfParallelism: 1, enableQueryControl: true };
      const clientContext = createTestClientContext(cosmosClientOptions, diagnosticLevel);
      const context = new PipelinedQueryExecutionContext(
        clientContext,
        collectionLink,
        query,
        options,
        partitionedQueryExecutionInfo,
        correlatedActivityId,
        true,
      );
      context["endpoint"] = {
        fetchMore: async () => {
          return {
            result: [
              createMockDocument("1", "doc1", "value1"),
              createMockDocument("2", "doc2", "value2"),
              createMockDocument("3", "doc3", "value3"),
            ],
            headers: {},
            diagnostics: getEmptyCosmosDiagnostics(),
          };
        },
        nextItem: async () => null,
        hasMoreResults: () => true,
      };

      const response = await context.fetchMore(createDummyDiagnosticNode());
      const result = response.result;
      assert.strictEqual(result.length, 2);
    });
  });
});
