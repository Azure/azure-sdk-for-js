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
  createDummyDiagnosticNode,
  createTestClientContext,
  initializeMockPartitionKeyRanges,
} from "../../../public/common/TestHelpers.js";
import { describe, it, assert, expect, beforeEach, vi } from "vitest";
import { SmartRoutingMapProvider } from "../../../../src/routing/smartRoutingMapProvider.js";

describe("parallelQueryExecutionContextBase", () => {
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

  const createTestPartitionKeyRange = (
    id: string,
    minInclusive: string,
    maxExclusive: string,
  ): PartitionKeyRange => ({
    id,
    minInclusive,
    maxExclusive,
    ridPrefix: 1,
    throughputFraction: 1.0,
    status: "online",
    parents: [],
  });

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

  describe("bufferDocumentProducers", () => {
    beforeEach(async () => {});

    it("should add 2 document producers to bufferedDocumentProducersQueue from unfilledDocumentProducersQueue when maxDegreeOfParallism = 2", async () => {
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

      vi.spyOn(clientContext, "queryFeed").mockResolvedValue({
        result: [mockDocument1, mockDocument2] as unknown as Resource, // Add result to mimic expected structure
        headers: {
          "x-ms-request-charge": "3.5", // Example RU charge
          "x-ms-continuation": "token-for-next-page", // Continuation token for pagination
        },
        code: 200, // Optional status code
      });

      // Create mock instance of TestParallelQueryExecutionContext
      const context = new TestParallelQueryExecutionContext(
        clientContext,
        collectionLink,
        query,
        options,
        partitionedQueryExecutionInfo,
        correlatedActivityId,
      );
      context["options"] = options;

      // Call bufferDocumentProducers
      await context["bufferDocumentProducers"](createDummyDiagnosticNode());

      assert.equal(context["bufferedDocumentProducersQueue"].size(), 2);
      assert.equal(
        context["bufferedDocumentProducersQueue"].peek().targetPartitionKeyRange.id,
        "0",
      );
      assert.equal(
        (await context["bufferedDocumentProducersQueue"].peek().fetchNextItem()).result,
        mockDocument1,
      );
      assert.equal(context["unfilledDocumentProducersQueue"].size(), 1);
      assert.equal(
        context["unfilledDocumentProducersQueue"].peek().targetPartitionKeyRange.id,
        "2",
      );
      assert.equal(
        (await context["unfilledDocumentProducersQueue"].peek().fetchNextItem()).result,
        undefined,
      );
    });
    it("should release the semaphore if an error occurs", async () => {
      const options: FeedOptions = { maxItemCount: 10, maxDegreeOfParallelism: 2 };
      const clientContext = createTestClientContext(cosmosClientOptions, diagnosticLevel); // Mock ClientContext instance

      const fetchAllInternalStub = vi.fn().mockRejectedValue({
        code: 404,
        body: {
          message: "Partition key range not found",
        },
        headers: { "x-ms-request-charge": "0" },
      });

      vi.spyOn(clientContext, "queryPartitionKeyRanges").mockReturnValue({
        fetchAllInternal: fetchAllInternalStub, // Add fetchAllInternal to mimic expected structure
      } as unknown as QueryIterator<PartitionKeyRange>);

      const context = new TestParallelQueryExecutionContext(
        clientContext,
        collectionLink,
        query,
        options,
        partitionedQueryExecutionInfo,
        correlatedActivityId,
      );
      context["options"] = options;

      // Create a spy for semaphore.release
      const releaseSpy = vi.spyOn(context["sem"], "leave");
      try {
        // Call bufferDocumentProducers
        await (context as any).bufferDocumentProducers(createDummyDiagnosticNode());
      } catch (err) {
        assert.equal(context["err"].code, 404);
        expect(releaseSpy).toHaveBeenCalledTimes(2);
        assert.equal(context["bufferedDocumentProducersQueue"].size(), 0);
        assert.equal(context["unfilledDocumentProducersQueue"].size(), 0);
      }
    });

    it("should propagate an existing error if this.err is already set", async () => {
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

      vi.spyOn(clientContext, "queryFeed").mockResolvedValue({
        result: [mockDocument1, mockDocument2] as unknown as Resource, // Add result to mimic expected structure
        headers: {
          "x-ms-request-charge": "3.5", // Example RU charge
          "x-ms-continuation": "token-for-next-page", // Continuation token for pagination
        },
        code: 200, // Optional status code
      });

      // Create mock instance of TestParallelQueryExecutionContext
      const context = new TestParallelQueryExecutionContext(
        clientContext,
        collectionLink,
        query,
        options,
        partitionedQueryExecutionInfo,
        correlatedActivityId,
      );
      context["options"] = options;

      context["err"] = {
        code: 404,
        body: {
          message: "Partition key range not found",
        },
        headers: { "x-ms-request-charge": "0" },
      };

      // Create a spy for semaphore.release
      const releaseSpy = vi.spyOn(context["sem"], "leave");
      try {
        // Call bufferDocumentProducers
        await context["bufferDocumentProducers"](createDummyDiagnosticNode());
      } catch (err) {
        assert.equal(err.code, 404);
        expect(releaseSpy).toHaveBeenCalledTimes(2);
        assert.equal(context["bufferedDocumentProducersQueue"].size(), 0);
        assert.equal(context["unfilledDocumentProducersQueue"].size(), 3);
      }
    });
  });

  describe("fillBufferFromBufferQueue", () => {
    it("should fill internal buffer from buffer queue for parallel query", async () => {
      const options: FeedOptions = { maxItemCount: 10, maxDegreeOfParallelism: 1 };
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

      vi.spyOn(clientContext, "queryFeed").mockResolvedValue({
        result: [mockDocument1, mockDocument2] as unknown as Resource, // Add result to mimic expected structure
        headers: {
          "x-ms-request-charge": "3.5", // Example RU charge
          "x-ms-continuation": "token-for-next-page", // Continuation token for pagination
        },
        code: 200, // Optional status code
      });

      const context = new TestParallelQueryExecutionContext(
        clientContext,
        collectionLink,
        query,
        options,
        partitionedQueryExecutionInfo,
        correlatedActivityId,
      );
      await (context as any).bufferDocumentProducers(createDummyDiagnosticNode());

      // Call fillBufferFromBufferQueue
      await (context as any).fillBufferFromBufferQueue();

      assert.equal(context["buffer"].length, 2);
      assert.equal(context["respHeaders"]["x-ms-request-charge"], "3.5");
    });
  });

  describe("drainBufferedItems", () => {
    let options: FeedOptions;
    let clientContext: ClientContext;
    let context: TestParallelQueryExecutionContext;

    beforeEach(async () => {
      options = { maxItemCount: 10, maxDegreeOfParallelism: 2 };
      clientContext = createTestClientContext(cosmosClientOptions, diagnosticLevel);
      initializeMockPartitionKeyRanges(createMockPartitionKeyRange, clientContext, [
        ["", "AA"],
        ["AA", "BB"],
        ["BB", "FF"],
      ]);
      context = new TestParallelQueryExecutionContext(
        clientContext,
        collectionLink,
        query,
        options,
        partitionedQueryExecutionInfo,
        correlatedActivityId,
      );
      context["options"] = options;
    });

    it("should return an empty array if buffer is empty", async () => {
      const result = await (context as any).drainBufferedItems();
      assert.deepEqual(result.result, []);
    });

    it("should return buffered items and clear the buffer", async () => {
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
      context["buffer"] = [mockDocument1, mockDocument2];

      const result = await (context as any).drainBufferedItems();

      assert.deepEqual(result.result.buffer, [mockDocument1, mockDocument2]);
      assert.equal(context["buffer"].length, 0);
    });

    it("should propagate an existing error if this.err is already set", async () => {
      context["err"] = {
        code: 404,
        body: {
          message: "Partition key range not found",
        },
        headers: { "x-ms-request-charge": "0" },
      };

      try {
        await (context as any).drainBufferedItems();
      } catch (err) {
        assert.equal(context["err"].code, 404);
        assert.equal(context["buffer"].length, 0);
      }
    });

    it("should release the semaphore if an error occurs", async () => {
      context["err"] = {
        code: 404,
        body: {
          message: "Partition key range not found",
        },
        headers: { "x-ms-request-charge": "0" },
      };

      const releaseSpy = vi.spyOn(context["sem"], "leave");

      try {
        await (context as any).drainBufferedItems();
      } catch (err) {
        assert.equal(context["err"].code, 404);
        expect(releaseSpy).toHaveBeenCalledTimes(2);
        assert.equal(context["buffer"].length, 0);
      }
    });
  });

  // Test for RU consumption when initial response from document processors is empty
  describe("parallelQueryExecutionContextBase RU Consumption", () => {
    it("should correctly compute RU when initial response from document processors is empty", async () => {
      const tempOptions: FeedOptions = { maxItemCount: 10, maxDegreeOfParallelism: 2 };
      const tempClientContext = createTestClientContext(cosmosClientOptions, diagnosticLevel); // Mock ClientContext instance

      const mockPartitionKeyRange1 = createMockPartitionKeyRange("0", "", "AA");
      const mockPartitionKeyRange2 = createMockPartitionKeyRange("1", "AA", "BB");
      const mockPartitionKeyRange3 = createMockPartitionKeyRange("2", "BB", "FF");

      const fetchAllInternalStub = vi.fn().mockResolvedValue({
        resources: [mockPartitionKeyRange1, mockPartitionKeyRange2, mockPartitionKeyRange3],
        headers: { "x-ms-request-charge": "1.23" },
        code: 200,
      });
      vi.spyOn(tempClientContext, "queryPartitionKeyRanges").mockReturnValue({
        fetchAllInternal: fetchAllInternalStub, // Add fetchAllInternal to mimic expected structure
      } as unknown as QueryIterator<PartitionKeyRange>);

      vi.spyOn(tempClientContext, "queryFeed").mockResolvedValue({
        result: [] as unknown as Resource, // Add result to mimic expected structure
        headers: {
          "x-ms-request-charge": "3.5", // Example RU charge
          "x-ms-continuation": "token-for-next-page", // Continuation token for pagination
        },
        code: 200, // Optional status code
      });

      const tempContext = new TestParallelQueryExecutionContext(
        tempClientContext,
        collectionLink,
        query,
        tempOptions,
        partitionedQueryExecutionInfo,
        correlatedActivityId,
      );
      await (tempContext as any).bufferDocumentProducers(createDummyDiagnosticNode());

      // Call fillBufferFromBufferQueue
      await (tempContext as any).fillBufferFromBufferQueue();
      const result = await (tempContext as any).drainBufferedItems();

      assert.equal(result.result.length, 0);
      assert.equal(result.headers["x-ms-request-charge"], "7.0");

      await (tempContext as any).bufferDocumentProducers(createDummyDiagnosticNode());
      await (tempContext as any).fillBufferFromBufferQueue();
      const result2 = await (tempContext as any).drainBufferedItems();

      assert.equal(result2.result.length, 0);
      assert.equal(result2.headers["x-ms-request-charge"], "7.0");
    });
  });

  describe("unfilledDocumentProducersQueue Ordering", () => {
    it("should maintain left-to-right ordering based on minInclusive partition key range values", async () => {
      const options: FeedOptions = { maxItemCount: 10, maxDegreeOfParallelism: 3 };
      const clientContext = createTestClientContext(cosmosClientOptions, diagnosticLevel);

      // Create partition key ranges with different minInclusive values (intentionally out of order)
      const mockPartitionKeyRange1 = createMockPartitionKeyRange("range3", "FF", "ZZ"); // Should be third
      const mockPartitionKeyRange2 = createMockPartitionKeyRange("range1", "00", "AA"); // Should be first
      const mockPartitionKeyRange3 = createMockPartitionKeyRange("range2", "BB", "EE"); // Should be second

      const fetchAllInternalStub = vi.fn().mockResolvedValue({
        resources: [mockPartitionKeyRange1, mockPartitionKeyRange2, mockPartitionKeyRange3],
        headers: { "x-ms-request-charge": "1.23" },
        code: 200,
      });

      vi.spyOn(clientContext, "queryPartitionKeyRanges").mockReturnValue({
        fetchAllInternal: fetchAllInternalStub,
      } as unknown as QueryIterator<PartitionKeyRange>);

      // Mock queryFeed to return empty results (we're only testing ordering)
      vi.spyOn(clientContext, "queryFeed").mockResolvedValue({
        result: [] as unknown as Resource,
        headers: {
          "x-ms-request-charge": "2.0",
          "x-ms-continuation": undefined,
        },
        code: 200,
      });

      // Mock the SmartRoutingMapProvider's getOverlappingRanges method
      vi.spyOn(SmartRoutingMapProvider.prototype, "getOverlappingRanges").mockResolvedValue([
        mockPartitionKeyRange1,
        mockPartitionKeyRange2,
        mockPartitionKeyRange3,
      ]);

      const context = new TestParallelQueryExecutionContext(
        clientContext,
        collectionLink,
        query,
        options,
        partitionedQueryExecutionInfo,
        correlatedActivityId,
      );

      // Wait for async initialization to complete
      await new Promise((resolve) => setTimeout(resolve, 50));

      // Verify that the unfilled queue has the correct number of items
      assert.equal(context["unfilledDocumentProducersQueue"].size(), 3);

      // Extract items from queue and verify ordering
      const orderedRanges: string[] = [];
      while (context["unfilledDocumentProducersQueue"].size() > 0) {
        const documentProducer = context["unfilledDocumentProducersQueue"].deq();
        orderedRanges.push(documentProducer.targetPartitionKeyRange.minInclusive);
      }

      // Verify that the ranges are ordered by minInclusive values in lexicographic order
      assert.deepEqual(orderedRanges, ["00", "BB", "FF"]);
    });

    it("should maintain ordering with mixed alphanumeric partition key values", async () => {
      const options: FeedOptions = { maxItemCount: 10, maxDegreeOfParallelism: 5 };
      const clientContext = createTestClientContext(cosmosClientOptions, diagnosticLevel);

      // Create partition key ranges with mixed alphanumeric values
      const mockPartitionKeyRange1 = createMockPartitionKeyRange("range1", "Z9", "ZZ"); // Should be last
      const mockPartitionKeyRange2 = createMockPartitionKeyRange("range2", "01", "10"); // Should be second
      const mockPartitionKeyRange3 = createMockPartitionKeyRange("range3", "A0", "AZ"); // Should be third
      const mockPartitionKeyRange4 = createMockPartitionKeyRange("range4", "00", "01"); // Should be first
      const mockPartitionKeyRange5 = createMockPartitionKeyRange("range5", "B1", "BZ"); // Should be fourth

      const fetchAllInternalStub = vi.fn().mockResolvedValue({
        resources: [
          mockPartitionKeyRange1,
          mockPartitionKeyRange2,
          mockPartitionKeyRange3,
          mockPartitionKeyRange4,
          mockPartitionKeyRange5,
        ],
        headers: { "x-ms-request-charge": "1.23" },
        code: 200,
      });

      vi.spyOn(clientContext, "queryPartitionKeyRanges").mockReturnValue({
        fetchAllInternal: fetchAllInternalStub,
      } as unknown as QueryIterator<PartitionKeyRange>);

      vi.spyOn(clientContext, "queryFeed").mockResolvedValue({
        result: [] as unknown as Resource,
        headers: {
          "x-ms-request-charge": "2.0",
          "x-ms-continuation": undefined,
        },
        code: 200,
      });

      // Mock the SmartRoutingMapProvider's getOverlappingRanges method
      vi.spyOn(SmartRoutingMapProvider.prototype, "getOverlappingRanges").mockResolvedValue([
        mockPartitionKeyRange1,
        mockPartitionKeyRange2,
        mockPartitionKeyRange3,
        mockPartitionKeyRange4,
        mockPartitionKeyRange5,
      ]);

      const context = new TestParallelQueryExecutionContext(
        clientContext,
        collectionLink,
        query,
        options,
        partitionedQueryExecutionInfo,
        correlatedActivityId,
      );

      // Wait for initialization
      await new Promise((resolve) => setTimeout(resolve, 100));

      assert.equal(context["unfilledDocumentProducersQueue"].size(), 5);

      // Extract items and verify lexicographic ordering
      const orderedRanges: string[] = [];
      while (context["unfilledDocumentProducersQueue"].size() > 0) {
        const documentProducer = context["unfilledDocumentProducersQueue"].deq();
        orderedRanges.push(documentProducer.targetPartitionKeyRange.minInclusive);
      }

      // Verify lexicographic ordering
      assert.deepEqual(orderedRanges, ["00", "01", "A0", "B1", "Z9"]);
    });

    it("should handle empty and edge case partition key values", async () => {
      const options: FeedOptions = { maxItemCount: 10, maxDegreeOfParallelism: 4 };
      const clientContext = createTestClientContext(cosmosClientOptions, diagnosticLevel);

      // Create partition key ranges with edge cases
      const mockPartitionKeyRange1 = createMockPartitionKeyRange("range1", "", "00"); // Empty string should be first
      const mockPartitionKeyRange2 = createMockPartitionKeyRange("range2", "FF", "FFFF"); // Should be last
      const mockPartitionKeyRange3 = createMockPartitionKeyRange("range3", "00", "AA"); // Should be second
      const mockPartitionKeyRange4 = createMockPartitionKeyRange("range4", "AA", "FF"); // Should be third

      const fetchAllInternalStub = vi.fn().mockResolvedValue({
        resources: [
          mockPartitionKeyRange1,
          mockPartitionKeyRange2,
          mockPartitionKeyRange3,
          mockPartitionKeyRange4,
        ],
        headers: { "x-ms-request-charge": "1.23" },
        code: 200,
      });

      vi.spyOn(clientContext, "queryPartitionKeyRanges").mockReturnValue({
        fetchAllInternal: fetchAllInternalStub,
      } as unknown as QueryIterator<PartitionKeyRange>);

      vi.spyOn(clientContext, "queryFeed").mockResolvedValue({
        result: [] as unknown as Resource,
        headers: {
          "x-ms-request-charge": "2.0",
          "x-ms-continuation": undefined,
        },
        code: 200,
      });

      // Mock the SmartRoutingMapProvider's getOverlappingRanges method
      vi.spyOn(SmartRoutingMapProvider.prototype, "getOverlappingRanges").mockResolvedValue([
        mockPartitionKeyRange1,
        mockPartitionKeyRange2,
        mockPartitionKeyRange3,
        mockPartitionKeyRange4,
      ]);

      const context = new TestParallelQueryExecutionContext(
        clientContext,
        collectionLink,
        query,
        options,
        partitionedQueryExecutionInfo,
        correlatedActivityId,
      );

      // Wait for initialization
      await new Promise((resolve) => setTimeout(resolve, 100));

      assert.equal(context["unfilledDocumentProducersQueue"].size(), 4);

      // Extract items and verify ordering
      const orderedRanges: string[] = [];
      while (context["unfilledDocumentProducersQueue"].size() > 0) {
        const documentProducer = context["unfilledDocumentProducersQueue"].deq();
        orderedRanges.push(documentProducer.targetPartitionKeyRange.minInclusive);
      }

      // Verify that empty string comes first, then lexicographic order
      assert.deepEqual(orderedRanges, ["", "00", "AA", "FF"]);
    });

    it("should use EPK ranges for secondary comparison when minInclusive values are identical", async () => {
      const options: FeedOptions = { maxItemCount: 10, maxDegreeOfParallelism: 4 };
      const clientContext = createTestClientContext(cosmosClientOptions, diagnosticLevel);

      // Create partition key ranges with identical minInclusive but different EPK ranges
      const mockPartitionKeyRange1 = createMockPartitionKeyRange("range1", "AA", "BB");
      const mockPartitionKeyRange2 = createMockPartitionKeyRange("range2", "AA", "BB");
      const mockPartitionKeyRange3 = createMockPartitionKeyRange("range3", "AA", "BB");
      const mockPartitionKeyRange4 = createMockPartitionKeyRange("range4", "AA", "BB");

      const fetchAllInternalStub = vi.fn().mockResolvedValue({
        resources: [
          mockPartitionKeyRange1,
          mockPartitionKeyRange2,
          mockPartitionKeyRange3,
          mockPartitionKeyRange4,
        ],
        headers: { "x-ms-request-charge": "1.23" },
        code: 200,
      });

      vi.spyOn(clientContext, "queryPartitionKeyRanges").mockReturnValue({
        fetchAllInternal: fetchAllInternalStub,
      } as unknown as QueryIterator<PartitionKeyRange>);

      vi.spyOn(clientContext, "queryFeed").mockResolvedValue({
        result: [] as unknown as Resource,
        headers: {
          "x-ms-request-charge": "2.0",
          "x-ms-continuation": undefined,
        },
        code: 200,
      });

      // Mock the SmartRoutingMapProvider to return ranges in specific order
      vi.spyOn(SmartRoutingMapProvider.prototype, "getOverlappingRanges").mockResolvedValue([
        mockPartitionKeyRange1,
        mockPartitionKeyRange2,
        mockPartitionKeyRange3,
        mockPartitionKeyRange4,
      ]);

      // Mock the _createTargetPartitionQueryExecutionContext to return DocumentProducers with specific EPK values
      const originalCreateMethod =
        TestParallelQueryExecutionContext.prototype["_createTargetPartitionQueryExecutionContext"];
      vi.spyOn(
        TestParallelQueryExecutionContext.prototype,
        "_createTargetPartitionQueryExecutionContext" as any,
      ).mockImplementation(function (
        this: any,
        partitionKeyTargetRange: any,
        continuationToken?: any,
        startEpk?: string,
        endEpk?: string,
      ) {
        // Create mock DocumentProducer with specific EPK values based on range ID
        const mockDocumentProducer = {
          targetPartitionKeyRange: partitionKeyTargetRange,
          continuationToken: continuationToken,
          // Set different EPK values for secondary sorting
          startEpk:
            partitionKeyTargetRange.id === "range1"
              ? "epk-ZZ" // Should be last
              : partitionKeyTargetRange.id === "range2"
                ? "epk-AA" // Should be first
                : partitionKeyTargetRange.id === "range3"
                  ? "epk-BB" // Should be second
                  : partitionKeyTargetRange.id === "range4"
                    ? "epk-CC" // Should be third
                    : undefined,
          endEpk: endEpk,
          populateEpkRangeHeaders: !!(startEpk && endEpk),
          hasMoreResults: vi.fn().mockReturnValue(false),
          bufferMore: vi.fn().mockResolvedValue({}),
          peakNextItem: vi.fn().mockReturnValue(undefined),
          fetchNextItem: vi.fn().mockResolvedValue({ result: undefined, headers: {} }),
          fetchBufferedItems: vi.fn().mockResolvedValue({ result: [], headers: {} }),
        };
        return mockDocumentProducer;
      });

      const context = new TestParallelQueryExecutionContext(
        clientContext,
        collectionLink,
        query,
        options,
        partitionedQueryExecutionInfo,
        correlatedActivityId,
      );

      // Wait for initialization
      await new Promise((resolve) => setTimeout(resolve, 100));

      assert.equal(context["unfilledDocumentProducersQueue"].size(), 4);

      // Extract items and verify EPK-based ordering when minInclusive is the same
      const orderedEpkRanges: string[] = [];
      const orderedRangeIds: string[] = [];
      while (context["unfilledDocumentProducersQueue"].size() > 0) {
        const documentProducer = context["unfilledDocumentProducersQueue"].deq();
        orderedEpkRanges.push(documentProducer.startEpk || "none");
        orderedRangeIds.push(documentProducer.targetPartitionKeyRange.id);
      }

      // Verify that ranges are ordered by EPK values when minInclusive is identical
      // Expected order: range2 (epk-AA), range3 (epk-BB), range4 (epk-CC), range1 (epk-ZZ)
      assert.deepEqual(orderedRangeIds, ["range2", "range3", "range4", "range1"]);
      assert.deepEqual(orderedEpkRanges, ["epk-AA", "epk-BB", "epk-CC", "epk-ZZ"]);

      // Restore the original method
      vi.restoreAllMocks();
    });

    it("should fall back to minInclusive comparison when EPK ranges are missing", async () => {
      const options: FeedOptions = { maxItemCount: 10, maxDegreeOfParallelism: 3 };
      const clientContext = createTestClientContext(cosmosClientOptions, diagnosticLevel);

      // Create partition key ranges with identical minInclusive and no EPK ranges
      const mockPartitionKeyRange1 = createMockPartitionKeyRange("range1", "AA", "BB");
      const mockPartitionKeyRange2 = createMockPartitionKeyRange("range2", "AA", "BB");
      const mockPartitionKeyRange3 = createMockPartitionKeyRange("range3", "CC", "DD"); // Different minInclusive

      const fetchAllInternalStub = vi.fn().mockResolvedValue({
        resources: [mockPartitionKeyRange1, mockPartitionKeyRange2, mockPartitionKeyRange3],
        headers: { "x-ms-request-charge": "1.23" },
        code: 200,
      });

      vi.spyOn(clientContext, "queryPartitionKeyRanges").mockReturnValue({
        fetchAllInternal: fetchAllInternalStub,
      } as unknown as QueryIterator<PartitionKeyRange>);

      vi.spyOn(clientContext, "queryFeed").mockResolvedValue({
        result: [] as unknown as Resource,
        headers: {
          "x-ms-request-charge": "2.0",
          "x-ms-continuation": undefined,
        },
        code: 200,
      });

      vi.spyOn(SmartRoutingMapProvider.prototype, "getOverlappingRanges").mockResolvedValue([
        mockPartitionKeyRange1,
        mockPartitionKeyRange2,
        mockPartitionKeyRange3,
      ]);

      // Mock to return DocumentProducers without EPK values
      vi.spyOn(
        TestParallelQueryExecutionContext.prototype,
        "_createTargetPartitionQueryExecutionContext" as any,
      ).mockImplementation(function (
        this: any,
        partitionKeyTargetRange: any,
        continuationToken?: any,
      ) {
        const mockDocumentProducer = {
          targetPartitionKeyRange: partitionKeyTargetRange,
          continuationToken: continuationToken,
          hasMoreResults: vi.fn().mockReturnValue(false),
          bufferMore: vi.fn().mockResolvedValue({}),
          peakNextItem: vi.fn().mockReturnValue(undefined),
          fetchNextItem: vi.fn().mockResolvedValue({ result: undefined, headers: {} }),
          fetchBufferedItems: vi.fn().mockResolvedValue({ result: [], headers: {} }),
        };
        return mockDocumentProducer;
      });

      const context = new TestParallelQueryExecutionContext(
        clientContext,
        collectionLink,
        query,
        options,
        partitionedQueryExecutionInfo,
        correlatedActivityId,
      );

      // Wait for initialization
      await new Promise((resolve) => setTimeout(resolve, 100));

      assert.equal(context["unfilledDocumentProducersQueue"].size(), 3);

      // Extract items and verify fallback to minInclusive ordering
      const orderedMinInclusive: string[] = [];
      while (context["unfilledDocumentProducersQueue"].size() > 0) {
        const documentProducer = context["unfilledDocumentProducersQueue"].deq();
        orderedMinInclusive.push(documentProducer.targetPartitionKeyRange.minInclusive);
      }

      // Should prioritize CC over AA ranges, and maintain original order for identical AA ranges
      // Since priority queue returns them in reverse order for same priority, we expect AA ranges first, then CC
      assert.equal(orderedMinInclusive[0], "AA");
      assert.equal(orderedMinInclusive[1], "AA");
      assert.equal(orderedMinInclusive[2], "CC");

      vi.restoreAllMocks();
    });
  });

  describe("compareDocumentProducersByRange", () => {
    let testContext: TestParallelQueryExecutionContext;

    beforeEach(() => {
      const clientContext = createTestClientContext(cosmosClientOptions, diagnosticLevel);
      testContext = new TestParallelQueryExecutionContext(
        clientContext,
        collectionLink,
        query,
        { maxItemCount: 10 },
        partitionedQueryExecutionInfo,
        correlatedActivityId,
      );
    });

    const createMockDocumentProducer = (
      partitionKeyRange: PartitionKeyRange,
      startEpk?: string,
      endEpk?: string,
    ): any => ({
      targetPartitionKeyRange: partitionKeyRange,
      startEpk,
      endEpk,
    });

    describe("Primary comparison (minInclusive)", () => {
      it("should return positive when first producer has smaller minInclusive", () => {
        const range1 = createTestPartitionKeyRange("1", "", "AA");
        const range2 = createTestPartitionKeyRange("2", "AA", "BB");
        const docProd1 = createMockDocumentProducer(range1);
        const docProd2 = createMockDocumentProducer(range2);

        const result = (testContext as any).compareDocumentProducersByRange(docProd1, docProd2);

        // "AA".localeCompare("") > 0, so result should be positive
        assert.isTrue(result > 0);
      });

      it("should return negative when first producer has larger minInclusive", () => {
        const range1 = createTestPartitionKeyRange("1", "BB", "CC");
        const range2 = createTestPartitionKeyRange("2", "AA", "BB");
        const docProd1 = createMockDocumentProducer(range1);
        const docProd2 = createMockDocumentProducer(range2);

        const result = (testContext as any).compareDocumentProducersByRange(docProd1, docProd2);

        // "AA".localeCompare("BB") < 0, so result should be negative
        assert.isTrue(result < 0);
      });

      it("should handle lexicographic ordering correctly", () => {
        const range1 = createTestPartitionKeyRange("1", "A", "B");
        const range2 = createTestPartitionKeyRange("2", "AA", "BB");
        const docProd1 = createMockDocumentProducer(range1);
        const docProd2 = createMockDocumentProducer(range2);

        const result = (testContext as any).compareDocumentProducersByRange(docProd1, docProd2);

        // "AA".localeCompare("A") > 0, so result should be positive
        assert.isTrue(result > 0);
      });
    });

    describe("Secondary comparison (EPK tie-breaker)", () => {
      it("should use EPK comparison when minInclusive values are equal", () => {
        const range1 = createTestPartitionKeyRange("1", "AA", "BB");
        const range2 = createTestPartitionKeyRange("2", "AA", "BB");
        const docProd1 = createMockDocumentProducer(range1, "epk1");
        const docProd2 = createMockDocumentProducer(range2, "epk2");

        const result = (testContext as any).compareDocumentProducersByRange(docProd1, docProd2);

        // "epk2".localeCompare("epk1") > 0, so result should be positive
        assert.isTrue(result > 0);
      });

      it("should return 0 when both minInclusive and EPK values are equal", () => {
        const range1 = createTestPartitionKeyRange("1", "AA", "BB");
        const range2 = createTestPartitionKeyRange("2", "AA", "BB");
        const docProd1 = createMockDocumentProducer(range1, "epk1");
        const docProd2 = createMockDocumentProducer(range2, "epk1");

        const result = (testContext as any).compareDocumentProducersByRange(docProd1, docProd2);

        assert.equal(result, 0);
      });

      it("should return 0 when minInclusive values are equal and both EPK values are undefined", () => {
        const range1 = createTestPartitionKeyRange("1", "AA", "BB");
        const range2 = createTestPartitionKeyRange("2", "AA", "BB");
        const docProd1 = createMockDocumentProducer(range1);
        const docProd2 = createMockDocumentProducer(range2);

        const result = (testContext as any).compareDocumentProducersByRange(docProd1, docProd2);

        assert.equal(result, 0);
      });

      it("should return 0 when minInclusive values are equal and one EPK is undefined", () => {
        const range1 = createTestPartitionKeyRange("1", "AA", "BB");
        const range2 = createTestPartitionKeyRange("2", "AA", "BB");
        const docProd1 = createMockDocumentProducer(range1, "epk1");
        const docProd2 = createMockDocumentProducer(range2);

        const result = (testContext as any).compareDocumentProducersByRange(docProd1, docProd2);

        assert.equal(result, 0);
      });
    });
  });
});
