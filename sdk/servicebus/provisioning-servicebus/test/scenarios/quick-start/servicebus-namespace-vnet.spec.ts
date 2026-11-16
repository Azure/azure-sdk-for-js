// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * Primary resource type: Microsoft.ServiceBus/namespaces
 * Primary schema key: Microsoft.ServiceBus/namespaces
 * Also covers: none
 * Scenario: quick-start/servicebus-namespace-vnet
 * provisioning API: Namespace
 * Source: https://github.com/Azure/azure-quickstart-templates/blob/9a286202372ff9a9a4f4465e1ef30d7b0f3650c6/quickstarts/microsoft.servicebus/servicebus-namespace-vnet/main.bicep
 * Operation: n/a
 * Runtime baseline: servicebus-namespace-vnet.test.baseline.bicep and servicebus-namespace-vnet.test.baseline.json
 * Gap/reduction: Microsoft.Network virtual network and unsupported legacy virtualnetworkrules child omitted
 */

import { Namespace } from "@azure/provisioning-servicebus";
import { describe, it } from "vitest";

import {
  createResourceGroupStack,
  createSubscriptionStack,
  expectRenderOutputsToMatchSample,
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
  new Namespace(stack, {
    name: "quickstart-servicebus",
    location: values.location,
    sku: { name: "Premium", tier: "Premium" },
    properties: {},
  });
  return stack;
}

describe("quick-start/servicebus-namespace-vnet", () => {
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
