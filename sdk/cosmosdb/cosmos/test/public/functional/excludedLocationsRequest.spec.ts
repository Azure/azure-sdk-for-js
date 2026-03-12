// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RequestContext } from "../../../src/index.js";
import { BulkOperationType, CosmosClient } from "../../../src/index.js";
import { masterKey } from "../common/_fakeTestSecrets.js";
import type { CosmosClientOptions } from "../../../src/index.js";
import { PluginOn } from "../../../src/index.js";
import { ChangeFeedStartFrom } from "../../../src/index.js";
import { getEmptyCosmosDiagnostics } from "../../../src/utils/diagnostics.js";
import { describe, it, assert } from "vitest";
import { StatusCodes } from "../../../src/common/statusCodes.js";
import { TimeoutErrorCode } from "../../../src/request/TimeoutError.js";
import { addEntropy } from "../common/TestHelpers.js";

const endpoint = "https://excludedregiontest.documents.azure.com/";

const databaseAccountResponse = {
  headers: {
    "content-location": endpoint,
    "content-type": "application/json",
  },
  result: {
    _self: "",
    id: "excludedregiontest",
    _rid: "excludedregiontest.documents.azure.com",
    media: "//media/",
    addresses: "//addresses/",
    _dbs: "//dbs/",
    writableLocations: [
      {
        name: "East US",
        databaseAccountEndpoint: "https://excludedregiontest-eastus.documents.azure.com:443/",
      },
      {
        name: "Australia East",
        databaseAccountEndpoint:
          "https://excludedregiontest-australiaeast.documents.azure.com:443/",
      },
      {
        name: "West US",
        databaseAccountEndpoint: "https://excludedregiontest-westus.documents.azure.com:443/",
      },
    ],
    readableLocations: [
      {
        name: "East US",
        databaseAccountEndpoint: "https://excludedregiontest-eastus.documents.azure.com:443/",
      },
      {
        name: "Australia East",
        databaseAccountEndpoint:
          "https://excludedregiontest-australiaeast.documents.azure.com:443/",
      },
      {
        name: "West US",
        databaseAccountEndpoint: "https://excludedregiontest-westus.documents.azure.com:443/",
      },
    ],
    enableMultipleWriteLocations: true,
    userReplicationPolicy: {
      asyncReplication: false,
      minReplicaSetSize: 3,
      maxReplicasetSize: 4,
    },
    userConsistencyPolicy: {
      defaultConsistencyLevel: "Session",
    },
    systemReplicationPolicy: {
      minReplicaSetSize: 3,
      maxReplicasetSize: 4,
    },
    readPolicy: {
      primaryReadCoefficient: 1,
      secondaryReadCoefficient: 1,
    },
    queryEngineConfiguration: "{}",
  },
  code: 200,
  diagnostics: getEmptyCosmosDiagnostics(),
};

const collectionResponse = {
  headers: {},
  result: {
    id: "ExcludedRegionTestContainer",
    indexingPolicy: {
      indexingMode: "consistent",
      automatic: true,
      includedPaths: [{ path: "/*" }],
      excludedPaths: [{ path: '/"_etag"/?' }],
    },
    partitionKey: {
      paths: ["/_partitionKey"],
      kind: "Hash",
    },
    conflictResolutionPolicy: {
      mode: "LastWriterWins",
      conflictResolutionPath: "/_ts",
      conflictResolutionProcedure: "",
    },
    geospatialConfig: { type: "Geography" },
    _rid: "kdY4AIn8g54=",
    _ts: 1572274839,
    _self: "dbs/kdY4AA==/colls/kdY4AIn8g54=/",
    _etag: '"00007500-0000-0100-0000-5db702970000"',
    _docs: "docs/",
    _sprocs: "sprocs/",
    _triggers: "triggers/",
    _udfs: "udfs/",
    _conflicts: "conflicts/",
  },
  code: 200,
  diagnostics: getEmptyCosmosDiagnostics(),
};

