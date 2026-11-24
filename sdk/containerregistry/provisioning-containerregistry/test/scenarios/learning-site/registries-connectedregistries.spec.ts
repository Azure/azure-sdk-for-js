// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * Primary resource type: Microsoft.ContainerRegistry/registries/connectedRegistries
 * Primary schema key: Microsoft.ContainerRegistry/registries/connectedRegistries
 * Also covers: Microsoft.ContainerRegistry/registries, Microsoft.ContainerRegistry/registries/scopeMaps, Microsoft.ContainerRegistry/registries/tokens
 * Scenario: learning-site/registries-connectedregistries
 * provisioning API: ConnectedRegistry, Registry, ScopeMap, Token
 * Source: https://github.com/MicrosoftDocs/azure-resource-manager-schema-reference-pr/blob/b1c6c2d92fb9595b23634e83b20b37a457faae40/arm-schema-ref/Microsoft.ContainerRegistry/2025-11-01/registries/connectedregistries.md
 * Operation: n/a
 * Runtime baseline: registries-connectedregistries.test.baseline.bicep and registries-connectedregistries.test.baseline.json
 * Gap/reduction: none
 */

import {
  ConnectedRegistry,
  Registry,
  ScopeMap,
  Token,
} from "@azure/provisioning-containerregistry";
import { describe, it } from "vitest";

import {
  createResourceGroupStack,
  createSubscriptionStack,
  expectRenderedOutputsToMatchBaselines,
  renderStackArtifacts,
} from "../../utils/index.js";

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
    name: "crtest02",
    location: scenarioValues.location,
    sku: { name: "Premium" },
    properties: {
      adminUserEnabled: false,
      anonymousPullEnabled: false,
      dataEndpointEnabled: true,
      networkRuleBypassOptions: "AzureServices",
      policies: {
        exportPolicy: { status: "enabled" },
        quarantinePolicy: { status: "disabled" },
        retentionPolicy: {},
        trustPolicy: {},
      },
      publicNetworkAccess: "Enabled",
      zoneRedundancy: "Disabled",
    },
  });
  const scopeMap = new ScopeMap(registry, {
    name: "scopemap01",
    properties: {
      actions: [
        "repositories/hello-world/content/delete",
        "repositories/hello-world/content/read",
        "repositories/hello-world/content/write",
        "repositories/hello-world/metadata/read",
        "repositories/hello-world/metadata/write",
        "gateway/connected01/config/read",
        "gateway/connected01/config/write",
        "gateway/connected01/message/read",
        "gateway/connected01/message/write",
      ],
      description: "",
    },
  });
  const token = new Token(registry, {
    name: "token01",
    properties: {
      scopeMapId: scopeMap.id,
      status: "enabled",
    },
  });
  new ConnectedRegistry(registry, {
    name: "connected01",
    properties: {
      logging: {
        auditLogStatus: "Disabled",
        logLevel: "None",
      },
      mode: "ReadWrite",
      parent: {
        syncProperties: {
          messageTtl: "P1D",
          schedule: "* * * * *",
          syncWindow: "PT0S",
          tokenId: token.id,
        },
      },
    },
  });
  return stack;
}

describe("learning-site/registries-connectedregistries", () => {
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
