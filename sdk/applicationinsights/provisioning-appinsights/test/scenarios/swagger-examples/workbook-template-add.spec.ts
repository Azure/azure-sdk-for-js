// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * Primary resource type: Microsoft.Insights/workbooktemplates
 * Primary schema key: Microsoft.Insights/workbooktemplates
 * Also covers: none
 * Scenario: swagger-examples/workbook-template-add
 * Provisioning API: WorkbookTemplate
 * Source: https://github.com/Azure/azure-rest-api-specs/blob/ac0d84ebb3f50b37259806b55d9088e4ea930093/specification/applicationinsights/resource-manager/Microsoft.Insights/ApplicationInsights/WorkbookTemplatesApi/examples/2020-11-20/WorkbookTemplateAdd.json
 * Operation: n/a
 * Runtime baseline: workbook-template-add.test.baseline.bicep and workbook-template-add.test.baseline.json
 * Gap/reduction: path parameters omitted, tags omitted (null in source)
 */

import { WorkbookTemplate } from "@azure/provisioning-appinsights";
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
  const workbookTemplateData = {
    $schema:
      "https://github.com/Microsoft/Application-Insights-Workbooks/blob/master/schema/workbook.json",
    items: [
      {
        name: "text - 2",
        type: 1,
        content: {
          json: "## New workbook. Welcome to your new workbook.",
        },
      },
    ],
    styleSettings: {},
    version: "Notebook/1.0",
  };
  const stack = makeStack();
  new WorkbookTemplate(stack, {
    name: "testtemplate2",
    location: "west us",
    properties: {
      author: "Contoso",
      galleries: [
        {
          name: "Simple Template",
          type: "tsg",
          category: "Failures",
          order: 100,
          resourceType: "microsoft.insights/components",
        },
      ],
      priority: 1,
      templateData: workbookTemplateData,
    },
  });
  return stack;
}

describe("swagger-examples/workbook-template-add", () => {
  it("renders the expected Bicep and serialization output", async () => {
    const stack = await buildScenarioStack({
      createResourceGroupStack,
      createSubscriptionStack,
      values,
    });
    const rendered = renderStackArtifacts(stack);

    expectRenderedResourceToMatchSwaggerRequest(import.meta.url, rendered.outputs, {
      resourceType: "Microsoft.Insights/workbooktemplates",
      apiVersion: "2020-11-20",
    });
    expectRenderedOutputsToMatchBaselines(import.meta.url, rendered.outputs);
  });
});
