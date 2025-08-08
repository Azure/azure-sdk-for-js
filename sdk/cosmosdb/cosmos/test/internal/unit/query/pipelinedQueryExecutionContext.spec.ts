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

  describe("fetchBufferEndIndexForCurrentPage", () => {
    const collectionLink = "/dbs/testDb/colls/testCollection";
    const query = "SELECT * FROM c";
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
          isMinInclusive: true,
          isMaxInclusive: false,
        },
      ],
      queryInfo: queryInfo,
      partitionedQueryExecutionInfoVersion: 1,
    };
    const correlatedActivityId = "sample-activity-id";
    const cosmosClientOptions = {
      endpoint: "https://your-cosmos-db.documents.azure.com:443/",
      key: "your-cosmos-db-key",
      userAgentSuffix: "MockClient",
    };
    const diagnosticLevel = CosmosDbDiagnosticLevel.info;

    const createMockDocument = (id: string): any => ({
      id,
      _rid: "sample-rid",
      _ts: Date.now(),
      _self: "/dbs/sample-db/colls/sample-collection/docs/" + id,
      _etag: "sample-etag",
      name: "doc" + id,
      value: "value" + id,
    });

    it("should return empty result when fetchBuffer is empty", () => {
      const options = { maxItemCount: 5 };
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

      // Set up empty fetchBuffer
      context["fetchBuffer"] = [];

      // Call the private method using bracket notation
      const result = context["fetchBufferEndIndexForCurrentPage"]();

      assert.strictEqual(result.endIndex, 0);
      assert.strictEqual(result.processedRanges.length, 0);
    });

    it("should process fetchBuffer and return correct endIndex", () => {
      const options = { maxItemCount: 3 };
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

      // Set up fetchBuffer with mock documents
      context["fetchBuffer"] = [
        createMockDocument("1"),
        createMockDocument("2"),
        createMockDocument("3"),
        createMockDocument("4"),
        createMockDocument("5"),
      ];

      // Mock the continuation token manager
      const mockContinuationTokenManager = {
        processRangesForCurrentPage: vi.fn().mockReturnValue({
          endIndex: 3,
          processedRanges: ["range1"],
        }),
        updateResponseHeaders: vi.fn(),
      } as any;
      context["continuationTokenManager"] = mockContinuationTokenManager;

      // Mock fetchMoreRespHeaders
      context["fetchMoreRespHeaders"] = {};

      // Call the private method
      const result = context["fetchBufferEndIndexForCurrentPage"]();

      // Verify the result
      assert.strictEqual(result.endIndex, 3);
      assert.strictEqual(result.processedRanges.length, 1);
      assert.strictEqual(result.processedRanges[0], "range1");

      // Verify continuation token manager was called correctly
      assert.strictEqual(mockContinuationTokenManager.processRangesForCurrentPage.mock.calls.length, 2);
      assert.strictEqual(mockContinuationTokenManager.updateResponseHeaders.mock.calls.length, 1);
    });
  });
});
