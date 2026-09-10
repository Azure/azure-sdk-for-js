// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-bulkactions");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists resources for the specified occurrence.
 *
 * @summary lists resources for the specified occurrence.
 * x-ms-original-file: 2026-08-06-preview/Occurrences_ListResources_MaximumSet_Gen.json
 */
async function listResourcesInAScheduledActionOccurrence() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "CB26D7CB-3E27-465F-99C8-EAF7A4118245";
  const client = new ComputeClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.occurrences.listResources(
    "rgcompute",
    "myScheduledAction",
    "67b5bada-4772-43fc-8dbb-402476d98a45",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listResourcesInAScheduledActionOccurrence();
}

main().catch(console.error);
