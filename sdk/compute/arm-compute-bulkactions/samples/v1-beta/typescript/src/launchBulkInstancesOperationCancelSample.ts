// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-bulkactions";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to cancels LaunchBulkInstancesOperation instances that have not yet launched.
 *
 * @summary cancels LaunchBulkInstancesOperation instances that have not yet launched.
 * x-ms-original-file: 2026-07-06-preview/LaunchBulkInstancesOperation_Cancel_MaximumSet_Gen.json
 */
async function launchBulkInstancesOperationCancelExample(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1FBA3C66-5C9C-4391-B72F-9F52735FC9F3";
  const client = new ComputeClient(credential, subscriptionId);
  await client.launchBulkInstancesOperation.cancel(
    "rgBulkactions",
    "useast2euap",
    "434d5a2a-167a-4e26-a89c-fbe622dfd0bc",
  );
}

async function main(): Promise<void> {
  await launchBulkInstancesOperationCancelExample();
}

main().catch(console.error);
