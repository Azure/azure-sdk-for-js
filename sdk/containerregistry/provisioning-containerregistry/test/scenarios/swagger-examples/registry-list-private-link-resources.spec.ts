// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * Primary resource type: Microsoft.ContainerRegistry/registries/privateLinkResources
 * Primary schema key: Microsoft.ContainerRegistry/registries/privateLinkResources
 * Also covers: none
 * Scenario: swagger-examples/registry-list-private-link-resources
 * provisioning API: PrivateLinkResource, Registry
 * Source: https://github.com/Azure/azure-rest-api-specs/blob/3d1de464b5576fa149aed429795f6030313e31bb/specification/containerregistry/resource-manager/Microsoft.ContainerRegistry/Registry/examples/2025-11-01/RegistryListPrivateLinkResources.json
 * Operation: n/a
 * Runtime baseline: registry-list-private-link-resources.test.baseline.bicep and registry-list-private-link-resources.test.baseline.json
 * Gap/reduction: none
 */

import { PrivateLinkResource, Registry } from "@azure/provisioning-containerregistry";
import { describe, it } from "vitest";

import {
  createResourceGroupStack,
  createSubscriptionStack,
  expectRenderedOutputsToMatchBaselines,
  expectRenderedResourceToMatchSwaggerRequest,
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
    name: "crtest12",
    location: scenarioValues.location,
    sku: { name: "Premium" },
  });
  new PrivateLinkResource(registry, { name: "registry", existing: true });
  return stack;
}

describe("swagger-examples/registry-list-private-link-resources", () => {
  it("renders the expected Bicep and serialization output", async () => {
    const stack = await buildScenarioStack({
      createResourceGroupStack,
      createSubscriptionStack,
      values,
    });
    const rendered = renderStackArtifacts(stack);

    expectRenderedResourceToMatchSwaggerRequest(import.meta.url, rendered.outputs, {
      resourceType: "Microsoft.ContainerRegistry/registries/privateLinkResources",
      apiVersion: "2025-11-01",
    });
    expectRenderedOutputsToMatchBaselines(import.meta.url, rendered.outputs);
  });
});
