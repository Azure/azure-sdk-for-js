// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageMoverClient } from "@azure/arm-storagemover";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates properties for an Endpoint resource. Properties not specified in the request body will be unchanged.
 *
 * @summary updates properties for an Endpoint resource. Properties not specified in the request body will be unchanged.
 * x-ms-original-file: 2025-07-01/Endpoints_Update_AzureMultiCloudConnector.json
 */
async function endpointsUpdateAzureMultiCloudConnector(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "60bcfc77-6589-4da2-b7fd-f9ec9322cf95";
  const client = new StorageMoverClient(credential, subscriptionId);
  const result = await client.endpoints.update(
    "examples-rg",
    "examples-storageMoverName",
    "examples-endpointName",
    {
      properties: {
        endpointType: "AzureMultiCloudConnector",
        description: "Updated Endpoint Description",
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to updates properties for an Endpoint resource. Properties not specified in the request body will be unchanged.
 *
 * @summary updates properties for an Endpoint resource. Properties not specified in the request body will be unchanged.
 * x-ms-original-file: 2025-07-01/Endpoints_Update_AzureStorageBlobContainer.json
 */
async function endpointsUpdateAzureStorageBlobContainer(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "60bcfc77-6589-4da2-b7fd-f9ec9322cf95";
  const client = new StorageMoverClient(credential, subscriptionId);
  const result = await client.endpoints.update(
    "examples-rg",
    "examples-storageMoverName",
    "examples-endpointName",
    {
      properties: {
        description: "Updated Endpoint Description",
        endpointType: "AzureStorageBlobContainer",
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to updates properties for an Endpoint resource. Properties not specified in the request body will be unchanged.
 *
 * @summary updates properties for an Endpoint resource. Properties not specified in the request body will be unchanged.
 * x-ms-original-file: 2025-07-01/Endpoints_Update_AzureStorageNfsFileShare.json
 */
async function endpointsUpdateAzureStorageNfsFileShare(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "60bcfc77-6589-4da2-b7fd-f9ec9322cf95";
  const client = new StorageMoverClient(credential, subscriptionId);
  const result = await client.endpoints.update(
    "examples-rg",
    "examples-storageMoverName",
    "examples-endpointName",
    {
      properties: {
        endpointType: "AzureStorageNfsFileShare",
        description: "Updated Endpoint Description",
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to updates properties for an Endpoint resource. Properties not specified in the request body will be unchanged.
 *
 * @summary updates properties for an Endpoint resource. Properties not specified in the request body will be unchanged.
 * x-ms-original-file: 2025-07-01/Endpoints_Update_AzureStorageSmbFileShare.json
 */
async function endpointsUpdateAzureStorageSmbFileShare(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "60bcfc77-6589-4da2-b7fd-f9ec9322cf95";
  const client = new StorageMoverClient(credential, subscriptionId);
  const result = await client.endpoints.update(
    "examples-rg",
    "examples-storageMoverName",
    "examples-endpointName",
    {
      properties: {
        description: "Updated Endpoint Description",
        endpointType: "AzureStorageSmbFileShare",
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to updates properties for an Endpoint resource. Properties not specified in the request body will be unchanged.
 *
 * @summary updates properties for an Endpoint resource. Properties not specified in the request body will be unchanged.
 * x-ms-original-file: 2025-07-01/Endpoints_Update_NfsMount.json
 */
async function endpointsUpdateNfsMount(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "60bcfc77-6589-4da2-b7fd-f9ec9322cf95";
  const client = new StorageMoverClient(credential, subscriptionId);
  const result = await client.endpoints.update(
    "examples-rg",
    "examples-storageMoverName",
    "examples-endpointName",
    {
      properties: {
        description: "Updated Endpoint Description",
        endpointType: "NfsMount",
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to updates properties for an Endpoint resource. Properties not specified in the request body will be unchanged.
 *
 * @summary updates properties for an Endpoint resource. Properties not specified in the request body will be unchanged.
 * x-ms-original-file: 2025-07-01/Endpoints_Update_SmbMount.json
 */
async function endpointsUpdateSmbMount(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "60bcfc77-6589-4da2-b7fd-f9ec9322cf95";
  const client = new StorageMoverClient(credential, subscriptionId);
  const result = await client.endpoints.update(
    "examples-rg",
    "examples-storageMoverName",
    "examples-endpointName",
    {
      properties: {
        description: "Updated Endpoint Description",
        credentials: {
          type: "AzureKeyVaultSmb",
          passwordUri:
            "https://examples-azureKeyVault.vault.azure.net/secrets/examples-updated-password",
          usernameUri:
            "https://examples-azureKeyVault.vault.azure.net/secrets/examples-updated-username",
        },
        endpointType: "SmbMount",
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await endpointsUpdateAzureMultiCloudConnector();
  await endpointsUpdateAzureStorageBlobContainer();
  await endpointsUpdateAzureStorageNfsFileShare();
  await endpointsUpdateAzureStorageSmbFileShare();
  await endpointsUpdateNfsMount();
  await endpointsUpdateSmbMount();
}

main().catch(console.error);
