// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataProtectionClient } = require("@azure/arm-dataprotection");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to triggers restore for a BackupInstance
 *
 * @summary triggers restore for a BackupInstance
 * x-ms-original-file: 2025-07-01/BackupInstanceOperations/TriggerRestore.json
 */
async function triggerRestore() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "04cf684a-d41f-4550-9f70-7708a3a2283b";
  const client = new DataProtectionClient(credential, subscriptionId);
  const result = await client.backupInstances.triggerRestore(
    "000pikumar",
    "PratikPrivatePreviewVault1",
    "testInstance1",
    {
      identityDetails: {
        useSystemAssignedIdentity: false,
        userAssignedIdentityArmUrl:
          "/subscriptions/f75d8d8b-6735-4697-82e1-1a7a3ff0d5d4/resourcegroups/rg-name/providers/Microsoft.ManagedIdentity/userAssignedIdentities/testUami",
      },
      objectType: "AzureBackupRecoveryPointBasedRestoreRequest",
      recoveryPointId: "hardcodedRP",
      restoreTargetInfo: {
        datasourceAuthCredentials: {
          objectType: "SecretStoreBasedAuthCredentials",
          secretStoreResource: {
            secretStoreType: "AzureKeyVault",
            uri: "https://samplevault.vault.azure.net/secrets/credentials",
          },
        },
        datasourceInfo: {
          datasourceType: "Microsoft.DBforPostgreSQL/servers/databases",
          objectType: "Datasource",
          resourceID:
            "/subscriptions/f75d8d8b-6735-4697-82e1-1a7a3ff0d5d4/resourceGroups/viveksipgtest/providers/Microsoft.DBforPostgreSQL/servers/viveksipgtest/databases/targetdb",
          resourceLocation: "",
          resourceName: "targetdb",
          resourceType: "Microsoft.DBforPostgreSQL/servers/databases",
          resourceUri: "",
        },
        datasourceSetInfo: {
          datasourceType: "Microsoft.DBforPostgreSQL/servers/databases",
          objectType: "DatasourceSet",
          resourceID:
            "/subscriptions/f75d8d8b-6735-4697-82e1-1a7a3ff0d5d4/resourceGroups/viveksipgtest/providers/Microsoft.DBforPostgreSQL/servers/viveksipgtest",
          resourceLocation: "",
          resourceName: "viveksipgtest",
          resourceType: "Microsoft.DBforPostgreSQL/servers",
          resourceUri: "",
        },
        objectType: "RestoreTargetInfo",
        recoveryOption: "FailIfExists",
        restoreLocation: "southeastasia",
      },
      sourceDataStoreType: "VaultStore",
      sourceResourceId:
        "/subscriptions/f75d8d8b-6735-4697-82e1-1a7a3ff0d5d4/resourceGroups/viveksipgtest/providers/Microsoft.DBforPostgreSQL/servers/viveksipgtest/databases/testdb",
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to triggers restore for a BackupInstance
 *
 * @summary triggers restore for a BackupInstance
 * x-ms-original-file: 2025-07-01/BackupInstanceOperations/TriggerRestoreAsFiles.json
 */
async function triggerRestoreAsFiles() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "04cf684a-d41f-4550-9f70-7708a3a2283b";
  const client = new DataProtectionClient(credential, subscriptionId);
  const result = await client.backupInstances.triggerRestore(
    "000pikumar",
    "PrivatePreviewVault1",
    "testInstance1",
    {
      objectType: "AzureBackupRecoveryPointBasedRestoreRequest",
      recoveryPointId: "hardcodedRP",
      restoreTargetInfo: {
        objectType: "RestoreFilesTargetInfo",
        recoveryOption: "FailIfExists",
        restoreLocation: "southeastasia",
        targetDetails: {
          filePrefix: "restoredblob",
          restoreTargetLocationType: "AzureBlobs",
          url: "https://teststorage.blob.core.windows.net/restoretest",
        },
      },
      sourceDataStoreType: "VaultStore",
      sourceResourceId:
        "/subscriptions/f75d8d8b-6735-4697-82e1-1a7a3ff0d5d4/resourceGroups/viveksipgtest/providers/Microsoft.DBforPostgreSQL/servers/viveksipgtest/databases/testdb",
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to triggers restore for a BackupInstance
 *
 * @summary triggers restore for a BackupInstance
 * x-ms-original-file: 2025-07-01/BackupInstanceOperations/TriggerRestoreWithRehydration.json
 */
async function triggerRestoreWithRehydration() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "04cf684a-d41f-4550-9f70-7708a3a2283b";
  const client = new DataProtectionClient(credential, subscriptionId);
  const result = await client.backupInstances.triggerRestore(
    "000pikumar",
    "PratikPrivatePreviewVault1",
    "testInstance1",
    {
      objectType: "AzureBackupRestoreWithRehydrationRequest",
      recoveryPointId: "hardcodedRP",
      rehydrationPriority: "High",
      rehydrationRetentionDuration: "7D",
      restoreTargetInfo: {
        datasourceInfo: {
          datasourceType: "OssDB",
          objectType: "Datasource",
          resourceID:
            "/subscriptions/f75d8d8b-6735-4697-82e1-1a7a3ff0d5d4/resourceGroups/viveksipgtest/providers/Microsoft.DBforPostgreSQL/servers/viveksipgtest/databases/testdb",
          resourceLocation: "",
          resourceName: "testdb",
          resourceType: "Microsoft.DBforPostgreSQL/servers/databases",
          resourceUri: "",
        },
        datasourceSetInfo: {
          datasourceType: "OssDB",
          objectType: "DatasourceSet",
          resourceID:
            "/subscriptions/f75d8d8b-6735-4697-82e1-1a7a3ff0d5d4/resourceGroups/viveksipgtest/providers/Microsoft.DBforPostgreSQL/servers/viveksipgtest",
          resourceLocation: "",
          resourceName: "viveksipgtest",
          resourceType: "Microsoft.DBforPostgreSQL/servers",
          resourceUri: "",
        },
        objectType: "RestoreTargetInfo",
        recoveryOption: "FailIfExists",
        restoreLocation: "southeastasia",
      },
      sourceDataStoreType: "VaultStore",
      sourceResourceId:
        "/subscriptions/f75d8d8b-6735-4697-82e1-1a7a3ff0d5d4/resourceGroups/viveksipgtest/providers/Microsoft.DBforPostgreSQL/servers/viveksipgtest/databases/testdb",
    },
  );
  console.log(result);
}

async function main() {
  await triggerRestore();
  await triggerRestoreAsFiles();
  await triggerRestoreWithRehydration();
}

main().catch(console.error);
