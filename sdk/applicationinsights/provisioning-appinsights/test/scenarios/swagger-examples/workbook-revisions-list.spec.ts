// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * Primary resource type: Microsoft.Insights/workbooks/revisions
 * Primary schema key: Microsoft.Insights/workbooks/revisions
 * Also covers: none
 * Scenario: swagger-examples/workbook-revisions-list
 * Provisioning API: Revision, Workbook
 * Source: https://github.com/Azure/azure-rest-api-specs/blob/ac0d84ebb3f50b37259806b55d9088e4ea930093/specification/applicationinsights/resource-manager/Microsoft.Insights/ApplicationInsights/stable/2023-06-01/examples/WorkbookRevisionsList.json
 * Operation: n/a
 * Runtime baseline: workbook-revisions-list.test.baseline.bicep and workbook-revisions-list.test.baseline.json
 * Gap/reduction: list operation has no request body
 */

import { Revision, Workbook } from "@azure/provisioning-appinsights";
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
  const workbook = new Workbook(stack, {
    name: "deadb33f-5e0d-4064-8ebb-1a4ed0313eb2",
    kind: "shared",
    location: "westus",
    properties: {
      category: "workbook",
      displayName: "Sample workbook",
      serializedData: null,
    },
  });
  new Revision(workbook, {
    name: "deadb33f-5e0d-4064-8ebb-1a4ed0313eb2",
    existing: true,
  });
  return stack;
}

describe("swagger-examples/workbook-revisions-list", () => {
  it("renders the expected Bicep and serialization output", async () => {
    const stack = await buildScenarioStack({
      createResourceGroupStack,
      createSubscriptionStack,
      values,
    });
    const rendered = renderStackArtifacts(stack);

    expectRenderedResourceToMatchSwaggerRequest(import.meta.url, rendered.outputs, {
      resourceType: "Microsoft.Insights/workbooks/revisions",
      apiVersion: "2023-06-01",
    });
    expectRenderedOutputsToMatchBaselines(import.meta.url, rendered.outputs);
  });
});
