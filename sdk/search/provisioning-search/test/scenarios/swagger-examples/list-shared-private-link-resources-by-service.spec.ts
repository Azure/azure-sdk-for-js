// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * Primary resource type: Microsoft.Search/searchServices/sharedPrivateLinkResources
 * Primary schema key: Microsoft.Search/searchServices/sharedPrivateLinkResources
 * Also covers: none
 * Scenario: swagger-examples/list-shared-private-link-resources-by-service
 * provisioning API: SharedPrivateLinkResource
 * Source: https://github.com/Azure/azure-rest-api-specs/blob/09685799a1c25766ba250f5cd6051659be8a4e50/specification/search/resource-manager/Microsoft.Search/Search/examples/2025-05-01/ListSharedPrivateLinkResourcesByService.json
 * Operation: n/a
 * Runtime baseline: list-shared-private-link-resources-by-service.test.baseline.bicep and list-shared-private-link-resources-by-service.test.baseline.json
 * Gap/reduction: The first response resource name is used for the planned child identity., The list operation has no request body; path/query parameters and response-only fields are excluded.
 */

import { SearchService, SharedPrivateLinkResource } from "@azure/provisioning-search";
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
  const service = new SearchService(stack, {
    existing: true,
    name: "mysearchservice",
  });
  new SharedPrivateLinkResource(service, {
    name: "testResource",
  });
  return stack;
}

describe("swagger-examples/list-shared-private-link-resources-by-service", () => {
  it("renders the expected Bicep and serialization output", async () => {
    const stack = await buildScenarioStack({
      createResourceGroupStack,
      createSubscriptionStack,
      values,
    });
    const rendered = renderStackArtifacts(stack);

    expectRenderedResourceToMatchSwaggerRequest(import.meta.url, rendered.outputs, {
      resourceType: "Microsoft.Search/searchServices/sharedPrivateLinkResources",
      apiVersion: "2025-05-01",
    });
    expectRenderedOutputsToMatchBaselines(import.meta.url, rendered.outputs);
  });
});
