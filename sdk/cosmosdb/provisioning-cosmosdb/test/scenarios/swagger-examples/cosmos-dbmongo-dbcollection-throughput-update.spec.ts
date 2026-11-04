// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * Primary resource type: Microsoft.DocumentDB/databaseAccounts/mongodbDatabases/collections/throughputSettings
 * Primary schema key: Microsoft.DocumentDB/databaseAccounts/mongodbDatabases/collections/throughputSettings
 * Also covers: none
 * Scenario: swagger-examples/cosmos-dbmongo-dbcollection-throughput-update
 * provisioning API: MongoDbCollectionThroughputSetting
 * Source: https://github.com/Azure/azure-rest-api-specs/blob/e070ec9b11d1417d83170393ec90d7122e343e0f/specification/cosmos-db/resource-manager/Microsoft.DocumentDB/DocumentDB/stable/2026-03-15/examples/CosmosDBMongoDBCollectionThroughputUpdate.json
 * Operation: MongoDBResources_UpdateMongoDBCollectionThroughput
 * Runtime baseline: cosmos-dbmongo-dbcollection-throughput-update.test.baseline.bicep and cosmos-dbmongo-dbcollection-throughput-update.test.baseline.json
 * Gap/reduction: none
 */

import {
  Collection,
  MongoDbCollectionThroughputSetting,
  DatabaseAccount,
  MongoDbDatabase,
} from "@azure/provisioning-cosmosdb";
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
  const resource1 = new MongoDbDatabase(resource0, {
    name: "mongodbdatabase-test",
    existing: true,
  });
  const resource2 = new Collection(resource1, {
    name: "collection-test",
    existing: true,
  });
  const resource3 = new MongoDbCollectionThroughputSetting(resource2, {
    location: "West US",
    tags: {},
    properties: { resource: { throughput: 400 } },
  });
  stack.outputs.add("resource3Id", "string", resource3.id);
  return stack;
}

describe("swagger-examples/cosmos-dbmongo-dbcollection-throughput-update", () => {
  it("renders the expected Bicep and serialization output", async () => {
    const stack = await buildScenarioStack({
      createResourceGroupStack,
      createSubscriptionStack,
      values,
    });
    const rendered = renderStackArtifacts(stack);

    expectRenderedResourceToMatchSwaggerRequest(import.meta.url, rendered.outputs, {
      resourceType:
        "Microsoft.DocumentDB/databaseAccounts/mongodbDatabases/collections/throughputSettings",
      apiVersion: "2026-03-15",
    });
    expectRenderedOutputsToMatchBaselines(import.meta.url, rendered.outputs);
  });
});
