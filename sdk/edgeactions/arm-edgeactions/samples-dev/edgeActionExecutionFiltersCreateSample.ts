// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EdgeActionsManagementClient } from "@azure/arm-edgeactions";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a EdgeActionExecutionFilter
 *
 * @summary create a EdgeActionExecutionFilter
 * x-ms-original-file: 2025-12-01-preview/EdgeActionExecutionFilters_Create.json
 */
async function createEdgeActionExecutionFilters(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new EdgeActionsManagementClient(credential, subscriptionId);
  const result = await client.edgeActionExecutionFilters.create(
    "testrg",
    "edgeAction1",
    "executionFilter1",
    {
      location: "global",
      properties: {
        versionId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourcegroups/testrg/providers/Microsoft.Cdn/EdgeActions/edgeAction1/versions/version1",
        executionFilterIdentifierHeaderName: "header-key",
        executionFilterIdentifierHeaderValue: "header-value",
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createEdgeActionExecutionFilters();
}

main().catch(console.error);
