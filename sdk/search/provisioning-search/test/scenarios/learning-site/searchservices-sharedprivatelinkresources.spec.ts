// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * Primary resource type: Microsoft.Search/searchServices/sharedPrivateLinkResources
 * Primary schema key: Microsoft.Search/searchServices/sharedPrivateLinkResources
 * Also covers: Microsoft.Search/searchServices
 * Scenario: learning-site/searchservices-sharedprivatelinkresources
 * provisioning API: SearchService, SharedPrivateLinkResource
 * Source: https://github.com/MicrosoftDocs/azure-resource-manager-schema-reference-pr/blob/cc00969e3ee843f537f89d70433cca7f6a0b3111/arm-schema-ref/Microsoft.Search/2025-05-01/searchservices/sharedprivatelinkresources.md
 * Operation: n/a
 * Runtime baseline: searchservices-sharedprivatelinkresources.test.baseline.bicep and searchservices-sharedprivatelinkresources.test.baseline.json
 * Gap/reduction: The Learn sample uses API version 2022-09-01; the package renders 2025-05-01., The Learn sample's package-external storage account is represented by its source-shaped resource ID., The source hostingMode value default is normalized to the current API value Default.
 */

import { SearchService, SharedPrivateLinkResource } from "@azure/provisioning-search";
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

function buildScenarioStack({ createResourceGroupStack, values }: BuildScenarioHelpers) {
  const stack = createResourceGroupStack();
  const service = new SearchService(stack, {
    name: "acctest0001",
    location: "westeurope",
    sku: {
      name: "standard",
    },
    properties: {
      authOptions: {
        apiKeyOnly: {},
      },
      disableLocalAuth: false,
      encryptionWithCmk: {
        enforcement: "Disabled",
      },
      hostingMode: "Default",
      networkRuleSet: {
        ipRules: [],
      },
      partitionCount: 1,
      publicNetworkAccess: "Enabled",
      replicaCount: 1,
    },
    tags: {
      environment: "staging",
    },
  });
  new SharedPrivateLinkResource(service, {
    name: "acctest0001",
    properties: {
      groupId: "blob",
      privateLinkResourceId: `/subscriptions/${values.subscriptionId}/resourceGroups/${values.resourceGroupName}/providers/Microsoft.Storage/storageAccounts/acctest0001`,
      requestMessage: "please approve",
    },
  });
  return stack;
}

describe("learning-site/searchservices-sharedprivatelinkresources", () => {
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
