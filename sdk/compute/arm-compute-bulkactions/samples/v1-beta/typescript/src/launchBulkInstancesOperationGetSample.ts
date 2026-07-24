// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-bulkactions";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets an instance of LaunchBulkInstancesOperations.
 *
 * @summary gets an instance of LaunchBulkInstancesOperations.
 * x-ms-original-file: 2026-07-06-preview/LaunchBulkInstancesOperation_Get_MaximumSet_Gen.json
 */
async function launchBulkInstancesOperationGetExample(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1FBA3C66-5C9C-4391-B72F-9F52735FC9F2";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.launchBulkInstancesOperation.get(
    "rgBulkactions",
    "useast2euap",
    "495544ae-8710-4e8b-bca3-49a1dbb1623a",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await launchBulkInstancesOperationGetExample();
}

main().catch(console.error);
