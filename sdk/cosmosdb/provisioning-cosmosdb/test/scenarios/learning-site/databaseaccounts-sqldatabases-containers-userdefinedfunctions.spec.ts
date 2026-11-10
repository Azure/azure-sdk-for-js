// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * Primary resource type: Microsoft.DocumentDB/databaseAccounts/sqlDatabases/containers/userDefinedFunctions
 * Primary schema key: Microsoft.DocumentDB/databaseAccounts/sqlDatabases/containers/userDefinedFunctions
 * Also covers: Microsoft.DocumentDB/databaseAccounts, Microsoft.DocumentDB/databaseAccounts/sqlDatabases, Microsoft.DocumentDB/databaseAccounts/sqlDatabases/containers
 * Scenario: learning-site/databaseaccounts-sqldatabases-containers-userdefinedfunctions
 * provisioning API: Container, DatabaseAccount, SqlDatabase, UserDefinedFunction
 * Source: https://github.com/MicrosoftDocs/azure-resource-manager-schema-reference-pr/blob/cc00969e3ee843f537f89d70433cca7f6a0b3111/arm-schema-ref/Microsoft.DocumentDB/2026-03-15/databaseaccounts/sqldatabases/containers/userdefinedfunctions.md
 * Operation: n/a
 * Runtime baseline: databaseaccounts-sqldatabases-containers-userdefinedfunctions.test.baseline.bicep and databaseaccounts-sqldatabases-containers-userdefinedfunctions.test.baseline.json
 * Gap/reduction: Usage example Microsoft.DocumentDB/databaseAccounts/sqlDatabases/containers/userDefinedFunctions@2021-10-15 normalized to 2026-03-15., Usage example Microsoft.DocumentDB/databaseAccounts/sqlDatabases/containers@2023-04-15 normalized to 2026-03-15., Usage example Microsoft.DocumentDB/databaseAccounts/sqlDatabases@2021-10-15 normalized to 2026-03-15., Usage example Microsoft.DocumentDB/databaseAccounts@2021-10-15 normalized to 2026-03-15.
 */

import {
  Container,
  DatabaseAccount,
  SqlDatabase,
  UserDefinedFunction,
} from "@azure/provisioning-cosmosdb";
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

function buildScenarioStack({ createResourceGroupStack }: BuildScenarioHelpers) {
  const stack = createResourceGroupStack();
  const p_resourceName = stack.parameters.add("resourceName", "string", {
    defaultValue: "acctest0001",
  });
  const p_location = stack.parameters.add("location", "string", {
    defaultValue: "westeurope",
  });
  const resource0 = new DatabaseAccount(stack, {
    name: p_resourceName,
    location: p_location,
    kind: "GlobalDocumentDB",
    properties: {
      capabilities: [],
      consistencyPolicy: {
        defaultConsistencyLevel: "Session",
        maxIntervalInSeconds: 5,
        maxStalenessPrefix: 100,
      },
      databaseAccountOfferType: "Standard",
      defaultIdentity: "FirstPartyIdentity",
      disableKeyBasedMetadataWriteAccess: false,
      disableLocalAuth: false,
      enableAnalyticalStorage: false,
      enableAutomaticFailover: false,
      enableFreeTier: false,
      enableMultipleWriteLocations: false,
      ipRules: [],
      isVirtualNetworkFilterEnabled: false,
      locations: [
        {
          failoverPriority: 0,
          isZoneRedundant: false,
          locationName: "West Europe",
        },
      ],
      networkAclBypass: "None",
      networkAclBypassResourceIds: [],
      publicNetworkAccess: "Enabled",
      virtualNetworkRules: [],
    },
  });
  stack.outputs.add("resource0Id", "string", resource0.id);
  const resource1 = new SqlDatabase(resource0, {
    name: p_resourceName,
    properties: { options: {}, resource: { id: p_resourceName } },
  });
  stack.outputs.add("resource1Id", "string", resource1.id);
  const resource2 = new Container(resource1, {
    name: p_resourceName,
    properties: {
      options: {},
      resource: {
        id: p_resourceName,
        partitionKey: { kind: "Hash", paths: ["/definition/id"] },
      },
    },
  });
  stack.outputs.add("resource2Id", "string", resource2.id);
  const resource3 = new UserDefinedFunction(resource2, {
    name: p_resourceName,
    properties: {
      options: {},
      resource: {
        body: "  	function test() {\r\n		var context = getContext();\r\n		var response = context.getResponse();\r\n		response.setBody(''Hello, World'');\r\n	}\r\n",
        id: p_resourceName,
      },
    },
  });
  stack.outputs.add("resource3Id", "string", resource3.id);
  return stack;
}

describe("learning-site/databaseaccounts-sqldatabases-containers-userdefinedfunctions", () => {
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
