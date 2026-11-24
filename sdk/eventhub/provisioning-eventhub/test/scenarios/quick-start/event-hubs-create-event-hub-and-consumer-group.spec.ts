// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * Primary resource type: Microsoft.EventHub/namespaces
 * Primary schema key: Microsoft.EventHub/namespaces
 * Also covers: Microsoft.EventHub/namespaces/eventhubs, Microsoft.EventHub/namespaces/eventhubs/consumergroups
 * Scenario: quick-start/event-hubs-create-event-hub-and-consumer-group
 * provisioning API: ConsumerGroup, Eventhub, Namespace
 * Source: https://github.com/Azure/azure-quickstart-templates/blob/9a286202372ff9a9a4f4465e1ef30d7b0f3650c6/quickstarts/microsoft.eventhub/event-hubs-create-event-hub-and-consumer-group/main.bicep
 * Operation: n/a
 * Runtime baseline: event-hubs-create-event-hub-and-consumer-group.test.baseline.bicep and event-hubs-create-event-hub-and-consumer-group.test.baseline.json
 * Gap/reduction: Source API version 2022-10-01-preview is rendered with the package API version 2026-01-01.
 */

import { ConsumerGroup, Eventhub, Namespace } from "@azure/provisioning-eventhub";
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
    name: "quickconsumergrpns",
    location: values.location,
    sku: { name: "Standard", tier: "Standard", capacity: 1 },
    tags: { tag1: "value1", tag2: "value2" },
    properties: {},
  });
  const eventhub = new Eventhub(namespace, {
    name: "quick-consumer-eventhub",
    properties: {},
  });
  new ConsumerGroup(eventhub, {
    name: "quick-consumer-group",
    properties: { userMetadata: "User Metadata goes here" },
  });
  return stack;
}

describe("quick-start/event-hubs-create-event-hub-and-consumer-group", () => {
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
