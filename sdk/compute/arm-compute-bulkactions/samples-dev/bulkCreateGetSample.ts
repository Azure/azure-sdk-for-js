// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-bulkactions";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets an instance of BulkCreates.
 *
 * @summary gets an instance of BulkCreates.
 * x-ms-original-file: 2026-09-06-preview/BulkCreate_Get_MaximumSet_Gen.json
 */
async function bulkCreateGetMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1FBA3C66-5C9C-4391-B72F-9F52735FC9F2";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.bulkCreate.get(
    "rgBulkactions",
    "eastus",
    "85c374f7-9857-4fd7-9267-81019219c362",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await bulkCreateGetMaximumSet();
}

main().catch(console.error);
