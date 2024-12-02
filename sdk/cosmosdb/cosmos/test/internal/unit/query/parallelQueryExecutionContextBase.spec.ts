// Copyright (c) Microsoft Corporation.

import sinon from "sinon";
import {
  ClientConfigDiagnostic,
  ClientContext,
  ConsistencyLevel,
  Constants,
  CosmosClientOptions,
  CosmosDbDiagnosticLevel,
  DiagnosticNodeInternal,
  FeedOptions,
  GlobalEndpointManager,
  PartitionKeyRange,
  QueryInfo,
  QueryIterator,
  RequestOptions,
  Resource,
  StatusCodes,
} from "../../../../src";
import { TestParallelQueryExecutionContext } from "../common/TestParallelQueryExecutionContext";
import { expect } from "chai";
import { assert } from "chai";
describe("parallelQueryExecutionContextBase", function () {
  describe("bufferDocumentProducers", function () {
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
      await context.bufferDocumentProducers();

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
        await context.bufferDocumentProducers();
      } catch (err) {
        assert.equal(context["err"].code, 404);
        assert.equal(releaseSpy.callCount, 2);
        assert.equal(context["bufferedDocumentProducersQueue"].size(), 0);
        assert.equal(context["unfilledDocumentProducersQueue"].size(), 3);
      }
    });

    it("should propagate an existing error if this.err is already set", async function () {
      const options: FeedOptions = { maxItemCount: 10, maxDegreeOfParallelism: 2 };
      const clientContext = createTestClientContext(cosmosClientOptions, diagnosticLevel); // Mock ClientContext instance

      const mockPartitionKeyRange1 = createMockPartitionKeyRange("0", "", "AA");

      const fetchAllInternalStub = sinon.stub().resolves({
        resources: [mockPartitionKeyRange1],
        headers: { "x-ms-request-charge": "1.23" },
        code: 200,
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
        await context.bufferDocumentProducers();
      } catch (err) {
        assert.equal(context["err"].code, 404);
        assert.equal(releaseSpy.callCount, 2);
        assert.equal(context["bufferedDocumentProducersQueue"].size(), 0);
        assert.equal(context["unfilledDocumentProducersQueue"].size(), 0);
      }
    });

    it("should invoke _repairExecutionContext when a split error occurs and retry after repair", async function () {
      const options: FeedOptions = { maxItemCount: 10, maxDegreeOfParallelism: 2 };
      const clientContext = createTestClientContext(cosmosClientOptions, diagnosticLevel); // Mock ClientContext instance

      const fetchAllInternalStub = sinon.stub().returns({
        code: StatusCodes.Gone,
        body: {
          message: "Partition key range split",
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

      // Create a spy for _repairExecutionContext
      const repairSpy = sinon.spy(context, "_repairExecutionContext");

      // Call bufferDocumentProducers
      await context.bufferDocumentProducers();

      assert.equal(repairSpy.callCount, 1);
      assert.equal(context["bufferedDocumentProducersQueue"].size(), 0);
      assert.equal(context["unfilledDocumentProducersQueue"].size(), 3);
    });

    it("should calculate maxDegreeOfParallelism based on queue size and options", async function () {});

    it("should dequeue and process document producers up to maxDegreeOfParallelism", async function () {});

    it("should resolve immediately if unfilledDocumentProducersQueue size is 0", async function () {});

    it("should enqueue document producers into bufferedDocumentProducersQueue if nextItem is available", async function () {});

    it("should re-enqueue document producers into unfilledDocumentProducersQueue if no item is buffered but more results are available", async function () {});

    it("should retry bufferDocumentProducers after partition key range repair using ifCallback", async function () {});

    it("should trigger _repairExecutionContextIfNeeded when a partition key range split is detected", async function () {});

    it("should enqueue new DocumentProducer objects after partition key range repair", async function () {});

    it("should re-execute bufferDocumentProducers after execution context repair", async function () {});

    it("should correctly handle concurrent calls to bufferDocumentProducers with proper semaphore control", async function () {});

    it("should isolate errors encountered during concurrent execution and handle them independently", async function () {});

    it("should resolve and complete when unfilledDocumentProducersQueue size is 0", async function () {});

    it("should complete correctly when all document producers have been fully buffered", async function () {});

    it("should handle varying sizes of DocumentProducer objects and maintain performance under load", async function () {});
  });
});

function createTestClientContext(
  options: Partial<CosmosClientOptions>,
  diagnosticLevel: CosmosDbDiagnosticLevel,
) {
  const clientOps: CosmosClientOptions = {
    endpoint: "",
    connectionPolicy: {
      enableEndpointDiscovery: false,
      preferredLocations: ["https://localhhost"],
    },
    ...options,
  };
  const globalEndpointManager = new GlobalEndpointManager(
    clientOps,
    async (diagnosticNode: DiagnosticNodeInternal, opts: RequestOptions) => {
      expect(opts).to.exist; // eslint-disable-line no-unused-expressions
      const dummyAccount: any = diagnosticNode;
      return dummyAccount;
    },
  );
  const clientConfig: ClientConfigDiagnostic = {
    endpoint: "",
    resourceTokensConfigured: true,
    tokenProviderConfigured: true,
    aadCredentialsConfigured: true,
    connectionPolicyConfigured: true,
    consistencyLevel: ConsistencyLevel.BoundedStaleness,
    defaultHeaders: {},
    agentConfigured: true,
    userAgentSuffix: "",
    pluginsConfigured: true,
    sDKVersion: Constants.SDKVersion,
    ...options,
  };
  const clientContext = new ClientContext(
    clientOps,
    globalEndpointManager,
    clientConfig,
    diagnosticLevel,
  );
  return clientContext;
}
