// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageManagementClient } from "@azure/arm-storage";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates an unlocked immutability policy. ETag in If-Match is honored if given but not required for this operation.
 *
 * @summary creates or updates an unlocked immutability policy. ETag in If-Match is honored if given but not required for this operation.
 * x-ms-original-file: 2025-08-01/BlobContainersPutImmutabilityPolicy.json
 */
async function createOrUpdateImmutabilityPolicy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.blobContainers.createOrUpdateImmutabilityPolicy(
    "res1782",
    "sto7069",
    "container6397",
    { parameters: { allowProtectedAppendWrites: true, immutabilityPeriodSinceCreationInDays: 3 } },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates an unlocked immutability policy. ETag in If-Match is honored if given but not required for this operation.
 *
 * @summary creates or updates an unlocked immutability policy. ETag in If-Match is honored if given but not required for this operation.
 * x-ms-original-file: 2025-08-01/BlobContainersPutImmutabilityPolicyAllowProtectedAppendWritesAll.json
 */
async function createOrUpdateImmutabilityPolicyWithAllowProtectedAppendWritesAll(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.blobContainers.createOrUpdateImmutabilityPolicy(
    "res1782",
    "sto7069",
    "container6397",
    {
      parameters: { allowProtectedAppendWritesAll: true, immutabilityPeriodSinceCreationInDays: 3 },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateImmutabilityPolicy();
  await createOrUpdateImmutabilityPolicyWithAllowProtectedAppendWritesAll();
}

main().catch(console.error);
