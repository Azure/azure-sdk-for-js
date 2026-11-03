// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * Primary resource type: Microsoft.Insights/workbooktemplates
 * Primary schema key: Microsoft.Insights/workbooktemplates
 * Also covers: none
 * Scenario: public-entrypoints/public-entrypoints-workbook-template
 * Provisioning API: WorkbookTemplate
 * Source: packages\cdk\applicationinsights\src\index.ts
 * Operation: n/a
 * Runtime baseline: public-entrypoints-workbook-template.test.baseline.bicep and public-entrypoints-workbook-template.test.baseline.json
 * Gap/reduction: none
 */

import { WorkbookTemplate } from "@azure/provisioning-appinsights";
import { describe, it } from "vitest";

import {
  createResourceGroupStack,
  createSubscriptionStack,
  expectRenderedOutputsToMatchBaselines,
  renderStackArtifacts,
} from "../utils/index.js";

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
  values: scenarioValues,
}: any): ReturnType<typeof createResourceGroupStack> {
  const stack = makeStack();
  new WorkbookTemplate(stack, {
    name: "template01",
    location: scenarioValues.location,
    properties: {
      galleries: [
        {
          name: "Simple Template",
          type: "tsg",
          category: "Failures",
          order: 100,
          resourceType: "microsoft.insights/components",
        },
      ],
      templateData: { version: "Notebook/1.0" },
    },
  });
  return stack;
}

describe("public-entrypoints/public-entrypoints-workbook-template", () => {
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
