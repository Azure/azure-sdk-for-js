// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-bulkactions");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a Occurrence
 *
 * @summary get a Occurrence
 * x-ms-original-file: 2026-07-06-preview/Occurrences_Get_MaximumSet_Gen.json
 */
async function occurrencesGetMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "CB26D7CB-3E27-465F-99C8-EAF7A4118245";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.occurrences.get(
    "rgcompute",
    "myScheduledAction",
    "67b5bada-4772-43fc-8dbb-402476d98a45",
  );
  console.log(result);
}

async function main() {
  await occurrencesGetMaximumSet();
}

main().catch(console.error);
