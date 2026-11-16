// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * Primary resource type: Microsoft.ContainerRegistry/registries
 * Primary schema key: Microsoft.ContainerRegistry/registries
 * Also covers: Microsoft.ContainerRegistry/registries/replications
 * Scenario: quick-start/containerregistry-geo-replication
 * provisioning API: Registry, Replication
 * Source: https://github.com/Azure/azure-quickstart-templates/blob/dc1fdd92efd3b3755b30f313afc8e35967786b01/quickstarts/microsoft.containerregistry/containerregistry-geo-replication/main.bicep
 * Operation: n/a
 * Runtime baseline: containerregistry-geo-replication.test.baseline.bicep and containerregistry-geo-replication.test.baseline.json
 * Gap/reduction: none
 */

import { Registry, Replication } from "@azure/provisioning-containerregistry";
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
  const registry = new Registry(stack, {
    name: "crtest10",
    location: scenarioValues.location,
    sku: { name: "Premium" },
    tags: {
      displayName: "Container Registry",
      "container.registry": "crtest10",
    },
    properties: {
      adminUserEnabled: false,
    },
  });
  new Replication(registry, {
    name: "westus",
    location: scenarioValues.secondaryLocation,
    properties: {},
  });
  return stack;
}

describe("quick-start/containerregistry-geo-replication", () => {
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
