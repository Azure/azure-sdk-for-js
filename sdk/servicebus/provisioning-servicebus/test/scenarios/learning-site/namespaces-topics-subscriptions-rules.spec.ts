// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * Primary resource type: Microsoft.ServiceBus/namespaces/topics/subscriptions/rules
 * Primary schema key: Microsoft.ServiceBus/namespaces/topics/subscriptions/rules
 * Also covers: Microsoft.ServiceBus/namespaces, Microsoft.ServiceBus/namespaces/topics, Microsoft.ServiceBus/namespaces/topics/subscriptions
 * Scenario: learning-site/namespaces-topics-subscriptions-rules
 * provisioning API: Namespace, Rule, Subscription, Topic
 * Source: https://github.com/MicrosoftDocs/azure-resource-manager-schema-reference-pr/blob/cc00969e3ee843f537f89d70433cca7f6a0b3111/arm-schema-ref/Microsoft.ServiceBus/2026-01-01/namespaces/topics/subscriptions/rules.md
 * Operation: n/a
 * Runtime baseline: namespaces-topics-subscriptions-rules.test.baseline.bicep and namespaces-topics-subscriptions-rules.test.baseline.json
 * Gap/reduction: empty clientAffineProperties object omitted
 */

import { Namespace, Rule, Subscription, Topic } from "@azure/provisioning-servicebus";
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
    sku: { capacity: 0, name: "Standard", tier: "Standard" },
    properties: {
      disableLocalAuth: false,
      publicNetworkAccess: "Enabled",
      zoneRedundant: false,
    },
  });
  const topic = new Topic(namespace, {
    name: "acctest0001",
    properties: {
      enableBatchedOperations: false,
      enableExpress: false,
      enablePartitioning: false,
      maxSizeInMegabytes: 5120,
      requiresDuplicateDetection: false,
      status: "Active",
      supportOrdering: false,
    },
  });
  const subscription = new Subscription(topic, {
    name: "acctest0001",
    properties: {
      deadLetteringOnFilterEvaluationExceptions: true,
      deadLetteringOnMessageExpiration: false,
      enableBatchedOperations: false,
      isClientAffine: false,
      maxDeliveryCount: 10,
      requiresSession: false,
      status: "Active",
    },
  });
  new Rule(subscription, {
    name: "acctest0001",
    properties: {
      correlationFilter: {
        contentType: "test_content_type",
        correlationId: "test_correlation_id",
        label: "test_label",
        messageId: "test_message_id",
        replyTo: "test_reply_to",
        replyToSessionId: "test_reply_to_session_id",
        sessionId: "test_session_id",
        to: "test_to",
      },
      filterType: "CorrelationFilter",
    },
  });
  return stack;
}

describe("learning-site/namespaces-topics-subscriptions-rules", () => {
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
