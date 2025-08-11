// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RequestContext } from "../../../src/index.js";
import { CosmosClient } from "../../../src/index.js";
import { masterKey } from "../common/_fakeTestSecrets.js";
import type { CosmosClientOptions } from "../../../src/index.js";
import { PluginOn } from "../../../src/index.js";
import { getEmptyCosmosDiagnostics } from "../../../src/utils/diagnostics.js";
import { describe, it, assert } from "vitest";
import { StatusCodes } from "../../../src/common/statusCodes.js";
import { TimeoutErrorCode } from "../../../src/request/TimeoutError.js";

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

const readPartitionKeyRangesResponse = {
  code: 200,
  result: {
    PartitionKeyRanges: [
      {
        _rid: "JAY0AJIzFhACAAAAAAAAUA==",
        id: "0",
        _etag: '"0100f742-0000-4d00-0000-680875d90000"',
        minInclusive: "",
        maxExclusive: "05C1DFFFFFFFFC",
        ridPrefix: 0,
        _self: "dbs/JAY0AA==/colls/JAY0AJIzFhA=/pkranges/JAY0AJIzFhACAAAAAAAAUA==/",
        throughputFraction: 0.5,
        status: "online",
        parents: [] as unknown[],
        ownedArchivalPKRangeIds: [] as unknown[],
        _ts: 1745384921,
        lsn: 5330,
      },
      {
        _rid: "JAY0AJIzFhADAAAAAAAAUA==",
        id: "1",
        _etag: '"0100f842-0000-4d00-0000-680875d90000"',
        minInclusive: "05C1DFFFFFFFFC",
        maxExclusive: "FF",
        ridPrefix: 1,
        _self: "dbs/JAY0AA==/colls/JAY0AJIzFhA=/pkranges/JAY0AJIzFhADAAAAAAAAUA==/",
        throughputFraction: 0.5,
        status: "online",
        parents: [] as unknown[],
        ownedArchivalPKRangeIds: [] as unknown[],
        _ts: 1745384921,
        lsn: 5330,
      },
    ],
  },
  headers: {},
  diagnostics: getEmptyCosmosDiagnostics(),
};

const ServiceUnavailableResponse = {
  code: StatusCodes.ServiceUnavailable,
  result: {},
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
  result: {},
  headers: {},
  diagnostics: getEmptyCosmosDiagnostics(),
};

const SuccessReadResponse = {
  code: StatusCodes.Ok,
  result: {},
  headers: {},
  diagnostics: getEmptyCosmosDiagnostics(),
};

const SuccessResponse = {
  code: StatusCodes.Ok,
  result: {},
  headers: {},
  diagnostics: getEmptyCosmosDiagnostics(),
};

const options: CosmosClientOptions = {
  endpoint,
  key: masterKey,
  connectionPolicy: {
    preferredLocations: ["East US", "Australia East", "West US"],
    excludedLocations: ["West US", "East US"], // Exclude West US and East US at client level
  },
};

