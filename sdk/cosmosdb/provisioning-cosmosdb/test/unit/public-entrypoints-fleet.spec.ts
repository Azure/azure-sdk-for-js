// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * Primary resource type: Microsoft.DocumentDB/fleets
 * Primary schema key: Microsoft.DocumentDB/fleets
 * Also covers: Microsoft.DocumentDB/fleets/fleetspaces, Microsoft.DocumentDB/fleets/fleetspaces/fleetspaceAccounts
 * Scenario: public-entrypoints/public-entrypoints-fleet
 * provisioning API: Fleet, Fleetspace, FleetspaceAccount
 * Source: packages\services\cosmosdb\src\index.ts
 * Operation: n/a
 * Runtime baseline: public-entrypoints-fleet.test.baseline.bicep and public-entrypoints-fleet.test.baseline.json
 * Gap/reduction: none
 */

import { Fleet, Fleetspace, FleetspaceAccount } from "@azure/provisioning-cosmosdb";
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
  const stack = createResourceGroupStack();
  const resource0 = new Fleet(stack, {
    name: "fleet-test",
    location: "fleet-test",
  });
  stack.outputs.add("resource0Id", "string", resource0.id);
  const resource1 = new Fleetspace(resource0, { name: "fleetspace-test" });
  stack.outputs.add("resource1Id", "string", resource1.id);
  const resource2 = new FleetspaceAccount(resource1, {
    name: "fleetspaceaccount-test",
  });
  stack.outputs.add("resource2Id", "string", resource2.id);
  return stack;
}

describe("public-entrypoints/public-entrypoints-fleet", () => {
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
