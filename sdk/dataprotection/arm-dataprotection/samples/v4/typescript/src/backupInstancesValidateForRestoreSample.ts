// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataProtectionClient } from "@azure/arm-dataprotection";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to validates if Restore can be triggered for a DataSource
 *
 * @summary validates if Restore can be triggered for a DataSource
 * x-ms-original-file: 2025-07-01/BackupInstanceOperations/ValidateRestore.json
 */
async function validateRestore(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "04cf684a-d41f-4550-9f70-7708a3a2283b";
  const client = new DataProtectionClient(credential, subscriptionId);
  const result = await client.backupInstances.validateForRestore(
    "000pikumar",
    "PratikPrivatePreviewVault1",
    "testInstance1",
    {
      restoreRequestObject: {
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
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await validateRestore();
}

main().catch(console.error);
