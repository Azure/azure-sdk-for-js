// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageManagementClient } from "@azure/arm-storage";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the existing immutability policy along with the corresponding ETag in response headers and body.
 *
 * @summary gets the existing immutability policy along with the corresponding ETag in response headers and body.
 * x-ms-original-file: 2025-08-01/BlobContainersGetImmutabilityPolicy.json
 */
async function getImmutabilityPolicy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.blobContainers.getImmutabilityPolicy(
    "res5221",
    "sto9177",
    "container3489",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getImmutabilityPolicy();
}

main().catch(console.error);
