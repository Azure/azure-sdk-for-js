// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * Primary resource type: Microsoft.ContainerRegistry/registries
 * Primary schema key: Microsoft.ContainerRegistry/registries
 * Also covers: Microsoft.ContainerRegistry/registries/cacheRules, Microsoft.ContainerRegistry/registries/connectedRegistries, Microsoft.ContainerRegistry/registries/credentialSets, Microsoft.ContainerRegistry/registries/privateEndpointConnections, Microsoft.ContainerRegistry/registries/privateLinkResources, Microsoft.ContainerRegistry/registries/replications, Microsoft.ContainerRegistry/registries/scopeMaps, Microsoft.ContainerRegistry/registries/tokens, Microsoft.ContainerRegistry/registries/webhooks
 * Scenario: public-entrypoints/public-entrypoints-registry
 * provisioning API: CacheRule, ConnectedRegistry, CredentialSet, PrivateEndpointConnection, PrivateLinkResource, Registry, Replication, ScopeMap, Token, Webhook
 * Source: packages\cdk\containerregistry\src\index.ts
 * Operation: n/a
 * Runtime baseline: public-entrypoints-registry.test.baseline.bicep and public-entrypoints-registry.test.baseline.json
 * Gap/reduction: none
 */

import {
  CacheRule,
  ConnectedRegistry,
  CredentialSet,
  PrivateEndpointConnection,
  PrivateLinkResource,
  Registry,
  Replication,
  ScopeMap,
  Token,
  Webhook,
} from "@azure/provisioning-containerregistry";
import { describe, it } from "vitest";

import {
  createResourceGroupStack,
  createSubscriptionStack,
  expectRenderedOutputsToMatchBaselines,
  renderStackArtifacts,
} from "../utils/index.js";

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

function buildScenarioStack({
  createResourceGroupStack: scenarioCreateResourceGroupStack,
  values: scenarioValues,
}: any): import("@azure/provisioning-core").Stack {
  const stack = scenarioCreateResourceGroupStack();
  const registry = new Registry(stack, {
    name: "crtest08",
    location: scenarioValues.location,
    sku: { name: "Premium" },
    identity: { type: "SystemAssigned" },
    tags: { scenario: "public-entrypoints" },
    properties: {
      adminUserEnabled: false,
      anonymousPullEnabled: false,
      dataEndpointEnabled: true,
      publicNetworkAccess: "Enabled",
      networkRuleBypassOptions: "AzureServices",
      networkRuleBypassAllowedForTasks: false,
      networkRuleSet: {
        defaultAction: "Allow",
        ipRules: [{ action: "Allow", iPAddressOrRange: "10.0.0.0/24" }],
      },
      policies: {
        exportPolicy: { status: "enabled" },
        quarantinePolicy: { status: "disabled" },
        retentionPolicy: { days: 7, status: "enabled" },
        trustPolicy: { type: "Notary", status: "disabled" },
        azureAdAuthenticationAsArmPolicy: { status: "enabled" },
      },
      roleAssignmentMode: "LegacyRegistryPermissions",
      zoneRedundancy: "Disabled",
    },
  });
  new CacheRule(registry, {
    name: "cache01",
    properties: {
      credentialSetResourceId: `/subscriptions/${scenarioValues.subscriptionId}/resourceGroups/${scenarioValues.resourceGroupName}/providers/Microsoft.ContainerRegistry/registries/crtest08/credentialSets/credset01`,
      sourceRepository: "docker.io/library/hello-world",
      targetRepository: "hello-world",
    },
  });
  new CredentialSet(registry, {
    name: "credset01",
    identity: { type: "SystemAssigned" },
    properties: {
      loginServer: "docker.io",
      authCredentials: [
        {
          name: "Credential1",
          usernameSecretIdentifier: "https://crtest08vault.vault.azure.net/secrets/username",
          passwordSecretIdentifier: "https://crtest08vault.vault.azure.net/secrets/password",
        },
      ],
    },
  });
  const scopeMap = new ScopeMap(registry, {
    name: "scope01",
    properties: {
      description: "Scope map for public entrypoint coverage.",
      actions: ["repositories/hello-world/content/read", "repositories/hello-world/metadata/read"],
    },
  });
  const token = new Token(registry, {
    name: "token01",
    properties: {
      scopeMapId: scopeMap.id,
      status: "enabled",
      credentials: {
        certificates: [
          {
            name: "certificate1",
            encodedPemCertificate: "LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0t",
          },
        ],
        passwords: [
          {
            name: "password1",
            expiry: new globalThis.Date("2027-01-01T00:00:00.000Z"),
          },
        ],
      },
    },
  });
  new ConnectedRegistry(registry, {
    name: "connected02",
    properties: {
      mode: "ReadOnly",
      clientTokenIds: [token.id],
      notificationsList: ["hello-world:*"],
      logging: {
        auditLogStatus: "Enabled",
        logLevel: "Information",
      },
      garbageCollection: {
        enabled: true,
        schedule: "0 0 * * *",
      },
      parent: {
        id: registry.id,
        syncProperties: {
          tokenId: token.id,
          schedule: "0 0 * * *",
          syncWindow: "PT3H",
          messageTtl: "P1D",
        },
      },
    },
  });
  new PrivateLinkResource(registry, { name: "registry", existing: true });
  new PrivateEndpointConnection(registry, {
    name: "pec02",
    properties: {
      privateEndpoint: {
        id: `/subscriptions/${scenarioValues.subscriptionId}/resourceGroups/${scenarioValues.resourceGroupName}/providers/Microsoft.Network/privateEndpoints/pe02`,
      },
      privateLinkServiceConnectionState: {
        status: "Pending",
        description: "Pending private endpoint connection.",
        actionsRequired: "None",
      },
    },
  });
  new Replication(registry, {
    name: "westus",
    location: scenarioValues.secondaryLocation,
    tags: { scenario: "public-entrypoints" },
    properties: {
      regionEndpointEnabled: true,
      zoneRedundancy: "Disabled",
    },
  });
  new Webhook(registry, {
    name: "webhook02",
    location: scenarioValues.location,
    tags: { scenario: "public-entrypoints" },
    properties: {
      actions: ["push", "delete"],
      customHeaders: { "X-Test": "containerregistry" },
      scope: "hello-world:*",
      serviceUri: "https://webhook.example/notify",
      status: "enabled",
    },
  });
  return stack;
}

describe("public-entrypoints/public-entrypoints-registry", () => {
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
