// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CostManagementClient } = require("@azure/arm-costmanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a private scheduled action.
 *
 * @summary delete a private scheduled action.
 * x-ms-original-file: 2025-03-01/scheduledActions/scheduledAction-delete-private.json
 */
async function privateScheduledActionDelete() {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  await client.scheduledActions.delete("monthlyCostByResource");
}

async function main() {
  await privateScheduledActionDelete();
}

main().catch(console.error);
