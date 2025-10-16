// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataProtectionClient } = require("@azure/arm-dataprotection");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to validate whether adhoc backup will be successful or not
 *
 * @summary validate whether adhoc backup will be successful or not
 * x-ms-original-file: 2025-07-01/BackupInstanceOperations/ValidateForBackup.json
 */
async function validateForBackup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "04cf684a-d41f-4550-9f70-7708a3a2283b";
  const client = new DataProtectionClient(credential, subscriptionId);
  const result = await client.backupInstances.validateForBackup(
    "000pikumar",
    "PratikPrivatePreviewVault1",
    {
      backupInstance: {
        dataSourceInfo: {
          datasourceType: "OssDB",
          objectType: "Datasource",
          resourceID:
            "/subscriptions/f75d8d8b-6735-4697-82e1-1a7a3ff0d5d4/resourceGroups/viveksipgtest/providers/Microsoft.DBforPostgreSQL/servers/viveksipgtest/databases/testdb",
          resourceLocation: "",
          resourceName: "testdb",
          resourceType: "Microsoft.DBforPostgreSQL/servers/databases",
          resourceUri: "",
        },
        dataSourceSetInfo: {
          datasourceType: "OssDB",
          objectType: "DatasourceSet",
          resourceID:
            "/subscriptions/f75d8d8b-6735-4697-82e1-1a7a3ff0d5d4/resourceGroups/viveksipgtest/providers/Microsoft.DBforPostgreSQL/servers/viveksipgtest",
          resourceLocation: "",
          resourceName: "viveksipgtest",
          resourceType: "Microsoft.DBforPostgreSQL/servers",
          resourceUri: "",
        },
        datasourceAuthCredentials: {
          objectType: "SecretStoreBasedAuthCredentials",
          secretStoreResource: {
            secretStoreType: "AzureKeyVault",
            uri: "https://samplevault.vault.azure.net/secrets/credentials",
          },
        },
        friendlyName: "harshitbi2",
        identityDetails: {
          useSystemAssignedIdentity: false,
          userAssignedIdentityArmUrl:
            "/subscriptions/f75d8d8b-6735-4697-82e1-1a7a3ff0d5d4/resourcegroups/rg-name/providers/Microsoft.ManagedIdentity/userAssignedIdentities/testUami",
        },
        objectType: "BackupInstance",
        policyInfo: {
          policyId:
            "/subscriptions/04cf684a-d41f-4550-9f70-7708a3a2283b/resourceGroups/000pikumar/providers/Microsoft.DataProtection/Backupvaults/PratikPrivatePreviewVault1/backupPolicies/PratikPolicy1",
        },
      },
    },
  );
  console.log(result);
}

async function main() {
  await validateForBackup();
}

main().catch(console.error);
