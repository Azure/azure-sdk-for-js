// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * Primary resource type: Microsoft.OperationalInsights/workspaces/dataExports
 * Primary schema key: Microsoft.OperationalInsights/workspaces/dataExports
 * Also covers: Microsoft.OperationalInsights/workspaces
 * Scenario: swagger-examples/data-export-create-or-update
 * provisioning API: DataExport
 * Source: https://github.com/Azure/azure-rest-api-specs/blob/4cd7e2ac392a5d75c6a29fee14e93d2146364e79/specification/operationalinsights/resource-manager/Microsoft.OperationalInsights/OperationalInsights/examples/2025-07-01/DataExportCreateOrUpdate.json
 * Operation: n/a
 * Runtime baseline: data-export-create-or-update.test.baseline.bicep and data-export-create-or-update.test.baseline.json
 * Gap/reduction: none
 */

import { DataExport, Workspace } from "@azure/provisioning-operationalinsights";
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

function buildScenarioStack({ createResourceGroupStack, values }: BuildScenarioHelpers) {
  const stack = createResourceGroupStack();
  const workspace = new Workspace(stack, {
    name: "de-ws",
    location: values.location,
  });
  new DataExport(workspace, {
    name: "export1",
    properties: {
      destination: {
        resourceId:
          "/subscriptions/192b9f85-a39a-4276-b96d-d5cd351703f9/resourceGroups/OIAutoRest1234/providers/Microsoft.EventHub/namespaces/test",
      },
      tableNames: ["Heartbeat"],
    },
  });
  return stack;
}

describe("swagger-examples/data-export-create-or-update", () => {
  it("renders the expected Bicep and serialization output", async () => {
    const stack = await buildScenarioStack({
      createResourceGroupStack,
      createSubscriptionStack,
      values,
    });
    const rendered = renderStackArtifacts(stack);

    expectRenderedResourceToMatchSwaggerRequest(import.meta.url, rendered.outputs, {
      resourceType: "Microsoft.OperationalInsights/workspaces/dataExports",
      apiVersion: "2026-03-01",
    });
    expectRenderedOutputsToMatchBaselines(import.meta.url, rendered.outputs);
  });
});
