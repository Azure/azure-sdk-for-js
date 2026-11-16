// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * Primary resource type: Microsoft.ContainerRegistry/registries/replications
 * Primary schema key: Microsoft.ContainerRegistry/registries/replications
 * Also covers: none
 * Scenario: learning-site/registries-replications
 * provisioning API: Registry, Replication
 * Source: https://github.com/MicrosoftDocs/azure-resource-manager-schema-reference-pr/blob/b1c6c2d92fb9595b23634e83b20b37a457faae40/arm-schema-ref/Microsoft.ContainerRegistry/2025-11-01/registries/replications.md
 * Operation: n/a
 * Runtime baseline: registries-replications.test.baseline.bicep and registries-replications.test.baseline.json
 * Gap/reduction: none
 */

import { Registry, Replication } from "@azure/provisioning-containerregistry";
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
    name: "crtest06",
    location: scenarioValues.location,
    sku: { name: "Premium" },
  });
  new Replication(registry, {
    name: "westus",
    location: scenarioValues.secondaryLocation,
    properties: {
      regionEndpointEnabled: true,
      zoneRedundancy: "Disabled",
    },
    tags: {
      displayName: "Container Registry replication",
    },
  });
  return stack;
}

describe("learning-site/registries-replications", () => {
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
