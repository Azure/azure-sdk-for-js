// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * Primary resource type: Microsoft.Insights/workbooks
 * Primary schema key: Microsoft.Insights/workbooks
 * Also covers: none
 * Scenario: swagger-examples/workbook-add
 * Provisioning API: Workbook
 * Source: https://github.com/Azure/azure-rest-api-specs/blob/ac0d84ebb3f50b37259806b55d9088e4ea930093/specification/applicationinsights/resource-manager/Microsoft.Insights/ApplicationInsights/WorkbooksApi/examples/2023-06-01/WorkbookAdd.json
 * Operation: n/a
 * Runtime baseline: workbook-add.test.baseline.bicep and workbook-add.test.baseline.json
 * Gap/reduction: path parameters omitted, properties.description and properties.serializedData omitted: CDK models both as ExpressionOrValue<null>
 */

import { Workbook } from "@azure/provisioning-appinsights";
import { describe, it } from "vitest";

import {
  createResourceGroupStack,
  createSubscriptionStack,
  expectRenderedOutputsToMatchBaselines,
  expectRenderedResourceToMatchSwaggerRequest,
  renderStackArtifacts,
} from "../../utils/index.js";

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
  createResourceGroupStack: makeStack,
}: any): ReturnType<typeof createResourceGroupStack> {
  const stack = makeStack();
  new Workbook(stack, {
    name: "deadb33f-5e0d-4064-8ebb-1a4ed0313eb2",
    kind: "shared",
    location: "westus",
    tags: { TagSample01: "sample01", TagSample02: "sample02" },
    properties: {
      category: "workbook",
      displayName: "Sample workbook",
      serializedData: null,
    },
  });
  return stack;
}

describe("swagger-examples/workbook-add", () => {
  it("renders the expected Bicep and serialization output", async () => {
    const stack = await buildScenarioStack({
      createResourceGroupStack,
      createSubscriptionStack,
      values,
    });
    const rendered = renderStackArtifacts(stack);

    expectRenderedResourceToMatchSwaggerRequest(import.meta.url, rendered.outputs, {
      resourceType: "Microsoft.Insights/workbooks",
      apiVersion: "2023-06-01",
    });
    expectRenderedOutputsToMatchBaselines(import.meta.url, rendered.outputs);
  });
});
