// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosClient } from "../../../src/index.js";
import { masterKey } from "../common/_fakeTestSecrets.js";
import type { PluginConfig, CosmosClientOptions } from "../../../src/index.js";
import { PluginOn } from "../../../src/index.js";
import { getEmptyCosmosDiagnostics } from "../../../src/utils/diagnostics.js";
import { describe, it, assert } from "vitest";
import { StatusCodes, SubStatusCodes } from "../../../src/common/statusCodes.js";

const endpoint = "https://ppaf.documents.azure.com/";

const databaseAccountResponse = {
  headers: {
    "content-location": "https://ppaf.documents.azure.com/",
    "content-type": "application/json",
  },
  result: {
    _self: "",
    id: "ppaf",
    _rid: "ppaf.documents.azure.com",
    media: "//media/",
    addresses: "//addresses/",
    _dbs: "//dbs/",
    writableLocations: [
      {
        name: "East US",
        databaseAccountEndpoint: "https://ppaf-eastus.documents.azure.com:443/",
      },
    ],
    readableLocations: [
      {
        name: "East US",
        databaseAccountEndpoint: "https://ppaf-eastus.documents.azure.com:443/",
      },
      {
        name: "Australia East",
        databaseAccountEndpoint: "https://ppaf-australiaeast.documents.azure.com:443/",
      },
      {
        name: "West US",
        databaseAccountEndpoint: "https://ppaf-westus.documents.azure.com:443/",
      },
    ],
    enableMultipleWriteLocations: true,
    enablePerPartitionFailoverBehavior: true,
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
    id: "ppafcontainer",
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
      paths: ["/name"],
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
    isEncryptionInitialized: false,
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

const WriteForbiddenResponse = {
  code: StatusCodes.Forbidden,
  substatus: SubStatusCodes.WriteForbidden,
  result: {},
  headers: {},
  diagnostics: getEmptyCosmosDiagnostics(),
};

const SuccessResponse = {
  code: StatusCodes.Created,
  result: {},
  headers: {},
  diagnostics: getEmptyCosmosDiagnostics(),
};

describe("Per Partition Automatic Failover", { timeout: 30000 }, () => {
  it("ppaf", async () => {
    let requestIndex = 0;
    let lastEndpointCalled = "";

    const responses = [
      databaseAccountResponse,
      collectionResponse,
      readPartitionKeyRangesResponse,
      SuccessResponse,

      ServiceUnavailableResponse,
      SuccessResponse,

      SuccessResponse,

      WriteForbiddenResponse,
      WriteForbiddenResponse,
      databaseAccountResponse,
      SuccessResponse,
    ];

    const options: CosmosClientOptions = {
      endpoint,
      key: masterKey,
      connectionPolicy: {
        preferredLocations: ["West US", "Australia East"],
        enablePartitionLevelFailover: true,
        useMultipleWriteLocations: false,
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
    const writeEndpoint = await client.getWriteEndpoint();

    // Lets say we have three regions East US, Australia East and West US. Here we have a single master account.
    // Initially the write region is East US. So the write endpoint will be East US.
    assert.equal(writeEndpoint, "https://ppaf-eastus.documents.azure.com:443/");

    // Any write request will be directed to the write region i.e. East US.
    await client.database("foo").container("foo").items.upsert({ id: "foo", name: "sample1" });
    assert.equal(lastEndpointCalled, "https://ppaf-eastus.documents.azure.com:443/");

    // Now lets say on sending the next write request, the write region i.e. East US is not available. So we will receive a 503 error.
    // So for the partition key "sampele 2", we should failover to the next available region i.e. Australia East.
    // We will mark the East US region as unavailable for the "sample2" partition key and create an override pointing to the Australia East.
    // So on the next retry we will try to write to Australia East.
    await client.database("foo").container("foo").items.upsert({ id: "bar", name: "sample2" });
    assert.equal(lastEndpointCalled, "https://ppaf-australiaeast.documents.azure.com:443/");

    // Now since there is a write override for the "sample2" partition key, any further writes to the "sample2" partition key
    // will be directed to Australia East.
    await client.database("foo").container("foo").items.upsert({ id: "bar1", name: "sample2" });
    assert.equal(lastEndpointCalled, "https://ppaf-australiaeast.documents.azure.com:443/");

    // Now lets say the East US region is healthy. So we should fail back to the East US region as write region. On sending a write request to
    // australia east, we will get a 403.3 error. So we will mark the Australia East also as unavailable for the
    // "sample2" partition key and create an override pointing to the next available region i.e. West US. So on the next retry we will try to write to West US.
    // But since West US is also not the primary write region, it will also give a 403.3 error. So we will mark the West US region also as unavailable for the "sample2" partition key.
    // Since we have retried all the available regions, we will remove the overrides for the "sample2" partition key and try to write to the primary region i.e. East US.
    await client.database("foo").container("foo").items.upsert({ id: "bar2", name: "sample2" });
    assert.equal(writeEndpoint, "https://ppaf-eastus.documents.azure.com:443/");

    client.dispose();
  });
});
