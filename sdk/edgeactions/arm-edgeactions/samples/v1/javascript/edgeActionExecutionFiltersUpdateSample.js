// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EdgeActionsManagementClient } = require("@azure/arm-edgeactions");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates the properties and tags of an Edge Action execution filter. Omitted tags are preserved, an empty tags object clears all tags, and supplied tags replace the entire tag collection. Null tags are rejected.
 *
 * @summary updates the properties and tags of an Edge Action execution filter. Omitted tags are preserved, an empty tags object clears all tags, and supplied tags replace the entire tag collection. Null tags are rejected.
 * x-ms-original-file: 2026-10-01/EdgeActionExecutionFilters_Update.json
 */
async function updateEdgeActionExecutionFilters() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new EdgeActionsManagementClient(credential, subscriptionId);
  const result = await client.edgeActionExecutionFilters.update(
    "testrg",
    "edgeAction1",
    "executionFilter1",
    { properties: { executionFilterIdentifierHeaderValue: "header-value2" } },
  );
  console.log(result);
}

async function main() {
  await updateEdgeActionExecutionFilters();
}

main().catch(console.error);
