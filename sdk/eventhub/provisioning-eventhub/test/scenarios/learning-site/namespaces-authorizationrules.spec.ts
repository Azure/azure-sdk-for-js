// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * Primary resource type: Microsoft.EventHub/namespaces/authorizationRules
 * Primary schema key: Microsoft.EventHub/namespaces/authorizationRules
 * Also covers: Microsoft.EventHub/namespaces
 * Scenario: learning-site/namespaces-authorizationrules
 * provisioning API: Namespace, NamespaceAuthorizationRule
 * Source: https://github.com/MicrosoftDocs/azure-resource-manager-schema-reference-pr/blob/cc00969e3ee843f537f89d70433cca7f6a0b3111/arm-schema-ref/Microsoft.EventHub/2026-01-01/namespaces/authorizationrules.md
 * Operation: n/a
 * Runtime baseline: namespaces-authorizationrules.test.baseline.bicep and namespaces-authorizationrules.test.baseline.json
 * Gap/reduction: Source API versions are rendered with the package API version 2026-01-01.
 */

import { Namespace, NamespaceAuthorizationRule } from "@azure/provisioning-eventhub";
import { describe, it } from "vitest";

import {
  createResourceGroupStack,
  createSubscriptionStack,
  expectRenderedOutputsToMatchBaselines,
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

function buildScenarioStack({ createResourceGroupStack }: BuildScenarioHelpers) {
  const stack = createResourceGroupStack();
  const namespace = new Namespace(stack, {
    name: "acctest0001",
    location: "westeurope",
    sku: { capacity: 1, name: "Basic", tier: "Basic" },
    properties: {
      disableLocalAuth: false,
      isAutoInflateEnabled: false,
      publicNetworkAccess: "Enabled",
      zoneRedundant: false,
    },
  });
  new NamespaceAuthorizationRule(namespace, {
    name: "acctest0001",
    properties: { rights: ["Listen", "Send", "Manage"] },
  });
  return stack;
}

describe("learning-site/namespaces-authorizationrules", () => {
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
