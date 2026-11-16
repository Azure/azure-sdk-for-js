// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * Primary resource type: Microsoft.OperationalInsights/queryPacks/queries
 * Primary schema key: Microsoft.OperationalInsights/queryPacks/queries
 * Also covers: Microsoft.OperationalInsights/queryPacks
 * Scenario: learning-site/querypacks-queries
 * provisioning API: Query, QueryPack
 * Source: https://github.com/MicrosoftDocs/azure-resource-manager-schema-reference-pr/blob/a992ef23d0f8dba9947cbda26edde0469d6e0485/arm-schema-ref/Microsoft.OperationalInsights/2025-07-01/querypacks/queries.md
 * Operation: n/a
 * Runtime baseline: querypacks-queries.test.baseline.bicep and querypacks-queries.test.baseline.json
 * Gap/reduction: Learn usage example targets 2019-09-01; translated to the package API version.
 */

import { Query, QueryPack } from "@azure/provisioning-operationalinsights";
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
  const queryPack = new QueryPack(stack, {
    name: "learn-query-pack",
    location: values.location,
    properties: {},
  });
  new Query(queryPack, {
    name: "learn-query",
    properties: {
      body: "Heartbeat | take 10",
      displayName: "learn query",
    },
  });
  return stack;
}

describe("learning-site/querypacks-queries", () => {
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
