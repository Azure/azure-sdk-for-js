// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageMoverClient } = require("@azure/arm-storagemover");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates properties for an Endpoint resource. Properties not specified in the request body will be unchanged.
 *
 * @summary updates properties for an Endpoint resource. Properties not specified in the request body will be unchanged.
 * x-ms-original-file: 2026-05-01/Endpoints_Update_AzureMultiCloudConnector.json
 */
async function endpointsUpdateAzureMultiCloudConnector() {
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
 * x-ms-original-file: 2026-05-01/Endpoints_Update_AzureStorageBlobContainer.json
 */
async function endpointsUpdateAzureStorageBlobContainer() {
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
 * x-ms-original-file: 2026-05-01/Endpoints_Update_AzureStorageBlobContainer_CrossTenant.json
 */
async function endpointsUpdateAzureStorageBlobContainerCrossTenant() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "60bcfc77-6589-4da2-b7fd-f9ec9322cf95";
  const client = new StorageMoverClient(credential, subscriptionId);
  const result = await client.endpoints.update(
    "examples-rg",
    "examples-storageMoverName",
    "examples-endpointName",
    {
      properties: {
        description:
          "Updated cross-tenant source endpoint with refreshed allowed partner storage accounts",
        endpointType: "AzureStorageBlobContainer",
        enableCrossTenantTransfer: true,
        allowedStorageAccounts: [
          "/subscriptions/0a2b3c4d-5e6f-7081-92a3-b4c5d6e7f809/resourceGroups/partner-rg/providers/Microsoft.Storage/storageAccounts/partnertargetsa",
          "/subscriptions/0a2b3c4d-5e6f-7081-92a3-b4c5d6e7f809/resourceGroups/partner-rg/providers/Microsoft.Storage/storageAccounts/partnertargetsa2",
        ],
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to updates properties for an Endpoint resource. Properties not specified in the request body will be unchanged.
 *
 * @summary updates properties for an Endpoint resource. Properties not specified in the request body will be unchanged.
 * x-ms-original-file: 2026-05-01/Endpoints_Update_AzureStorageNfsFileShare.json
 */
async function endpointsUpdateAzureStorageNfsFileShare() {
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
 * x-ms-original-file: 2026-05-01/Endpoints_Update_AzureStorageSmbFileShare.json
 */
async function endpointsUpdateAzureStorageSmbFileShare() {
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
 * x-ms-original-file: 2026-05-01/Endpoints_Update_AzureStorageSmbFileShare_CrossTenant.json
 */
async function endpointsUpdateAzureStorageSmbFileShareCrossTenant() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "60bcfc77-6589-4da2-b7fd-f9ec9322cf95";
  const client = new StorageMoverClient(credential, subscriptionId);
  const result = await client.endpoints.update(
    "examples-rg",
    "examples-storageMoverName",
    "examples-endpointName",
    {
      properties: {
        description:
          "Updated cross-tenant source SMB file share endpoint with refreshed allowed partner storage accounts",
        endpointType: "AzureStorageSmbFileShare",
        enableCrossTenantTransfer: true,
        allowedStorageAccounts: [
          "/subscriptions/0a2b3c4d-5e6f-7081-92a3-b4c5d6e7f809/resourceGroups/partner-rg/providers/Microsoft.Storage/storageAccounts/partnertargetsa",
          "/subscriptions/0a2b3c4d-5e6f-7081-92a3-b4c5d6e7f809/resourceGroups/partner-rg/providers/Microsoft.Storage/storageAccounts/partnertargetsa2",
        ],
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to updates properties for an Endpoint resource. Properties not specified in the request body will be unchanged.
 *
 * @summary updates properties for an Endpoint resource. Properties not specified in the request body will be unchanged.
 * x-ms-original-file: 2026-05-01/Endpoints_Update_NfsMount.json
 */
async function endpointsUpdateNfsMount() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "60bcfc77-6589-4da2-b7fd-f9ec9322cf95";
  const client = new StorageMoverClient(credential, subscriptionId);
  const result = await client.endpoints.update(
    "examples-rg",
    "examples-storageMoverName",
    "examples-endpointName",
    { properties: { description: "Updated Endpoint Description", endpointType: "NfsMount" } },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to updates properties for an Endpoint resource. Properties not specified in the request body will be unchanged.
 *
 * @summary updates properties for an Endpoint resource. Properties not specified in the request body will be unchanged.
 * x-ms-original-file: 2026-05-01/Endpoints_Update_S3WithHMAC.json
 */
async function endpointsUpdateS3WithHmac() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "60bcfc77-6589-4da2-b7fd-f9ec9322cf95";
  const client = new StorageMoverClient(credential, subscriptionId);
  const result = await client.endpoints.update(
    "examples-rg",
    "examples-storageMoverName",
    "examples-endpointName",
    { properties: { description: "Updated Endpoint Description", endpointType: "S3WithHMAC" } },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to updates properties for an Endpoint resource. Properties not specified in the request body will be unchanged.
 *
 * @summary updates properties for an Endpoint resource. Properties not specified in the request body will be unchanged.
 * x-ms-original-file: 2026-05-01/Endpoints_Update_SmbMount.json
 */
async function endpointsUpdateSmbMount() {
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

async function main() {
  await endpointsUpdateAzureMultiCloudConnector();
  await endpointsUpdateAzureStorageBlobContainer();
  await endpointsUpdateAzureStorageBlobContainerCrossTenant();
  await endpointsUpdateAzureStorageNfsFileShare();
  await endpointsUpdateAzureStorageSmbFileShare();
  await endpointsUpdateAzureStorageSmbFileShareCrossTenant();
  await endpointsUpdateNfsMount();
  await endpointsUpdateS3WithHmac();
  await endpointsUpdateSmbMount();
}

main().catch(console.error);
