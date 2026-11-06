// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataProtectionClient } = require("@azure/arm-dataprotection");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to validates whether restore can be triggered for a backup instance of the mapped source vault in a different tenant.
 *
 * @summary validates whether restore can be triggered for a backup instance of the mapped source vault in a different tenant.
 * x-ms-original-file: 2026-08-31-preview/CrossTenantVaultMappingOperations/ValidateRestoreFromDppCrossTenantVault_Trigger.json
 */
async function validateRestoreFromACrossTenantVault() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "04cf684a-d41f-4550-9f70-7708a3a2283b";
  const client = new DataProtectionClient(credential, subscriptionId);
  const result = await client.validateRestoreFromDppCrossTenantVault.trigger(
    "000pikumar",
    "PratikPrivatePreviewVault1",
    "sampleCrossTenantMapping",
    "testInstance1",
    {
      restoreRequestObject: {
        identityDetails: {
          useSystemAssignedIdentity: false,
          userAssignedIdentityArmUrl:
            "/subscriptions/f75d8d8b-6735-4697-82e1-1a7a3ff0d5d4/resourceGroups/rg-name/providers/Microsoft.ManagedIdentity/userAssignedIdentities/testUami",
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

async function main() {
  await validateRestoreFromACrossTenantVault();
}

main().catch(console.error);
