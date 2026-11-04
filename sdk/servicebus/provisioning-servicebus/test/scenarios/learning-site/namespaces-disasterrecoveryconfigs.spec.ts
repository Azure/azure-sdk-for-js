// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * Primary resource type: Microsoft.ServiceBus/namespaces/disasterRecoveryConfigs
 * Primary schema key: Microsoft.ServiceBus/namespaces/disasterRecoveryConfigs
 * Also covers: Microsoft.ServiceBus/namespaces
 * Scenario: learning-site/namespaces-disasterrecoveryconfigs
 * provisioning API: ArmDisasterRecovery, Namespace
 * Source: https://github.com/MicrosoftDocs/azure-resource-manager-schema-reference-pr/blob/cc00969e3ee843f537f89d70433cca7f6a0b3111/arm-schema-ref/Microsoft.ServiceBus/2026-01-01/namespaces/disasterrecoveryconfigs.md
 * Operation: n/a
 * Runtime baseline: namespaces-disasterrecoveryconfigs.test.baseline.bicep and namespaces-disasterrecoveryconfigs.test.baseline.json
 * Gap/reduction: subscription-scoped resource groups and module wrapper reduced to the package-owned Service Bus graph
 */

import { ArmDisasterRecovery, Namespace } from "@azure/provisioning-servicebus";
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
  const primary = new Namespace(stack, {
    name: "acctest0001ns1",
    location: "westus",
    sku: { capacity: 1, name: "Premium", tier: "Premium" },
    properties: {
      disableLocalAuth: false,
      minimumTlsVersion: "1.2",
      premiumMessagingPartitions: 1,
      publicNetworkAccess: "Enabled",
    },
  });
  const secondary = new Namespace(stack, {
    name: "acctest0001ns2",
    location: "centralus",
    sku: { capacity: 1, name: "Premium", tier: "Premium" },
    properties: {
      disableLocalAuth: false,
      minimumTlsVersion: "1.2",
      premiumMessagingPartitions: 1,
      publicNetworkAccess: "Enabled",
    },
  });
  new ArmDisasterRecovery(primary, {
    name: "acctest0001alias",
    properties: { partnerNamespace: secondary.id },
  });
  return stack;
}

describe("learning-site/namespaces-disasterrecoveryconfigs", () => {
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
