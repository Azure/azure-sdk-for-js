// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-bulkactions");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists resources associated with the specified scheduled action.
 *
 * @summary lists resources associated with the specified scheduled action.
 * x-ms-original-file: 2026-09-06-preview/ScheduledActions_ListResources_PagedSuccess.json
 */
async function listAPageOfResourcesAssociatedWithARecurringScheduledAction() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ComputeClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.scheduledActions.listResources("example-rg", "weekday-start")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listAPageOfResourcesAssociatedWithARecurringScheduledAction();
}

main().catch(console.error);
