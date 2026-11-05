// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * Primary resource type: Microsoft.DocumentDB/databaseAccounts
 * Primary schema key: Microsoft.DocumentDB/databaseAccounts
 * Also covers: Microsoft.DocumentDB/databaseAccounts/sqlRoleAssignments, Microsoft.DocumentDB/databaseAccounts/sqlRoleDefinitions
 * Scenario: quick-start/cosmosdb-sql-rbac
 * provisioning API: DatabaseAccount, SqlRoleAssignment, SqlRoleDefinition
 * Source: https://github.com/Azure/azure-quickstart-templates/blob/9a286202372ff9a9a4f4465e1ef30d7b0f3650c6/quickstarts/microsoft.documentdb/cosmosdb-sql-rbac/main.bicep
 * Source: https://github.com/Azure/azure-quickstart-templates/blob/9a286202372ff9a9a4f4465e1ef30d7b0f3650c6/quickstarts/microsoft.documentdb/cosmosdb-sql-rbac/azuredeploy.json
 * Operation: n/a
 * Runtime baseline: cosmosdb-sql-rbac.test.baseline.bicep and cosmosdb-sql-rbac.test.baseline.json
 * Gap/reduction: Source API versions normalized to package API version; slash-delimited child names use public parent constructors.
 */

import {
  DatabaseAccount,
  SqlRoleAssignment,
  SqlRoleDefinition,
} from "@azure/provisioning-cosmosdb";
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

function buildScenarioStack({ createResourceGroupStack }: BuildScenarioHelpers) {
  const stack = createResourceGroupStack();
  const p_location = stack.parameters.add("location", "string", {
    defaultValue: fn.resourceGroup().location,
    description: "Location for all resources.",
  });
  const p_accountName = stack.parameters.add("accountName", "string", {
    defaultValue: fn.toLower(fn.format("sql-rbac-{0}", fn.uniqueString(fn.resourceGroup().id))),
    description: "Cosmos DB account name, max length 44 characters",
  });
  const p_roleDefinitionName = stack.parameters.add("roleDefinitionName", "string", {
    defaultValue: "My Read Write Role",
    description: "Friendly name for the SQL Role Definition",
  });
  const p_dataActions = stack.parameters.add("dataActions", "array", {
    defaultValue: [
      "Microsoft.DocumentDB/databaseAccounts/readMetadata",
      "Microsoft.DocumentDB/databaseAccounts/sqlDatabases/containers/items/*",
    ],
    description: "Data actions permitted by the Role Definition",
  });
  const p_principalId = stack.parameters.add("principalId", "string", {
    description: "Object ID of the AAD identity. Must be a GUID.",
  });
  const v_locations = stack.variables.add("locations", [
    { locationName: p_location, failoverPriority: 0, isZoneRedundant: false },
  ]);
  const v_roleDefinitionId = stack.variables.add(
    "roleDefinitionId",
    fn.guid(
      "sql-role-definition-",
      p_principalId,
      fn.resourceId("Microsoft.DocumentDB/databaseAccounts", p_accountName),
    ),
  );
  const v_roleAssignmentId = stack.variables.add(
    "roleAssignmentId",
    fn.guid(
      v_roleDefinitionId,
      p_principalId,
      fn.resourceId("Microsoft.DocumentDB/databaseAccounts", p_accountName),
    ),
  );
  const resource0 = new DatabaseAccount(stack, {
    name: p_accountName,
    kind: "GlobalDocumentDB",
    location: p_location,
    properties: {
      consistencyPolicy: { defaultConsistencyLevel: "Session" },
      locations: v_locations,
      databaseAccountOfferType: "Standard",
      enableAutomaticFailover: false,
      enableMultipleWriteLocations: false,
    },
  });
  stack.outputs.add("resource0Id", "string", resource0.id);
  const resource1 = new SqlRoleDefinition(resource0, {
    name: v_roleDefinitionId,
    properties: {
      roleName: p_roleDefinitionName,
      type: "CustomRole",
      assignableScopes: [fn.resourceId("Microsoft.DocumentDB/databaseAccounts", p_accountName)],
      permissions: [{ dataActions: p_dataActions }],
    },
  });
  stack.outputs.add("resource1Id", "string", resource1.id);
  const resource2 = new SqlRoleAssignment(resource0, {
    name: v_roleAssignmentId,
    properties: {
      roleDefinitionId: resource1.id,
      principalId: p_principalId,
      scope: fn.resourceId("Microsoft.DocumentDB/databaseAccounts", p_accountName),
    },
  });
  stack.outputs.add("resource2Id", "string", resource2.id);
  return stack;
}

describe("quick-start/cosmosdb-sql-rbac", () => {
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
