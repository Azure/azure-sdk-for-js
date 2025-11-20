// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RecoveryServicesClient } = require("@azure/arm-recoveryservices");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates a Recovery Services vault.
 *
 * @summary creates or updates a Recovery Services vault.
 * x-ms-original-file: 2025-08-01/PUTVault.json
 */
async function createOrUpdateRecoveryServicesVault() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "77777777-b0c6-47a2-b37c-d8e65a629c18";
  const client = new RecoveryServicesClient(credential, subscriptionId);
  const result = await client.vaults.createOrUpdate(
    "Default-RecoveryServices-ResourceGroup",
    "swaggerExample",
    {
      identity: { type: "SystemAssigned" },
      location: "West US",
      properties: { publicNetworkAccess: "Enabled" },
      sku: { name: "Standard" },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a Recovery Services vault.
 *
 * @summary creates or updates a Recovery Services vault.
 * x-ms-original-file: 2025-08-01/PUTVault_ResourceGuardEnabled.json
 */
async function createOrUpdateVaultPerformingCriticalOperationWithMUA() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "77777777-b0c6-47a2-b37c-d8e65a629c18";
  const client = new RecoveryServicesClient(credential, subscriptionId);
  const result = await client.vaults.createOrUpdate(
    "Default-RecoveryServices-ResourceGroup",
    "swaggerExample",
    {
      identity: {
        type: "UserAssigned",
        userAssignedIdentities: {
          "/subscriptions/85bf5e8c-3084-4f42-add2-746ebb7e97b2/resourcegroups/defaultrg/providers/Microsoft.ManagedIdentity/userAssignedIdentities/examplemsi":
            {},
        },
      },
      location: "West US",
      properties: {
        encryption: {
          infrastructureEncryption: "Enabled",
          kekIdentity: {
            userAssignedIdentity:
              "/subscriptions/85bf5e8c-3084-4f42-add2-746ebb7e97b2/resourcegroups/defaultrg/providers/Microsoft.ManagedIdentity/userAssignedIdentities/examplemsi",
          },
          keyVaultProperties: {
            keyUri: "https://cmk2xkv.vault.azure.net/keys/Key1/0767b348bb1a4c07baa6c4ec0055d2b3",
          },
        },
        publicNetworkAccess: "Enabled",
        resourceGuardOperationRequests: [
          "/subscriptions/38304e13-357e-405e-9e9a-220351dcce8c/resourcegroups/ankurResourceGuard1/providers/Microsoft.DataProtection/resourceGuards/ResourceGuard38-1/modifyEncryptionSettings/default",
        ],
      },
      sku: { name: "Standard" },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a Recovery Services vault.
 *
 * @summary creates or updates a Recovery Services vault.
 * x-ms-original-file: 2025-08-01/PUTVault_WithCMK.json
 */
async function createOrUpdateVaultWithCustomerManagedKeys() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "77777777-b0c6-47a2-b37c-d8e65a629c18";
  const client = new RecoveryServicesClient(credential, subscriptionId);
  const result = await client.vaults.createOrUpdate(
    "Default-RecoveryServices-ResourceGroup",
    "swaggerExample",
    {
      identity: {
        type: "UserAssigned",
        userAssignedIdentities: {
          "/subscriptions/85bf5e8c-3084-4f42-add2-746ebb7e97b2/resourcegroups/defaultrg/providers/Microsoft.ManagedIdentity/userAssignedIdentities/examplemsi":
            {},
        },
      },
      location: "West US",
      properties: {
        encryption: {
          infrastructureEncryption: "Enabled",
          kekIdentity: {
            userAssignedIdentity:
              "/subscriptions/85bf5e8c-3084-4f42-add2-746ebb7e97b2/resourcegroups/defaultrg/providers/Microsoft.ManagedIdentity/userAssignedIdentities/examplemsi",
          },
          keyVaultProperties: {
            keyUri: "https://cmk2xkv.vault.azure.net/keys/Key1/0767b348bb1a4c07baa6c4ec0055d2b3",
          },
        },
        publicNetworkAccess: "Enabled",
      },
      sku: { name: "Standard" },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a Recovery Services vault.
 *
 * @summary creates or updates a Recovery Services vault.
 * x-ms-original-file: 2025-08-01/PUTVault_WithMonitoringSettings.json
 */
async function createOrUpdateVaultWithMonitoringSetting() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "77777777-b0c6-47a2-b37c-d8e65a629c18";
  const client = new RecoveryServicesClient(credential, subscriptionId);
  const result = await client.vaults.createOrUpdate(
    "Default-RecoveryServices-ResourceGroup",
    "swaggerExample",
    {
      identity: { type: "SystemAssigned" },
      location: "West US",
      properties: {
        monitoringSettings: {
          azureMonitorAlertSettings: {
            alertsForAllFailoverIssues: "Disabled",
            alertsForAllJobFailures: "Enabled",
            alertsForAllReplicationIssues: "Enabled",
          },
          classicAlertSettings: {
            alertsForCriticalOperations: "Disabled",
            emailNotificationsForSiteRecovery: "Enabled",
          },
        },
        publicNetworkAccess: "Enabled",
      },
      sku: { name: "Standard" },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a Recovery Services vault.
 *
 * @summary creates or updates a Recovery Services vault.
 * x-ms-original-file: 2025-08-01/PUTVault_WithRedundancySettings.json
 */
async function createOrUpdateVaultWithRedundancySetting() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "77777777-b0c6-47a2-b37c-d8e65a629c18";
  const client = new RecoveryServicesClient(credential, subscriptionId);
  const result = await client.vaults.createOrUpdate(
    "Default-RecoveryServices-ResourceGroup",
    "swaggerExample",
    {
      identity: { type: "SystemAssigned" },
      location: "West US",
      properties: {
        publicNetworkAccess: "Enabled",
        redundancySettings: {
          crossRegionRestore: "Enabled",
          standardTierStorageRedundancy: "GeoRedundant",
        },
      },
      sku: { name: "Standard" },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a Recovery Services vault.
 *
 * @summary creates or updates a Recovery Services vault.
 * x-ms-original-file: 2025-08-01/PUTVault_WithSourceScanConfiguration.json
 */
async function createOrUpdateVaultWithSourceScanConfiguration() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "77777777-b0c6-47a2-b37c-d8e65a629c18";
  const client = new RecoveryServicesClient(credential, subscriptionId);
  const result = await client.vaults.createOrUpdate(
    "Default-RecoveryServices-ResourceGroup",
    "swaggerExample",
    {
      identity: { type: "SystemAssigned" },
      location: "West US",
      properties: {
        publicNetworkAccess: "Enabled",
        securitySettings: {
          sourceScanConfiguration: {
            sourceScanIdentity: { operationIdentityType: "SystemAssigned" },
            state: "Enabled",
          },
        },
      },
      sku: { name: "Standard" },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a Recovery Services vault.
 *
 * @summary creates or updates a Recovery Services vault.
 * x-ms-original-file: 2025-08-01/PUTVault_WithUserAssignedIdentity.json
 */
async function createOrUpdateVaultWithUserAssignedIdentity() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "77777777-b0c6-47a2-b37c-d8e65a629c18";
  const client = new RecoveryServicesClient(credential, subscriptionId);
  const result = await client.vaults.createOrUpdate(
    "Default-RecoveryServices-ResourceGroup",
    "swaggerExample",
    {
      identity: {
        type: "UserAssigned",
        userAssignedIdentities: {
          "/subscriptions/85bf5e8c-3084-4f42-add2-746ebb7e97b2/resourcegroups/defaultrg/providers/Microsoft.ManagedIdentity/userAssignedIdentities/examplemsi":
            {},
        },
      },
      location: "West US",
      properties: { publicNetworkAccess: "Enabled" },
      sku: { name: "Standard" },
    },
  );
  console.log(result);
}

async function main() {
  await createOrUpdateRecoveryServicesVault();
  await createOrUpdateVaultPerformingCriticalOperationWithMUA();
  await createOrUpdateVaultWithCustomerManagedKeys();
  await createOrUpdateVaultWithMonitoringSetting();
  await createOrUpdateVaultWithRedundancySetting();
  await createOrUpdateVaultWithSourceScanConfiguration();
  await createOrUpdateVaultWithUserAssignedIdentity();
}

main().catch(console.error);
