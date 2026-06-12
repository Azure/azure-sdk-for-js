// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CostManagementClient } = require("@azure/arm-costmanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to runs a shared scheduled action within the given scope.
 *
 * @summary runs a shared scheduled action within the given scope.
 * x-ms-original-file: 2025-03-01/scheduledActions/scheduledAction-sendNow-shared.json
 */
async function scheduledActionRunByScope() {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  await client.scheduledActions.runByScope(
    "subscriptions/00000000-0000-0000-0000-000000000000",
    "monthlyCostByResource",
  );
}

async function main() {
  await scheduledActionRunByScope();
}

main().catch(console.error);
