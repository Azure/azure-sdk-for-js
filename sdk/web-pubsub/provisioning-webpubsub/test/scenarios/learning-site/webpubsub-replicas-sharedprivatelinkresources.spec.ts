// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * Primary resource type: Microsoft.SignalRService/webPubSub/replicas/sharedPrivateLinkResources
 * Primary schema key: Microsoft.SignalRService/webPubSub/replicas/sharedPrivateLinkResources
 * Also covers: none
 * Scenario: learning-site/webpubsub-replicas-sharedprivatelinkresources
 * provisioning API: WebPubSubReplicaSharedPrivateLink
 * Source: https://github.com/MicrosoftDocs/azure-resource-manager-schema-reference-pr/blob/cc00969e3ee843f537f89d70433cca7f6a0b3111/arm-schema-ref/Microsoft.SignalRService/2025-12-01-preview/webpubsub/replicas/sharedprivatelinkresources.md
 * Operation: n/a
 * Runtime baseline: webpubsub-replicas-sharedprivatelinkresources.test.baseline.bicep and webpubsub-replicas-sharedprivatelinkresources.test.baseline.json
 * Gap/reduction: none
 */

import {
  Replica,
  WebPubSubReplicaSharedPrivateLink,
  WebPubSub,
} from "@azure/provisioning-webpubsub";
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
    name: "wps-learn-replica-link",
  });
  const replica = new Replica(service, {
    existing: true,
    name: "learn-replica",
  });
  new WebPubSubReplicaSharedPrivateLink(replica, {
    name: "learn-link",
    properties: {
      fqdns: ["learn.example.com"],
      groupId: "sites",
      privateLinkResourceId: `/subscriptions/${values.subscriptionId}/resourceGroups/${values.resourceGroupName}/providers/Microsoft.Web/sites/learn-app`,
      requestMessage: "Please approve",
    },
  });
  return stack;
}

describe("learning-site/webpubsub-replicas-sharedprivatelinkresources", () => {
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
