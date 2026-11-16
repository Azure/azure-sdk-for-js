// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * Primary resource type: Microsoft.Sql/servers
 * Primary schema key: Microsoft.Sql/servers
 * Also covers: Microsoft.Sql/servers/auditingSettings, Microsoft.Sql/servers/databases, Microsoft.Sql/servers/devOpsAuditingSettings
 * Scenario: quick-start/sql-auditing-server-policy-to-oms
 * provisioning API: DevOpsAuditingSetting, Server, SqlServerBlobAuditingPolicy, ServerDatabase
 * Source: https://github.com/Azure/azure-quickstart-templates/blob/9a286202372ff9a9a4f4465e1ef30d7b0f3650c6/quickstarts/microsoft.sql/sql-auditing-server-policy-to-oms/main.bicep
 * Operation: n/a
 * Runtime baseline: sql-auditing-server-policy-to-oms.test.baseline.bicep and sql-auditing-server-policy-to-oms.test.baseline.json
 * Gap/reduction: sample reduced to Microsoft.Sql public APIs; unrelated providers and parameterized dependencies omitted
 */

import {
  DevOpsAuditingSetting,
  Server,
  SqlServerBlobAuditingPolicy,
  ServerDatabase,
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
    name: "sqlauditingserverpol",
    location: "eastus",
  });
  new DevOpsAuditingSetting(server0, {
    name: "Default",
  });
  new SqlServerBlobAuditingPolicy(server0, {
    name: "default",
  });
  new ServerDatabase(server0, {
    name: "sqlauditingserverpol",
    location: "eastus",
  });
  return stack;
}

describe("quick-start/sql-auditing-server-policy-to-oms", () => {
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
