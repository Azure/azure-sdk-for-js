// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MongoClusterManagementClient } = require("@azure/arm-mongocluster");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or update a mongo cluster. Update overwrites all properties for the resource. To only modify some of the properties, use PATCH.
 *
 * @summary create or update a mongo cluster. Update overwrites all properties for the resource. To only modify some of the properties, use PATCH.
 * x-ms-original-file: 2025-08-01-preview/MongoClusters_Create.json
 */
async function createsANewMongoClusterResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MongoClusterManagementClient(credential, subscriptionId);
  const result = await client.mongoClusters.createOrUpdate("TestResourceGroup", "myMongoCluster", {
    location: "westus2",
    properties: {
      administrator: { userName: "mongoAdmin", password: "password" },
      authConfig: { allowedModes: ["NativeAuth"] },
      serverVersion: "5.0",
      storage: { sizeGb: 128 },
      compute: { tier: "M30" },
      sharding: { shardCount: 1 },
      highAvailability: { targetMode: "ZoneRedundantPreferred" },
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to create or update a mongo cluster. Update overwrites all properties for the resource. To only modify some of the properties, use PATCH.
 *
 * @summary create or update a mongo cluster. Update overwrites all properties for the resource. To only modify some of the properties, use PATCH.
 * x-ms-original-file: 2025-08-01-preview/MongoClusters_CreateGeoReplica.json
 */
async function createsAReplicaMongoClusterResourceFromASourceResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MongoClusterManagementClient(credential, subscriptionId);
  const result = await client.mongoClusters.createOrUpdate(
    "TestResourceGroup",
    "myReplicaMongoCluster",
    {
      location: "centralus",
      properties: {
        createMode: "GeoReplica",
        replicaParameters: {
          sourceResourceId:
            "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/TestResourceGroup/providers/Microsoft.DocumentDB/mongoClusters/mySourceMongoCluster",
          sourceLocation: "eastus",
        },
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create or update a mongo cluster. Update overwrites all properties for the resource. To only modify some of the properties, use PATCH.
 *
 * @summary create or update a mongo cluster. Update overwrites all properties for the resource. To only modify some of the properties, use PATCH.
 * x-ms-original-file: 2025-08-01-preview/MongoClusters_CreateGeoReplica_CMK.json
 */
async function createsAReplicaMongoClusterResourceWithCustomerManagedKeyEncryptionFromASourceResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MongoClusterManagementClient(credential, subscriptionId);
  const result = await client.mongoClusters.createOrUpdate(
    "TestResourceGroup",
    "myReplicaMongoCluster",
    {
      identity: {
        type: "UserAssigned",
        userAssignedIdentities: {
          "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/TestResourceGroup/providers/Microsoft.ManagedIdentity/userAssignedIdentities/myidentity":
            {},
        },
      },
      location: "centralus",
      properties: {
        createMode: "GeoReplica",
        replicaParameters: {
          sourceResourceId:
            "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/TestResourceGroup/providers/Microsoft.DocumentDB/mongoClusters/mySourceMongoCluster",
          sourceLocation: "eastus",
        },
        encryption: {
          customerManagedKeyEncryption: {
            keyEncryptionKeyIdentity: {
              identityType: "UserAssignedIdentity",
              userAssignedIdentityResourceId:
                "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/TestResourceGroup/providers/Microsoft.ManagedIdentity/userAssignedIdentities/myidentity",
            },
            keyEncryptionKeyUrl: "https://myVault.vault.azure.net/keys/myKey",
          },
        },
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create or update a mongo cluster. Update overwrites all properties for the resource. To only modify some of the properties, use PATCH.
 *
 * @summary create or update a mongo cluster. Update overwrites all properties for the resource. To only modify some of the properties, use PATCH.
 * x-ms-original-file: 2025-08-01-preview/MongoClusters_CreatePITR.json
 */
async function createsAMongoClusterResourceFromAPointInTimeRestore() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MongoClusterManagementClient(credential, subscriptionId);
  const result = await client.mongoClusters.createOrUpdate("TestResourceGroup", "myMongoCluster", {
    location: "westus2",
    properties: {
      createMode: "PointInTimeRestore",
      administrator: { userName: "mongoAdmin", password: "password" },
      restoreParameters: {
        pointInTimeUTC: new Date("2023-01-13T20:07:35Z"),
        sourceResourceId:
          "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/TestResourceGroup/providers/Microsoft.DocumentDB/mongoClusters/myOtherMongoCluster",
      },
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to create or update a mongo cluster. Update overwrites all properties for the resource. To only modify some of the properties, use PATCH.
 *
 * @summary create or update a mongo cluster. Update overwrites all properties for the resource. To only modify some of the properties, use PATCH.
 * x-ms-original-file: 2025-08-01-preview/MongoClusters_CreatePITR_CMK.json
 */
async function createsAMongoClusterResourceWithCustomerManagedKeyEncryptionFromAPointInTimeRestore() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MongoClusterManagementClient(credential, subscriptionId);
  const result = await client.mongoClusters.createOrUpdate("TestResourceGroup", "myMongoCluster", {
    identity: {
      type: "UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/TestResourceGroup/providers/Microsoft.ManagedIdentity/userAssignedIdentities/myidentity":
          {},
      },
    },
    location: "westus2",
    properties: {
      createMode: "PointInTimeRestore",
      restoreParameters: {
        pointInTimeUTC: new Date("2023-01-13T20:07:35Z"),
        sourceResourceId:
          "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/TestResourceGroup/providers/Microsoft.DocumentDB/mongoClusters/myOtherMongoCluster",
      },
      encryption: {
        customerManagedKeyEncryption: {
          keyEncryptionKeyIdentity: {
            identityType: "UserAssignedIdentity",
            userAssignedIdentityResourceId:
              "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/TestResourceGroup/providers/Microsoft.ManagedIdentity/userAssignedIdentities/myidentity",
          },
          keyEncryptionKeyUrl: "https://myVault.vault.azure.net/keys/myKey",
        },
      },
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to create or update a mongo cluster. Update overwrites all properties for the resource. To only modify some of the properties, use PATCH.
 *
 * @summary create or update a mongo cluster. Update overwrites all properties for the resource. To only modify some of the properties, use PATCH.
 * x-ms-original-file: 2025-08-01-preview/MongoClusters_CreatePITR_EntraAuth.json
 */
async function createsAMongoClusterResourceFromAPointInTimeRestoreWithMicrosoftEntraIDAuthenticationModeEnabled() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MongoClusterManagementClient(credential, subscriptionId);
  const result = await client.mongoClusters.createOrUpdate("TestResourceGroup", "myMongoCluster", {
    location: "westus2",
    properties: {
      createMode: "PointInTimeRestore",
      authConfig: { allowedModes: ["MicrosoftEntraID"] },
      restoreParameters: {
        pointInTimeUTC: new Date("2023-01-13T20:07:35Z"),
        sourceResourceId:
          "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/TestResourceGroup/providers/Microsoft.DocumentDB/mongoClusters/myOtherMongoCluster",
      },
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to create or update a mongo cluster. Update overwrites all properties for the resource. To only modify some of the properties, use PATCH.
 *
 * @summary create or update a mongo cluster. Update overwrites all properties for the resource. To only modify some of the properties, use PATCH.
 * x-ms-original-file: 2025-08-01-preview/MongoClusters_Create_CMK.json
 */
async function createsANewMongoClusterResourceWithCustomerManagedKeyEncryption() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MongoClusterManagementClient(credential, subscriptionId);
  const result = await client.mongoClusters.createOrUpdate("TestResourceGroup", "myMongoCluster", {
    identity: {
      type: "UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/TestResourceGroup/providers/Microsoft.ManagedIdentity/userAssignedIdentities/myidentity":
          {},
      },
    },
    location: "westus2",
    properties: {
      administrator: { userName: "mongoAdmin", password: "password" },
      storage: { sizeGb: 32 },
      compute: { tier: "M30" },
      sharding: { shardCount: 1 },
      highAvailability: { targetMode: "Disabled" },
      encryption: {
        customerManagedKeyEncryption: {
          keyEncryptionKeyIdentity: {
            identityType: "UserAssignedIdentity",
            userAssignedIdentityResourceId:
              "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/TestResourceGroup/providers/Microsoft.ManagedIdentity/userAssignedIdentities/myidentity",
          },
          keyEncryptionKeyUrl: "https://myVault.vault.azure.net/keys/myKey",
        },
      },
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to create or update a mongo cluster. Update overwrites all properties for the resource. To only modify some of the properties, use PATCH.
 *
 * @summary create or update a mongo cluster. Update overwrites all properties for the resource. To only modify some of the properties, use PATCH.
 * x-ms-original-file: 2025-08-01-preview/MongoClusters_Create_SSDv2.json
 */
async function createsANewMongoClusterResourceWithPremiumSSDv2Storage() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MongoClusterManagementClient(credential, subscriptionId);
  const result = await client.mongoClusters.createOrUpdate("TestResourceGroup", "myMongoCluster", {
    location: "westus2",
    properties: {
      administrator: { userName: "mongoAdmin", password: "password" },
      authConfig: { allowedModes: ["NativeAuth"] },
      serverVersion: "5.0",
      storage: { sizeGb: 32, type: "PremiumSSDv2" },
      compute: { tier: "M30" },
      sharding: { shardCount: 1 },
      highAvailability: { targetMode: "ZoneRedundantPreferred" },
    },
  });
  console.log(result);
}

async function main() {
  await createsANewMongoClusterResource();
  await createsAReplicaMongoClusterResourceFromASourceResource();
  await createsAReplicaMongoClusterResourceWithCustomerManagedKeyEncryptionFromASourceResource();
  await createsAMongoClusterResourceFromAPointInTimeRestore();
  await createsAMongoClusterResourceWithCustomerManagedKeyEncryptionFromAPointInTimeRestore();
  await createsAMongoClusterResourceFromAPointInTimeRestoreWithMicrosoftEntraIDAuthenticationModeEnabled();
  await createsANewMongoClusterResourceWithCustomerManagedKeyEncryption();
  await createsANewMongoClusterResourceWithPremiumSSDv2Storage();
}

main().catch(console.error);
