// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MongoClusterManagementClient } = require("@azure/arm-mongocluster");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates an existing DocumentDB cluster. The request body can contain one to many of the properties present in the normal DocumentDB cluster definition.
 *
 * @summary updates an existing DocumentDB cluster. The request body can contain one to many of the properties present in the normal DocumentDB cluster definition.
 * x-ms-original-file: 2026-06-15-preview/MongoClusters_PatchCMK.json
 */
async function updatesTheCustomerManagedEncryptionKeyOnADocumentDBClusterResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MongoClusterManagementClient(credential, subscriptionId);
  const result = await client.mongoClusters.update("TestResourceGroup", "myMongoCluster", {
    identity: {
      type: "UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/TestResourceGroup/providers/Microsoft.ManagedIdentity/userAssignedIdentities/myidentity2":
          {},
      },
    },
    properties: {
      encryption: {
        customerManagedKeyEncryption: {
          keyEncryptionKeyIdentity: {
            identityType: "UserAssignedIdentity",
            userAssignedIdentityResourceId:
              "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/TestResourceGroup/providers/Microsoft.ManagedIdentity/userAssignedIdentities/myidentity2",
          },
          keyEncryptionKeyUrl: "https://myVault.vault.azure.net/keys/myKey2",
        },
      },
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates an existing DocumentDB cluster. The request body can contain one to many of the properties present in the normal DocumentDB cluster definition.
 *
 * @summary updates an existing DocumentDB cluster. The request body can contain one to many of the properties present in the normal DocumentDB cluster definition.
 * x-ms-original-file: 2026-06-15-preview/MongoClusters_PatchDataApi.json
 */
async function enablesDataAPIOnADocumentDBClusterResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MongoClusterManagementClient(credential, subscriptionId);
  const result = await client.mongoClusters.update("TestResourceGroup", "myMongoCluster", {
    properties: { dataApi: { mode: "Enabled" } },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates an existing DocumentDB cluster. The request body can contain one to many of the properties present in the normal DocumentDB cluster definition.
 *
 * @summary updates an existing DocumentDB cluster. The request body can contain one to many of the properties present in the normal DocumentDB cluster definition.
 * x-ms-original-file: 2026-06-15-preview/MongoClusters_PatchDisableNativeAuth.json
 */
async function updatesTheAllowedAuthenticationModesToRemoveNativeAuthentication() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MongoClusterManagementClient(credential, subscriptionId);
  const result = await client.mongoClusters.update("TestResourceGroup", "myMongoCluster", {
    properties: { authConfig: { allowedModes: ["MicrosoftEntraID"] } },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates an existing DocumentDB cluster. The request body can contain one to many of the properties present in the normal DocumentDB cluster definition.
 *
 * @summary updates an existing DocumentDB cluster. The request body can contain one to many of the properties present in the normal DocumentDB cluster definition.
 * x-ms-original-file: 2026-06-15-preview/MongoClusters_PatchDiskSize.json
 */
async function updatesTheDiskSizeOnADocumentDBClusterResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MongoClusterManagementClient(credential, subscriptionId);
  const result = await client.mongoClusters.update("TestResourceGroup", "myMongoCluster", {
    properties: { storage: { sizeGb: 256 } },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates an existing DocumentDB cluster. The request body can contain one to many of the properties present in the normal DocumentDB cluster definition.
 *
 * @summary updates an existing DocumentDB cluster. The request body can contain one to many of the properties present in the normal DocumentDB cluster definition.
 * x-ms-original-file: 2026-06-15-preview/MongoClusters_PatchEnableEntraIDAuth.json
 */
async function updatesTheAllowedAuthenticationModesToIncludeMicrosoftEntraIDAuthentication() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MongoClusterManagementClient(credential, subscriptionId);
  const result = await client.mongoClusters.update("TestResourceGroup", "myMongoCluster", {
    properties: { authConfig: { allowedModes: ["NativeAuth", "MicrosoftEntraID"] } },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates an existing DocumentDB cluster. The request body can contain one to many of the properties present in the normal DocumentDB cluster definition.
 *
 * @summary updates an existing DocumentDB cluster. The request body can contain one to many of the properties present in the normal DocumentDB cluster definition.
 * x-ms-original-file: 2026-06-15-preview/MongoClusters_PatchNetworkBypassMode.json
 */
async function enablesNetworkBypassModeOnAnAzureDocumentDBClusterResourceToAllowTheAzureCosmosDBServiceToBypassNetworkRestrictions() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MongoClusterManagementClient(credential, subscriptionId);
  const result = await client.mongoClusters.update("TestResourceGroup", "myMongoCluster", {
    properties: { networkBypassMode: "AzureCosmosDB" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates an existing DocumentDB cluster. The request body can contain one to many of the properties present in the normal DocumentDB cluster definition.
 *
 * @summary updates an existing DocumentDB cluster. The request body can contain one to many of the properties present in the normal DocumentDB cluster definition.
 * x-ms-original-file: 2026-06-15-preview/MongoClusters_PatchPrivateNetworkAccess.json
 */
async function disablesPublicNetworkAccessOnADocumentDBClusterResourceWithAPrivateEndpointConnection() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MongoClusterManagementClient(credential, subscriptionId);
  const result = await client.mongoClusters.update("TestResourceGroup", "myMongoCluster", {
    properties: { publicNetworkAccess: "Disabled" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates an existing DocumentDB cluster. The request body can contain one to many of the properties present in the normal DocumentDB cluster definition.
 *
 * @summary updates an existing DocumentDB cluster. The request body can contain one to many of the properties present in the normal DocumentDB cluster definition.
 * x-ms-original-file: 2026-06-15-preview/MongoClusters_PatchSSDv2.json
 */
async function updatesThePremiumSSDv2SizeOnADocumentDBClusterResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MongoClusterManagementClient(credential, subscriptionId);
  const result = await client.mongoClusters.update("TestResourceGroup", "myMongoCluster", {
    properties: { storage: { sizeGb: 128, type: "PremiumSSDv2" } },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates an existing DocumentDB cluster. The request body can contain one to many of the properties present in the normal DocumentDB cluster definition.
 *
 * @summary updates an existing DocumentDB cluster. The request body can contain one to many of the properties present in the normal DocumentDB cluster definition.
 * x-ms-original-file: 2026-06-15-preview/MongoClusters_ResetPassword.json
 */
async function resetsTheAdministratorLoginPassword() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MongoClusterManagementClient(credential, subscriptionId);
  const result = await client.mongoClusters.update("TestResourceGroup", "myMongoCluster", {
    properties: { administrator: { userName: "mongoAdmin", password: "********" } },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates an existing DocumentDB cluster. The request body can contain one to many of the properties present in the normal DocumentDB cluster definition.
 *
 * @summary updates an existing DocumentDB cluster. The request body can contain one to many of the properties present in the normal DocumentDB cluster definition.
 * x-ms-original-file: 2026-06-15-preview/MongoClusters_Update.json
 */
async function updatesADocumentDBClusterResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MongoClusterManagementClient(credential, subscriptionId);
  const result = await client.mongoClusters.update("TestResourceGroup", "myMongoCluster", {
    properties: {
      administrator: { userName: "mongoAdmin" },
      authConfig: { allowedModes: ["NativeAuth"] },
      serverVersion: "5.0",
      storage: { sizeGb: 256, type: "PremiumSSDv2" },
      compute: { tier: "M50" },
      sharding: { shardCount: 4 },
      highAvailability: { targetMode: "SameZone" },
      previewFeatures: [],
      publicNetworkAccess: "Enabled",
      dataApi: { mode: "Disabled" },
    },
  });
  console.log(result);
}

async function main() {
  await updatesTheCustomerManagedEncryptionKeyOnADocumentDBClusterResource();
  await enablesDataAPIOnADocumentDBClusterResource();
  await updatesTheAllowedAuthenticationModesToRemoveNativeAuthentication();
  await updatesTheDiskSizeOnADocumentDBClusterResource();
  await updatesTheAllowedAuthenticationModesToIncludeMicrosoftEntraIDAuthentication();
  await enablesNetworkBypassModeOnAnAzureDocumentDBClusterResourceToAllowTheAzureCosmosDBServiceToBypassNetworkRestrictions();
  await disablesPublicNetworkAccessOnADocumentDBClusterResourceWithAPrivateEndpointConnection();
  await updatesThePremiumSSDv2SizeOnADocumentDBClusterResource();
  await resetsTheAdministratorLoginPassword();
  await updatesADocumentDBClusterResource();
}

main().catch(console.error);
