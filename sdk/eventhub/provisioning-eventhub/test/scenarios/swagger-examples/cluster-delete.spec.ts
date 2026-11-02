// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * Primary resource type: Microsoft.EventHub/clusters
 * Primary schema key: Microsoft.EventHub/clusters
 * Also covers: none
 * Scenario: swagger-examples/cluster-delete
 * provisioning API: Cluster
 * Source: https://github.com/Azure/azure-rest-api-specs/blob/b13ad902eeddef88ad574179ca21574e29f57806/specification/eventhub/resource-manager/Microsoft.EventHub/Eventhub/examples/2026-01-01/Clusters/ClusterDelete.json
 * Operation: n/a
 * Runtime baseline: cluster-delete.test.baseline.bicep and cluster-delete.test.baseline.json
 * Gap/reduction: DELETE has no request body; path/query parameters and responses are excluded from the Swagger request contract.
 */

import { Cluster } from "@azure/provisioning-eventhub";
import { describe, it } from "vitest";

import {
  createResourceGroupStack,
  createSubscriptionStack,
  expectRenderedOutputsToMatchBaselines,
  expectRenderedResourceToMatchSwaggerRequest,
  renderStackArtifacts,
} from "../../utils/index.js";

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
  new Cluster(stack, {
    name: "testCluster",
    location: values.location,
    sku: { name: "Dedicated", capacity: 1 },
  });
  return stack;
}

describe("swagger-examples/cluster-delete", () => {
  it("renders the expected Bicep and serialization output", async () => {
    const stack = await buildScenarioStack({
      createResourceGroupStack,
      createSubscriptionStack,
      values,
    });
    const rendered = renderStackArtifacts(stack);

    expectRenderedResourceToMatchSwaggerRequest(import.meta.url, rendered.outputs, {
      resourceType: "Microsoft.EventHub/clusters",
      apiVersion: "2026-01-01",
    });
    expectRenderedOutputsToMatchBaselines(import.meta.url, rendered.outputs);
  });
});