describe("Excluded Region tests", { timeout: 30000 }, () => {
  it("Request-level excludedLocations should override client-level for READ", async () => {
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
      "https://excludedregiontest-australiaeast.documents.azure.com:443/",
      "Should use request-level excluded region for READ operation",
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
      "Should use request-level excluded region for READ operation",
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
      "Should use request-level excluded region for READ operation",
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
      "Should use request-level excluded region for READ operation",
    );
    client.dispose();
  });

  it("Request-level excludedLocations should override client-level for CREATE", async () => {
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
      "https://excludedregiontest-australiaeast.documents.azure.com:443/",
      "Should use request-level excluded region for CREATE operation",
    );
    const requestOptions = { excludedLocations: ["Australia East"] };
    await client
      .database("foo")
      .container("foo")
      .items.create({ id: "item1", _partitionKey: "cat1" }, requestOptions);
    assert.equal(
      endpointTracker.lastEndpointCalled,
      "https://excludedregiontest-eastus.documents.azure.com:443/",
      "Should use request-level excluded region for CREATE operation",
    );
    await client
      .database("foo")
      .container("foo")
      .items.create({ id: "item2", _partitionKey: "cat2" }, requestOptions);
    assert.equal(
      endpointTracker.lastEndpointCalled,
      "https://excludedregiontest-westus.documents.azure.com:443/",
      "Should use request-level excluded region for CREATE operation",
    );
    client.dispose();
  });

  it("Request-level excludedLocations should override client-level for UPSERT", async () => {
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
      "https://excludedregiontest-australiaeast.documents.azure.com:443/",
      "Should use request-level excluded region for UPSERT operation",
    );
    const requestOptions = { excludedLocations: ["Australia East"] };
    await client
      .database("foo")
      .container("foo")
      .items.upsert({ id: "item1", _partitionKey: "cat1" }, requestOptions);
    assert.equal(
      endpointTracker.lastEndpointCalled,
      "https://excludedregiontest-eastus.documents.azure.com:443/",
      "Should use request-level excluded region for UPSERT operation",
    );
    await client
      .database("foo")
      .container("foo")
      .items.upsert({ id: "item2", _partitionKey: "cat2" }, requestOptions);
    assert.equal(
      endpointTracker.lastEndpointCalled,
      "https://excludedregiontest-westus.documents.azure.com:443/",
      "Should use request-level excluded region for UPSERT operation",
    );
    client.dispose();
  });

  it("Request-level excludedLocations should override client-level for REPLACE", async () => {
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
      "https://excludedregiontest-australiaeast.documents.azure.com:443/",
      "Should use request-level excluded region for REPLACE operation",
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
      "Should use request-level excluded region for REPLACE operation",
    );
    await client
      .database("foo")
      .container("foo")
      .item("item4")
      .replace({ id: "item2", _partitionKey: "cat2" }, requestOptions);
    assert.equal(
      endpointTracker.lastEndpointCalled,
      "https://excludedregiontest-westus.documents.azure.com:443/",
      "Should use request-level excluded region for REPLACE operation",
    );
    client.dispose();
  });

  it("Request-level excludedLocations should override client-level for DELETE", async () => {
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
      "https://excludedregiontest-australiaeast.documents.azure.com:443/",
      "Should use request-level excluded region for DELETE operation",
    );
    const requestOptions = { excludedLocations: ["Australia East"] };
    await client.database("foo").container("foo").item("item1").delete(requestOptions);
    assert.equal(
      endpointTracker.lastEndpointCalled,
      "https://excludedregiontest-eastus.documents.azure.com:443/",
      "Should use request-level excluded region for DELETE operation",
    );
    await client.database("foo").container("foo").item("item1").delete(requestOptions);
    assert.equal(
      endpointTracker.lastEndpointCalled,
      "https://excludedregiontest-westus.documents.azure.com:443/",
      "Should use request-level excluded region for DELETE operation",
    );
    client.dispose();
  });

  it("Request-level excludedLocations should override client-level for PATCH", async () => {
    const endpointTracker = { lastEndpointCalled: "" };
    const responses = [
      databaseAccountResponse,
      // collectionResponse,
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
      "https://excludedregiontest-australiaeast.documents.azure.com:443/",
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
      "Should use request-level excluded region for patch operation",
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
      "Should use request-level excluded region for patch operation",
    );
    client.dispose();
  });

  it("Request-level excludedLocations should override client-level for READALL", async () => {
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
      "https://excludedregiontest-australiaeast.documents.azure.com:443/",
      "Should use request-level excluded region",
    );

    const requestOptions = { excludedLocations: ["Australia East"] };

    const iterator = client.database("foo").container("foo").items.readAll(requestOptions);
    await iterator.fetchNext();

    assert.equal(
      endpointTracker.lastEndpointCalled,
      "https://excludedregiontest-eastus.documents.azure.com:443/",
      "Should use request-level excluded region for READALL operation",
    );

    const iterator1 = client.database("foo").container("foo").items.readAll(requestOptions);
    await iterator1.fetchNext();

    assert.equal(
      endpointTracker.lastEndpointCalled,
      "https://excludedregiontest-westus.documents.azure.com:443/",
      "Should use request-level excluded region for READALL operation",
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
