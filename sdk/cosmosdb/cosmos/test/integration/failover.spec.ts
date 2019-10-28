// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { Container } from "../../dist-esm/client";
import { bulkInsertItems, getTestContainer, removeAllDatabases } from "../common/TestHelpers";
import {
  Constants,
  CosmosClient,
  PluginOn,
  CosmosClientOptions,
  PluginConfig
} from "../../dist-esm";
import { masterKey, endpoint } from "../common/_testConfig";
import { SubStatusCodes } from "../../dist-esm/common";
import assert from "assert";

const generateDocuments = function(docSize: number) {
  const docs = [];
  for (let i = 0; i < docSize; i++) {
    docs.push({ id: i.toString() });
  }
  return docs;
};

const documentDefinitions = generateDocuments(1);

const databaseAccountResponse = {
  headers: {
    "content-location": "https://failovertest.documents.azure.com/",
    "content-type": "application/json"
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
        databaseAccountEndpoint: "https://failovertest-eastus.documents.azure.com:443/"
      },
      {
        name: "Australia East",
        databaseAccountEndpoint: "https://failovertest-australiaeast.documents.azure.com:443/"
      }
    ],
    readableLocations: [
      {
        name: "East US",
        databaseAccountEndpoint: "https://failovertest-eastus.documents.azure.com:443/"
      },
      {
        name: "Australia East",
        databaseAccountEndpoint: "https://failovertest-australiaeast.documents.azure.com:443/"
      }
    ],
    enableMultipleWriteLocations: true,
    userReplicationPolicy: {
      asyncReplication: false,
      minReplicaSetSize: 3,
      maxReplicasetSize: 4
    },
    userConsistencyPolicy: {
      defaultConsistencyLevel: "Session"
    },
    systemReplicationPolicy: {
      minReplicaSetSize: 3,
      maxReplicasetSize: 4
    },
    readPolicy: {
      primaryReadCoefficient: 1,
      secondaryReadCoefficient: 1
    },
    queryEngineConfiguration:
      '{"maxSqlQueryInputLength":262144,"maxJoinsPerSqlQuery":5,"maxLogicalAndPerSqlQuery":500,"maxLogicalOrPerSqlQuery":500,"maxUdfRefPerSqlQuery":10,"maxInExpressionItemsCount":16000,"queryMaxInMemorySortDocumentCount":500,"maxQueryRequestTimeoutFraction":0.9,"sqlAllowNonFiniteNumbers":false,"sqlAllowAggregateFunctions":true,"sqlAllowSubQuery":true,"sqlAllowScalarSubQuery":true,"allowNewKeywords":true,"sqlAllowLike":false,"sqlAllowGroupByClause":true,"maxSpatialQueryCells":12,"spatialMaxGeometryPointCount":256,"sqlAllowTop":true,"enableSpatialIndexing":true}'
  },
  code: 200
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
          path: "/*"
        }
      ],
      excludedPaths: [
        {
          path: '/"_etag"/?'
        }
      ]
    },
    partitionKey: {
      paths: ["/_partitionKey"],
      kind: "Hash"
    },
    conflictResolutionPolicy: {
      mode: "LastWriterWins",
      conflictResolutionPath: "/_ts",
      conflictResolutionProcedure: ""
    },
    geospatialConfig: {
      type: "Geography"
    },
    _rid: "kdY4AIn8g54=",
    _ts: 1572274839,
    _self: "dbs/kdY4AA==/colls/kdY4AIn8g54=/",
    _etag: '"00007500-0000-0100-0000-5db702970000"',
    _docs: "docs/",
    _sprocs: "sprocs/",
    _triggers: "triggers/",
    _udfs: "udfs/",
    _conflicts: "conflicts/"
  },
  code: 200
};

const readResponse = {
  headers: {},
  result: {
    id: "0",
    _rid: "kdY4AIn8g54BAAAAAAAAAA==",
    _self: "dbs/kdY4AA==/colls/kdY4AIn8g54=/docs/kdY4AIn8g54BAAAAAAAAAA==/",
    _etag: '"2400118c-0000-0100-0000-5db702980000"',
    _attachments: "attachments/",
    _ts: 1572274840
  },
  code: 200
};

const errorResponse = {
  code: "ENOTFOUND" as any,
  headers: {}
};

const responses = [
  databaseAccountResponse,
  collectionResponse,
  readResponse,
  errorResponse,
  databaseAccountResponse,
  readResponse
];

describe("Region Failover", () => {
  let container: Container;

  before(async function() {
    await removeAllDatabases();
    container = await getTestContainer("Regional Failover");
    await bulkInsertItems(container, documentDefinitions);
  });

  it("fails over to a second region", async () => {
    let requestIndex = 0;
    let lastEndpointCalled = "";
    const options: CosmosClientOptions = { endpoint, key: masterKey };
    const plugins: PluginConfig[] = [
      {
        on: PluginOn.request,
        plugin: async (context, next) => {
          console.log(requestIndex);
          const response = responses[requestIndex];
          lastEndpointCalled = context.endpoint;
          requestIndex++;
          if (response.code > 500 || response.code === "ENOTFOUND") {
            throw response;
          }
          return response;
        }
      }
    ];
    const client = new CosmosClient({
      ...options,
      plugins
    } as any);
    const containerRef = client.database(container.database.id).container(container.id);
    const { resource } = await containerRef.item(documentDefinitions[0].id, undefined).read();
    assert.strictEqual(lastEndpointCalled, "https://failovertest-eastus.documents.azure.com:443/");
    const { resource: resource2 } = await containerRef
      .item(documentDefinitions[0].id, undefined)
      .read();
    assert.strictEqual(
      lastEndpointCalled,
      "https://failovertest-australiaeast.documents.azure.com:443/"
    );
  });
});
