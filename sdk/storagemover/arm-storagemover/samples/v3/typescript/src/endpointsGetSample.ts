// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageMoverClient } from "@azure/arm-storagemover";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets an Endpoint resource.
 *
 * @summary gets an Endpoint resource.
 * x-ms-original-file: 2025-07-01/Endpoints_Get_AzureMultiCloudConnector.json
 */
async function endpointsGetAzureMultiCloudConnector(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "60bcfc77-6589-4da2-b7fd-f9ec9322cf95";
  const client = new StorageMoverClient(credential, subscriptionId);
  const result = await client.endpoints.get(
    "examples-rg",
    "examples-storageMoverName",
    "examples-endpointName",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets an Endpoint resource.
 *
 * @summary gets an Endpoint resource.
 * x-ms-original-file: 2025-07-01/Endpoints_Get_AzureStorageBlobContainer.json
 */
async function endpointsGetAzureStorageBlobContainer(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "60bcfc77-6589-4da2-b7fd-f9ec9322cf95";
  const client = new StorageMoverClient(credential, subscriptionId);
  const result = await client.endpoints.get(
    "examples-rg",
    "examples-storageMoverName",
    "examples-endpointName",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets an Endpoint resource.
 *
 * @summary gets an Endpoint resource.
 * x-ms-original-file: 2025-07-01/Endpoints_Get_AzureStorageNfsFileShare.json
 */
async function endpointsGetAzureStorageNfsFileShare(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "60bcfc77-6589-4da2-b7fd-f9ec9322cf95";
  const client = new StorageMoverClient(credential, subscriptionId);
  const result = await client.endpoints.get(
    "examples-rg",
    "examples-storageMoverName",
    "examples-endpointName",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets an Endpoint resource.
 *
 * @summary gets an Endpoint resource.
 * x-ms-original-file: 2025-07-01/Endpoints_Get_AzureStorageSmbFileShare.json
 */
async function endpointsGetAzureStorageSmbFileShare(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "60bcfc77-6589-4da2-b7fd-f9ec9322cf95";
  const client = new StorageMoverClient(credential, subscriptionId);
  const result = await client.endpoints.get(
    "examples-rg",
    "examples-storageMoverName",
    "examples-endpointName",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets an Endpoint resource.
 *
 * @summary gets an Endpoint resource.
 * x-ms-original-file: 2025-07-01/Endpoints_Get_NfsMount.json
 */
async function endpointsGetNfsMount(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "60bcfc77-6589-4da2-b7fd-f9ec9322cf95";
  const client = new StorageMoverClient(credential, subscriptionId);
  const result = await client.endpoints.get(
    "examples-rg",
    "examples-storageMoverName",
    "examples-endpointName",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets an Endpoint resource.
 *
 * @summary gets an Endpoint resource.
 * x-ms-original-file: 2025-07-01/Endpoints_Get_SmbMount.json
 */
async function endpointsGetSmbMount(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "60bcfc77-6589-4da2-b7fd-f9ec9322cf95";
  const client = new StorageMoverClient(credential, subscriptionId);
  const result = await client.endpoints.get(
    "examples-rg",
    "examples-storageMoverName",
    "examples-endpointName",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await endpointsGetAzureMultiCloudConnector();
  await endpointsGetAzureStorageBlobContainer();
  await endpointsGetAzureStorageNfsFileShare();
  await endpointsGetAzureStorageSmbFileShare();
  await endpointsGetNfsMount();
  await endpointsGetSmbMount();
}

main().catch(console.error);
