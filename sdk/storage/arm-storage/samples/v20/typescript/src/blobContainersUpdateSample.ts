// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageManagementClient } from "@azure/arm-storage";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates container properties as specified in request body. Properties not mentioned in the request will be unchanged. Update fails if the specified container doesn't already exist.
 *
 * @summary updates container properties as specified in request body. Properties not mentioned in the request will be unchanged. Update fails if the specified container doesn't already exist.
 * x-ms-original-file: 2025-08-01/BlobContainersPatch.json
 */
async function updateContainers(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.blobContainers.update("res3376", "sto328", "container6185", {
    metadata: { metadata: "true" },
    publicAccess: "Container",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await updateContainers();
}

main().catch(console.error);
