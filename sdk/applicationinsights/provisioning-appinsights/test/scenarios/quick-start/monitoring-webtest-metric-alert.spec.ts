// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * Primary resource type: Microsoft.Insights/webtests
 * Primary schema key: Microsoft.Insights/webtests
 * Also covers: none
 * Scenario: quick-start/monitoring-webtest-metric-alert
 * Provisioning API: WebTest
 * Source: https://github.com/Azure/azure-quickstart-templates/blob/1654a40948ff3e074aacda9bc2a9a51176276fd2/quickstarts/microsoft.insights/monitoring-webtest-metric-alert/azuredeploy.json
 * Operation: n/a
 * Runtime baseline: monitoring-webtest-metric-alert.test.baseline.bicep and monitoring-webtest-metric-alert.test.baseline.json
 * Gap/reduction: none
 */

import { WebTest } from "@azure/provisioning-appinsights";
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
  new WebTest(stack, {
    name: "webtest01",
    location: scenarioValues.location,
    kind: "ping",
    properties: {
      syntheticMonitorId: "webtest01",
      webTestName: "webtest01",
      enabled: true,
      frequency: 300,
      timeout: 30,
      webTestKind: "ping",
      retryEnabled: true,
      locations: [{ location: "us-fl-mia-edge" }],
    },
  });
  return stack;
}

describe("quick-start/monitoring-webtest-metric-alert", () => {
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
