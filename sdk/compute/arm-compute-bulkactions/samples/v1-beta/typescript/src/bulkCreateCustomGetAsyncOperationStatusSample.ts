// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-bulkactions";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the status of an async operation of a BulkCreateCustom.
 *
 * @summary get the status of an async operation of a BulkCreateCustom.
 * x-ms-original-file: 2026-07-06-preview/BulkCreateCustom_GetAsyncOperationStatus_MaximumSet_Gen.json
 */
async function bulkCreateCustomGetAsyncOperationStatusMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1FBA3C66-5C9C-4391-B72F-9F52735FC9F2";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.bulkCreateCustom.getAsyncOperationStatus(
    "eastus",
    "f1ac145b-9d8b-417d-8101-9962d03c0904",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await bulkCreateCustomGetAsyncOperationStatusMaximumSet();
}

main().catch(console.error);
