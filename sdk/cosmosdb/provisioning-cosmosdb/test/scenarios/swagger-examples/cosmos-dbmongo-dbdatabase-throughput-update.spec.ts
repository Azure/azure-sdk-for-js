// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * Primary resource type: Microsoft.DocumentDB/databaseAccounts/mongodbDatabases/throughputSettings
 * Primary schema key: Microsoft.DocumentDB/databaseAccounts/mongodbDatabases/throughputSettings
 * Also covers: none
 * Scenario: swagger-examples/cosmos-dbmongo-dbdatabase-throughput-update
 * provisioning API: MongoDbDatabaseThroughputSetting
 * Source: https://github.com/Azure/azure-rest-api-specs/blob/e070ec9b11d1417d83170393ec90d7122e343e0f/specification/cosmos-db/resource-manager/Microsoft.DocumentDB/DocumentDB/stable/2026-03-15/examples/CosmosDBMongoDBDatabaseThroughputUpdate.json
 * Operation: MongoDBResources_UpdateMongoDBDatabaseThroughput
 * Runtime baseline: cosmos-dbmongo-dbdatabase-throughput-update.test.baseline.bicep and cosmos-dbmongo-dbdatabase-throughput-update.test.baseline.json
 * Gap/reduction: none
 */

import {
  DatabaseAccount,
  MongoDbDatabase,
  MongoDbDatabaseThroughputSetting,
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

function buildScenarioStack({ createResourceGroupStack }: BuildScenarioHelpers) {
  const stack = createResourceGroupStack();
  const resource0 = new DatabaseAccount(stack, {
    name: "databaseaccount-test",
    existing: true,
  });
  const resource1 = new MongoDbDatabase(resource0, {
    name: "mongodbdatabase-test",
    existing: true,
  });
  const resource2 = new MongoDbDatabaseThroughputSetting(resource1, {
    location: "West US",
    tags: {},
    properties: { resource: { throughput: 400 } },
  });
  stack.outputs.add("resource2Id", "string", resource2.id);
  return stack;
}

describe("swagger-examples/cosmos-dbmongo-dbdatabase-throughput-update", () => {
  it("renders the expected Bicep and serialization output", async () => {
    const stack = await buildScenarioStack({
      createResourceGroupStack,
      createSubscriptionStack,
      values,
    });
    const rendered = renderStackArtifacts(stack);

    expectRenderedResourceToMatchSwaggerRequest(import.meta.url, rendered.outputs, {
      resourceType: "Microsoft.DocumentDB/databaseAccounts/mongodbDatabases/throughputSettings",
      apiVersion: "2026-03-15",
    });
    expectRenderedOutputsToMatchBaselines(import.meta.url, rendered.outputs);
  });
});
