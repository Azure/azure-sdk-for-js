// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * Primary resource type: Microsoft.SignalRService/webPubSub/persistentStorages
 * Primary schema key: Microsoft.SignalRService/webPubSub/persistentStorages
 * Also covers: none
 * Scenario: learning-site/webpubsub-persistentstorages
 * provisioning API: PersistentStorage
 * Source: https://github.com/MicrosoftDocs/azure-resource-manager-schema-reference-pr/blob/cc00969e3ee843f537f89d70433cca7f6a0b3111/arm-schema-ref/Microsoft.SignalRService/2025-12-01-preview/webpubsub/persistentstorages.md
 * Operation: n/a
 * Runtime baseline: webpubsub-persistentstorages.test.baseline.bicep and webpubsub-persistentstorages.test.baseline.json
 * Gap/reduction: none
 */

import { PersistentStorage, WebPubSub } from "@azure/provisioning-webpubsub";
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
    existing: true,
    name: "wps-learn-storage",
  });
  new PersistentStorage(service, {
    name: "learn-storage",
    properties: {
      storageAccount: {
        id: `/subscriptions/${values.subscriptionId}/resourceGroups/${values.resourceGroupName}/providers/Microsoft.Storage/storageAccounts/learnstorage`,
      },
    },
  });
  return stack;
}

describe("learning-site/webpubsub-persistentstorages", () => {
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
