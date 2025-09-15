// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosClient } from "../../../src/index.js";
import { masterKey } from "../common/_fakeTestSecrets.js";
import type { PluginConfig, CosmosClientOptions } from "../../../src/index.js";
import { PluginOn } from "../../../src/index.js";
import { getEmptyCosmosDiagnostics } from "../../../src/utils/diagnostics.js";
import { describe, it, assert } from "vitest";

const endpoint = "https://failovertest.documents.azure.com/";

// This needs to be a function so the SDK plugin gets a fresh response each time and cannot mutate it
const databaseAccountResponse = {
  headers: {
    "content-location": "https://failovertest.documents.azure.com/",
    "content-type": "application/json",
  },
  result: {
    _self: "",
    id: "failovertest",
    _rid: "failovertest.documents.azure.com",
    media: "//media/",
    addresses: "//addresses/",
    _dbs: "//dbs/",
    writableLocations: [
      {
        name: "East US",
        databaseAccountEndpoint: "https://failovertest-eastus.documents.azure.com:443/",
      },
      {
        name: "Australia East",
        databaseAccountEndpoint: "https://failovertest-australiaeast.documents.azure.com:443/",
      },
    ],
    readableLocations: [
      {
        name: "East US",
        databaseAccountEndpoint: "https://failovertest-eastus.documents.azure.com:443/",
      },
      {
        name: "Australia East",
        databaseAccountEndpoint: "https://failovertest-australiaeast.documents.azure.com:443/",
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
    queryEngineConfiguration:
      '{"maxSqlQueryInputLength":262144,"maxJoinsPerSqlQuery":5,"maxLogicalAndPerSqlQuery":500,"maxLogicalOrPerSqlQuery":500,"maxUdfRefPerSqlQuery":10,"maxInExpressionItemsCount":16000,"queryMaxInMemorySortDocumentCount":500,"maxQueryRequestTimeoutFraction":0.9,"sqlAllowNonFiniteNumbers":false,"sqlAllowAggregateFunctions":true,"sqlAllowSubQuery":true,"sqlAllowScalarSubQuery":true,"allowNewKeywords":true,"sqlAllowLike":false,"sqlAllowGroupByClause":true,"maxSpatialQueryCells":12,"spatialMaxGeometryPointCount":256,"sqlAllowTop":true,"enableSpatialIndexing":true}',
  },
  code: 200,
  diagnostics: getEmptyCosmosDiagnostics(),
};

const collectionResponse = {
  headers: {},
  result: {
    id: "RegionalFailover6198",
    indexingPolicy: {
      indexingMode: "consistent",
      automatic: true,
      includedPaths: [
        {
          path: "/*",
        },
      ],
      excludedPaths: [
        {
          path: '/"_etag"/?',
        },
      ],
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
    geospatialConfig: {
      type: "Geography",
    },
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

describe("Multi-region tests", { timeout: 30000 }, () => {
  it("Preferred locations should be honored for readEndpoint", async () => {
    let requestIndex = 0;
    let lastEndpointCalled = "";
    const responses = [
      databaseAccountResponse,
      databaseAccountResponse,
      collectionResponse,
      readPartitionKeyRangesResponse,
      { code: 200, result: {}, headers: {}, diagnostics: getEmptyCosmosDiagnostics() },
    ];
    const options: CosmosClientOptions = {
      endpoint,
      key: masterKey,
      connectionPolicy: { preferredLocations: ["Australia East"] },
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
    const currentReadEndpoint = await client.getReadEndpoint();
    assert.equal(
      currentReadEndpoint,
      "https://failovertest-australiaeast.documents.azure.com:443/",
    );
    await client.database("foo").container("foo").item("foo", undefined).read();
    assert.equal(lastEndpointCalled, "https://failovertest-australiaeast.documents.azure.com:443/");
    client.dispose();
  });

  it("Preferred locations should be honored for writeEndpoint", async () => {
    let requestIndex = 0;
    let lastEndpointCalled = "";
    const responses = [
      databaseAccountResponse,
      databaseAccountResponse,
      collectionResponse,
      {
        code: 200,
        result: {
          PartitionKeyRanges: [
            {
              minInclusive: "",
              maxExclusive: "FF",
            },
          ],
        },
        headers: {},
        diagnostics: getEmptyCosmosDiagnostics(),
      },
      { code: 201, result: {}, headers: {}, diagnostics: getEmptyCosmosDiagnostics() },
    ];
    const options: CosmosClientOptions = {
      endpoint,
      key: masterKey,
      connectionPolicy: { preferredLocations: ["Australia East"] },
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
    const writeEndpoint = await client.getWriteEndpoint();
    assert.equal(writeEndpoint, "https://failovertest-australiaeast.documents.azure.com:443/");
    await client.database("foo").container("foo").items.upsert({ id: "foo", _partitionKey: "bar" });
    assert.equal(lastEndpointCalled, "https://failovertest-australiaeast.documents.azure.com:443/");
    client.dispose();
  });
});
