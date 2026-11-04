// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * Primary resource type: Microsoft.DocumentDB/databaseAccounts/mongodbUserDefinitions
 * Primary schema key: Microsoft.DocumentDB/databaseAccounts/mongodbUserDefinitions
 * Also covers: Microsoft.DocumentDB/databaseAccounts, Microsoft.DocumentDB/databaseAccounts/mongodbDatabases
 * Scenario: learning-site/databaseaccounts-mongodbuserdefinitions
 * provisioning API: DatabaseAccount, MongoDbDatabase, MongoUserDefinitionGetResults
 * Source: https://github.com/MicrosoftDocs/azure-resource-manager-schema-reference-pr/blob/cc00969e3ee843f537f89d70433cca7f6a0b3111/arm-schema-ref/Microsoft.DocumentDB/2026-03-15/databaseaccounts/mongodbuserdefinitions.md
 * Operation: n/a
 * Runtime baseline: databaseaccounts-mongodbuserdefinitions.test.baseline.bicep and databaseaccounts-mongodbuserdefinitions.test.baseline.json
 * Gap/reduction: Usage example Microsoft.DocumentDB/databaseAccounts/mongodbDatabases@2021-10-15 normalized to 2026-03-15., Usage example Microsoft.DocumentDB/databaseAccounts/mongodbUserDefinitions@2022-11-15 normalized to 2026-03-15., Usage example Microsoft.DocumentDB/databaseAccounts@2024-08-15 normalized to 2026-03-15.
 */

import {
  DatabaseAccount,
  MongoDbDatabase,
  MongoUserDefinitionGetResults,
} from "@azure/provisioning-cosmosdb";
import { fn } from "@azure/provisioning-core";
import { describe, it } from "vitest";

import {
  createResourceGroupStack,
  createSubscriptionStack,
  expectRenderedOutputsToMatchBaselines,
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
  const p_resourceName = stack.parameters.add("resourceName", "string", {
    defaultValue: "acctest0001",
  });
  const p_location = stack.parameters.add("location", "string", {
    defaultValue: "westus",
  });
  const p_mongodbUserPassword = stack.parameters.add("mongodbUserPassword", "string", {
    secure: true,
    description: "The password for the MongoDB user",
  });
  const resource0 = new DatabaseAccount(stack, {
    name: fn.format("{0}-acct", p_resourceName),
    location: p_location,
    kind: "MongoDB",
    properties: {
      capabilities: [{ name: "EnableMongoRoleBasedAccessControl" }, { name: "EnableMongo" }],
      consistencyPolicy: {
        defaultConsistencyLevel: "Strong",
        maxIntervalInSeconds: 5,
        maxStalenessPrefix: 100,
      },
      databaseAccountOfferType: "Standard",
      disableKeyBasedMetadataWriteAccess: false,
      disableLocalAuth: false,
      enableAnalyticalStorage: false,
      enableAutomaticFailover: false,
      enableBurstCapacity: false,
      enableFreeTier: false,
      enableMultipleWriteLocations: false,
      enablePartitionMerge: false,
      ipRules: [],
      isVirtualNetworkFilterEnabled: false,
      locations: [
        {
          failoverPriority: 0,
          isZoneRedundant: false,
          locationName: p_location,
        },
      ],
      minimalTlsVersion: "Tls12",
      networkAclBypass: "None",
      networkAclBypassResourceIds: [],
      publicNetworkAccess: "Enabled",
      virtualNetworkRules: [],
    },
  });
  stack.outputs.add("resource0Id", "string", resource0.id);
  const resource1 = new MongoDbDatabase(resource0, {
    name: fn.format("{0}-mongodb", p_resourceName),
    properties: {
      options: {},
      resource: { id: fn.format("{0}-mongodb", p_resourceName) },
    },
  });
  stack.outputs.add("resource1Id", "string", resource1.id);
  const resource2 = new MongoUserDefinitionGetResults(resource0, {
    name: fn.format("{0}.myUserName", resource1.name),
    properties: {
      databaseName: resource1.name,
      mechanisms: "SCRAM-SHA-256",
      password: p_mongodbUserPassword,
      userName: "myUserName",
    },
  });
  stack.outputs.add("resource2Id", "string", resource2.id);
  return stack;
}

describe("learning-site/databaseaccounts-mongodbuserdefinitions", () => {
  it("renders the expected Bicep and serialization output", async () => {
    const stack = await buildScenarioStack({
      createResourceGroupStack,
      createSubscriptionStack,
      values,
    });
    const rendered = renderStackArtifacts(stack);

    expectRenderedOutputsToMatchBaselines(import.meta.url, rendered.outputs);
  });
});
