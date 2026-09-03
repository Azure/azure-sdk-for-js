// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EdgeActionsManagementClient } = require("@azure/arm-edgeactions");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a EdgeActionExecutionFilter
 *
 * @summary delete a EdgeActionExecutionFilter
 * x-ms-original-file: 2025-12-01-preview/EdgeActionExecutionFilters_Delete.json
 */
async function deleteEdgeActionExecutionFilters() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new EdgeActionsManagementClient(credential, subscriptionId);
  await client.edgeActionExecutionFilters.delete("testrg", "edgeAction1", "executionFilter1");
}

async function main() {
  await deleteEdgeActionExecutionFilters();
}

main().catch(console.error);
