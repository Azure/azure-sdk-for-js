// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-bulkactions";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to cancels BulkCreate instances that have not yet launched.
 *
 * @summary cancels BulkCreate instances that have not yet launched.
 * x-ms-original-file: 2026-09-06-preview/BulkCreate_Cancel_MaximumSet_Gen.json
 */
async function bulkCreateCancelMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1FBA3C66-5C9C-4391-B72F-9F52735FC9F2";
  const client = new ComputeClient(credential, subscriptionId);
  await client.bulkCreate.cancel("rgBulkactions", "eastus", "20496756-e4bc-402c-8e7e-8ffed8e00c41");
}

async function main(): Promise<void> {
  await bulkCreateCancelMaximumSet();
}

main().catch(console.error);
