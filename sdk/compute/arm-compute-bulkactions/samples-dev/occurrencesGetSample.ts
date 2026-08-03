// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-bulkactions";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a Occurrence
 *
 * @summary get a Occurrence
 * x-ms-original-file: 2026-07-06-preview/Occurrences_Get_MaximumSet_Gen.json
 */
async function occurrencesGetMaximumSet(): Promise<void> {
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

async function main(): Promise<void> {
  await occurrencesGetMaximumSet();
}

main().catch(console.error);
