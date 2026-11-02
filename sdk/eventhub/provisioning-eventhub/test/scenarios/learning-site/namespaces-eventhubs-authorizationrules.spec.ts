// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * Primary resource type: Microsoft.EventHub/namespaces/eventhubs/authorizationRules
 * Primary schema key: Microsoft.EventHub/namespaces/eventhubs/authorizationRules
 * Also covers: Microsoft.EventHub/namespaces, Microsoft.EventHub/namespaces/eventhubs
 * Scenario: learning-site/namespaces-eventhubs-authorizationrules
 * provisioning API: Eventhub, EventhubAuthorizationRule, Namespace
 * Source: https://github.com/MicrosoftDocs/azure-resource-manager-schema-reference-pr/blob/cc00969e3ee843f537f89d70433cca7f6a0b3111/arm-schema-ref/Microsoft.EventHub/2026-01-01/namespaces/eventhubs/authorizationrules.md
 * Operation: n/a
 * Runtime baseline: namespaces-eventhubs-authorizationrules.test.baseline.bicep and namespaces-eventhubs-authorizationrules.test.baseline.json
 * Gap/reduction: Source API versions are rendered with the package API version 2026-01-01.
 */

import { Eventhub, EventhubAuthorizationRule, Namespace } from "@azure/provisioning-eventhub";
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
  const eventhub = new Eventhub(namespace, {
    name: "acctest0001",
    properties: {
      messageRetentionInDays: 1,
      partitionCount: 2,
      status: "Active",
    },
  });
  new EventhubAuthorizationRule(eventhub, {
    name: "acctest0001",
    properties: { rights: ["Send"] },
  });
  return stack;
}

describe("learning-site/namespaces-eventhubs-authorizationrules", () => {
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
