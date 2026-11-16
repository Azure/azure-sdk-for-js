// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * Primary resource type: Microsoft.Insights/webtests
 * Primary schema key: Microsoft.Insights/webtests
 * Also covers: none
 * Scenario: swagger-examples/web-test-create
 * Provisioning API: WebTest
 * Source: https://github.com/Azure/azure-rest-api-specs/blob/ac0d84ebb3f50b37259806b55d9088e4ea930093/specification/applicationinsights/resource-manager/Microsoft.Insights/ApplicationInsights/WebTestsApi/examples/2022-06-15/WebTestCreate.json
 * Operation: n/a
 * Runtime baseline: web-test-create.test.baseline.bicep and web-test-create.test.baseline.json
 * Gap/reduction: path parameters omitted, properties.Configuration.WebTest XML omitted (angle-bracket markup unsupported by baseline preflight)
 */

import { WebTest } from "@azure/provisioning-appinsights";
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
  new WebTest(stack, {
    name: "my-webtest-my-component",
    kind: "ping",
    location: "South Central US",
    properties: {
      description: "Ping web test alert for mytestwebapp",
      enabled: true,
      frequency: 900,
      webTestKind: "ping",
      locations: [{ location: "us-fl-mia-edge" }],
      webTestName: "my-webtest-my-component",
      retryEnabled: true,
      syntheticMonitorId: "my-webtest-my-component",
      timeout: 120,
    },
  });
  return stack;
}

describe("swagger-examples/web-test-create", () => {
  it("renders the expected Bicep and serialization output", async () => {
    const stack = await buildScenarioStack({
      createResourceGroupStack,
      createSubscriptionStack,
      values,
    });
    const rendered = renderStackArtifacts(stack);

    expectRenderedResourceToMatchSwaggerRequest(import.meta.url, rendered.outputs, {
      resourceType: "Microsoft.Insights/webtests",
      apiVersion: "2022-06-15",
    });
    expectRenderedOutputsToMatchBaselines(import.meta.url, rendered.outputs);
  });
});
