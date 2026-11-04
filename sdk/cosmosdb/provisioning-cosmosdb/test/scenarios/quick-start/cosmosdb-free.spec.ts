// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * Primary resource type: Microsoft.DocumentDB/databaseAccounts
 * Primary schema key: Microsoft.DocumentDB/databaseAccounts
 * Also covers: Microsoft.DocumentDB/databaseAccounts/sqlDatabases, Microsoft.DocumentDB/databaseAccounts/sqlDatabases/containers
 * Scenario: quick-start/cosmosdb-free
 * provisioning API: Container, DatabaseAccount, SqlDatabase
 * Source: https://github.com/Azure/azure-quickstart-templates/blob/9a286202372ff9a9a4f4465e1ef30d7b0f3650c6/quickstarts/microsoft.documentdb/cosmosdb-free/main.bicep
 * Source: https://github.com/Azure/azure-quickstart-templates/blob/9a286202372ff9a9a4f4465e1ef30d7b0f3650c6/quickstarts/microsoft.documentdb/cosmosdb-free/azuredeploy.json
 * Operation: n/a
 * Runtime baseline: cosmosdb-free.test.baseline.bicep and cosmosdb-free.test.baseline.json
 * Gap/reduction: Source API versions normalized to package API version; slash-delimited child names use public parent constructors.
 */

import { Container, DatabaseAccount, SqlDatabase } from "@azure/provisioning-cosmosdb";
import { fn } from "@azure/provisioning-core";
import { describe, it } from "vitest";

import {
  createResourceGroupStack,
  createSubscriptionStack,
  expectRenderOutputsToMatchSample,
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
  const p_accountName = stack.parameters.add("accountName", "string", {
    defaultValue: fn.format("cosmos-{0}", fn.uniqueString(fn.resourceGroup().id)),
    description: "Cosmos DB account name",
  });
  const p_location = stack.parameters.add("location", "string", {
    defaultValue: fn.resourceGroup().location,
    description: "Location for the Cosmos DB account.",
  });
  const p_databaseName = stack.parameters.add("databaseName", "string", {
    description: "The name for the SQL API database",
  });
  const p_containerName = stack.parameters.add("containerName", "string", {
    description: "The name for the SQL API container",
  });
  const resource0 = new DatabaseAccount(stack, {
    name: fn.toLower(p_accountName),
    location: p_location,
    properties: {
      enableFreeTier: true,
      databaseAccountOfferType: "Standard",
      consistencyPolicy: { defaultConsistencyLevel: "Session" },
      locations: [{ locationName: p_location }],
    },
  });
  stack.outputs.add("resource0Id", "string", resource0.id);
  const resource1 = new SqlDatabase(resource0, {
    name: p_databaseName,
    properties: {
      resource: { id: p_databaseName },
      options: { throughput: 1e3 },
    },
  });
  stack.outputs.add("resource1Id", "string", resource1.id);
  const resource2 = new Container(resource1, {
    name: p_containerName,
    properties: {
      resource: {
        id: p_containerName,
        partitionKey: { paths: ["/myPartitionKey"], kind: "Hash" },
        indexingPolicy: {
          indexingMode: "consistent",
          includedPaths: [{ path: "/*" }],
          excludedPaths: [{ path: "/_etag/?" }],
        },
      },
    },
  });
  stack.outputs.add("resource2Id", "string", resource2.id);
  stack.outputs.add("location", "string", p_location);
  stack.outputs.add("name", "string", p_containerName);
  stack.outputs.add("resourceGroupName", "string", fn.resourceGroup().name);
  stack.outputs.add(
    "resourceId",
    "string",
    fn.resourceId(
      "Microsoft.DocumentDB/databaseAccounts/sqlDatabases/containers",
      fn.toLower(p_accountName),
      p_databaseName,
      p_containerName,
    ),
  );
  return stack;
}

describe("quick-start/cosmosdb-free", () => {
  it("renders the expected Bicep and serialization output", async () => {
    const stack = await buildScenarioStack({
      createResourceGroupStack,
      createSubscriptionStack,
      values,
    });
    const rendered = renderStackArtifacts(stack);

    expectRenderOutputsToMatchSample(import.meta.url, rendered.outputs);
  });
});
