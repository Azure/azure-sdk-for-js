// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDbDiagnosticLevel } from "@azure/cosmos";
import type { QueryInfo } from "$internal/request/ErrorResponse.js";
import { createTestClientContext } from "../../../public/common/TestHelpers.js";
import type { QueryIterator } from "$internal/queryIterator.js";
import type { PartitionKeyRange } from "$internal/client/Container/PartitionKeyRange.js";
import type { Resource } from "$internal/client/Resource.js";
import { OrderByQueryExecutionContext } from "$internal/queryExecutionContext/orderByQueryExecutionContext.js";
import type { FeedOptions } from "$internal/request/FeedOptions.js";
import { createDummyDiagnosticNode } from "../../../public/common/TestHelpers.js";
import { describe, it, assert, vi } from "vitest";

describe("OrderByQueryExecutionContext", () => {
  const collectionLink = "/dbs/testDb/colls/testCollection"; // Sample collection link
  const query = "SELECT * FROM c order by c.id"; // Example query string or SqlQuerySpec object
  const queryInfo: QueryInfo = {
    orderBy: ["Ascending"],
    orderByExpressions: [
      {
        expression: "c.id", // Replace `propertyName` with the field you are ordering by
        type: "PropertyRef", // Type of the expression
      },
    ],
    groupByAliasToAggregateType: {}, // No group by in this example
    distinctType: "None", // Indicates no DISTINCT in the query
    hasSelectValue: false, // Assuming no SELECT VALUE
    hasNonStreamingOrderBy: false, // Set to true if using non-streaming ORDER BY
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
  const createMockPartitionKeyRange = (
    id: string,
    minInclusive: string,
    maxExclusive: string,
  ): {
    id: string;
    _rid: string;
    minInclusive: string;
    maxExclusive: string;
    _etag: string;
    _self: string;
    throughputFraction: number;
    status: string;
  } => ({
    id, // Range ID
    _rid: "range-rid", // Resource ID of the partition key range
    minInclusive, // Minimum value of the partition key range
    maxExclusive, // Maximum value of the partition key range
    _etag: "sample-etag", // ETag for concurrency control
    _self: `/dbs/sample-db/colls/sample-collection/pkranges/${id}`, // Self-link
    throughputFraction: 1.0, // Throughput assigned to this partition
    status: "Online", // Status of the partition
  });

  const createMockDocument = (
    id: string,
    name: string,
    value: string,
  ): {
    orderByItems: {
      item: string;
    }[];
    payload: {
      id: string;
      name: string;
      otherProperty: number;
      value: string;
    };
    rid: string;
    ts: number;
    _etag: string;
  } => ({
    orderByItems: [
      {
        item: id, // Value of the property used in ORDER BY (e.g., timestamp or other sortable field)
      },
    ],
    payload: {
      id: id, // Unique identifier for the document
      name: name, // Property used in ORDER BY
      otherProperty: 42, // Other properties in the document
      value: value, // Value of the document
    },
    rid: "2d3g45", // Resource ID of the document
    ts: 1692968400, // Timestamp of the document
    _etag: '"0x8D9F8B2B2C1A9F0"', // ETag for concurrency control
  });

  it("should return result when fetchMore called", async () => {
    const options: FeedOptions = { maxItemCount: 10, maxDegreeOfParallelism: 2 };

    const clientContext = createTestClientContext(cosmosClientOptions, diagnosticLevel); // Mock ClientContext instance
    const mockPartitionKeyRange1 = createMockPartitionKeyRange("0", "", "AA");
    const mockPartitionKeyRange2 = createMockPartitionKeyRange("1", "AA", "BB");
    const mockPartitionKeyRange3 = createMockPartitionKeyRange("2", "BB", "FF");

    const fetchAllInternalStub = vi.fn().mockResolvedValue({
      resources: [mockPartitionKeyRange1, mockPartitionKeyRange2, mockPartitionKeyRange3],
      headers: { "x-ms-request-charge": "1.23" },
      code: 200,
    });
    vi.spyOn(clientContext, "queryPartitionKeyRanges").mockReturnValue({
      fetchAllInternal: fetchAllInternalStub, // Add fetchAllInternal to mimic expected structure
    } as unknown as QueryIterator<PartitionKeyRange>);

    // Define a mock document (resource) returned from queryFeed
    const mockDocument1 = createMockDocument(
      "1",
      "Sample Document 1",
      "This is the first sample document",
    );
    const mockDocument2 = createMockDocument(
      "2",
      "Sample Document 2",
      "This is the second sample document",
    );
    const mockDocument3 = createMockDocument(
      "3",
      "Sample Document 3",
      "This is the third sample document",
    );

    const mockDocumentList = [mockDocument1, mockDocument2, mockDocument3];
    let i = 0;
    // Define a stub for queryFeed in clientContext
    vi.spyOn(clientContext, "queryFeed").mockImplementation(async () => {
      return {
        result: [mockDocumentList[i++]] as unknown as Resource, // Add result to mimic expected structure
        headers: {
          "x-ms-request-charge": "3.5", // Example RU charge
        },
        code: 200, // Optional status code
      };
    });

    const context = new OrderByQueryExecutionContext(
      clientContext,
      collectionLink,
      query,
      {},
      partitionedQueryExecutionInfo,
      correlatedActivityId,
    );

    context["options"] = options;
    const result = [];
    let count = 0;
    while (context.hasMoreResults()) {
      const response = await context.fetchMore(createDummyDiagnosticNode());
      if (response && response.result) {
        result.push(...response.result);
      }
      count++;
    }
    assert.equal(result.length, 3);
    // check ordering of the result 1,2,3
    assert.equal(result[0].payload.id, "1");
    assert.equal(result[1].payload.id, "2");
    assert.equal(result[2].payload.id, "3");
  });

  it("fetchMore should handle different distribution of data across document producers", async () => {
    const options: FeedOptions = { maxItemCount: 10, maxDegreeOfParallelism: 2 };

    const clientContext = createTestClientContext(cosmosClientOptions, diagnosticLevel); // Mock ClientContext instance
    const mockPartitionKeyRange1 = createMockPartitionKeyRange("0", "", "AA");
    const mockPartitionKeyRange2 = createMockPartitionKeyRange("1", "AA", "BB");
    const mockPartitionKeyRange3 = createMockPartitionKeyRange("2", "BB", "FF");

    const fetchAllInternalStub = vi.fn().mockResolvedValue({
      resources: [mockPartitionKeyRange1, mockPartitionKeyRange2, mockPartitionKeyRange3],
      headers: { "x-ms-request-charge": "1.23" },
      code: 200,
    });
    vi.spyOn(clientContext, "queryPartitionKeyRanges").mockReturnValue({
      fetchAllInternal: fetchAllInternalStub, // Add fetchAllInternal to mimic expected structure
    } as unknown as QueryIterator<PartitionKeyRange>);

    // Define a mock document (resource) returned from queryFeed
    const mockDocument1 = createMockDocument(
      "1",
      "Sample Document 1",
      "This is the first sample document",
    );
    const mockDocument2 = createMockDocument(
      "2",
      "Sample Document 2",
      "This is the second sample document",
    );
    const mockDocument3 = createMockDocument(
      "3",
      "Sample Document 3",
      "This is the third sample document",
    );
    const mockDocument4 = createMockDocument(
      "4",
      "Sample Document 4",
      "This is the fourth sample document",
    );

    let i = -1;
    // Define a stub for queryFeed in clientContext
    vi.spyOn(clientContext, "queryFeed").mockImplementation(async () => {
      i++;
      if (i === 0) {
        return {
          result: [mockDocument1] as unknown as Resource, // Add result to mimic expected structure
          headers: {
            "x-ms-request-charge": "3.5", // Example RU charge
            "x-ms-continuation": "token-for-next", // Continuation token for pagination
          },
          code: 200, // Optional status code
        };
      } else if (i === 1) {
        return {
          result: [mockDocument2, mockDocument3] as unknown as Resource, // Add result to mimic expected structure
          headers: {
            "x-ms-request-charge": "3.5", // Example RU charge
            "x-ms-continuation": "token-for-next", // Continuation token for pagination
          },
          code: 200, // Optional status code
        };
      } else if (i === 2) {
        return {
          result: [mockDocument1, mockDocument2, mockDocument3] as unknown as Resource, // Add result to mimic expected structure
          headers: {
            "x-ms-request-charge": "3.5", // Example RU charge
            "x-ms-continuation": "token-for-next", // Continuation token for pagination
          },
          code: 200, // Optional status code
        };
      } else {
        return {
          result: [mockDocument4] as unknown as Resource, // Add result to mimic expected structure
          headers: {
            "x-ms-request-charge": "3.5", // Example RU charge
          },
          code: 200, // Optional status code
        };
      }
    });

    const context = new OrderByQueryExecutionContext(
      clientContext,
      collectionLink,
      query,
      {},
      partitionedQueryExecutionInfo,
      correlatedActivityId,
    );

    context["options"] = options;

    const responses = [];
    for (let j = 0; j < 5; j++) {
      const response = await context.fetchMore(createDummyDiagnosticNode());
      responses.push(response);
    }

    assert.equal(responses[0].result.length, 0);
    assert.equal(responses[1].result.length, 1);
    assert.equal(responses[2].result.length, 4);
    assert.equal(responses[3].result.length, 1);
    assert.equal(responses[4].result.length, 3);

    await context.fetchMore();
    assert.equal(context.hasMoreResults(), false);
  });
});
