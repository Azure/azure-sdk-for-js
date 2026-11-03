// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * Primary resource type: Microsoft.Insights/components
 * Primary schema key: Microsoft.Insights/components
 * Also covers: none
 * Scenario: quick-start/insights-alertrules-application-insights
 * Provisioning API: Component
 * Source: https://github.com/Azure/azure-quickstart-templates/blob/1654a40948ff3e074aacda9bc2a9a51176276fd2/quickstarts/microsoft.insights/insights-alertrules-application-insights/main.bicep
 * Operation: n/a
 * Runtime baseline: insights-alertrules-application-insights.test.baseline.bicep and insights-alertrules-application-insights.test.baseline.json
 * Gap/reduction: none
 */

import { Component } from "@azure/provisioning-appinsights";
import { describe, it } from "vitest";

import {
  createResourceGroupStack,
  createSubscriptionStack,
  expectRenderOutputsToMatchSample,
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
  values: scenarioValues,
}: any): ReturnType<typeof createResourceGroupStack> {
  const stack = makeStack();
  new Component(stack, {
    name: "appi01",
    location: scenarioValues.location,
    kind: "web",
    properties: { applicationType: "web", flowType: "Bluefield" },
  });
  return stack;
}

describe("quick-start/insights-alertrules-application-insights", () => {
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
