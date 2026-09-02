// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-bulkactions");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists occurrences for the specified scheduled action.
 *
 * @summary lists occurrences for the specified scheduled action.
 * x-ms-original-file: 2026-08-06-preview/Occurrences_ListByScheduledAction_MaximumSet_Gen.json
 */
async function listOccurrencesForAScheduledAction() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "CB26D7CB-3E27-465F-99C8-EAF7A4118245";
  const client = new ComputeClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.occurrences.listByScheduledAction(
    "rgcompute",
    "myScheduledAction",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listOccurrencesForAScheduledAction();
}

main().catch(console.error);
