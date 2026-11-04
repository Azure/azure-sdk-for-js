// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * Primary resource type: Microsoft.DocumentDB/cassandraClusters
 * Primary schema key: Microsoft.DocumentDB/cassandraClusters
 * Also covers: Microsoft.DocumentDB/cassandraClusters/dataCenters
 * Scenario: public-entrypoints/public-entrypoints-cluster-resource
 * provisioning API: ClusterResource, DataCenter
 * Source: packages\services\cosmosdb\src\index.ts
 * Operation: n/a
 * Runtime baseline: public-entrypoints-cluster-resource.test.baseline.bicep and public-entrypoints-cluster-resource.test.baseline.json
 * Gap/reduction: none
 */

import { ClusterResource, DataCenter } from "@azure/provisioning-cosmosdb";
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

function buildScenarioStack({
  createResourceGroupStack,
  createSubscriptionStack,
  values,
}: BuildScenarioHelpers) {
  const stack = createResourceGroupStack();
  const resource0 = new ClusterResource(stack, {
    name: "clusterresource-test",
  });
  stack.outputs.add("resource0Id", "string", resource0.id);
  const resource1 = new DataCenter(resource0, { name: "datacenter-test" });
  stack.outputs.add("resource1Id", "string", resource1.id);
  return stack;
}

describe("public-entrypoints/public-entrypoints-cluster-resource", () => {
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
