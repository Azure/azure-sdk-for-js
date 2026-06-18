// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageManagementClient } from "@azure/arm-storage";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to extends the immutabilityPeriodSinceCreationInDays of a locked immutabilityPolicy. The only action allowed on a Locked policy will be this action. ETag in If-Match is required for this operation.
 *
 * @summary extends the immutabilityPeriodSinceCreationInDays of a locked immutabilityPolicy. The only action allowed on a Locked policy will be this action. ETag in If-Match is required for this operation.
 * x-ms-original-file: 2026-04-01/BlobContainersExtendImmutabilityPolicy.json
 */
async function extendImmutabilityPolicy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.blobContainers.extendImmutabilityPolicy(
    "res6238",
    "sto232",
    "container5023",
    "8d59f830d0c3bf9",
    { parameters: { immutabilityPeriodSinceCreationInDays: 100 } },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await extendImmutabilityPolicy();
}

main().catch(console.error);
