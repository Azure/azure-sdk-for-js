// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageManagementClient } from "@azure/arm-storage";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates a new container under the specified account as described by request body. The container resource includes metadata and properties for that container. It does not include a list of the blobs contained by the container.
 *
 * @summary creates a new container under the specified account as described by request body. The container resource includes metadata and properties for that container. It does not include a list of the blobs contained by the container.
 * x-ms-original-file: 2026-04-01/BlobContainersPut.json
 */
async function putContainers(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.blobContainers.create("res3376", "sto328", "container6185", {});
  console.log(result);
}

/**
 * This sample demonstrates how to creates a new container under the specified account as described by request body. The container resource includes metadata and properties for that container. It does not include a list of the blobs contained by the container.
 *
 * @summary creates a new container under the specified account as described by request body. The container resource includes metadata and properties for that container. It does not include a list of the blobs contained by the container.
 * x-ms-original-file: 2026-04-01/BlobContainersPutDefaultEncryptionScope.json
 */
async function putContainerWithDefaultEncryptionScope(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.blobContainers.create("res3376", "sto328", "container6185", {
    defaultEncryptionScope: "encryptionscope185",
    denyEncryptionScopeOverride: true,
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates a new container under the specified account as described by request body. The container resource includes metadata and properties for that container. It does not include a list of the blobs contained by the container.
 *
 * @summary creates a new container under the specified account as described by request body. The container resource includes metadata and properties for that container. It does not include a list of the blobs contained by the container.
 * x-ms-original-file: 2026-04-01/BlobContainersPutObjectLevelWorm.json
 */
async function putContainerWithObjectLevelWorm(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.blobContainers.create("res3376", "sto328", "container6185", {
    immutableStorageWithVersioning: { enabled: true },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await putContainers();
  await putContainerWithDefaultEncryptionScope();
  await putContainerWithObjectLevelWorm();
}

main().catch(console.error);
