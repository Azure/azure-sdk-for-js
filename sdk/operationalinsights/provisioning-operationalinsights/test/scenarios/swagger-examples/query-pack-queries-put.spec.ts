// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * Primary resource type: Microsoft.OperationalInsights/queryPacks/queries
 * Primary schema key: Microsoft.OperationalInsights/queryPacks/queries
 * Also covers: Microsoft.OperationalInsights/queryPacks
 * Scenario: swagger-examples/query-pack-queries-put
 * provisioning API: Query
 * Source: https://github.com/Azure/azure-rest-api-specs/blob/4cd7e2ac392a5d75c6a29fee14e93d2146364e79/specification/operationalinsights/resource-manager/Microsoft.OperationalInsights/OperationalInsights/examples/2025-07-01/QueryPackQueriesPut.json
 * Operation: n/a
 * Runtime baseline: query-pack-queries-put.test.baseline.bicep and query-pack-queries-put.test.baseline.json
 * Gap/reduction: none
 */

import { Query, QueryPack } from "@azure/provisioning-operationalinsights";
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

function buildScenarioStack({ createResourceGroupStack, values }: BuildScenarioHelpers) {
  const stack = createResourceGroupStack();
  const queryPack = new QueryPack(stack, {
    name: "my-querypack",
    location: values.location,
    properties: {},
  });
  new Query(queryPack, {
    name: "a449f8af-8e64-4b3a-9b16-5a7165ff98c4",
    properties: {
      body: "let newExceptionsTimeRange = 1d;\nlet timeRangeToCheckBefore = 7d;\nexceptions\n| where timestamp < ago(timeRangeToCheckBefore)\n| summarize count() by problemId\n| join kind= rightanti (\nexceptions\n| where timestamp >= ago(newExceptionsTimeRange)\n| extend stack = tostring(details[0].rawStack)\n| summarize count(), dcount(user_AuthenticatedId), min(timestamp), max(timestamp), any(stack) by problemId  \n) on problemId \n| order by  count_ desc\n",
      description: "my description",
      displayName: "Exceptions - New in the last 24 hours",
      related: { categories: ["analytics"] },
      tags: {
        "my-label": ["label1"],
        "my-other-label": ["label2"],
      },
    },
  });
  return stack;
}

describe("swagger-examples/query-pack-queries-put", () => {
  it("renders the expected Bicep and serialization output", async () => {
    const stack = await buildScenarioStack({
      createResourceGroupStack,
      createSubscriptionStack,
      values,
    });
    const rendered = renderStackArtifacts(stack);

    expectRenderedResourceToMatchSwaggerRequest(import.meta.url, rendered.outputs, {
      resourceType: "Microsoft.OperationalInsights/queryPacks/queries",
      apiVersion: "2026-03-01",
    });
    expectRenderedOutputsToMatchBaselines(import.meta.url, rendered.outputs);
  });
});
