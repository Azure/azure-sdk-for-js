// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosClient } from "../../../src/index.js";
import { masterKey } from "../common/_fakeTestSecrets.js";
import type { PluginConfig, CosmosClientOptions } from "../../../src/index.js";
import { PluginOn } from "../../../src/index.js";
import { getEmptyCosmosDiagnostics } from "../../../src/utils/diagnostics.js";
import { describe, it, assert } from "vitest";
import { StatusCodes } from "../../../src/common/statusCodes.js";

const endpoint = "https://ppcb.documents.azure.com/";

const databaseAccountResponse = {
  headers: {
    "content-location": "https://ppcb.documents.azure.com/",
    "content-type": "application/json",
  },
  result: {
    _self: "",
    id: "ppcb",
    _rid: "ppcb.documents.azure.com",
    media: "//media/",
    addresses: "//addresses/",
    _dbs: "//dbs/",
    writableLocations: [
      {
        name: "East US",
        databaseAccountEndpoint: "https://ppcb-eastus.documents.azure.com:443/",
      },
      {
        name: "Australia East",
        databaseAccountEndpoint: "https://ppcb-australiaeast.documents.azure.com:443/",
      },
      {
        name: "West US",
        databaseAccountEndpoint: "https://ppcb-westus.documents.azure.com:443/",
      },
    ],
    readableLocations: [
      {
        name: "East US",
        databaseAccountEndpoint: "https://ppcb-eastus.documents.azure.com:443/",
      },
      {
        name: "Australia East",
        databaseAccountEndpoint: "https://ppcb-australiaeast.documents.azure.com:443/",
      },
      {
        name: "West US",
        databaseAccountEndpoint: "https://ppcb-westus.documents.azure.com:443/",
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
    id: "ppcbcontainer",
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

const SuccessResponse = {
  code: StatusCodes.Created,
  result: {},
  headers: {},
  diagnostics: getEmptyCosmosDiagnostics(),
};

describe("Excluded Regions with PPCB", { timeout: 30000 }, () => {
  it("Request-level excludedLocations for PPCB", async () => {
    let requestIndex = 0;
    let lastEndpointCalled = "";

    const responses = [
      databaseAccountResponse,
      collectionResponse,
      readPartitionKeyRangesResponse,
      ...Array.from({ length: 11 }).flatMap(() => [ServiceUnavailableResponse, SuccessResponse]),

      SuccessResponse,

      ServiceUnavailableResponse,
      SuccessResponse,
    ];

    const options: CosmosClientOptions = {
      endpoint,
      key: masterKey,
      connectionPolicy: {
        preferredLocations: ["East US", "Australia East", "West US"],
        enablePartitionLevelFailover: true,
        enablePartitionLevelCircuitBreaker: true,
        useMultipleWriteLocations: true,
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
    const readEndpoint = await client.getReadEndpoint();

    // Let's assume we have three regions: East US, Australia East, and West US. We have a multi-master account.
    // Initially, the read region is set to East US.
    assert.equal(readEndpoint, "https://ppcb-eastus.documents.azure.com:443/");

    const requestOptions = { excludedLocations: ["Australia East"] };

    // Now, let's say East US goes down. In this case, we will receive a 503 error from the East US region.
    // We will not trigger a partition-level failover immediately. The failover will only be triggered if we receive more than 10 read failures within a 1-minute window.
    // The first 10 failed read requests will be retried according to our timeout retry policy and excluded regions.
    for (let i = 1; i <= 10; i++) {
      await client.database("foo").container("foo").item("id", "sample1").read(requestOptions);
      assert.equal(lastEndpointCalled, "https://ppcb-westus.documents.azure.com:443/");
    }

    // Once we receive the 11th read failure within the 1-minute window, we will trigger a partition-level failover.
    // From this point, requests will be sent to Australia East through partition-level override.
    await client.database("foo").container("foo").item("id", "sample1").read(requestOptions);
    assert.equal(lastEndpointCalled, "https://ppcb-australiaeast.documents.azure.com:443/");

    // Since the partition-level failover is now active, we will continue to send the requests directly to Australia East.
    await client.database("foo").container("foo").item("id", "sample1").read(requestOptions);
    assert.equal(lastEndpointCalled, "https://ppcb-australiaeast.documents.azure.com:443/");

    // Now, let's assume Australia East also goes down. We will update the partition-level failover settings to include Australia East in the list of failed regions.
    // As a result, requests will now be directed to West US.
    await client.database("foo").container("foo").item("id", "sample1").read(requestOptions);
    assert.equal(lastEndpointCalled, "https://ppcb-westus.documents.azure.com:443/");

    client.dispose();
  });
});
