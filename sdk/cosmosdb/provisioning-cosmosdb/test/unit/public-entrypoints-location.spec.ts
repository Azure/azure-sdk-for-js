// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * Primary resource type: Microsoft.DocumentDB/locations
 * Primary schema key: Microsoft.DocumentDB/locations
 * Also covers: Microsoft.DocumentDB/locations/restorableDatabaseAccounts
 * Scenario: public-entrypoints/public-entrypoints-location
 * provisioning API: Location, RestorableDatabaseAccount
 * Source: packages\services\cosmosdb\src\index.ts
 * Operation: n/a
 * Runtime baseline: public-entrypoints-location.test.baseline.bicep and public-entrypoints-location.test.baseline.json
 * Gap/reduction: none
 */

import { Location, RestorableDatabaseAccount } from "@azure/provisioning-cosmosdb";
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
  const stack = createSubscriptionStack();
  const resource0 = new Location(stack, {
    name: "location-test",
    existing: true,
  });
  stack.outputs.add("resource0Id", "string", resource0.id);
  const resource1 = new RestorableDatabaseAccount(resource0, {
    name: "restorabledatabaseac-test",
    existing: true,
  });
  stack.outputs.add("resource1Id", "string", resource1.id);
  return stack;
}

describe("public-entrypoints/public-entrypoints-location", () => {
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
