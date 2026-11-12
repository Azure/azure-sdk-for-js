// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * Primary resource type: Microsoft.OperationalInsights/queryPacks
 * Primary schema key: Microsoft.OperationalInsights/queryPacks
 * Also covers: Microsoft.OperationalInsights/queryPacks/queries
 * Scenario: public-entrypoints/public-entrypoints-query-pack
 * provisioning API: Query, QueryPack
 * Source: packages\services\operationalinsights\src\index.ts
 * Operation: n/a
 * Runtime baseline: public-entrypoints-query-pack.test.baseline.bicep and public-entrypoints-query-pack.test.baseline.json
 * Gap/reduction: none
 */

import { Query, QueryPack } from "@azure/provisioning-operationalinsights";
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
  const queryPack = new QueryPack(stack, {
    name: "public-query-pack",
    location: values.location,
    properties: {},
  });
  new Query(queryPack, {
    name: "public-query",
    properties: {
      body: "Heartbeat | take 10",
      displayName: "public query",
    },
  });
  return stack;
}

describe("public-entrypoints/public-entrypoints-query-pack", () => {
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
