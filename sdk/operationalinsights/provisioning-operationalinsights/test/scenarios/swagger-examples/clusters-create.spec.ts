// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * Primary resource type: Microsoft.OperationalInsights/clusters
 * Primary schema key: Microsoft.OperationalInsights/clusters
 * Also covers: none
 * Scenario: swagger-examples/clusters-create
 * provisioning API: Cluster
 * Source: https://github.com/Azure/azure-rest-api-specs/blob/4cd7e2ac392a5d75c6a29fee14e93d2146364e79/specification/operationalinsights/resource-manager/Microsoft.OperationalInsights/OperationalInsights/examples/2025-07-01/ClustersCreate.json
 * Operation: n/a
 * Runtime baseline: clusters-create.test.baseline.bicep and clusters-create.test.baseline.json
 * Gap/reduction: none
 */

import { Cluster } from "@azure/provisioning-operationalinsights";
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
  new Cluster(stack, {
    name: "oiautorest6685",
    location: "eastus",
    sku: { name: "CapacityReservation", capacity: 100 },
    tags: { tag1: "val1" },
  });
  return stack;
}

describe("swagger-examples/clusters-create", () => {
  it("renders the expected Bicep and serialization output", async () => {
    const stack = await buildScenarioStack({
      createResourceGroupStack,
      createSubscriptionStack,
      values,
    });
    const rendered = renderStackArtifacts(stack);

    expectRenderedResourceToMatchSwaggerRequest(import.meta.url, rendered.outputs, {
      resourceType: "Microsoft.OperationalInsights/clusters",
      apiVersion: "2026-03-01",
    });
    expectRenderedOutputsToMatchBaselines(import.meta.url, rendered.outputs);
  });
});
