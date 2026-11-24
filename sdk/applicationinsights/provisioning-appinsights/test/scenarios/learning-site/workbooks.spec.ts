// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * Primary resource type: Microsoft.Insights/workbooks
 * Primary schema key: Microsoft.Insights/workbooks
 * Also covers: none
 * Scenario: learning-site/workbooks
 * Provisioning API: Workbook
 * Source: https://github.com/MicrosoftDocs/azure-resource-manager-schema-reference-pr/blob/a41dfc4dbfc38d1fc84fecf114976f3d24c51114/arm-schema-ref/Microsoft.Insights/2023-06-01/workbooks.md
 * Operation: n/a
 * Runtime baseline: workbooks.test.baseline.bicep and workbooks.test.baseline.json
 * Gap/reduction: none
 */

import { Workbook } from "@azure/provisioning-appinsights";
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
  new Workbook(stack, {
    name: "deadb33f-5e0d-4064-8ebb-1a4ed0313eb2",
    location: scenarioValues.location,
    kind: "shared",
    properties: {
      displayName: "Sample workbook",
      category: "workbook",
      serializedData: null,
    },
  });
  return stack;
}

describe("learning-site/workbooks", () => {
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
