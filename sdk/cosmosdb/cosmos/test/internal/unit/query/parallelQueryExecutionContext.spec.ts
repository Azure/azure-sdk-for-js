// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import sinon from "sinon";
import { ClientContext } from "../../../../src/ClientContext";
import { CosmosDbDiagnosticLevel } from "../../../../src/diagnostics/CosmosDbDiagnosticLevel";
import { ParallelQueryExecutionContext } from "../../../../src/queryExecutionContext";
import { QueryInfo } from "../../../../src/request/ErrorResponse";
import {
  createTestClientContext,
  initializeMockPartitionKeyRanges,
} from "./parallelQueryExecutionContextBase.spec";
import { Resource } from "../../../../src/client/Resource";
import { assert } from "console";

describe("ParallelQueryExecutionContext", () => {
  describe("bufferMore", () => {
    let clientContext: ClientContext;
    let context: ParallelQueryExecutionContext;
    const collectionLink = "/dbs/testDb/colls/testCollection"; // Sample collection link
    const query = "SELECT * FROM c"; // Example query string or SqlQuerySpec object
    const queryInfo: QueryInfo = {
      orderBy: ["Ascending"],
      rewrittenQuery: "SELECT * FROM c",
    } as QueryInfo;
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
    const createMockPartitionKeyRange = (
      id: string,
      minInclusive: string,
      maxExclusive: string,
    ) => ({
      id, // Range ID
      _rid: "range-rid", // Resource ID of the partition key range
      minInclusive, // Minimum value of the partition key range
      maxExclusive, // Maximum value of the partition key range
      _etag: "sample-etag", // ETag for concurrency control
      _self: `/dbs/sample-db/colls/sample-collection/pkranges/${id}`, // Self-link
      throughputFraction: 1.0, // Throughput assigned to this partition
      status: "Online", // Status of the partition
    });

    const createMockDocument = (id: string, name: string, value: string) => ({
      id,
      _rid: "sample-rid-2",
      _ts: Date.now(),
      _self: "/dbs/sample-db/colls/sample-collection/docs/sample-id-2",
      _etag: "sample-etag-2",
      name: name,
      value: value,
    });

    beforeEach(function () {
      const options = { maxItemCount: 10, maxDegreeOfParallelism: 1 };
      clientContext = createTestClientContext(cosmosClientOptions, diagnosticLevel);
      initializeMockPartitionKeyRanges(createMockPartitionKeyRange, clientContext, [
        ["", "AA"],
        ["AA", "BB"],
        ["BB", "FF"],
      ]);
      context = new ParallelQueryExecutionContext(
        clientContext,
        collectionLink,
        query,
        options,
        partitionedQueryExecutionInfo,
        correlatedActivityId,
      );
      context["options"] = options;
    });

    it.skip("should buffer more document producers", async () => {
      // Define a mock document (resource) returned from queryFeed
      const mockDocument1 = createMockDocument(
        "sample-id-1",
        "Sample Document 1",
        "This is the first sample document",
      );
      const mockDocument2 = createMockDocument(
        "sample-id-2",
        "Sample Document 2",
        "This is the second sample document",
      );
      // Define a stub for queryFeed in clientContext
      sinon.stub(clientContext, "queryFeed").resolves({
        result: [mockDocument1, mockDocument2] as unknown as Resource, // Add result to mimic expected structure
        headers: {
          "x-ms-request-charge": "3.5", // Example RU charge
          "x-ms-continuation": "token-for-next-page", // Continuation token for pagination
        },
        code: 200, // Optional status code
      });

      // Buffer more
      await context.bufferMore();

      // Verify that document producers were buffered
      const response = await context.drainBufferedItems();
      assert(response.result.length === 2);
    });
  });
});
