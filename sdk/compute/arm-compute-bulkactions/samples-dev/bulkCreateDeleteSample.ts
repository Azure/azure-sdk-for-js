// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-bulkactions";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes BulkCreates.
 *
 * @summary deletes BulkCreates.
 * x-ms-original-file: 2026-09-06-preview/BulkCreate_Delete_MaximumSet_Gen.json
 */
async function bulkCreateDeleteMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1FBA3C66-5C9C-4391-B72F-9F52735FC9F2";
  const client = new ComputeClient(credential, subscriptionId);
  await client.bulkCreate.delete(
    "rgBulkactions",
    "eastus",
    "709c2556-6a82-45ee-ba68-b935bb4e8ba0",
    { deleteInstances: true },
  );
}

async function main(): Promise<void> {
  await bulkCreateDeleteMaximumSet();
}

main().catch(console.error);
