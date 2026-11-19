// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * Primary resource type: Microsoft.Search/searchServices/networkSecurityPerimeterConfigurations
 * Primary schema key: Microsoft.Search/searchServices/networkSecurityPerimeterConfigurations
 * Also covers: none
 * Scenario: learning-site/searchservices-networksecurityperimeterconfigurations
 * provisioning API: NetworkSecurityPerimeterConfiguration
 * Source: https://github.com/MicrosoftDocs/azure-resource-manager-schema-reference-pr/blob/cc00969e3ee843f537f89d70433cca7f6a0b3111/arm-schema-ref/Microsoft.Search/2025-05-01/searchservices/networksecurityperimeterconfigurations.md
 * Operation: n/a
 * Runtime baseline: searchservices-networksecurityperimeterconfigurations.test.baseline.bicep and searchservices-networksecurityperimeterconfigurations.test.baseline.json
 * Gap/reduction: The exact-version Learn page has no usage example; the resource-format placeholder is replaced with a constraint-valid name., The required parent search service is represented as an existing resource.
 */

import { NetworkSecurityPerimeterConfiguration, SearchService } from "@azure/provisioning-search";
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
  new NetworkSecurityPerimeterConfiguration(service, {
    existing: true,
    name: "00000000-0000-0000-0000-000000000000.assoc",
  });
  return stack;
}

describe("learning-site/searchservices-networksecurityperimeterconfigurations", () => {
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
