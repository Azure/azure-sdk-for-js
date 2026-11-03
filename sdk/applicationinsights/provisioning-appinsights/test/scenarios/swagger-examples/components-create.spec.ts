// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * Primary resource type: Microsoft.Insights/components
 * Primary schema key: Microsoft.Insights/components
 * Also covers: none
 * Scenario: swagger-examples/components-create
 * Provisioning API: Component
 * Source: https://github.com/Azure/azure-rest-api-specs/blob/ac0d84ebb3f50b37259806b55d9088e4ea930093/specification/applicationinsights/resource-manager/Microsoft.Insights/ApplicationInsights/Components/examples/2020-02-02/ComponentsCreate.json
 * Operation: n/a
 * Runtime baseline: components-create.test.baseline.bicep and components-create.test.baseline.json
 * Gap/reduction: path parameters omitted
 */

import { Component } from "@azure/provisioning-appinsights";
import { describe, it } from "vitest";

import {
  createResourceGroupStack,
  createSubscriptionStack,
  expectRenderedOutputsToMatchBaselines,
  expectRenderedResourceToMatchSwaggerRequest,
  renderStackArtifacts,
} from "../../utils/index.js";

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
  createResourceGroupStack: makeStack,
}: any): ReturnType<typeof createResourceGroupStack> {
  const stack = makeStack();
  new Component(stack, {
    name: "my-component",
    kind: "web",
    location: "South Central US",
    properties: {
      applicationType: "web",
      flowType: "Bluefield",
      requestSource: "rest",
      workspaceResourceId:
        "/subscriptions/subid/resourcegroups/my-resource-group/providers/microsoft.operationalinsights/workspaces/my-workspace",
    },
  });
  return stack;
}

describe("swagger-examples/components-create", () => {
  it("renders the expected Bicep and serialization output", async () => {
    const stack = await buildScenarioStack({
      createResourceGroupStack,
      createSubscriptionStack,
      values,
    });
    const rendered = renderStackArtifacts(stack);

    expectRenderedResourceToMatchSwaggerRequest(import.meta.url, rendered.outputs, {
      resourceType: "Microsoft.Insights/components",
      apiVersion: "2020-02-02",
    });
    expectRenderedOutputsToMatchBaselines(import.meta.url, rendered.outputs);
  });
});
