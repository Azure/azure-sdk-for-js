// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosClient } from "../../../src/index.js";
import { masterKey } from "../common/_fakeTestSecrets.js";
import type { PluginConfig, CosmosClientOptions } from "../../../src/index.js";
import { PluginOn } from "../../../src/index.js";
import { getEmptyCosmosDiagnostics } from "../../../src/utils/diagnostics.js";
import { describe, it, assert } from "vitest";

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

describe("Excluded Region tests", { timeout: 30000 }, () => {
  it("Client-level excludedLocations should be honoured if request-level is not set", async () => {
    let requestIndex = 0;
    let lastEndpointCalled = "";
    const responses = [
      databaseAccountResponse,
      collectionResponse,
      readPartitionKeyRangesResponse,
      {
        code: 201,
        result: { id: "item2", _partitionKey: "cat2" },
        headers: {},
        diagnostics: getEmptyCosmosDiagnostics(),
      }, // upsert
    ];
    const options: CosmosClientOptions = {
      endpoint,
      key: masterKey,
      connectionPolicy: {
        preferredLocations: ["East US", "Australia East", "West US"],
        excludedLocations: ["East US"],
      },
    };
    const plugins: PluginConfig[] = [
      {
        on: PluginOn.request,
        plugin: async (context, diagNode) => {
          assert.isDefined(diagNode, "DiagnosticsNode should not be undefined or null");
          const response = responses[requestIndex];
          if (context.endpoint) {
            lastEndpointCalled = context.endpoint;
          }
          requestIndex++;
          if (response.code > 400) {
            throw response;
          }
          return response;
        },
      },
    ];
    const client = new CosmosClient({
      ...options,
      plugins,
    } as any);
    // No request-level excludedLocations, so client-level exclusion applies
    const writeEndpoint = await client.getWriteEndpoint();
    assert.equal(
      writeEndpoint,
      "https://excludedregiontest-eastus.documents.azure.com:443/",
      "Should use client-level excluded region",
    );
    await client.database("foo").container("foo").items.upsert({ id: "foo", _partitionKey: "bar" });
    assert.equal(
      lastEndpointCalled,
      "https://excludedregiontest-eastus.documents.azure.com:443/",
      "Should use client-level excluded region",
    );
    client.dispose();
  });

  it("Request-level excludedLocations should override client-level", async () => {
    let requestIndex = 0;
    let lastEndpointCalled = "";
    const responses = [
      databaseAccountResponse,
      collectionResponse,
      readPartitionKeyRangesResponse,
      {
        code: 201,
        result: { id: "item4", _partitionKey: "cat4" },
        headers: {},
        diagnostics: getEmptyCosmosDiagnostics(),
      }, // upsert
    ];
    const options: CosmosClientOptions = {
      endpoint,
      key: masterKey,
      connectionPolicy: {
        preferredLocations: ["East US", "Australia East", "West US"],
        excludedLocations: ["West US", "East US"], // Exclude West US and East US at client level
      },
    };
    const plugins: PluginConfig[] = [
      {
        on: PluginOn.request,
        plugin: async (context, diagNode) => {
          assert.isDefined(diagNode, "DiagnosticsNode should not be undefined or null");
          const response = responses[requestIndex];
          if (context.endpoint) {
            lastEndpointCalled = context.endpoint;
          }
          requestIndex++;
          if (response.code > 400) {
            throw response;
          }
          return response;
        },
      },
    ];
    const client = new CosmosClient({
      ...options,
      plugins,
    } as any);
    // Exclude "Australia East" at request level, so "East US" should be used
    const writeEndpoint = await client.getWriteEndpoint();
    assert.equal(
      writeEndpoint,
      "https://excludedregiontest-eastus.documents.azure.com:443/",
      "Should use client-level excluded region",
    );
    await client
      .database("foo")
      .container("foo")
      .items.upsert({ id: "foo", _partitionKey: "bar" }, {
        excludedLocations: ["East US", "Australia East"],
      } as any);
    assert.equal(
      lastEndpointCalled,
      "https://excludedregiontest-eastus.documents.azure.com:443/",
      "Should use request-level excluded region",
    );
    client.dispose();
  });
});
