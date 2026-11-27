// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-bulkactions";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the status of an async operation of a BulkCreateCustom.
 *
 * @summary get the status of an async operation of a BulkCreateCustom.
 * x-ms-original-file: 2026-10-16/BulkCreateCustom_GetAsyncOperationStatus.json
 */
async function getTheStatusOfACompletedBulkCreateCustomOperation(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "57018409-63ae-4ec4-91ef-57bafe128d74";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.bulkCreateCustom.getAsyncOperationStatus(
    "eastus",
    "58553c25-b4f4-4210-bfee-e460a04d609f",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to get the status of an async operation of a BulkCreateCustom.
 *
 * @summary get the status of an async operation of a BulkCreateCustom.
 * x-ms-original-file: 2026-10-16/BulkCreateCustom_GetAsyncOperationStatus_Failed.json
 */
async function getTheStatusOfAFailedBulkCreateCustomOperation(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "57018409-63ae-4ec4-91ef-57bafe128d74";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.bulkCreateCustom.getAsyncOperationStatus(
    "eastus",
    "cbdbac52-dad1-4c54-81e1-972427ecd140",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getTheStatusOfACompletedBulkCreateCustomOperation();
  await getTheStatusOfAFailedBulkCreateCustomOperation();
}

main().catch(console.error);
