// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * Primary resource type: Microsoft.Insights/components/linkedStorageAccounts
 * Primary schema key: Microsoft.Insights/components/linkedStorageAccounts
 * Also covers: none
 * Scenario: learning-site/components-linkedstorageaccounts
 * Provisioning API: Component, LinkedStorageAccount
 * Source: https://github.com/MicrosoftDocs/azure-resource-manager-schema-reference-pr/blob/a41dfc4dbfc38d1fc84fecf114976f3d24c51114/arm-schema-ref/Microsoft.Insights/2020-03-01-preview/components/linkedstorageaccounts.md
 * Operation: n/a
 * Runtime baseline: components-linkedstorageaccounts.test.baseline.bicep and components-linkedstorageaccounts.test.baseline.json
 * Gap/reduction: none
 */

import { Component, LinkedStorageAccount } from "@azure/provisioning-appinsights";
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
  const component = new Component(stack, {
    name: "appi01",
    location: scenarioValues.location,
    kind: "web",
    properties: { applicationType: "web" },
  });
  new LinkedStorageAccount(component, {
    name: "ServiceProfiler",
    properties: {
      linkedStorageAccount:
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg-cdk-package-test/providers/Microsoft.Storage/storageAccounts/storageaccountname",
    },
  });
  return stack;
}

describe("learning-site/components-linkedstorageaccounts", () => {
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
