// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * Primary resource type: Microsoft.EventHub/namespaces/networkRuleSets
 * Primary schema key: Microsoft.EventHub/namespaces/networkRuleSets
 * Also covers: none
 * Scenario: learning-site/namespaces-networkrulesets
 * provisioning API: NetworkRuleSet
 * Source: https://github.com/MicrosoftDocs/azure-resource-manager-schema-reference-pr/blob/cc00969e3ee843f537f89d70433cca7f6a0b3111/arm-schema-ref/Microsoft.EventHub/2026-01-01/namespaces/networkrulesets.md
 * Operation: n/a
 * Runtime baseline: namespaces-networkrulesets.test.baseline.bicep and namespaces-networkrulesets.test.baseline.json
 * Gap/reduction: Learn skeleton placeholders are replaced with schema-valid representative values.
 */

import { Namespace, NetworkRuleSet } from "@azure/provisioning-eventhub";
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

function buildScenarioStack({ createResourceGroupStack, values }: BuildScenarioHelpers) {
  const stack = createResourceGroupStack();
  const namespace = new Namespace(stack, {
    name: "learnnetworkns",
    location: values.location,
    sku: { name: "Standard", tier: "Standard", capacity: 1 },
  });
  new NetworkRuleSet(namespace, {
    properties: {
      defaultAction: "Deny",
      ipRules: [{ action: "Allow", ipMask: "10.0.0.0/24" }],
      publicNetworkAccess: "Enabled",
      trustedServiceAccessEnabled: true,
      virtualNetworkRules: [
        {
          ignoreMissingVnetServiceEndpoint: true,
          subnet: {
            id: `/subscriptions/${values.subscriptionId}/resourceGroups/${values.resourceGroupName}/providers/Microsoft.Network/virtualNetworks/learn-vnet/subnets/default`,
          },
        },
      ],
    },
  });
  return stack;
}

describe("learning-site/namespaces-networkrulesets", () => {
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
