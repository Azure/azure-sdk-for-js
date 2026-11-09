// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * Primary resource type: Microsoft.EventHub/namespaces
 * Primary schema key: Microsoft.EventHub/namespaces
 * Also covers: Microsoft.EventHub/namespaces/applicationGroups, Microsoft.EventHub/namespaces/authorizationRules, Microsoft.EventHub/namespaces/disasterRecoveryConfigs, Microsoft.EventHub/namespaces/disasterRecoveryConfigs/authorizationRules, Microsoft.EventHub/namespaces/eventhubs, Microsoft.EventHub/namespaces/eventhubs/authorizationRules, Microsoft.EventHub/namespaces/eventhubs/consumergroups, Microsoft.EventHub/namespaces/networkRuleSets, Microsoft.EventHub/namespaces/networkSecurityPerimeterConfigurations, Microsoft.EventHub/namespaces/privateEndpointConnections, Microsoft.EventHub/namespaces/schemagroups
 * Scenario: public-entrypoints/public-entrypoints-namespace
 * provisioning API: ApplicationGroup, ArmDisasterRecovery, ConsumerGroup, DisasterRecoveryConfigAuthorizationRule, Eventhub, EventhubAuthorizationRule, Namespace, NamespaceAuthorizationRule, NetworkRuleSet, NetworkSecurityPerimeterConfiguration, PrivateEndpointConnection, SchemaGroup
 * Source: packages\services\eventhub\src\index.ts
 * Operation: n/a
 * Runtime baseline: public-entrypoints-namespace.test.baseline.bicep and public-entrypoints-namespace.test.baseline.json
 * Gap/reduction: Read-only DisasterRecoveryConfigAuthorizationRule and NetworkSecurityPerimeterConfiguration exports use existing-resource constructors.
 */

import {
  ApplicationGroup,
  ArmDisasterRecovery,
  ConsumerGroup,
  DisasterRecoveryConfigAuthorizationRule,
  Eventhub,
  EventhubAuthorizationRule,
  Namespace,
  NamespaceAuthorizationRule,
  NetworkRuleSet,
  NetworkSecurityPerimeterConfiguration,
  PrivateEndpointConnection,
  SchemaGroup,
} from "@azure/provisioning-eventhub";
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
    name: "publicnamespace",
    location: values.location,
    sku: { name: "Standard", tier: "Standard", capacity: 1 },
    properties: {
      disableLocalAuth: false,
      isAutoInflateEnabled: true,
      maximumThroughputUnits: 4,
      publicNetworkAccess: "Enabled",
    },
    tags: { coverage: "public-entrypoints" },
  });
  new ApplicationGroup(namespace, {
    name: "public-app-group",
    properties: {
      clientAppGroupIdentifier: `AADAppID=${values.clientId}`,
      isEnabled: true,
    },
  });
  new NamespaceAuthorizationRule(namespace, {
    name: "public-ns-rule",
    properties: { rights: ["Listen", "Send", "Manage"] },
  });
  const disasterRecovery = new ArmDisasterRecovery(namespace, {
    name: "public-dr",
    properties: { alternateName: "public-dr-alternate" },
  });
  new DisasterRecoveryConfigAuthorizationRule(disasterRecovery, {
    existing: true,
    name: "public-dr-rule",
  });
  const eventhub = new Eventhub(namespace, {
    name: "public-eventhub",
    properties: {
      messageRetentionInDays: 7,
      partitionCount: 2,
      status: "Active",
    },
  });
  new EventhubAuthorizationRule(eventhub, {
    name: "public-eventhub-rule",
    properties: { rights: ["Send"] },
  });
  new ConsumerGroup(eventhub, {
    name: "public-consumer",
    properties: { userMetadata: "public entrypoint coverage" },
  });
  new NetworkRuleSet(namespace, {
    properties: {
      defaultAction: "Allow",
      publicNetworkAccess: "Enabled",
      trustedServiceAccessEnabled: true,
    },
  });
  new NetworkSecurityPerimeterConfiguration(namespace, {
    existing: true,
    name: "public-perimeter",
  });
  new PrivateEndpointConnection(namespace, {
    name: "public-pec",
    properties: {
      privateLinkServiceConnectionState: {
        description: "Approved for public entrypoint coverage",
        status: "Approved",
      },
    },
  });
  new SchemaGroup(namespace, {
    name: "public-schema-group",
    properties: {
      schemaCompatibility: "Forward",
      schemaType: "Avro",
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
