// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CostManagementClient } = require("@azure/arm-costmanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the private scheduled action by name.
 *
 * @summary get the private scheduled action by name.
 * x-ms-original-file: 2025-03-01/scheduledActions/scheduledAction-get-private.json
 */
async function privateScheduledAction() {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.scheduledActions.get("monthlyCostByResource");
  console.log(result);
}

async function main() {
  await privateScheduledAction();
}

main().catch(console.error);
