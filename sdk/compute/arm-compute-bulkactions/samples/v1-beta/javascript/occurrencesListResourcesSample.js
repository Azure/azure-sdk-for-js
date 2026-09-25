// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-bulkactions");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists resources for the specified occurrence.
 *
 * @summary lists resources for the specified occurrence.
 * x-ms-original-file: 2026-09-06-preview/Occurrences_ListResources_BasicSuccess.json
 */
async function _01ListResourcesInARecurringScheduledActionOccurrence() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ComputeClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.occurrences.listResources(
    "example-rg",
    "weekday-start",
    "77777777-7777-7777-7777-777777777777",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists resources for the specified occurrence.
 *
 * @summary lists resources for the specified occurrence.
 * x-ms-original-file: 2026-09-06-preview/Occurrences_ListResources_PagedSuccess.json
 */
async function _02ListAPageOfResourcesInARecurringScheduledActionOccurrence() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ComputeClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.occurrences.listResources(
    "example-rg",
    "weekday-start",
    "88888888-8888-8888-8888-888888888888",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await _01ListResourcesInARecurringScheduledActionOccurrence();
  await _02ListAPageOfResourcesInARecurringScheduledActionOccurrence();
}

main().catch(console.error);
