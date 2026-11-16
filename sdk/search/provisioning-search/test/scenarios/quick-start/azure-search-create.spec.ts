// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * Primary resource type: Microsoft.Search/searchServices
 * Primary schema key: Microsoft.Search/searchServices
 * Also covers: none
 * Scenario: quick-start/azure-search-create
 * provisioning API: SearchService
 * Source: https://github.com/Azure/azure-quickstart-templates/blob/9a286202372ff9a9a4f4465e1ef30d7b0f3650c6/quickstarts/microsoft.search/azure-search-create/main.bicep
 * Operation: n/a
 * Runtime baseline: azure-search-create.test.baseline.bicep and azure-search-create.test.baseline.json
 * Gap/reduction: Quickstart parameters are represented by stable source defaults and deterministic test values., The quickstart uses API version 2020-08-01; the package renders 2025-05-01., The source hostingMode value default is normalized to the current API value Default.
 */

import { SearchService } from "@azure/provisioning-search";
import { describe, it } from "vitest";

import {
  createResourceGroupStack,
  createSubscriptionStack,
  expectRenderOutputsToMatchSample,
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
  new SearchService(stack, {
    name: "search-create",
    location: values.location,
    sku: {
      name: "standard",
    },
    properties: {
      replicaCount: 1,
      partitionCount: 1,
      hostingMode: "Default",
    },
  });
  return stack;
}

describe("quick-start/azure-search-create", () => {
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
