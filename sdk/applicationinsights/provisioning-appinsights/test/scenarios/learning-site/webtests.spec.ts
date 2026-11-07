// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * Primary resource type: Microsoft.Insights/webtests
 * Primary schema key: Microsoft.Insights/webtests
 * Also covers: Microsoft.Insights/components
 * Scenario: learning-site/webtests
 * Provisioning API: Component, WebTest
 * Source: https://github.com/MicrosoftDocs/azure-resource-manager-schema-reference-pr/blob/a41dfc4dbfc38d1fc84fecf114976f3d24c51114/arm-schema-ref/Microsoft.Insights/2022-06-15/webtests.md
 * Operation: n/a
 * Runtime baseline: webtests.test.baseline.bicep and webtests.test.baseline.json
 * Gap/reduction: none
 */

import { Component, WebTest } from "@azure/provisioning-appinsights";
import { describe, it } from "vitest";

import {
  createResourceGroupStack,
  createSubscriptionStack,
  expectRenderedOutputsToMatchBaselines,
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
    properties: { applicationType: "web" },
  });
  new WebTest(stack, {
    name: "webtest01",
    location: scenarioValues.location,
    kind: "ping",
    properties: {
      syntheticMonitorId: "webtest01",
      webTestName: "webtest01",
      enabled: true,
      frequency: 900,
      timeout: 120,
      webTestKind: "ping",
      retryEnabled: true,
      locations: [{ location: "us-fl-mia-edge" }],
    },
  });
  return stack;
}

describe("learning-site/webtests", () => {
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
