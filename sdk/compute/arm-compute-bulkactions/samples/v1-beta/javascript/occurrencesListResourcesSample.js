// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-bulkactions");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list resources attached to Scheduled Actions for the given occurrence
 *
 * @summary list resources attached to Scheduled Actions for the given occurrence
 * x-ms-original-file: 2026-07-06-preview/Occurrences_ListResources_MaximumSet_Gen.json
 */
async function occurrencesListResourcesMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "CB26D7CB-3E27-465F-99C8-EAF7A4118245";
  const client = new ComputeClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.occurrences.listResources(
    "rgcompute",
    "myScheduledAction",
    "CB26D7CB-3E27-465F-99C8-EAF7A4118245",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await occurrencesListResourcesMaximumSet();
}

main().catch(console.error);
