// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * Primary resource type: Microsoft.Search/searchServices/privateEndpointConnections
 * Primary schema key: Microsoft.Search/searchServices/privateEndpointConnections
 * Also covers: none
 * Scenario: learning-site/searchservices-privateendpointconnections
 * provisioning API: PrivateEndpointConnection
 * Source: https://github.com/MicrosoftDocs/azure-resource-manager-schema-reference-pr/blob/cc00969e3ee843f537f89d70433cca7f6a0b3111/arm-schema-ref/Microsoft.Search/2025-05-01/searchservices/privateendpointconnections.md
 * Operation: n/a
 * Runtime baseline: searchservices-privateendpointconnections.test.baseline.bicep and searchservices-privateendpointconnections.test.baseline.json
 * Gap/reduction: The exact-version Learn page has no usage example; values come from its Bicep resource format., The required parent search service is represented as an existing resource.
 */

import { PrivateEndpointConnection, SearchService } from "@azure/provisioning-search";
import { describe, it } from "vitest";

import {
  createResourceGroupStack,
  createSubscriptionStack,
  expectRenderedOutputsToMatchBaselines,
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
    name: "search-service",
  });
  new PrivateEndpointConnection(service, {
    name: "private-endpoint-connection",
    properties: {
      groupId: "string",
      privateEndpoint: {
        id: "string",
      },
      privateLinkServiceConnectionState: {
        actionsRequired: "string",
        description: "string",
        status: "Approved",
      },
      provisioningState: "Succeeded",
    },
  });
  return stack;
}

describe("learning-site/searchservices-privateendpointconnections", () => {
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
