// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * Primary resource type: Microsoft.EventHub/namespaces
 * Primary schema key: Microsoft.EventHub/namespaces
 * Also covers: Microsoft.EventHub/namespaces/authorizationRules
 * Scenario: quick-start/eventhub-create-authrule-namespace-and-eventhub
 * provisioning API: Namespace, NamespaceAuthorizationRule
 * Source: https://github.com/Azure/azure-quickstart-templates/blob/9a286202372ff9a9a4f4465e1ef30d7b0f3650c6/quickstarts/microsoft.eventhub/eventhub-create-authrule-namespace-and-eventhub/azuredeploy.json
 * Operation: n/a
 * Runtime baseline: eventhub-create-authrule-namespace-and-eventhub.test.baseline.bicep and eventhub-create-authrule-namespace-and-eventhub.test.baseline.json
 * Gap/reduction: Source API versions are rendered with the package API version 2026-01-01., The planned scenario covers the namespace and namespace authorization rule; the nested event hub, consumer group, and event-hub authorization rules are covered by other planned scenarios.
 */

import { Namespace, NamespaceAuthorizationRule } from "@azure/provisioning-eventhub";
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
  const namespace = new Namespace(stack, {
    name: "quickauthrulens",
    location: values.location,
    sku: { name: "Standard" },
    properties: {
      isAutoInflateEnabled: true,
      maximumThroughputUnits: 7,
    },
  });
  new NamespaceAuthorizationRule(namespace, {
    name: "quick-namespace-rule",
    properties: { rights: ["Send", "Listen", "Manage"] },
  });
  return stack;
}

describe("quick-start/eventhub-create-authrule-namespace-and-eventhub", () => {
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
