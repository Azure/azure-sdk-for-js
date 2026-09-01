// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-bulkactions");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the specified occurrence.
 *
 * @summary gets the specified occurrence.
 * x-ms-original-file: 2026-08-06-preview/Occurrences_Get_MaximumSet_Gen.json
 */
async function getAScheduledActionOccurrence() {
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
  await getAScheduledActionOccurrence();
}

main().catch(console.error);
