// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * Primary resource type: Microsoft.Sql/servers
 * Primary schema key: Microsoft.Sql/servers
 * Also covers: Microsoft.Sql/servers/auditingSettings, Microsoft.Sql/servers/databases, Microsoft.Sql/servers/databases/transparentDataEncryption, Microsoft.Sql/servers/securityAlertPolicies
 * Scenario: quick-start/sql-data-warehouse-transparent-encryption-create
 * provisioning API: Server, SqlServerBlobAuditingPolicy, ServerDatabase, ServerDatabaseTransparentDataEncryption, ServerSecurityAlertPolicy
 * Source: https://github.com/Azure/azure-quickstart-templates/blob/9a286202372ff9a9a4f4465e1ef30d7b0f3650c6/quickstarts/microsoft.sql/sql-data-warehouse-transparent-encryption-create/main.bicep
 * Operation: n/a
 * Runtime baseline: sql-data-warehouse-transparent-encryption-create.test.baseline.bicep and sql-data-warehouse-transparent-encryption-create.test.baseline.json
 * Gap/reduction: sample reduced to Microsoft.Sql public APIs; unrelated providers and parameterized dependencies omitted
 */

import {
  Server,
  SqlServerBlobAuditingPolicy,
  ServerDatabase,
  ServerDatabaseTransparentDataEncryption,
  ServerSecurityAlertPolicy,
} from "@azure/provisioning-sql";
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
  const server0 = new Server(stack, {
    name: "sqldatawarehousetran",
    location: "eastus",
  });
  new SqlServerBlobAuditingPolicy(server0, {
    name: "default",
  });
  const serverDatabase2 = new ServerDatabase(server0, {
    name: "sqldatawarehousetran",
    location: "eastus",
  });
  new ServerDatabaseTransparentDataEncryption(serverDatabase2, {
    name: "current",
  });
  new ServerSecurityAlertPolicy(server0, {
    name: "Default",
  });
  return stack;
}

describe("quick-start/sql-data-warehouse-transparent-encryption-create", () => {
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