const ServiceUnavailableResponse = {
  code: StatusCodes.ServiceUnavailable,
  result: [],
  headers: {},
  diagnostics: getEmptyCosmosDiagnostics(),
};

const TimeoutResponse = {
  code: TimeoutErrorCode,
  result: {},
  headers: {},
  diagnostics: getEmptyCosmosDiagnostics(),
};

const SuccessCreateResponse = {
  code: StatusCodes.Created,
  result: [],
  headers: {},
  diagnostics: getEmptyCosmosDiagnostics(),
};

const SuccessReadResponse = {
  code: StatusCodes.Ok,
  result: { Documents: [] as any[] },
  headers: {},
  diagnostics: getEmptyCosmosDiagnostics(),
};

const partitionKeyRangesResponse = {
  code: StatusCodes.Ok,
  result: {
    _rid: "kdY4AIn8g54=",
    PartitionKeyRanges: [
      {
        id: "0",
        minInclusive: "",
        maxExclusive: "FF",
        ridPrefix: 0,
        _self: "dbs/kdY4AA==/colls/kdY4AIn8g54=/pkranges/kdY4AIn8g54CAAAAAAAAAA==/",
        throughputFraction: 1,
        status: "online",
        parents: [],
        _ts: 1572274839,
      },
    ],
    _count: 1,
  },
  headers: {},
  diagnostics: getEmptyCosmosDiagnostics(),
};

const changeFeedResponse = {
  code: StatusCodes.Ok,
  result: {
    Documents: [
      { id: "doc1", _partitionKey: "pk1" },
      { id: "doc2", _partitionKey: "pk2" },
    ],
    _count: 2,
  },
  headers: {
    "x-ms-continuation": "continuation-token",
    etag: '"etag-value"',
  },
  diagnostics: getEmptyCosmosDiagnostics(),
};

const changeFeedEmptyResponse = {
  code: StatusCodes.NotModified,
  result: {
    Documents: [],
    _count: 0,
  },
  headers: {},
  diagnostics: getEmptyCosmosDiagnostics(),
};

const options: CosmosClientOptions = {
  endpoint,
  key: masterKey,
  connectionPolicy: {
    preferredLocations: ["East US", "Australia East", "West US"],
    enablePartitionLevelFailover: false,
    enablePartitionLevelCircuitBreaker: false,
  },
};

const options1: CosmosClientOptions = {
  endpoint,
  key: masterKey,
  connectionPolicy: {
    enablePartitionLevelFailover: false,
    enablePartitionLevelCircuitBreaker: false,
  },
};

const options2: CosmosClientOptions = {
  endpoint,
  key: masterKey,
  connectionPolicy: {
    preferredLocations: ["East US", "Australia East"],
    enablePartitionLevelFailover: false,
    enablePartitionLevelCircuitBreaker: false,
  },
};

