// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageManagementClient } from "@azure/arm-storage";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to sets legal hold tags. Setting the same tag results in an idempotent operation. SetLegalHold follows an append pattern and does not clear out the existing tags that are not specified in the request.
 *
 * @summary sets legal hold tags. Setting the same tag results in an idempotent operation. SetLegalHold follows an append pattern and does not clear out the existing tags that are not specified in the request.
 * x-ms-original-file: 2025-08-01/BlobContainersSetLegalHold.json
 */
async function setLegalHoldContainers(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.blobContainers.setLegalHold("res4303", "sto7280", "container8723", {
    tags: ["tag1", "tag2", "tag3"],
  });
  console.log(result);
}

/**
 * This sample demonstrates how to sets legal hold tags. Setting the same tag results in an idempotent operation. SetLegalHold follows an append pattern and does not clear out the existing tags that are not specified in the request.
 *
 * @summary sets legal hold tags. Setting the same tag results in an idempotent operation. SetLegalHold follows an append pattern and does not clear out the existing tags that are not specified in the request.
 * x-ms-original-file: 2025-08-01/BlobContainersSetLegalHoldAllowProtectedAppendWritesAll.json
 */
async function setLegalHoldContainersWithAllowProtectedAppendWritesAll(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.blobContainers.setLegalHold("res4303", "sto7280", "container8723", {
    allowProtectedAppendWritesAll: true,
    tags: ["tag1", "tag2", "tag3"],
  });
  console.log(result);
}

async function main(): Promise<void> {
  await setLegalHoldContainers();
  await setLegalHoldContainersWithAllowProtectedAppendWritesAll();
}

main().catch(console.error);
