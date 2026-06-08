// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageManagementClient } = require("@azure/arm-storage");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to sets the managementpolicy to the specified storage account.
 *
 * @summary sets the managementpolicy to the specified storage account.
 * x-ms-original-file: 2026-04-01/StorageAccountSetManagementPolicy.json
 */
async function storageAccountSetManagementPolicies() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.managementPolicies.createOrUpdate("res7687", "sto9699", "default", {
    policy: {
      rules: [
        {
          name: "olcmtest1",
          type: "Lifecycle",
          definition: {
            actions: {
              baseBlob: {
                delete: { daysAfterModificationGreaterThan: 1000 },
                tierToArchive: { daysAfterModificationGreaterThan: 90 },
                tierToCool: { daysAfterModificationGreaterThan: 30 },
              },
              snapshot: { delete: { daysAfterCreationGreaterThan: 30 } },
            },
            filters: { blobTypes: ["blockBlob"], prefixMatch: ["olcmtestcontainer1"] },
          },
          enabled: true,
        },
        {
          name: "olcmtest2",
          type: "Lifecycle",
          definition: {
            actions: {
              baseBlob: {
                delete: { daysAfterModificationGreaterThan: 1000 },
                tierToArchive: { daysAfterModificationGreaterThan: 90 },
                tierToCool: { daysAfterModificationGreaterThan: 30 },
              },
            },
            filters: {
              blobIndexMatch: [
                { name: "tag1", op: "==", value: "val1" },
                { name: "tag2", op: "==", value: "val2" },
              ],
              blobTypes: ["blockBlob"],
              prefixMatch: ["olcmtestcontainer2"],
            },
          },
          enabled: true,
        },
      ],
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to sets the managementpolicy to the specified storage account.
 *
 * @summary sets the managementpolicy to the specified storage account.
 * x-ms-original-file: 2026-04-01/StorageAccountSetManagementPolicyColdTierActions.json
 */
async function storageAccountSetManagementPolicyColdTierActions() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.managementPolicies.createOrUpdate("res7687", "sto9699", "default", {
    policy: {
      rules: [
        {
          name: "olcmtest1",
          type: "Lifecycle",
          definition: {
            actions: {
              baseBlob: {
                delete: { daysAfterModificationGreaterThan: 1000 },
                tierToArchive: { daysAfterModificationGreaterThan: 90 },
                tierToCold: { daysAfterModificationGreaterThan: 30 },
                tierToCool: { daysAfterModificationGreaterThan: 30 },
              },
              snapshot: {
                delete: { daysAfterCreationGreaterThan: 30 },
                tierToCold: { daysAfterCreationGreaterThan: 30 },
              },
              version: {
                delete: { daysAfterCreationGreaterThan: 30 },
                tierToCold: { daysAfterCreationGreaterThan: 30 },
              },
            },
            filters: { blobTypes: ["blockBlob"], prefixMatch: ["olcmtestcontainer1"] },
          },
          enabled: true,
        },
      ],
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to sets the managementpolicy to the specified storage account.
 *
 * @summary sets the managementpolicy to the specified storage account.
 * x-ms-original-file: 2026-04-01/StorageAccountSetManagementPolicyForBlockAndAppendBlobs.json
 */
async function storageAccountSetManagementPolicyForBlockAndAppendBlobs() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.managementPolicies.createOrUpdate("res7687", "sto9699", "default", {
    policy: {
      rules: [
        {
          name: "olcmtest1",
          type: "Lifecycle",
          definition: {
            actions: {
              baseBlob: { delete: { daysAfterModificationGreaterThan: 90 } },
              snapshot: { delete: { daysAfterCreationGreaterThan: 90 } },
              version: { delete: { daysAfterCreationGreaterThan: 90 } },
            },
            filters: {
              blobTypes: ["blockBlob", "appendBlob"],
              prefixMatch: ["olcmtestcontainer1"],
            },
          },
          enabled: true,
        },
      ],
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to sets the managementpolicy to the specified storage account.
 *
 * @summary sets the managementpolicy to the specified storage account.
 * x-ms-original-file: 2026-04-01/StorageAccountSetManagementPolicyHotTierActions.json
 */
async function storageAccountSetManagementPolicyHotTierActions() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.managementPolicies.createOrUpdate("res7687", "sto9699", "default", {
    policy: {
      rules: [
        {
          name: "olcmtest1",
          type: "Lifecycle",
          definition: {
            actions: {
              baseBlob: { tierToHot: { daysAfterModificationGreaterThan: 30 } },
              snapshot: { tierToHot: { daysAfterCreationGreaterThan: 30 } },
              version: { tierToHot: { daysAfterCreationGreaterThan: 30 } },
            },
            filters: { blobTypes: ["blockBlob"], prefixMatch: ["olcmtestcontainer1"] },
          },
          enabled: true,
        },
      ],
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to sets the managementpolicy to the specified storage account.
 *
 * @summary sets the managementpolicy to the specified storage account.
 * x-ms-original-file: 2026-04-01/StorageAccountSetManagementPolicyWithSnapshotAndVersion.json
 */
async function storageAccountSetManagementPolicyWithSnapshotAndVersion() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.managementPolicies.createOrUpdate("res7687", "sto9699", "default", {
    policy: {
      rules: [
        {
          name: "olcmtest1",
          type: "Lifecycle",
          definition: {
            actions: {
              baseBlob: {
                delete: { daysAfterModificationGreaterThan: 1000 },
                tierToArchive: { daysAfterModificationGreaterThan: 90 },
                tierToCool: { daysAfterModificationGreaterThan: 30 },
              },
              snapshot: {
                delete: { daysAfterCreationGreaterThan: 1000 },
                tierToArchive: { daysAfterCreationGreaterThan: 90 },
                tierToCool: { daysAfterCreationGreaterThan: 30 },
              },
              version: {
                delete: { daysAfterCreationGreaterThan: 1000 },
                tierToArchive: { daysAfterCreationGreaterThan: 90 },
                tierToCool: { daysAfterCreationGreaterThan: 30 },
              },
            },
            filters: { blobTypes: ["blockBlob"], prefixMatch: ["olcmtestcontainer1"] },
          },
          enabled: true,
        },
      ],
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to sets the managementpolicy to the specified storage account.
 *
 * @summary sets the managementpolicy to the specified storage account.
 * x-ms-original-file: 2026-04-01/StorageAccountSetManagementPolicy_BaseBlobDaysAfterCreationActions.json
 */
async function storageAccountSetManagementPolicyBaseBlobDaysAfterCreationActions() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.managementPolicies.createOrUpdate("res7687", "sto9699", "default", {
    policy: {
      rules: [
        {
          name: "olcmtest1",
          type: "Lifecycle",
          definition: {
            actions: {
              baseBlob: {
                delete: { daysAfterCreationGreaterThan: 1000 },
                tierToArchive: { daysAfterCreationGreaterThan: 90 },
                tierToCool: { daysAfterCreationGreaterThan: 30 },
              },
            },
            filters: { blobTypes: ["blockBlob"], prefixMatch: ["olcmtestcontainer1"] },
          },
          enabled: true,
        },
      ],
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to sets the managementpolicy to the specified storage account.
 *
 * @summary sets the managementpolicy to the specified storage account.
 * x-ms-original-file: 2026-04-01/StorageAccountSetManagementPolicy_LastAccessTimeBasedBlobActions.json
 */
async function storageAccountSetManagementPolicyLastAccessTimeBasedBlobActions() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.managementPolicies.createOrUpdate("res7687", "sto9699", "default", {
    policy: {
      rules: [
        {
          name: "olcmtest",
          type: "Lifecycle",
          definition: {
            actions: {
              baseBlob: {
                delete: { daysAfterLastAccessTimeGreaterThan: 1000 },
                enableAutoTierToHotFromCool: true,
                tierToArchive: { daysAfterLastAccessTimeGreaterThan: 90 },
                tierToCool: { daysAfterLastAccessTimeGreaterThan: 30 },
              },
              snapshot: { delete: { daysAfterCreationGreaterThan: 30 } },
            },
            filters: { blobTypes: ["blockBlob"], prefixMatch: ["olcmtestcontainer"] },
          },
          enabled: true,
        },
      ],
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to sets the managementpolicy to the specified storage account.
 *
 * @summary sets the managementpolicy to the specified storage account.
 * x-ms-original-file: 2026-04-01/StorageAccountSetManagementPolicy_LastTierChangeTimeActions.json
 */
async function storageAccountSetManagementPolicyLastTierChangeTimeActions() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.managementPolicies.createOrUpdate("res7687", "sto9699", "default", {
    policy: {
      rules: [
        {
          name: "olcmtest",
          type: "Lifecycle",
          definition: {
            actions: {
              baseBlob: {
                delete: { daysAfterModificationGreaterThan: 1000 },
                tierToArchive: {
                  daysAfterLastTierChangeGreaterThan: 120,
                  daysAfterModificationGreaterThan: 90,
                },
                tierToCool: { daysAfterModificationGreaterThan: 30 },
              },
              snapshot: {
                tierToArchive: {
                  daysAfterCreationGreaterThan: 30,
                  daysAfterLastTierChangeGreaterThan: 90,
                },
              },
              version: {
                tierToArchive: {
                  daysAfterCreationGreaterThan: 30,
                  daysAfterLastTierChangeGreaterThan: 90,
                },
              },
            },
            filters: { blobTypes: ["blockBlob"], prefixMatch: ["olcmtestcontainer"] },
          },
          enabled: true,
        },
      ],
    },
  });
  console.log(result);
}

async function main() {
  await storageAccountSetManagementPolicies();
  await storageAccountSetManagementPolicyColdTierActions();
  await storageAccountSetManagementPolicyForBlockAndAppendBlobs();
  await storageAccountSetManagementPolicyHotTierActions();
  await storageAccountSetManagementPolicyWithSnapshotAndVersion();
  await storageAccountSetManagementPolicyBaseBlobDaysAfterCreationActions();
  await storageAccountSetManagementPolicyLastAccessTimeBasedBlobActions();
  await storageAccountSetManagementPolicyLastTierChangeTimeActions();
}

main().catch(console.error);
