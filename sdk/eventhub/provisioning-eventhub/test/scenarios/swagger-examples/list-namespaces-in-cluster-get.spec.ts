// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * Primary resource type: Microsoft.EventHub/namespaces
 * Primary schema key: Microsoft.EventHub/namespaces
 * Also covers: none
 * Scenario: swagger-examples/list-namespaces-in-cluster-get
 * provisioning API: Namespace
 * Source: https://github.com/Azure/azure-rest-api-specs/blob/b13ad902eeddef88ad574179ca21574e29f57806/specification/eventhub/resource-manager/Microsoft.EventHub/Eventhub/examples/2026-01-01/Clusters/ListNamespacesInClusterGet.json
 * Operation: n/a
 * Runtime baseline: list-namespaces-in-cluster-get.test.baseline.bicep and list-namespaces-in-cluster-get.test.baseline.json
 * Gap/reduction: GET has no request body; the first response namespace identity is used for the planned namespace graph.
 */

import { Namespace } from "@azure/provisioning-eventhub";
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

function buildScenarioStack({ createResourceGroupStack }: BuildScenarioHelpers) {
  const stack = createResourceGroupStack();
  new Namespace(stack, {
    name: "rrama-int7-ns1",
    location: "southcentralus",
    sku: { name: "Standard", tier: "Standard", capacity: 1 },
  });
  return stack;
}

describe("swagger-examples/list-namespaces-in-cluster-get", () => {
  it("renders the expected Bicep and serialization output", async () => {
    const stack = await buildScenarioStack({
      createResourceGroupStack,
      createSubscriptionStack,
      values,
    });
    const rendered = renderStackArtifacts(stack);

    expectRenderedResourceToMatchSwaggerRequest(import.meta.url, rendered.outputs, {
      resourceType: "Microsoft.EventHub/namespaces",
      apiVersion: "2026-01-01",
    });
    expectRenderedOutputsToMatchBaselines(import.meta.url, rendered.outputs);
  });
});
