// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeScheduleClient } = require("@azure/arm-computeschedule");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list resources attached to Scheduled Actions for the given occurrence
 *
 * @summary list resources attached to Scheduled Actions for the given occurrence
 * x-ms-original-file: 2026-03-01-preview/Occurrences_ListResources_MaximumSet_Gen.json
 */
async function occurrencesListResourcesMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "732116BD-AF31-4E74-9283-B387C44B4A44";
  const client = new ComputeScheduleClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.occurrences.listResources(
    "rgcomputeschedule",
    "scheduled-action-01",
    "11111111-1111-1111-1111-111111111111",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await occurrencesListResourcesMaximumSet();
}

main().catch(console.error);
