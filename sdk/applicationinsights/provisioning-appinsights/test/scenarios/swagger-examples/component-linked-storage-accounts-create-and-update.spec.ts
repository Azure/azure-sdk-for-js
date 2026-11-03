// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * Primary resource type: Microsoft.Insights/components/linkedStorageAccounts
 * Primary schema key: Microsoft.Insights/components/linkedStorageAccounts
 * Also covers: none
 * Scenario: swagger-examples/component-linked-storage-accounts-create-and-update
 * Provisioning API: Component, LinkedStorageAccount
 * Source: https://github.com/Azure/azure-rest-api-specs/blob/ac0d84ebb3f50b37259806b55d9088e4ea930093/specification/applicationinsights/resource-manager/Microsoft.Insights/ApplicationInsights/ComponentLinkedStorageAccountApi/examples/2020-03-01-preview/ComponentLinkedStorageAccountsCreateAndUpdate.json
 * Operation: n/a
 * Runtime baseline: component-linked-storage-accounts-create-and-update.test.baseline.bicep and component-linked-storage-accounts-create-and-update.test.baseline.json
 * Gap/reduction: path parameters omitted
 */

import { Component, LinkedStorageAccount } from "@azure/provisioning-appinsights";
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
  values: scenarioValues,
}: any): ReturnType<typeof createResourceGroupStack> {
  const stack = makeStack();
  const component = new Component(stack, {
    name: "myComponent",
    location: scenarioValues.location,
    kind: "web",
    properties: { applicationType: "web" },
  });
  new LinkedStorageAccount(component, {
    name: "ServiceProfiler",
    properties: {
      linkedStorageAccount:
        "/subscriptions/86dc51d3-92ed-4d7e-947a-775ea79b4918/resourceGroups/someResourceGroupName/providers/Microsoft.Storage/storageAccounts/storageaccountname",
    },
  });
  return stack;
}

describe("swagger-examples/component-linked-storage-accounts-create-and-update", () => {
  it("renders the expected Bicep and serialization output", async () => {
    const stack = await buildScenarioStack({
      createResourceGroupStack,
      createSubscriptionStack,
      values,
    });
    const rendered = renderStackArtifacts(stack);

    expectRenderedResourceToMatchSwaggerRequest(import.meta.url, rendered.outputs, {
      resourceType: "Microsoft.Insights/components/linkedStorageAccounts",
      apiVersion: "2020-03-01-preview",
    });
    expectRenderedOutputsToMatchBaselines(import.meta.url, rendered.outputs);
  });
});
