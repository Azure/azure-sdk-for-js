// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * Primary resource type: Microsoft.ServiceBus/namespaces
 * Primary schema key: Microsoft.ServiceBus/namespaces
 * Also covers: Microsoft.ServiceBus/namespaces/queues
 * Scenario: quick-start/servicebus-create-queue
 * provisioning API: Namespace, Queue
 * Source: https://github.com/Azure/azure-quickstart-templates/blob/9a286202372ff9a9a4f4465e1ef30d7b0f3650c6/quickstarts/microsoft.servicebus/servicebus-create-queue/main.bicep
 * Operation: n/a
 * Runtime baseline: servicebus-create-queue.test.baseline.bicep and servicebus-create-queue.test.baseline.json
 * Gap/reduction: none
 */

import { Namespace, Queue } from "@azure/provisioning-servicebus";
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
    name: "quickstart-servicebus",
    location: values.location,
    sku: { name: "Standard" },
    properties: {},
  });
  new Queue(namespace, {
    name: "quickstart-queue",
    properties: {
      lockDuration: "PT5M",
      maxSizeInMegabytes: 1024,
      requiresDuplicateDetection: false,
      requiresSession: false,
      defaultMessageTimeToLive: "P10675199DT2H48M5.4775807S",
      deadLetteringOnMessageExpiration: false,
      duplicateDetectionHistoryTimeWindow: "PT10M",
      maxDeliveryCount: 10,
      autoDeleteOnIdle: "P10675199DT2H48M5.4775807S",
      enablePartitioning: false,
      enableExpress: false,
    },
  });
  return stack;
}

describe("quick-start/servicebus-create-queue", () => {
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
