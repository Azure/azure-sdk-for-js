// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageMoverClient } = require("@azure/arm-storagemover");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets an Endpoint resource.
 *
 * @summary gets an Endpoint resource.
 * x-ms-original-file: 2025-07-01/Endpoints_Get_AzureMultiCloudConnector.json
 */
async function endpointsGetAzureMultiCloudConnector() {
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
async function endpointsGetAzureStorageBlobContainer() {
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
async function endpointsGetAzureStorageNfsFileShare() {
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
async function endpointsGetAzureStorageSmbFileShare() {
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
async function endpointsGetNfsMount() {
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
async function endpointsGetSmbMount() {
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

async function main() {
  await endpointsGetAzureMultiCloudConnector();
  await endpointsGetAzureStorageBlobContainer();
  await endpointsGetAzureStorageNfsFileShare();
  await endpointsGetAzureStorageSmbFileShare();
  await endpointsGetNfsMount();
  await endpointsGetSmbMount();
}

main().catch(console.error);
