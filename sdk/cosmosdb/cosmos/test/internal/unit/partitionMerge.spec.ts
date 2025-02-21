// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
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
  QueryInfo,
  RequestOptions,
  QueryIterator,
  PartitionKeyRange,
  Resource,
  StatusCodes,
} from "../../../src";
import { expect, assert } from "chai";
import { TestParallelQueryExecutionContext } from "./common/TestParallelQueryExecutionContext";
import sinon from "sinon";
import { SubStatusCodes } from "../../../src/common";

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

const collectionLink = "/dbs/testDb/colls/testCollection"; // Sample collection link
const query = "SELECT * FROM c"; // Example query string or SqlQuerySpec object
const options: FeedOptions = { maxItemCount: 2, maxDegreeOfParallelism: 1 };
const queryInfo: QueryInfo = {
  orderBy: ["Ascending"],
  rewrittenQuery: "SELECT * FROM c",
} as QueryInfo;
const partitionedQueryExecutionInfo = {
  queryRanges: [
    {
      min: "",
      max: "1FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF",
      isMinInclusive: true, // Whether the minimum value is inclusive
      isMaxInclusive: false,
    },
    {
      min: "1FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF",
      max: "FF",
      isMinInclusive: true, // Whether the minimum value is inclusive
      isMaxInclusive: false,
    },
  ],
  queryInfo: queryInfo,
  partitionedQueryExecutionInfoVersion: 1,
};
const cosmosClientOptions = {
  endpoint: "https://your-cosmos-db.documents.azure.com:443/",
  key: "your-cosmos-db-key",
  userAgentSuffix: "MockClient",
};
const correlatedActivityId = "sample-activity-id"; // Example correlated activity ID

const diagnosticLevel = CosmosDbDiagnosticLevel.info;

describe("Partition-Merge", function () {
  const clientContext = createTestClientContext(cosmosClientOptions, diagnosticLevel); // Mock ClientContext instance
  const mockPartitionKeyRange1 = createMockPartitionKeyRange(
    "parent1",
    "",
    "1FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF",
  );
  const mockPartitionKeyRange2 = createMockPartitionKeyRange(
    "parent2",
    "1FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF",
    "FF",
  );

  const fetchAllInternalStub = sinon.stub().resolves({
    resources: [mockPartitionKeyRange1, mockPartitionKeyRange2],
    headers: { "x-ms-request-charge": "1.23" },
    code: 200,
  });
  sinon.stub(clientContext, "queryPartitionKeyRanges").returns({
    fetchAllInternal: fetchAllInternalStub, // Add fetchAllInternal to mimic expected structure
  } as unknown as QueryIterator<PartitionKeyRange>);

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

  // Create a new instance of TestParallelQueryExecutionContext
  const context = new TestParallelQueryExecutionContext(
    clientContext,
    collectionLink,
    query,
    options,
    partitionedQueryExecutionInfo,
    correlatedActivityId,
  );
  context["options"] = options;

  it("there should be 2 document producers in the unfilledDocumentProducersQueue as there are two partition key ranges", async function () {
    // Assert that the priority queue has 2 document producers
    assert.equal(context["unfilledDocumentProducersQueue"].size(), 2);

    // Assert that the document producers have the correct start and end EPKs and populateEpkRangeHeaders is false
    context["unfilledDocumentProducersQueue"].forEach((docProd) => {
      assert.isUndefined(docProd.startEpk);
      assert.isUndefined(docProd.endEpk);
      assert.equal(docProd.populateEpkRangeHeaders, false);
    });
  });

  it("Correct parent epk ranges are picked up in the newly created child document producers and _enqueueReplacementDocumentProducers function should be called if partition is gone due to merge", async function () {
    const parentDocProd1 = context["unfilledDocumentProducersQueue"].peek();

    // Stub the bufferMore method of the document producers to throw a Gone error
    context["unfilledDocumentProducersQueue"].forEach((docProd) => {
      sinon.stub(docProd, "bufferMore").rejects({
        code: StatusCodes.Gone,
        substatus: SubStatusCodes.PartitionKeyRangeGone,
        message: "Partition key range is gone",
      });
    });
    const parentDocumentProducer1StartEpk = parentDocProd1.startEpk;
    const parentDocumentProducer1EndEpk = parentDocProd1.endEpk;

    // Mocking the _getReplacementPartitionKeyRanges function to return a empty partition key range
    const getReplacementPartitionKeyRangesStub = sinon
      .stub(context as any, "_getReplacementPartitionKeyRanges")
      .resolves([]);

    // Creating a spy on the _enqueueReplacementDocumentProducers function
    const enqueueSpy = sinon.spy(context as any, "_enqueueReplacementDocumentProducers");

    try {
      // The query fails because the _getReplacementPartitionKeyRanges method returns an empty partition key range array
      await context.fetchMore(context["diagnosticNodeWrapper"]["diagnosticNode"]);
    } catch (err) {
      assert(err);
      assert.equal(err.code, StatusCodes.Gone);
    }

    // Assert that the _enqueueReplacementDocumentProducers function was called once
    assert(enqueueSpy.calledOnce);
    enqueueSpy.restore();

    // Enqueue the parent document producer back into the priority queue
    context["unfilledDocumentProducersQueue"].enq(parentDocProd1);

    // Restoring and mocking again the _getReplacementPartitionKeyRanges function
    getReplacementPartitionKeyRangesStub.restore();
    sinon
      .stub(context as any, "_getReplacementPartitionKeyRanges")
      .resolves([createMockPartitionKeyRange("child1", "", "1FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF")]);

    try {
      await context.fetchMore(context["diagnosticNodeWrapper"]["diagnosticNode"]);
    } catch (err) {
      assert(err);
    }

    // Assert that the priority queue has 2 document producers. One parent and one newly created child
    assert.equal(context["unfilledDocumentProducersQueue"].size(), 2);

    // Assert that the newly created document producer has the correct start and end EPKs from Parent and populateEpkRangeHeaders is true
    context["unfilledDocumentProducersQueue"].forEach((docProd) => {
      if (docProd.targetPartitionKeyRange.id === "child1") {
        assert.equal(docProd.startEpk, parentDocumentProducer1StartEpk);
        assert.equal(docProd.endEpk, parentDocumentProducer1EndEpk);
        assert.equal(docProd.populateEpkRangeHeaders, true);
      }
    });

    // Removing the child document producer from the priority queue
    context["unfilledDocumentProducersQueue"].deq();

    // Assert that the priority queue has 1 document producer
    assert.equal(context["unfilledDocumentProducersQueue"].size(), 1);

    const parentDocProd2 = context["unfilledDocumentProducersQueue"].peek();

    const parentDocumentProducer2StartEpk = parentDocProd2.startEpk;
    const parentDocumentProducer2EndEpk = parentDocProd2.endEpk;

    // Restoring and mocking again the _getReplacementPartitionKeyRanges function
    getReplacementPartitionKeyRangesStub.restore();
    sinon
      .stub(context as any, "_getReplacementPartitionKeyRanges")
      .resolves([createMockPartitionKeyRange("child2", "1FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF", "FF")]);

    // Assert that the newly created document producer has the correct start and end EPKs from Parent and populateEpkRangeHeaders is true
    context["unfilledDocumentProducersQueue"].forEach((docProd) => {
      if (docProd.targetPartitionKeyRange.id === "child2") {
        assert.equal(docProd.startEpk, parentDocumentProducer2StartEpk);
        assert.equal(docProd.endEpk, parentDocumentProducer2EndEpk);
        assert.equal(docProd.populateEpkRangeHeaders, true);
      }
    });
  });
});
