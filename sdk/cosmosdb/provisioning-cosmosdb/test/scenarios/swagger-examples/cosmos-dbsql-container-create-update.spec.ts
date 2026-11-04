// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * Primary resource type: Microsoft.DocumentDB/databaseAccounts/sqlDatabases/containers
 * Primary schema key: Microsoft.DocumentDB/databaseAccounts/sqlDatabases/containers
 * Also covers: none
 * Scenario: swagger-examples/cosmos-dbsql-container-create-update
 * provisioning API: Container
 * Source: https://github.com/Azure/azure-rest-api-specs/blob/e070ec9b11d1417d83170393ec90d7122e343e0f/specification/cosmos-db/resource-manager/Microsoft.DocumentDB/DocumentDB/stable/2026-03-15/examples/CosmosDBSqlContainerCreateUpdate.json
 * Operation: SqlResources_CreateUpdateSqlContainer
 * Runtime baseline: cosmos-dbsql-container-create-update.test.baseline.bicep and cosmos-dbsql-container-create-update.test.baseline.json
 * Gap/reduction: none
 */

import { Container, DatabaseAccount, SqlDatabase } from "@azure/provisioning-cosmosdb";
import { describe, it } from "vitest";

import {
  createResourceGroupStack,
  createSubscriptionStack,
  expectRenderedOutputsToMatchBaselines,
  expectRenderedResourceToMatchSwaggerRequest,
  renderStackArtifacts,
} from "../../utils/index.js";

type BuildScenarioHelpers = {
  createResourceGroupStack: (name?: string) => import("@azure/provisioning-core").Stack;
  createSubscriptionStack: (name?: string) => import("@azure/provisioning-core").Stack;
  values: {
    subscriptionId: string;
    tenantId: string;
    objectId: string;
    principalId: string;
    clientId: string;
    resourceGroupName: string;
    location: string;
    secondaryLocation: string;
  };
};

const values = {
  subscriptionId: "00000000-0000-0000-0000-000000000000",
  tenantId: "11111111-1111-1111-1111-111111111111",
  objectId: "22222222-2222-2222-2222-222222222222",
  principalId: "33333333-3333-3333-3333-333333333333",
  clientId: "44444444-4444-4444-4444-444444444444",
  resourceGroupName: "rg-cdk-package-test",
  location: "eastus",
  secondaryLocation: "westus",
};

function buildScenarioStack({
  createResourceGroupStack,
  createSubscriptionStack,
  values,
}: BuildScenarioHelpers) {
  const stack = createResourceGroupStack();
  const resource0 = new DatabaseAccount(stack, {
    name: "databaseaccount-test",
    existing: true,
  });
  const resource1 = new SqlDatabase(resource0, {
    name: "sqldatabase-test",
    existing: true,
  });
  const resource2 = new Container(resource1, {
    name: "containerName",
    location: "West US",
    tags: {},
    properties: {
      resource: {
        id: "containerName",
        indexingPolicy: {
          indexingMode: "consistent",
          automatic: true,
          includedPaths: [
            {
              path: "/*",
              indexes: [
                { kind: "Range", dataType: "String", precision: -1 },
                { kind: "Range", dataType: "Number", precision: -1 },
              ],
            },
          ],
          excludedPaths: [],
          vectorIndexes: [
            { path: "/vectorPath1", type: "flat" },
            { path: "/vectorPath2", type: "quantizedFlat" },
            { path: "/vectorPath3", type: "diskANN" },
          ],
          fullTextIndexes: [{ path: "/ftPath1" }, { path: "/ftPath2" }, { path: "/ftPath3" }],
        },
        vectorEmbeddingPolicy: {
          vectorEmbeddings: [
            {
              path: "/vectorPath1",
              dataType: "float32",
              dimensions: 400,
              distanceFunction: "euclidean",
            },
            {
              path: "/vectorPath2",
              dataType: "uint8",
              dimensions: 512,
              distanceFunction: "cosine",
            },
            {
              path: "/vectorPath3",
              dataType: "int8",
              dimensions: 512,
              distanceFunction: "dotproduct",
            },
          ],
        },
        fullTextPolicy: {
          defaultLanguage: "1033",
          fullTextPaths: [
            { path: "/ftPath1", language: "en-US" },
            { path: "/ftPath2", language: "fr-FR" },
            { path: "/ftPath3", language: "de-DE" },
          ],
        },
        partitionKey: { paths: ["/AccountNumber"], kind: "Hash" },
        defaultTtl: 100,
        uniqueKeyPolicy: { uniqueKeys: [{ paths: ["/testPath"] }] },
        conflictResolutionPolicy: {
          mode: "LastWriterWins",
          conflictResolutionPath: "/path",
        },
        clientEncryptionPolicy: {
          includedPaths: [
            {
              path: "/path",
              clientEncryptionKeyId: "keyId",
              encryptionAlgorithm: "AEAD_AES_256_CBC_HMAC_SHA256",
              encryptionType: "Deterministic",
            },
          ],
          policyFormatVersion: 2,
        },
        computedProperties: [{ name: "cp_lowerName", query: "SELECT VALUE LOWER(c.name) FROM c" }],
      },
      options: {},
    },
  });
  stack.outputs.add("resource2Id", "string", resource2.id);
  return stack;
}

describe("swagger-examples/cosmos-dbsql-container-create-update", () => {
  it("renders the expected Bicep and serialization output", async () => {
    const stack = await buildScenarioStack({
      createResourceGroupStack,
      createSubscriptionStack,
      values,
    });
    const rendered = renderStackArtifacts(stack);

    expectRenderedResourceToMatchSwaggerRequest(import.meta.url, rendered.outputs, {
      resourceType: "Microsoft.DocumentDB/databaseAccounts/sqlDatabases/containers",
      apiVersion: "2026-03-15",
    });
    expectRenderedOutputsToMatchBaselines(import.meta.url, rendered.outputs);
  });
});
