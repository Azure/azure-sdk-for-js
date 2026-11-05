// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * Primary resource type: Microsoft.Sql/locations/timeZones
 * Primary schema key: Microsoft.Sql/locations/timeZones
 * Also covers: none
 * Scenario: public-entrypoints/public-entrypoints-time-zone
 * provisioning API: TimeZone
 * Source: packages\services\sql\src\index.ts
 * Operation: n/a
 * Runtime baseline: public-entrypoints-time-zone.test.baseline.bicep and public-entrypoints-time-zone.test.baseline.json
 * Gap/reduction: public entrypoint graph reduced to deterministic resource identities
 */

import { TimeZone } from "@azure/provisioning-sql";
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

function buildScenarioStack({ createSubscriptionStack }: BuildScenarioHelpers) {
  const stack = createSubscriptionStack();
  new TimeZone(stack, {
    existing: true,
    name: "eastus/publicentrypointstim",
  });
  return stack;
}

describe("public-entrypoints/public-entrypoints-time-zone", () => {
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
