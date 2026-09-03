// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageMoverClient } from "@azure/arm-storagemover";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates an Endpoint resource, which represents a data transfer source or destination.
 *
 * @summary creates or updates an Endpoint resource, which represents a data transfer source or destination.
 * x-ms-original-file: 2025-12-01/Endpoints_CreateOrUpdate_AzureMultiCloudConnector.json
 */
async function endpointsCreateOrUpdateAzureMultiCloudConnector(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "60bcfc77-6589-4da2-b7fd-f9ec9322cf95";
  const client = new StorageMoverClient(credential, subscriptionId);
  const result = await client.endpoints.createOrUpdate(
    "examples-rg",
    "examples-storageMoverName",
    "examples-endpointName",
    {
      properties: {
        endpointType: "AzureMultiCloudConnector",
        endpointKind: "Source",
        multiCloudConnectorId:
          "/subscriptions/60bcfc77-6589-4da2-b7fd-f9ec9322cf95/resourceGroups/examples-rg/providers/Microsoft.HybridConnectivity/publicCloudConnectors/TestConnector",
        awsS3BucketId:
          "/subscriptions/60bcfc77-6589-4da2-b7fd-f9ec9322cf95/resourceGroups/examples-rg/providers/Microsoft.AwsConnector/s3Buckets/testBucket",
        description: "Example multi cloud connector resource id",
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates an Endpoint resource, which represents a data transfer source or destination.
 *
 * @summary creates or updates an Endpoint resource, which represents a data transfer source or destination.
 * x-ms-original-file: 2025-12-01/Endpoints_CreateOrUpdate_AzureStorageBlobContainer.json
 */
async function endpointsCreateOrUpdateAzureStorageBlobContainer(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "60bcfc77-6589-4da2-b7fd-f9ec9322cf95";
  const client = new StorageMoverClient(credential, subscriptionId);
  const result = await client.endpoints.createOrUpdate(
    "examples-rg",
    "examples-storageMoverName",
    "examples-endpointName",
    {
      properties: {
        description: "Example Storage Blob Container Endpoint Description",
        blobContainerName: "examples-blobcontainer",
        endpointType: "AzureStorageBlobContainer",
        endpointKind: "Target",
        storageAccountResourceId:
          "/subscriptions/60bcfc77-6589-4da2-b7fd-f9ec9322cf95/resourceGroups/examples-rg/providers/Microsoft.Storage/storageAccounts/examplesa",
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates an Endpoint resource, which represents a data transfer source or destination.
 *
 * @summary creates or updates an Endpoint resource, which represents a data transfer source or destination.
 * x-ms-original-file: 2025-12-01/Endpoints_CreateOrUpdate_AzureStorageNfsFileShare.json
 */
async function endpointsCreateOrUpdateAzureStorageNfsFileShare(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "60bcfc77-6589-4da2-b7fd-f9ec9322cf95";
  const client = new StorageMoverClient(credential, subscriptionId);
  const result = await client.endpoints.createOrUpdate(
    "examples-rg",
    "examples-storageMoverName",
    "examples-endpointName",
    {
      properties: {
        endpointType: "AzureStorageNfsFileShare",
        endpointKind: "Target",
        storageAccountResourceId:
          "/subscriptions/60bcfc77-6589-4da2-b7fd-f9ec9322cf95/resourceGroups/examples-rg/providers/Microsoft.Storage/storageAccounts/examplesa",
        fileShareName: "examples-fileshare",
        description: "Example Storage File Share Endpoint Description",
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates an Endpoint resource, which represents a data transfer source or destination.
 *
 * @summary creates or updates an Endpoint resource, which represents a data transfer source or destination.
 * x-ms-original-file: 2025-12-01/Endpoints_CreateOrUpdate_AzureStorageSmbFileShare.json
 */
async function endpointsCreateOrUpdateAzureStorageSmbFileShare(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "60bcfc77-6589-4da2-b7fd-f9ec9322cf95";
  const client = new StorageMoverClient(credential, subscriptionId);
  const result = await client.endpoints.createOrUpdate(
    "examples-rg",
    "examples-storageMoverName",
    "examples-endpointName",
    {
      properties: {
        description: "Example Storage File Share Endpoint Description",
        endpointType: "AzureStorageSmbFileShare",
        endpointKind: "Target",
        fileShareName: "examples-fileshare",
        storageAccountResourceId:
          "/subscriptions/60bcfc77-6589-4da2-b7fd-f9ec9322cf95/resourceGroups/examples-rg/providers/Microsoft.Storage/storageAccounts/examplesa",
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates an Endpoint resource, which represents a data transfer source or destination.
 *
 * @summary creates or updates an Endpoint resource, which represents a data transfer source or destination.
 * x-ms-original-file: 2025-12-01/Endpoints_CreateOrUpdate_NfsMount.json
 */
async function endpointsCreateOrUpdateNfsMount(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "60bcfc77-6589-4da2-b7fd-f9ec9322cf95";
  const client = new StorageMoverClient(credential, subscriptionId);
  const result = await client.endpoints.createOrUpdate(
    "examples-rg",
    "examples-storageMoverName",
    "examples-endpointName",
    {
      properties: {
        description: "Example NFS Mount Endpoint Description",
        endpointType: "NfsMount",
        endpointKind: "Source",
        export: "examples-exportName",
        host: "0.0.0.0",
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates an Endpoint resource, which represents a data transfer source or destination.
 *
 * @summary creates or updates an Endpoint resource, which represents a data transfer source or destination.
 * x-ms-original-file: 2025-12-01/Endpoints_CreateOrUpdate_S3WithHMAC.json
 */
async function endpointsCreateOrUpdateS3WithHmac(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "60bcfc77-6589-4da2-b7fd-f9ec9322cf95";
  const client = new StorageMoverClient(credential, subscriptionId);
  const result = await client.endpoints.createOrUpdate(
    "examples-rg",
    "examples-storageMoverName",
    "examples-endpointName",
    {
      properties: {
        description: "Example S3WithHmac Endpoint Description",
        credentials: {
          accessKeyUri: "https://examples-azureKeyVault.vault.azure.net/secrets/examples-access",
          secretKeyUri: "https://examples-azureKeyVault.vault.azure.net/secrets/examples-secret",
          type: "AzureKeyVaultS3WithHMAC",
        },
        sourceUri: "https://examples-bucket.s3.amazonaws.com/prefix/",
        sourceType: "GCS",
        endpointType: "S3WithHMAC",
        endpointKind: "Source",
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates an Endpoint resource, which represents a data transfer source or destination.
 *
 * @summary creates or updates an Endpoint resource, which represents a data transfer source or destination.
 * x-ms-original-file: 2025-12-01/Endpoints_CreateOrUpdate_SmbMount.json
 */
async function endpointsCreateOrUpdateSmbMount(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "60bcfc77-6589-4da2-b7fd-f9ec9322cf95";
  const client = new StorageMoverClient(credential, subscriptionId);
  const result = await client.endpoints.createOrUpdate(
    "examples-rg",
    "examples-storageMoverName",
    "examples-endpointName",
    {
      properties: {
        description: "Example SMB Mount Endpoint Description",
        credentials: {
          type: "AzureKeyVaultSmb",
          passwordUri: "https://examples-azureKeyVault.vault.azure.net/secrets/examples-password",
          usernameUri: "https://examples-azureKeyVault.vault.azure.net/secrets/examples-username",
        },
        endpointType: "SmbMount",
        endpointKind: "Source",
        host: "0.0.0.0",
        shareName: "examples-shareName",
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await endpointsCreateOrUpdateAzureMultiCloudConnector();
  await endpointsCreateOrUpdateAzureStorageBlobContainer();
  await endpointsCreateOrUpdateAzureStorageNfsFileShare();
  await endpointsCreateOrUpdateAzureStorageSmbFileShare();
  await endpointsCreateOrUpdateNfsMount();
  await endpointsCreateOrUpdateS3WithHmac();
  await endpointsCreateOrUpdateSmbMount();
}

main().catch(console.error);
