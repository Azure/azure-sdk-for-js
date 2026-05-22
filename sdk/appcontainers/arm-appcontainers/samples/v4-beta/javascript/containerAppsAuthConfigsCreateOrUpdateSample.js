// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerAppsAPIClient } = require("@azure/arm-appcontainers");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or update the AuthConfig for a Container App.
 *
 * @summary create or update the AuthConfig for a Container App.
 * x-ms-original-file: 2025-10-02-preview/AuthConfigs_BlobStorageTokenStore_ClientId_CreateOrUpdate.json
 */
async function createOrUpdateContainerAppAuthConfigWithMsiClientIDBlobStorageTokenStore() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.containerAppsAuthConfigs.createOrUpdate("rg1", "myapp", "current", {
    encryptionSettings: {
      containerAppAuthEncryptionSecretName: "testEncryptionSecretName",
      containerAppAuthSigningSecretName: "testSigningSecretName",
    },
    globalValidation: { unauthenticatedClientAction: "AllowAnonymous" },
    identityProviders: {
      facebook: { registration: { appId: "123", appSecretSettingName: "facebook-secret" } },
    },
    login: {
      tokenStore: {
        azureBlobStorage: {
          blobContainerUri: "https://test.blob.core.windows.net/container1",
          clientId: "00000000-0000-0000-0000-000000000000",
        },
      },
    },
    platform: { enabled: true },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to create or update the AuthConfig for a Container App.
 *
 * @summary create or update the AuthConfig for a Container App.
 * x-ms-original-file: 2025-10-02-preview/AuthConfigs_BlobStorageTokenStore_CreateOrUpdate.json
 */
async function createOrUpdateContainerAppAuthConfigWithMsiManagedIdentityResourceIdBlobStorageTokenStore() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.containerAppsAuthConfigs.createOrUpdate("rg1", "myapp", "current", {
    encryptionSettings: {
      containerAppAuthEncryptionSecretName: "testEncryptionSecretName",
      containerAppAuthSigningSecretName: "testSigningSecretName",
    },
    globalValidation: { unauthenticatedClientAction: "AllowAnonymous" },
    identityProviders: {
      facebook: { registration: { appId: "123", appSecretSettingName: "facebook-secret" } },
    },
    login: {
      tokenStore: {
        azureBlobStorage: {
          blobContainerUri: "https://test.blob.core.windows.net/container1",
          managedIdentityResourceId:
            "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.ManagedIdentity/userAssignedIdentities/identity1",
        },
      },
    },
    platform: { enabled: true },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to create or update the AuthConfig for a Container App.
 *
 * @summary create or update the AuthConfig for a Container App.
 * x-ms-original-file: 2025-10-02-preview/AuthConfigs_CreateOrUpdate.json
 */
async function createOrUpdateContainerAppAuthConfig() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "651f8027-33e8-4ec4-97b4-f6e9f3dc8744";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.containerAppsAuthConfigs.createOrUpdate(
    "workerapps-rg-xj",
    "testcanadacentral",
    "current",
    {
      encryptionSettings: {
        containerAppAuthEncryptionSecretName: "testEncryptionSecretName",
        containerAppAuthSigningSecretName: "testSigningSecretName",
      },
      globalValidation: { unauthenticatedClientAction: "AllowAnonymous" },
      identityProviders: {
        facebook: { registration: { appId: "123", appSecretSettingName: "facebook-secret" } },
      },
      platform: { enabled: true },
    },
  );
  console.log(result);
}

async function main() {
  await createOrUpdateContainerAppAuthConfigWithMsiClientIDBlobStorageTokenStore();
  await createOrUpdateContainerAppAuthConfigWithMsiManagedIdentityResourceIdBlobStorageTokenStore();
  await createOrUpdateContainerAppAuthConfig();
}

main().catch(console.error);
