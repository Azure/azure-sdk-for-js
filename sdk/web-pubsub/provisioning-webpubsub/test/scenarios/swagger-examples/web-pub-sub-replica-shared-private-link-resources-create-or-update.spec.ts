// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * Primary resource type: Microsoft.SignalRService/webPubSub/replicas
 * Primary schema key: Microsoft.SignalRService/webPubSub/replicas
 * Also covers: none
 * Scenario: swagger-examples/web-pub-sub-replica-shared-private-link-resources-create-or-update
 * provisioning API: Replica
 * Source: https://github.com/Azure/azure-rest-api-specs/blob/b13ad902eeddef88ad574179ca21574e29f57806/specification/webpubsub/resource-manager/Microsoft.SignalRService/SignalRService/examples/2025-12-01-preview/WebPubSubReplicaSharedPrivateLinkResources_CreateOrUpdate.json
 * Operation: n/a
 * Runtime baseline: web-pub-sub-replica-shared-private-link-resources-create-or-update.test.baseline.bicep and web-pub-sub-replica-shared-private-link-resources-create-or-update.test.baseline.json
 * Gap/reduction: The planned schema key covers the replica parent of the source operation; the nested shared-private-link request body is omitted from the parent request projection.
 */

import { Replica, WebPubSub } from "@azure/provisioning-webpubsub";
import { describe, it } from "vitest";

import {
  createResourceGroupStack,
  createSubscriptionStack,
  expectRenderedOutputsToMatchBaselines,
  expectRenderedResourceToMatchSwaggerRequest,
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
  const service = new WebPubSub(stack, {
    existing: true,
    name: "myWebPubSubService",
  });
  new Replica(service, {
    name: "myWebPubSubService-eastus",
    location: "eastus",
  });
  return stack;
}

describe("swagger-examples/web-pub-sub-replica-shared-private-link-resources-create-or-update", () => {
  it("renders the expected Bicep and serialization output", async () => {
    const stack = await buildScenarioStack({
      createResourceGroupStack,
      createSubscriptionStack,
      values,
    });
    const rendered = renderStackArtifacts(stack);

    expectRenderedResourceToMatchSwaggerRequest(import.meta.url, rendered.outputs, {
      resourceType: "Microsoft.SignalRService/webPubSub/replicas",
      apiVersion: "2025-12-01-preview",
    });
    expectRenderedOutputsToMatchBaselines(import.meta.url, rendered.outputs);
  });
});
