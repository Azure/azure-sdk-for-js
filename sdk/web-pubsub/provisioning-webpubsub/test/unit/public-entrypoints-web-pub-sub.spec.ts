// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * Primary resource type: Microsoft.SignalRService/webPubSub
 * Primary schema key: Microsoft.SignalRService/webPubSub
 * Also covers: Microsoft.SignalRService/webPubSub/customCertificates, Microsoft.SignalRService/webPubSub/customDomains, Microsoft.SignalRService/webPubSub/hubs, Microsoft.SignalRService/webPubSub/persistentStorages, Microsoft.SignalRService/webPubSub/privateEndpointConnections, Microsoft.SignalRService/webPubSub/replicas, Microsoft.SignalRService/webPubSub/replicas/sharedPrivateLinkResources, Microsoft.SignalRService/webPubSub/sharedPrivateLinkResources
 * Scenario: public-entrypoints/public-entrypoints-web-pub-sub
 * provisioning API: CustomCertificate, CustomDomain, Hub, PersistentStorage, PrivateEndpointConnection, Replica, WebPubSubReplicaSharedPrivateLink, WebPubSub, WebPubSubSharedPrivateLink
 * Source: packages\services\webpubsub\src\index.ts
 * Operation: n/a
 * Runtime baseline: public-entrypoints-web-pub-sub.test.baseline.bicep and public-entrypoints-web-pub-sub.test.baseline.json
 * Gap/reduction: none
 */

import {
  CustomCertificate,
  CustomDomain,
  Hub,
  PersistentStorage,
  PrivateEndpointConnection,
  Replica,
  WebPubSubReplicaSharedPrivateLink,
  WebPubSub,
  WebPubSubSharedPrivateLink,
} from "@azure/provisioning-webpubsub";
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
  const service = new WebPubSub(stack, {
    name: "wps-public-api",
    location: values.location,
    sku: { capacity: 1, name: "Standard_S1", tier: "Standard" },
    properties: {
      disableAadAuth: false,
      disableLocalAuth: false,
      publicNetworkAccess: "Enabled",
      tls: { clientCertEnabled: false },
    },
  });
  const certificate = new CustomCertificate(service, {
    name: "public-cert",
    properties: {
      keyVaultBaseUri: "https://public-vault.vault.azure.net/",
      keyVaultSecretName: "public-cert",
    },
  });
  new CustomDomain(service, {
    name: "public-domain",
    properties: {
      customCertificate: { id: certificate.id },
      domainName: "public.example.com",
    },
  });
  new Hub(service, {
    name: "public-hub",
    properties: {
      anonymousConnectPolicy: "deny",
      eventListeners: [],
    },
  });
  new PersistentStorage(service, {
    name: "public-storage",
    properties: {
      storageAccount: {
        id: `/subscriptions/${values.subscriptionId}/resourceGroups/${values.resourceGroupName}/providers/Microsoft.Storage/storageAccounts/publicstorage`,
      },
    },
  });
  new PrivateEndpointConnection(service, {
    name: "public-pec",
    properties: {
      privateLinkServiceConnectionState: {
        description: "Public entrypoint coverage",
        status: "Approved",
      },
    },
  });
  const replica = new Replica(service, {
    name: "public-replica",
    location: values.secondaryLocation,
    properties: { regionEndpointEnabled: "Enabled" },
    sku: { capacity: 1, name: "Standard_S1" },
  });
  new WebPubSubReplicaSharedPrivateLink(replica, {
    name: "public-replica-link",
    properties: {
      groupId: "sites",
      privateLinkResourceId: `/subscriptions/${values.subscriptionId}/resourceGroups/${values.resourceGroupName}/providers/Microsoft.Web/sites/public-app`,
    },
  });
  new WebPubSubSharedPrivateLink(service, {
    name: "public-link",
    properties: {
      groupId: "vault",
      privateLinkResourceId: `/subscriptions/${values.subscriptionId}/resourceGroups/${values.resourceGroupName}/providers/Microsoft.KeyVault/vaults/public-vault`,
    },
  });
  return stack;
}

describe("public-entrypoints/public-entrypoints-web-pub-sub", () => {
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
