// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * Primary resource type: Microsoft.ContainerRegistry/registries
 * Primary schema key: Microsoft.ContainerRegistry/registries
 * Also covers: none
 * Scenario: quick-start/containerregistry-with-policies-and-diagnostics
 * provisioning API: Registry
 * Source: https://github.com/Azure/azure-quickstart-templates/blob/dc1fdd92efd3b3755b30f313afc8e35967786b01/quickstarts/microsoft.containerregistry/containerregistry-with-policies-and-diagnostics/main.bicep
 * Operation: n/a
 * Runtime baseline: containerregistry-with-policies-and-diagnostics.test.baseline.bicep and containerregistry-with-policies-and-diagnostics.test.baseline.json
 * Gap/reduction: none
 */

import { Registry } from "@azure/provisioning-containerregistry";
import { describe, it } from "vitest";

import {
  createResourceGroupStack,
  createSubscriptionStack,
  expectRenderOutputsToMatchSample,
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
  new Registry(stack, {
    name: "crtest11",
    location: scenarioValues.location,
    sku: { name: "Basic" },
    identity: {
      type: "SystemAssigned",
    },
    properties: {
      adminUserEnabled: false,
      publicNetworkAccess: "Enabled",
      zoneRedundancy: "Disabled",
      networkRuleBypassOptions: "None",
      networkRuleSet: {
        defaultAction: "Allow",
        ipRules: [
          {
            action: "Allow",
            iPAddressOrRange: "10.0.0.0/24",
          },
        ],
      },
      policies: {
        exportPolicy: { status: "enabled" },
        quarantinePolicy: { status: "disabled" },
        retentionPolicy: { days: 7, status: "enabled" },
        trustPolicy: { type: "Notary", status: "disabled" },
      },
    },
  });
  return stack;
}

describe("quick-start/containerregistry-with-policies-and-diagnostics", () => {
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
