// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * Primary resource type: Microsoft.Search/searchServices
 * Primary schema key: Microsoft.Search/searchServices
 * Also covers: Microsoft.Search/searchServices/networkSecurityPerimeterConfigurations, Microsoft.Search/searchServices/privateEndpointConnections, Microsoft.Search/searchServices/sharedPrivateLinkResources
 * Scenario: public-entrypoints/public-entrypoints-search-service
 * provisioning API: NetworkSecurityPerimeterConfiguration, PrivateEndpointConnection, SearchService, SharedPrivateLinkResource
 * Source: packages\services\search\src\index.ts
 * Operation: n/a
 * Runtime baseline: public-entrypoints-search-service.test.baseline.bicep and public-entrypoints-search-service.test.baseline.json
 * Gap/reduction: The existing-only network security perimeter configuration is covered through a reference output.
 */

import {
  NetworkSecurityPerimeterConfiguration,
  PrivateEndpointConnection,
  SearchService,
  SharedPrivateLinkResource,
} from "@azure/provisioning-search";
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

function buildScenarioStack({ createResourceGroupStack, values }: BuildScenarioHelpers) {
  const stack = createResourceGroupStack();
  const service = new SearchService(stack, {
    name: "search-public-entrypoints",
    location: values.location,
    sku: {
      name: "basic",
    },
  });
  const perimeter = new NetworkSecurityPerimeterConfiguration(service, {
    existing: true,
    name: "00000000-0000-0000-0000-000000000000.public",
  });
  new PrivateEndpointConnection(service, {
    name: "private-endpoint",
    properties: {
      groupId: "searchService",
      privateEndpoint: {
        id: `/subscriptions/${values.subscriptionId}/resourceGroups/${values.resourceGroupName}/providers/Microsoft.Network/privateEndpoints/search-private-endpoint`,
      },
      privateLinkServiceConnectionState: {
        actionsRequired: "None",
        description: "Approved for package coverage",
        status: "Approved",
      },
    },
  });
  new SharedPrivateLinkResource(service, {
    name: "shared-private-link",
    properties: {
      groupId: "blob",
      privateLinkResourceId: `/subscriptions/${values.subscriptionId}/resourceGroups/${values.resourceGroupName}/providers/Microsoft.Storage/storageAccounts/searchstorage`,
      requestMessage: "please approve",
    },
  });
  stack.outputs.add("perimeterName", "string", perimeter.name);
  return stack;
}

describe("public-entrypoints/public-entrypoints-search-service", () => {
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
