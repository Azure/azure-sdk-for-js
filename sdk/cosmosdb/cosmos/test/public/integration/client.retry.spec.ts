// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RequestContext } from "../../../src/index.js";
import { CosmosClient } from "../../../src/index.js";
import { masterKey } from "../common/_fakeTestSecrets.js";
import { PluginOn } from "../../../src/index.js";
import { TimeoutErrorCode } from "../../../src/request/TimeoutError.js";
import { getEmptyCosmosDiagnostics } from "../../../src/utils/diagnostics.js";
import { describe, it, assert } from "vitest";

const endpoint = "https://failovertest.documents.azure.com/";

describe("RetryPolicy", () => {
  describe("Timeout Failover retry policy", () => {
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
    it("when 1st region endpoint becomes unseriviceable", async () => {
      const lastEndpointCalled: string[] = [];
      const responses = [
        databaseAccountResponse,
        collectionResponse,
        { code: 503, result: {}, headers: {}, diagnostics: getEmptyCosmosDiagnostics() },
        { code: 200, result: {}, headers: {}, diagnostics: getEmptyCosmosDiagnostics() },
      ];
      const options = {
        endpoint,
        key: masterKey,
        connectionPolicy: {
          enablePartitionLevelFailover: false,
          enablePartitionLevelCircuitBreaker: false,
        },
      };
      const plugins = getPlugins(responses, lastEndpointCalled);
      const client = new CosmosClient(Object.assign(Object.assign({}, options), { plugins }));
      await client
        .database("foo")
        .container("foo")
        .items.upsert({ id: "foo", _partitionKey: "bar" });
      assert.equal(lastEndpointCalled.length, 4);
      assert.equal(lastEndpointCalled[2], "https://failovertest-eastus.documents.azure.com:443/");
      assert.equal(
        lastEndpointCalled[3],
        "https://failovertest-australiaeast.documents.azure.com:443/",
      );
      client.dispose();
    });

    it("when both region endpoint becomes unserviceable", async () => {
      const lastEndpointCalled: string[] = [];
      const responses = [
        databaseAccountResponse,
        collectionResponse,
        { code: 503, result: {}, headers: {}, diagnostics: getEmptyCosmosDiagnostics() },
        { code: 503, result: {}, headers: {}, diagnostics: getEmptyCosmosDiagnostics() },
      ];
      const options = {
        endpoint,
        key: masterKey,
        connectionPolicy: {
          enablePartitionLevelFailover: false,
          enablePartitionLevelCircuitBreaker: false,
        },
      };
      const plugins = getPlugins(responses, lastEndpointCalled);
      const client = new CosmosClient({ ...options, plugins } as any);
      try {
        await client.database("foo").container("foo").item("foo", undefined).read();
      } catch (err) {
        assert.equal(err.code, 503);
      }
      client.dispose();
    });

    it("when both regions Timeout with retrial window", async () => {
      const responses = [
        databaseAccountResponse,
        collectionResponse,
        {
          code: TimeoutErrorCode,
          result: {},
          headers: {},
          diagnostics: getEmptyCosmosDiagnostics(),
        },
        {
          code: TimeoutErrorCode,
          result: {},
          headers: {},
          diagnostics: getEmptyCosmosDiagnostics(),
        },
        {
          code: TimeoutErrorCode,
          result: {},
          headers: {},
          diagnostics: getEmptyCosmosDiagnostics(),
        },
        {
          code: TimeoutErrorCode,
          result: {},
          headers: {},
          diagnostics: getEmptyCosmosDiagnostics(),
        },
        {
          code: TimeoutErrorCode,
          result: {},
          headers: {},
          diagnostics: getEmptyCosmosDiagnostics(),
        },
        {
          code: TimeoutErrorCode,
          result: {},
          headers: {},
          diagnostics: getEmptyCosmosDiagnostics(),
        },
        { code: 201, result: {}, headers: {}, diagnostics: getEmptyCosmosDiagnostics() },
      ];
      const options = {
        endpoint,
        key: masterKey,
        connectionPolicy: {
          enablePartitionLevelFailover: false,
          enablePartitionLevelCircuitBreaker: false,
        },
      };
      const lastEndpointCalled: string[] = [];
      const plugins = getPlugins(responses, lastEndpointCalled);
      const client = new CosmosClient({ ...options, plugins } as any);
      await client.database("foo").container("foo").item("foo", undefined).read();

      assert.equal(lastEndpointCalled.length, 9);
      assert.equal(
        lastEndpointCalled[lastEndpointCalled.length - 1],
        "https://failovertest-eastus.documents.azure.com:443/",
      );
      assert.equal(
        lastEndpointCalled[lastEndpointCalled.length - 2],
        "https://failovertest-australiaeast.documents.azure.com:443/",
      );
      assert.equal(
        lastEndpointCalled[lastEndpointCalled.length - 3],
        "https://failovertest-eastus.documents.azure.com:443/",
      );

      client.dispose();
    });

    it("timeout error thrown when retry count exceeds 120", async () => {
      const lastEndpointCalled: string[] = [];
      const responses = [
        databaseAccountResponse,
        collectionResponse,
        {
          code: TimeoutErrorCode,
          result: {},
          headers: {},
          diagnostics: getEmptyCosmosDiagnostics(),
        },
      ];
      // 120 is the max retry count
      for (let i = 0; i < 120; i++) {
        responses.push({
          code: TimeoutErrorCode,
          result: {},
          headers: {},
          diagnostics: getEmptyCosmosDiagnostics(),
        });
      }
      const options = {
        endpoint,
        key: masterKey,
        connectionPolicy: {
          enablePartitionLevelFailover: false,
          enablePartitionLevelCircuitBreaker: false,
        },
      };
      const plugins = getPlugins(responses, lastEndpointCalled);
      const client = new CosmosClient({ ...options, plugins } as any);
      try {
        await client.database("foo").container("foo").item("foo", undefined).read();
      } catch (err) {
        assert.equal(err.code, TimeoutErrorCode);
      }
      client.dispose();
    });
  });
});

function getPlugins(
  responses: any[],
  lastEndpointCalled: string[],
): {
  on: PluginOn;
  plugin: (context: RequestContext) => Promise<any>;
}[] {
  let index = 0;
  let requestIndex = 0;
  const plugins = [
    {
      on: PluginOn.request,
      plugin: async (context: RequestContext) => {
        const response = responses[requestIndex];
        requestIndex++;
        if (context.endpoint) {
          lastEndpointCalled[index++] = context.endpoint;
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
