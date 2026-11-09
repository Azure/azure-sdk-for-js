// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * Primary resource type: Microsoft.ContainerRegistry/registries/webhooks
 * Primary schema key: Microsoft.ContainerRegistry/registries/webhooks
 * Also covers: Microsoft.ContainerRegistry/registries
 * Scenario: learning-site/registries-webhooks
 * provisioning API: Registry, Webhook
 * Source: https://github.com/MicrosoftDocs/azure-resource-manager-schema-reference-pr/blob/b1c6c2d92fb9595b23634e83b20b37a457faae40/arm-schema-ref/Microsoft.ContainerRegistry/2025-11-01/registries/webhooks.md
 * Operation: n/a
 * Runtime baseline: registries-webhooks.test.baseline.bicep and registries-webhooks.test.baseline.json
 * Gap/reduction: none
 */

import { Registry, Webhook } from "@azure/provisioning-containerregistry";
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
    name: "crtest07",
    location: scenarioValues.location,
    sku: { name: "Standard" },
    properties: {
      adminUserEnabled: false,
      anonymousPullEnabled: false,
      dataEndpointEnabled: false,
      encryption: { status: "disabled" },
      networkRuleBypassOptions: "AzureServices",
      policies: {
        exportPolicy: { status: "enabled" },
        quarantinePolicy: { status: "disabled" },
        retentionPolicy: { status: "disabled" },
        trustPolicy: { status: "disabled" },
      },
      publicNetworkAccess: "Enabled",
      zoneRedundancy: "Disabled",
    },
  });
  new Webhook(registry, {
    name: "webhook01",
    location: scenarioValues.location,
    properties: {
      actions: ["push"],
      customHeaders: {},
      scope: "",
      serviceUri: "https://mywebhookreceiver.example/mytag",
      status: "enabled",
    },
  });
  return stack;
}

describe("learning-site/registries-webhooks", () => {
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
