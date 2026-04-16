// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EdgeActionsManagementClient } = require("@azure/arm-edgeactions");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a EdgeActionExecutionFilter
 *
 * @summary get a EdgeActionExecutionFilter
 * x-ms-original-file: 2025-12-01-preview/EdgeActionExecutionFilters_Get.json
 */
async function getEdgeActionExecutionFilters() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new EdgeActionsManagementClient(credential, subscriptionId);
  const result = await client.edgeActionExecutionFilters.get(
    "testrg",
    "edgeAction1",
    "executionFilter1",
  );
  console.log(result);
}

async function main() {
  await getEdgeActionExecutionFilters();
}

main().catch(console.error);