describe("Excluded Region tests", { timeout: 30000 }, () => {
  it("Request-level excludedLocations for READ", async () => {
    const endpointTracker = { lastEndpointCalled: "" };
    const responses = [
      databaseAccountResponse,
      SuccessReadResponse,
      ServiceUnavailableResponse,
      SuccessReadResponse,
      TimeoutResponse,
      TimeoutResponse,
      SuccessReadResponse,
    ];
    const plugins = getPlugins(responses, endpointTracker);
    const client = new CosmosClient({
      ...options,
      plugins,
    } as any);
    const writeEndpoint = await client.getWriteEndpoint();
    assert.equal(
      writeEndpoint,
      "https://excludedregiontest-eastus.documents.azure.com:443/",
      "Should use request-level excluded region",
    );
    await client
      .database("foo")
      .container("foo")
      .item("id", "sample1")
      .read({
        excludedLocations: ["Australia East"],
      } as any);
    assert.equal(
      endpointTracker.lastEndpointCalled,
      "https://excludedregiontest-eastus.documents.azure.com:443/",
      "Should use East US region for READ operation",
    );
    await client
      .database("foo")
      .container("foo")
      .item("id", "sample1")
      .read({
        excludedLocations: ["Australia East"],
      } as any);
    assert.equal(
      endpointTracker.lastEndpointCalled,
      "https://excludedregiontest-westus.documents.azure.com:443/",
      "Should use West US region for READ operation",
    );
    await client
      .database("foo")
      .container("foo")
      .item("id", "sample1")
      .read({
        excludedLocations: ["Australia East"],
      } as any);
    assert.equal(
      endpointTracker.lastEndpointCalled,
      "https://excludedregiontest-eastus.documents.azure.com:443/",
      "Should use East US region for READ operation",
    );
    client.dispose();
  });
  it("Request-level excludedLocations for CREATE", async () => {
    const endpointTracker = { lastEndpointCalled: "" };
    const responses = [
      databaseAccountResponse,
      collectionResponse,
      SuccessCreateResponse,
      ServiceUnavailableResponse,
      SuccessCreateResponse,
    ];
    const plugins = getPlugins(responses, endpointTracker);
    const client = new CosmosClient({
      ...options,
      plugins,
    } as any);
    const writeEndpoint = await client.getWriteEndpoint();
    assert.equal(
      writeEndpoint,
      "https://excludedregiontest-eastus.documents.azure.com:443/",
      "Should use request-level excluded region",
    );
    const requestOptions = { excludedLocations: ["Australia East"] };
    await client
      .database("foo")
      .container("foo")
      .items.create({ id: "item1", _partitionKey: "cat1" }, requestOptions);
    assert.equal(
      endpointTracker.lastEndpointCalled,
      "https://excludedregiontest-eastus.documents.azure.com:443/",
      "Should use East US region for CREATE operation",
    );
    await client
      .database("foo")
      .container("foo")
      .items.create({ id: "item2", _partitionKey: "cat2" }, requestOptions);
    assert.equal(
      endpointTracker.lastEndpointCalled,
      "https://excludedregiontest-westus.documents.azure.com:443/",
      "Should use West US region for CREATE operation",
    );
    client.dispose();
  });
  it("Request-level excludedLocations for UPSERT", async () => {
    const endpointTracker = { lastEndpointCalled: "" };
    const responses = [
      databaseAccountResponse,
      collectionResponse,
      SuccessCreateResponse,
      ServiceUnavailableResponse,
      SuccessCreateResponse,
    ];
    const plugins = getPlugins(responses, endpointTracker);
    const client = new CosmosClient({
      ...options,
      plugins,
    } as any);
    const writeEndpoint = await client.getWriteEndpoint();
    assert.equal(
      writeEndpoint,
      "https://excludedregiontest-eastus.documents.azure.com:443/",
      "Should use request-level excluded region",
    );
    const requestOptions = { excludedLocations: ["Australia East"] };
    await client
      .database("foo")
      .container("foo")
      .items.upsert({ id: "item1", _partitionKey: "cat1" }, requestOptions);
    assert.equal(
      endpointTracker.lastEndpointCalled,
      "https://excludedregiontest-eastus.documents.azure.com:443/",
      "Should use East US region for UPSERT operation",
    );
    await client
      .database("foo")
      .container("foo")
      .items.upsert({ id: "item2", _partitionKey: "cat2" }, requestOptions);
    assert.equal(
      endpointTracker.lastEndpointCalled,
      "https://excludedregiontest-westus.documents.azure.com:443/",
      "Should use West US region for UPSERT operation",
    );
    client.dispose();
  });
  it("Request-level excludedLocations for REPLACE", async () => {
    const endpointTracker = { lastEndpointCalled: "" };
    const responses = [
      databaseAccountResponse,
      collectionResponse,
      SuccessCreateResponse,
      ServiceUnavailableResponse,
      SuccessCreateResponse,
    ];
    const plugins = getPlugins(responses, endpointTracker);
    const client = new CosmosClient({
      ...options,
      plugins,
    } as any);
    const writeEndpoint = await client.getWriteEndpoint();
    assert.equal(
      writeEndpoint,
      "https://excludedregiontest-eastus.documents.azure.com:443/",
      "Should use request-level excluded region",
    );
    const requestOptions = { excludedLocations: ["Australia East"] };
    await client
      .database("foo")
      .container("foo")
      .item("item4")
      .replace({ id: "item1", _partitionKey: "cat1" }, requestOptions);
    assert.equal(
      endpointTracker.lastEndpointCalled,
      "https://excludedregiontest-eastus.documents.azure.com:443/",
      "Should use East US region for REPLACE operation",
    );
    await client
      .database("foo")
      .container("foo")
      .item("item4")
      .replace({ id: "item2", _partitionKey: "cat2" }, requestOptions);
    assert.equal(
      endpointTracker.lastEndpointCalled,
      "https://excludedregiontest-westus.documents.azure.com:443/",
      "Should use West US region for REPLACE operation",
    );
    client.dispose();
  });
  it("Request-level excludedLocations for DELETE", async () => {
    const endpointTracker = { lastEndpointCalled: "" };
    const responses = [
      databaseAccountResponse,
      collectionResponse,
      SuccessCreateResponse,
      ServiceUnavailableResponse,
      SuccessCreateResponse,
    ];
    const plugins = getPlugins(responses, endpointTracker);
    const client = new CosmosClient({
      ...options,
      plugins,
    } as any);
    const writeEndpoint = await client.getWriteEndpoint();
    assert.equal(
      writeEndpoint,
      "https://excludedregiontest-eastus.documents.azure.com:443/",
      "Should use request-level excluded region",
    );
    const requestOptions = { excludedLocations: ["Australia East"] };
    await client.database("foo").container("foo").item("item1").delete(requestOptions);
    assert.equal(
      endpointTracker.lastEndpointCalled,
      "https://excludedregiontest-eastus.documents.azure.com:443/",
      "Should use East US region for DELETE operation",
    );
    await client.database("foo").container("foo").item("item1").delete(requestOptions);
    assert.equal(
      endpointTracker.lastEndpointCalled,
      "https://excludedregiontest-westus.documents.azure.com:443/",
      "Should use West US region for DELETE operation",
    );
    client.dispose();
  });
  it("Request-level excludedLocations for PATCH", async () => {
    const endpointTracker = { lastEndpointCalled: "" };
    const responses = [
      databaseAccountResponse,
      SuccessCreateResponse,
      ServiceUnavailableResponse,
      SuccessCreateResponse,
    ];
    const plugins = getPlugins(responses, endpointTracker);
    const client = new CosmosClient({
      ...options,
      plugins,
    } as any);
    const writeEndpoint = await client.getWriteEndpoint();
    assert.equal(
      writeEndpoint,
      "https://excludedregiontest-eastus.documents.azure.com:443/",
      "Should use request-level excluded region",
    );
    const requestOptions = { excludedLocations: ["Australia East"] };
    await client
      .database("foo")
      .container("foo")
      .item("item5", "cat5")
      .patch(
        [
          { op: "add", path: "/status", value: "active" },
          { op: "replace", path: "/lastModified", value: new Date().toISOString() },
        ],
        requestOptions,
      );
    assert.equal(
      endpointTracker.lastEndpointCalled,
      "https://excludedregiontest-eastus.documents.azure.com:443/",
      "Should use East US region for patch operation",
    );
    await client
      .database("foo")
      .container("foo")
      .item("item5", "cat5")
      .patch(
        [
          { op: "add", path: "/status", value: "active" },
          { op: "replace", path: "/lastModified", value: new Date().toISOString() },
        ],
        requestOptions,
      );
    assert.equal(
      endpointTracker.lastEndpointCalled,
      "https://excludedregiontest-westus.documents.azure.com:443/",
      "Should use West US region for patch operation",
    );
    client.dispose();
  });
  it("Request-level excludedLocations for QUERY", async () => {
    const endpointTracker = { lastEndpointCalled: "" };
    const responses = [
      databaseAccountResponse,
      SuccessReadResponse,
      SuccessReadResponse,
      SuccessReadResponse,
      ServiceUnavailableResponse,
      SuccessReadResponse,
    ];
    const plugins = getPlugins(responses, endpointTracker);
    const client = new CosmosClient({ ...options, plugins } as any);
    const writeEndpoint = await client.getWriteEndpoint();
    assert.equal(
      writeEndpoint,
      "https://excludedregiontest-eastus.documents.azure.com:443/",
      "Should use request-level excluded region",
    );
    const requestOptions = { excludedLocations: ["Australia East"] };
    await client
      .database("foo")
      .container("foo")
      .items.query("SELECT * FROM c", requestOptions as any)
      .fetchAll();
    assert.equal(
      endpointTracker.lastEndpointCalled,
      "https://excludedregiontest-eastus.documents.azure.com:443/",
      "Should use East US region for query",
    );
    await client
      .database("foo")
      .container("foo")
      .items.query("SELECT * FROM c", requestOptions as any)
      .fetchAll();
    assert.equal(
      endpointTracker.lastEndpointCalled,
      "https://excludedregiontest-westus.documents.azure.com:443/",
      "Should use West US region for query",
    );
    client.dispose();
  });
  it("Request-level excludedLocations for BATCH", async () => {
    const endpointTracker = { lastEndpointCalled: "" };
    const responses = [
      databaseAccountResponse,
      SuccessCreateResponse,
      ServiceUnavailableResponse,
      SuccessCreateResponse,
    ];
    const plugins = getPlugins(responses, endpointTracker);
    const client = new CosmosClient({ ...options, plugins } as any);
    const writeEndpoint = await client.getWriteEndpoint();
    assert.equal(
      writeEndpoint,
      "https://excludedregiontest-eastus.documents.azure.com:443/",
      "Should use request-level excluded region",
    );
    const requestOptions = { excludedLocations: ["Australia East"] };
    await client
      .database("foo")
      .container("foo")
      .items.batch(
        [
          { operationType: "Create", resourceBody: { id: "b1" } },
          { operationType: "Upsert", resourceBody: { id: "b2" } },
          { operationType: "Delete", id: "b2" },
          { operationType: "Replace", id: "b1", resourceBody: { id: "b3" } },
          { operationType: "Read", id: "b3" },
        ],
        "pk1",
        requestOptions as any,
      );
    assert.equal(
      endpointTracker.lastEndpointCalled,
      "https://excludedregiontest-eastus.documents.azure.com:443/",
      "Should use East US region for first batch",
    );
    await client
      .database("foo")
      .container("foo")
      .items.batch(
        [
          { operationType: "Create", resourceBody: { id: "b1" } },
          { operationType: "Upsert", resourceBody: { id: "b2" } },
          { operationType: "Delete", id: "b2" },
          { operationType: "Replace", id: "b1", resourceBody: { id: "b3" } },
          { operationType: "Read", id: "b3" },
        ],
        "pk1",
        requestOptions as any,
      );
    assert.equal(
      endpointTracker.lastEndpointCalled,
      "https://excludedregiontest-westus.documents.azure.com:443/",
      "Should use West US region for retry after 503",
    );
    client.dispose();
  });
  it("Request-level excludedLocations for READALL", async () => {
    const endpointTracker = { lastEndpointCalled: "" };
    const responses = [
      databaseAccountResponse,
      SuccessReadResponse,
      SuccessReadResponse,
      SuccessReadResponse,
      ServiceUnavailableResponse,
      SuccessReadResponse,
    ];
    const plugins = getPlugins(responses, endpointTracker);
    const client = new CosmosClient({
      ...options,
      plugins,
    } as any);
    const writeEndpoint = await client.getWriteEndpoint();
    assert.equal(
      writeEndpoint,
      "https://excludedregiontest-eastus.documents.azure.com:443/",
      "Should use request-level excluded region",
    );
    const requestOptions = { excludedLocations: ["Australia East"] };
    const iterator = client.database("foo").container("foo").items.readAll(requestOptions);
    await iterator.fetchNext();
    assert.equal(
      endpointTracker.lastEndpointCalled,
      "https://excludedregiontest-eastus.documents.azure.com:443/",
      "Should use East US region for READALL operation",
    );
    const iterator1 = client.database("foo").container("foo").items.readAll(requestOptions);
    await iterator1.fetchNext();
    assert.equal(
      endpointTracker.lastEndpointCalled,
      "https://excludedregiontest-westus.documents.azure.com:443/",
      "Should use West US region for READALL operation",
    );
    client.dispose();
  });
  it("Request-level empty excludedLocations", async () => {
    const endpointTracker = { lastEndpointCalled: "" };
    const responses = [
      databaseAccountResponse,
      SuccessReadResponse,
      ServiceUnavailableResponse,
      SuccessReadResponse,
      TimeoutResponse,
      TimeoutResponse,
      SuccessReadResponse,
    ];
    const plugins = getPlugins(responses, endpointTracker);
    const client = new CosmosClient({
      ...options,
      plugins,
    } as any);
    const writeEndpoint = await client.getWriteEndpoint();
    assert.equal(
      writeEndpoint,
      "https://excludedregiontest-eastus.documents.azure.com:443/",
      "Request-level empty excludedLocations",
    );
    await client
      .database("foo")
      .container("foo")
      .item("id", "sample1")
      .read({
        excludedLocations: [],
      } as any);
    assert.equal(
      endpointTracker.lastEndpointCalled,
      "https://excludedregiontest-eastus.documents.azure.com:443/",
      "Should use East US region for READ operation",
    );
    await client
      .database("foo")
      .container("foo")
      .item("id", "sample1")
      .read({
        excludedLocations: [],
      } as any);
    assert.equal(
      endpointTracker.lastEndpointCalled,
      "https://excludedregiontest-australiaeast.documents.azure.com:443/",
      "Should use Australia East region for READ operation",
    );
    await client
      .database("foo")
      .container("foo")
      .item("id", "sample1")
      .read({
        excludedLocations: [],
      } as any);
    assert.equal(
      endpointTracker.lastEndpointCalled,
      "https://excludedregiontest-westus.documents.azure.com:443/",
      "Should use West US region for READ operation",
    );
    client.dispose();
  });
  it("Request-level excludedLocations without preferredLocations", async () => {
    const endpointTracker = { lastEndpointCalled: "" };
    const responses = [
      databaseAccountResponse,
      SuccessReadResponse,
      SuccessReadResponse,
      TimeoutResponse,
      TimeoutResponse,
      SuccessReadResponse,
    ];
    const plugins = getPlugins(responses, endpointTracker);
    const client = new CosmosClient({
      ...options1,
      plugins,
    } as any);
    const writeEndpoint = await client.getWriteEndpoint();
    assert.equal(
      writeEndpoint,
      "https://excludedregiontest-eastus.documents.azure.com:443/",
      "Should use request-level excluded region",
    );
    await client
      .database("foo")
      .container("foo")
      .item("id", "sample1")
      .read({
        excludedLocations: ["Australia East", "East US"],
      } as any);
    assert.equal(
      endpointTracker.lastEndpointCalled,
      "https://excludedregiontest-westus.documents.azure.com:443/",
      "Should use West US region for READ operation",
    );
    await client
      .database("foo")
      .container("foo")
      .item("id", "sample1")
      .read({
        excludedLocations: ["Australia East", "East US", "West US"],
      } as any);
    assert.equal(
      endpointTracker.lastEndpointCalled,
      "https://excludedregiontest.documents.azure.com/",
      "Should use default endpoint for READ operation",
    );
    await client
      .database("foo")
      .container("foo")
      .item("id", "sample1")
      .read({
        excludedLocations: ["Australia East", "West US"],
      } as any);
    assert.equal(
      endpointTracker.lastEndpointCalled,
      "https://excludedregiontest.documents.azure.com/",
      "Should use default endpoint for READ operation",
    );
    client.dispose();
  });
  it("Request-level excludedLocations with preferredLocations", async () => {
    const endpointTracker = { lastEndpointCalled: "" };
    const responses = [
      databaseAccountResponse,
      SuccessReadResponse,
      SuccessReadResponse,
      TimeoutResponse,
      TimeoutResponse,
      SuccessReadResponse,
    ];
    const plugins = getPlugins(responses, endpointTracker);
    const client = new CosmosClient({
      ...options2,
      plugins,
    } as any);
    const writeEndpoint = await client.getWriteEndpoint();
    assert.equal(
      writeEndpoint,
      "https://excludedregiontest-eastus.documents.azure.com:443/",
      "Should use request-level excluded region",
    );
    await client
      .database("foo")
      .container("foo")
      .item("id", "sample1")
      .read({
        excludedLocations: ["East US"],
      } as any);
    assert.equal(
      endpointTracker.lastEndpointCalled,
      "https://excludedregiontest-australiaeast.documents.azure.com:443/",
      "Should use Australia East region for READ operation",
    );
    await client
      .database("foo")
      .container("foo")
      .item("id", "sample1")
      .read({
        excludedLocations: ["Australia East", "East US"],
      } as any);
    assert.equal(
      endpointTracker.lastEndpointCalled,
      "https://excludedregiontest-westus.documents.azure.com:443/",
      "Should use West US region for READ operation",
    );
    await client
      .database("foo")
      .container("foo")
      .item("id", "sample1")
      .read({
        excludedLocations: ["Australia East", "West US", "East US"],
      } as any);
    assert.equal(
      endpointTracker.lastEndpointCalled,
      "https://excludedregiontest.documents.azure.com/",
      "Should use default endpoint for READ operation",
    );
    client.dispose();
  });

  it("Request-level excludedLocations for CHANGEFEED When EAST US is excluded", async () => {
    const endpointTracker = { lastEndpointCalled: "" };

    const responses = [
      databaseAccountResponse,
      collectionResponse,
      partitionKeyRangesResponse,
      changeFeedResponse,
      ServiceUnavailableResponse,
      changeFeedResponse,
      TimeoutResponse,
      changeFeedEmptyResponse,
    ];

    const plugins = getPlugins(responses, endpointTracker);
    const client = new CosmosClient({
      ...options,
      plugins,
    } as any);

    await client.getWriteEndpoint();

    const changeFeedIteratorOptions = {
      excludedLocations: ["East US"],
      maxItemCount: 12,
      changeFeedStartFrom: ChangeFeedStartFrom.Beginning(), // Mandatory parameter
    };

    const container = client.database("foo").container("foo");
    const iterator = container.items.getChangeFeedIterator(changeFeedIteratorOptions);

    let iterationCount = 0;
    while (iterator.hasMoreResults && iterationCount < 5) {
      const response = await iterator.readNext();
      const { result: items } = response;
      if (items.length > 0) {
        if (iterationCount === 0) {
          assert.equal(
            endpointTracker.lastEndpointCalled,
            "https://excludedregiontest-australiaeast.documents.azure.com:443/",
            "Should use Australia East when East US is excluded",
          );
        }
        if (iterationCount === 1) {
          assert.equal(
            endpointTracker.lastEndpointCalled,
            "https://excludedregiontest-westus.documents.azure.com:443/",
            "Should use West US when Australia East is not available and East US is excluded",
          );
        }
        if (iterationCount === 1) {
          assert.equal(
            endpointTracker.lastEndpointCalled,
            "https://excludedregiontest-westus.documents.azure.com:443/",
            "Should use West US when Australia East is timed out and East US is excluded",
          );
        }
      }

      // Exit when no more changes
      if (items.length === 0) {
        break;
      }

      iterationCount++;
    }

    client.dispose();
  });

  it("Request-level excludedLocations for CHANGEFEED When All Preferred Regions are excluded", async () => {
    const endpointTracker = { lastEndpointCalled: "" };

    const responses = [
      databaseAccountResponse,
      collectionResponse,
      partitionKeyRangesResponse,
      changeFeedResponse,
      ServiceUnavailableResponse,
      changeFeedResponse,
      TimeoutResponse,
      changeFeedEmptyResponse,
    ];

    const plugins = getPlugins(responses, endpointTracker);
    const client = new CosmosClient({
      ...options,
      plugins,
    } as any);

    await client.getWriteEndpoint();

    const changeFeedIteratorOptions = {
      excludedLocations: ["East US", "West US", "Australia East"],
      maxItemCount: 12,
      changeFeedStartFrom: ChangeFeedStartFrom.Beginning(), // Mandatory parameter
    };

    const container = client.database("foo").container("foo");
    const iterator = container.items.getChangeFeedIterator(changeFeedIteratorOptions);

    let iterationCount = 0;
    while (iterator.hasMoreResults && iterationCount < 5) {
      const response = await iterator.readNext();
      const { result: items } = response;
      if (items.length > 0) {
        assert.equal(
          endpointTracker.lastEndpointCalled,
          "https://excludedregiontest.documents.azure.com/",
          "Should use default endpoint when All Regions are excluded",
        );
      }

      // Exit when no more changes
      if (items.length === 0) {
        break;
      }

      iterationCount++;
    }

    client.dispose();
  });

  it("Request-level excludedLocations for BULK Create/Upsert/Delete", async () => {
    const endpointTracker = { lastEndpointCalled: "" };
    const responses = [
      databaseAccountResponse,
      collectionResponse,
      partitionKeyRangesResponse,
      SuccessCreateResponse,
      ServiceUnavailableResponse,
      SuccessCreateResponse,
    ];
    const plugins = getPlugins(responses, endpointTracker);
    const client = new CosmosClient({
      ...options,
      plugins,
    } as any);
    const writeEndpoint = await client.getWriteEndpoint();
    assert.equal(
      writeEndpoint,
      "https://excludedregiontest-eastus.documents.azure.com:443/",
      "Should use request-level excluded region for bulk setup",
    );
    const requestOptions = { excludedLocations: ["Australia East"] };

    const createItemId = addEntropy("createItem");
    const upsertItemId = addEntropy("upsertItem");
    const deleteItemId = addEntropy("deleteItem");
    const items = [
      {
        operationType: BulkOperationType.Create,
        resourceBody: {
          id: createItemId,
          nested: {
            key: "A",
          },
        },
        partitionKey: "pk2",
      },
      {
        operationType: BulkOperationType.Upsert,
        resourceBody: {
          id: upsertItemId,
          nested: {
            key: false,
          },
        },
        partitionKey: "pk2",
      },
      {
        operationType: BulkOperationType.Delete,
        id: deleteItemId,
        partitionKey: "pk2",
      },
    ];
    // First bulk call
    await client
      .database("foo")
      .container("foo")
      .items.executeBulkOperations(items, requestOptions);
    assert.equal(
      endpointTracker.lastEndpointCalled,
      "https://excludedregiontest-eastus.documents.azure.com:443/",
      "Should use East US region for first bulk",
    );
    // Second bulk call (simulate failover)
    await client
      .database("foo")
      .container("foo")
      .items.executeBulkOperations(items, requestOptions);
    assert.equal(
      endpointTracker.lastEndpointCalled,
      "https://excludedregiontest-westus.documents.azure.com:443/",
      "Should use West US region for retry after 503 in bulk",
    );
    client.dispose();
  });
});

function getPlugins(
  responses: any[],
  endpointTracker: { lastEndpointCalled: string },
): {
  on: PluginOn;
  plugin: (context: RequestContext) => Promise<any>;
}[] {
  let requestIndex = 0;
  const plugins = [
    {
      on: PluginOn.request,
      plugin: async (context: RequestContext) => {
        const response = responses[requestIndex];
        requestIndex++;
        if (context.endpoint) {
          endpointTracker.lastEndpointCalled = context.endpoint;
        }
        if (typeof response.code === "number" && response.code > 400) {
          throw response;
        } else if (response.code === TimeoutErrorCode) {
          throw response;
        }
        return response;
      },
    },
  ];
  return plugins;
}
