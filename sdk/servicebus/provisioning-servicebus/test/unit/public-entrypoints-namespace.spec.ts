// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * Primary resource type: Microsoft.ServiceBus/namespaces
 * Primary schema key: Microsoft.ServiceBus/namespaces
 * Also covers: Microsoft.ServiceBus/namespaces/AuthorizationRules, Microsoft.ServiceBus/namespaces/disasterRecoveryConfigs, Microsoft.ServiceBus/namespaces/disasterRecoveryConfigs/authorizationRules, Microsoft.ServiceBus/namespaces/migrationConfigurations, Microsoft.ServiceBus/namespaces/networkRuleSets, Microsoft.ServiceBus/namespaces/networkSecurityPerimeterConfigurations, Microsoft.ServiceBus/namespaces/privateEndpointConnections, Microsoft.ServiceBus/namespaces/queues, Microsoft.ServiceBus/namespaces/queues/authorizationRules, Microsoft.ServiceBus/namespaces/topics, Microsoft.ServiceBus/namespaces/topics/authorizationRules, Microsoft.ServiceBus/namespaces/topics/subscriptions, Microsoft.ServiceBus/namespaces/topics/subscriptions/rules
 * Scenario: public-entrypoints/public-entrypoints-namespace
 * provisioning API: ArmDisasterRecovery, ServiceBusDisasterRecoveryAuthorizationRule, MigrationConfigProperties, Namespace, ServiceBusNamespaceAuthorizationRule, NetworkRuleSet, NetworkSecurityPerimeterConfiguration, PrivateEndpointConnection, Queue, ServiceBusQueueAuthorizationRule, Rule, Subscription, Topic, ServiceBusTopicAuthorizationRule
 * Source: packages\services\servicebus\src\index.ts
 * Operation: n/a
 * Runtime baseline: public-entrypoints-namespace.test.baseline.bicep and public-entrypoints-namespace.test.baseline.json
 * Gap/reduction: none
 */

import {
  ArmDisasterRecovery,
  ServiceBusDisasterRecoveryAuthorizationRule,
  MigrationConfigProperties,
  Namespace,
  ServiceBusNamespaceAuthorizationRule,
  NetworkRuleSet,
  NetworkSecurityPerimeterConfiguration,
  PrivateEndpointConnection,
  Queue,
  ServiceBusQueueAuthorizationRule,
  Rule,
  Subscription,
  Topic,
  ServiceBusTopicAuthorizationRule,
} from "@azure/provisioning-servicebus";
import { describe, it } from "vitest";

import {
  createResourceGroupStack,
  createSubscriptionStack,
  expectRenderedOutputsToMatchBaselines,
  renderStackArtifacts,
} from "../utils/index.js";

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
    name: "public-servicebus",
    location: values.location,
    sku: { name: "Premium", tier: "Premium", capacity: 1 },
    properties: { publicNetworkAccess: "Enabled" },
  });
  new ServiceBusNamespaceAuthorizationRule(namespace, {
    name: "namespace-rule",
    properties: { rights: ["Listen"] },
  });
  const alias = new ArmDisasterRecovery(namespace, {
    name: "public-alias",
    properties: { alternateName: "public-secondary" },
  });
  new ServiceBusDisasterRecoveryAuthorizationRule(alias, {
    existing: true,
    name: "alias-rule",
  });
  new MigrationConfigProperties(namespace, {
    name: "$default",
    properties: {
      postMigrationName: "public-standard",
      targetNamespace: `/subscriptions/${values.subscriptionId}/resourceGroups/${values.resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/public-premium`,
    },
  });
  new NetworkRuleSet(namespace, {
    properties: {
      defaultAction: "Allow",
      publicNetworkAccess: "Enabled",
    },
  });
  new NetworkSecurityPerimeterConfiguration(namespace, {
    existing: true,
    name: "public-association",
  });
  new PrivateEndpointConnection(namespace, {
    name: "public-endpoint",
    properties: {
      privateLinkServiceConnectionState: { status: "Approved" },
    },
  });
  const queue = new Queue(namespace, {
    name: "public-queue",
    properties: { maxDeliveryCount: 10 },
  });
  new ServiceBusQueueAuthorizationRule(queue, {
    name: "queue-rule",
    properties: { rights: ["Send"] },
  });
  const topic = new Topic(namespace, {
    name: "public-topic",
    properties: { supportOrdering: true },
  });
  new ServiceBusTopicAuthorizationRule(topic, {
    name: "topic-rule",
    properties: { rights: ["Manage"] },
  });
  const subscription = new Subscription(topic, {
    name: "public-subscription",
    properties: { maxDeliveryCount: 10 },
  });
  new Rule(subscription, {
    name: "public-rule",
    properties: {
      filterType: "SqlFilter",
      sqlFilter: { sqlExpression: "priority = 'high'" },
    },
  });
  return stack;
}

describe("public-entrypoints/public-entrypoints-namespace", () => {
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
