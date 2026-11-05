// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * Primary resource type: Microsoft.Insights/components
 * Primary schema key: Microsoft.Insights/components
 * Also covers: none
 * Scenario: public-entrypoints/public-entrypoints-application-insights-component
 * Provisioning API: Component
 * Source: packages\cdk\applicationinsights\src\index.ts
 * Operation: n/a
 * Runtime baseline: public-entrypoints-application-insights-component.test.baseline.bicep and public-entrypoints-application-insights-component.test.baseline.json
 * Gap/reduction: none
 */

import { Component } from "@azure/provisioning-appinsights";
import { describe, it } from "vitest";

import {
  createResourceGroupStack,
  createSubscriptionStack,
  expectRenderedOutputsToMatchBaselines,
  renderStackArtifacts,
} from "../utils/index.js";

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
    properties: { applicationType: "web" },
  });
  return stack;
}

describe("public-entrypoints/public-entrypoints-application-insights-component", () => {
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
