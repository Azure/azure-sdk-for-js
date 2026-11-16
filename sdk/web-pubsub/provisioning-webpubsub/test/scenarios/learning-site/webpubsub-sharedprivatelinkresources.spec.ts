// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * Primary resource type: Microsoft.SignalRService/webPubSub/sharedPrivateLinkResources
 * Primary schema key: Microsoft.SignalRService/webPubSub/sharedPrivateLinkResources
 * Also covers: Microsoft.SignalRService/webPubSub
 * Scenario: learning-site/webpubsub-sharedprivatelinkresources
 * provisioning API: WebPubSub, WebPubSubSharedPrivateLink
 * Source: https://github.com/MicrosoftDocs/azure-resource-manager-schema-reference-pr/blob/cc00969e3ee843f537f89d70433cca7f6a0b3111/arm-schema-ref/Microsoft.SignalRService/2025-12-01-preview/webpubsub/sharedprivatelinkresources.md
 * Operation: n/a
 * Runtime baseline: webpubsub-sharedprivatelinkresources.test.baseline.bicep and webpubsub-sharedprivatelinkresources.test.baseline.json
 * Gap/reduction: none
 */

import { WebPubSub, WebPubSubSharedPrivateLink } from "@azure/provisioning-webpubsub";
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
  const service = new WebPubSub(stack, {
    name: "wps-learn-link",
    location: values.secondaryLocation,
    sku: { capacity: 1, name: "Standard_S1" },
    properties: {
      disableAadAuth: false,
      disableLocalAuth: false,
      publicNetworkAccess: "Enabled",
      tls: { clientCertEnabled: false },
    },
  });
  new WebPubSubSharedPrivateLink(service, {
    name: "learn-link",
    properties: {
      groupId: "vault",
      privateLinkResourceId: `/subscriptions/${values.subscriptionId}/resourceGroups/${values.resourceGroupName}/providers/Microsoft.KeyVault/vaults/learn-vault`,
    },
  });
  return stack;
}

describe("learning-site/webpubsub-sharedprivatelinkresources", () => {
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
