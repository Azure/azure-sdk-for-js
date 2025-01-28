// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import sinon from "sinon";
import type {
  FeedOptions,
  PartitionKeyRange,
  QueryInfo,
  QueryIterator,
  Resource,
} from "../../../../src";
import { CosmosDbDiagnosticLevel } from "../../../../src";
import type { ClientContext } from "../../../../src";
import { TestParallelQueryExecutionContext } from "../common/TestParallelQueryExecutionContext";
import { assert } from "chai";
import {
  createDummyDiagnosticNode,
  createTestClientContext,
  initializeMockPartitionKeyRanges,
} from "../../../public/common/TestHelpers";
describe("parallelQueryExecutionContextBase", function () {
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
  const createMockPartitionKeyRange = (id: string, minInclusive: string, maxExclusive: string) => ({
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
  describe("bufferDocumentProducers", function () {
    beforeEach(function () {});

    it("should add 2 document producers to bufferedDocumentProducersQueue from unfilledDocumentProducersQueue when maxDegreeOfParallism = 2", async function () {
      const options: FeedOptions = { maxItemCount: 10, maxDegreeOfParallelism: 2 };
      const clientContext = createTestClientContext(cosmosClientOptions, diagnosticLevel); // Mock ClientContext instance
      const mockPartitionKeyRange1 = createMockPartitionKeyRange("0", "", "AA");
      const mockPartitionKeyRange2 = createMockPartitionKeyRange("1", "AA", "BB");
      const mockPartitionKeyRange3 = createMockPartitionKeyRange("2", "BB", "FF");

      const fetchAllInternalStub = sinon.stub().resolves({
        resources: [mockPartitionKeyRange1, mockPartitionKeyRange2, mockPartitionKeyRange3],
        headers: { "x-ms-request-charge": "1.23" },
        code: 200,
      });
      sinon.stub(clientContext, "queryPartitionKeyRanges").returns({
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
      sinon.stub(clientContext, "queryFeed").resolves({
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
    it("should release the semaphore if an error occurs", async function () {
      const options: FeedOptions = { maxItemCount: 10, maxDegreeOfParallelism: 2 };
      const clientContext = createTestClientContext(cosmosClientOptions, diagnosticLevel); // Mock ClientContext instance

      const fetchAllInternalStub = sinon.stub().rejects({
        code: 404,
        body: {
          message: "Partition key range not found",
        },
        headers: { "x-ms-request-charge": "0" },
      });
      sinon.stub(clientContext, "queryPartitionKeyRanges").returns({
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
      const releaseSpy = sinon.spy(context["sem"], "leave");
      try {
        // Call bufferDocumentProducers
        await (context as any).bufferDocumentProducers(createDummyDiagnosticNode());
      } catch (err) {
        assert.equal(context["err"].code, 404);
        assert.equal(releaseSpy.callCount, 2);
        assert.equal(context["bufferedDocumentProducersQueue"].size(), 0);
        assert.equal(context["unfilledDocumentProducersQueue"].size(), 0);
      }
    });

    it("should propagate an existing error if this.err is already set", async function () {
      const options: FeedOptions = { maxItemCount: 10, maxDegreeOfParallelism: 2 };
      const clientContext = createTestClientContext(cosmosClientOptions, diagnosticLevel); // Mock ClientContext instance
      const mockPartitionKeyRange1 = createMockPartitionKeyRange("0", "", "AA");
      const mockPartitionKeyRange2 = createMockPartitionKeyRange("1", "AA", "BB");
      const mockPartitionKeyRange3 = createMockPartitionKeyRange("2", "BB", "FF");

      const fetchAllInternalStub = sinon.stub().resolves({
        resources: [mockPartitionKeyRange1, mockPartitionKeyRange2, mockPartitionKeyRange3],
        headers: { "x-ms-request-charge": "1.23" },
        code: 200,
      });
      sinon.stub(clientContext, "queryPartitionKeyRanges").returns({
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
      sinon.stub(clientContext, "queryFeed").resolves({
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
      const releaseSpy = sinon.spy(context["sem"], "leave");
      try {
        // Call bufferDocumentProducers
        await context["bufferDocumentProducers"](createDummyDiagnosticNode());
      } catch (err) {
        assert.equal(err.code, 404);
        assert.equal(releaseSpy.callCount, 2);
        assert.equal(context["bufferedDocumentProducersQueue"].size(), 0);
        assert.equal(context["unfilledDocumentProducersQueue"].size(), 3);
      }
    });
  });

  describe("fillBufferFromBufferQueue", function () {
    it("should fill internal buffer from buffer queue for parallel query", async function () {
      const options: FeedOptions = { maxItemCount: 10, maxDegreeOfParallelism: 1 };
      const clientContext = createTestClientContext(cosmosClientOptions, diagnosticLevel); // Mock ClientContext instance

      const mockPartitionKeyRange1 = createMockPartitionKeyRange("0", "", "AA");
      const mockPartitionKeyRange2 = createMockPartitionKeyRange("1", "AA", "BB");
      const mockPartitionKeyRange3 = createMockPartitionKeyRange("2", "BB", "FF");

      const fetchAllInternalStub = sinon.stub().resolves({
        resources: [mockPartitionKeyRange1, mockPartitionKeyRange2, mockPartitionKeyRange3],
        headers: { "x-ms-request-charge": "1.23" },
        code: 200,
      });
      sinon.stub(clientContext, "queryPartitionKeyRanges").returns({
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
      sinon.stub(clientContext, "queryFeed").resolves({
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
    });
  });

  describe("drainBufferedItems", function () {
    let options: FeedOptions;
    let clientContext: ClientContext;
    let context: TestParallelQueryExecutionContext;

    beforeEach(function () {
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

    it("should return an empty array if buffer is empty", async function () {
      const result = await (context as any).drainBufferedItems();
      assert.deepEqual(result.result, []);
      assert.exists(result.headers);
    });

    it("should return buffered items and clear the buffer", async function () {
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

      assert.deepEqual(result.result, [mockDocument1, mockDocument2]);
      assert.exists(result.headers);
      assert.equal(context["buffer"].length, 0);
    });

    it("should propagate an existing error if this.err is already set", async function () {
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

    it("should release the semaphore if an error occurs", async function () {
      context["err"] = {
        code: 404,
        body: {
          message: "Partition key range not found",
        },
        headers: { "x-ms-request-charge": "0" },
      };

      const releaseSpy = sinon.spy(context["sem"], "leave");

      try {
        await (context as any).drainBufferedItems();
      } catch (err) {
        assert.equal(context["err"].code, 404);
        assert.equal(releaseSpy.callCount, 2);
        assert.equal(context["buffer"].length, 0);
      }
    });
  });
});
