// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * Primary resource type: Microsoft.OperationalInsights/workspaces/tables
 * Primary schema key: Microsoft.OperationalInsights/workspaces/tables
 * Also covers: Microsoft.OperationalInsights/workspaces
 * Scenario: learning-site/workspaces-tables
 * provisioning API: Table, Workspace
 * Source: https://github.com/MicrosoftDocs/azure-resource-manager-schema-reference-pr/blob/a992ef23d0f8dba9947cbda26edde0469d6e0485/arm-schema-ref/Microsoft.OperationalInsights/2025-07-01/workspaces/tables.md
 * Operation: n/a
 * Runtime baseline: workspaces-tables.test.baseline.bicep and workspaces-tables.test.baseline.json
 * Gap/reduction: Learn usage example targets 2022-10-01; translated to the package API version.
 */

import { Table, Workspace } from "@azure/provisioning-operationalinsights";
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

function buildScenarioStack({ createResourceGroupStack, values }: BuildScenarioHelpers) {
  const stack = createResourceGroupStack();
  const workspace = new Workspace(stack, {
    name: "learn-tables-ws",
    location: values.location,
  });
  new Table(workspace, {
    name: "LearnTable_CL",
    properties: {
      schema: {
        columns: [{ name: "Message", type: "string" }],
        name: "LearnTable_CL",
      },
      plan: "Analytics",
    },
  });
  return stack;
}

describe("learning-site/workspaces-tables", () => {
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
