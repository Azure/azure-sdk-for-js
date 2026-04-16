// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RecoveryServicesClient } = require("@azure/arm-recoveryservices");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates the vault.
 *
 * @summary updates the vault.
 * x-ms-original-file: 2025-08-01/PATCHVault.json
 */
async function updateResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "77777777-b0c6-47a2-b37c-d8e65a629c18";
  const client = new RecoveryServicesClient(credential, subscriptionId);
  const result = await client.vaults.update("HelloWorld", "swaggerExample", {
    tags: { PatchKey: "PatchKeyUpdated" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates the vault.
 *
 * @summary updates the vault.
 * x-ms-original-file: 2025-08-01/PATCHVault_WithCMK.json
 */
async function updateResourceWithCustomerManagedKeys() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "77777777-b0c6-47a2-b37c-d8e65a629c18";
  const client = new RecoveryServicesClient(credential, subscriptionId);
  const result = await client.vaults.update("HelloWorld", "swaggerExample", {
    identity: {
      type: "UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/85bf5e8c-3084-4f42-add2-746ebb7e97b2/resourcegroups/defaultrg/providers/Microsoft.ManagedIdentity/userAssignedIdentities/examplemsi":
          {},
      },
    },
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
    },
    tags: { PatchKey: "PatchKeyUpdated" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates the vault.
 *
 * @summary updates the vault.
 * x-ms-original-file: 2025-08-01/PATCHVault_WithCMK3.json
 */
async function updateResourceWithCustomerManagedKeys3() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "77777777-b0c6-47a2-b37c-d8e65a629c18";
  const client = new RecoveryServicesClient(credential, subscriptionId);
  const result = await client.vaults.update("HelloWorld", "swaggerExample", {
    identity: {
      type: "UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/85bf5e8c-3084-4f42-add2-746ebb7e97b2/resourcegroups/defaultrg/providers/Microsoft.ManagedIdentity/userAssignedIdentities/examplemsi":
          {},
      },
    },
    properties: {
      encryption: {
        keyVaultProperties: {
          keyUri: "https://cmk2xkv.vault.azure.net/keys/Key1/0767b348bb1a4c07baa6c4ec0055d2b3",
        },
      },
    },
    tags: { PatchKey: "PatchKeyUpdated" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates the vault.
 *
 * @summary updates the vault.
 * x-ms-original-file: 2025-08-01/PATCHVault_WithMonitoringSettings.json
 */
async function updateVaultWithMonitoringSetting() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "77777777-b0c6-47a2-b37c-d8e65a629c18";
  const client = new RecoveryServicesClient(credential, subscriptionId);
  const result = await client.vaults.update("HelloWorld", "swaggerExample", {
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
    },
    tags: { PatchKey: "PatchKeyUpdated" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates the vault.
 *
 * @summary updates the vault.
 * x-ms-original-file: 2025-08-01/PATCHVault_WithRedundancySettings.json
 */
async function updateVaultWithRedundancySetting() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "77777777-b0c6-47a2-b37c-d8e65a629c18";
  const client = new RecoveryServicesClient(credential, subscriptionId);
  const result = await client.vaults.update("HelloWorld", "swaggerExample", {
    properties: {
      redundancySettings: {
        crossRegionRestore: "Enabled",
        standardTierStorageRedundancy: "GeoRedundant",
      },
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates the vault.
 *
 * @summary updates the vault.
 * x-ms-original-file: 2025-08-01/PATCHVault_WithSourceScanConfiguration.json
 */
async function updateVaultWithSourceScanConfiguration() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "77777777-b0c6-47a2-b37c-d8e65a629c18";
  const client = new RecoveryServicesClient(credential, subscriptionId);
  const result = await client.vaults.update("HelloWorld", "swaggerExample", {
    identity: {
      type: "UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/85bf5e8c-3084-4f42-add2-746ebb7e97b2/resourcegroups/defaultrg/providers/Microsoft.ManagedIdentity/userAssignedIdentities/examplemsi":
          {},
      },
    },
    properties: {
      securitySettings: {
        sourceScanConfiguration: {
          sourceScanIdentity: {
            operationIdentityType: "UserAssigned",
            userAssignedIdentity:
              "/subscriptions/85bf5e8c-3084-4f42-add2-746ebb7e97b2/resourcegroups/defaultrg/providers/Microsoft.ManagedIdentity/userAssignedIdentities/examplemsi",
          },
          state: "Enabled",
        },
      },
    },
    tags: { PatchKey: "PatchKeyUpdated" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates the vault.
 *
 * @summary updates the vault.
 * x-ms-original-file: 2025-08-01/PATCHVault_WithUserAssignedIdentity.json
 */
async function updateResourceWithUserAssignedIdentity() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "77777777-b0c6-47a2-b37c-d8e65a629c18";
  const client = new RecoveryServicesClient(credential, subscriptionId);
  const result = await client.vaults.update("HelloWorld", "swaggerExample", {
    identity: {
      type: "UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/85bf5e8c-3084-4f42-add2-746ebb7e97b2/resourcegroups/defaultrg/providers/Microsoft.ManagedIdentity/userAssignedIdentities/examplemsi":
          {},
      },
    },
    tags: { PatchKey: "PatchKeyUpdated" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates the vault.
 *
 * @summary updates the vault.
 * x-ms-original-file: 2025-08-01/PatchVault_WithCMK2.json
 */
async function updateResourceWithCustomerManagedKeys2() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "77777777-b0c6-47a2-b37c-d8e65a629c18";
  const client = new RecoveryServicesClient(credential, subscriptionId);
  const result = await client.vaults.update("HelloWorld", "swaggerExample", {
    identity: { type: "SystemAssigned" },
    properties: {
      encryption: { kekIdentity: { useSystemAssignedIdentity: true } },
    },
    tags: { PatchKey: "PatchKeyUpdated" },
  });
  console.log(result);
}

async function main() {
  await updateResource();
  await updateResourceWithCustomerManagedKeys();
  await updateResourceWithCustomerManagedKeys3();
  await updateVaultWithMonitoringSetting();
  await updateVaultWithRedundancySetting();
  await updateVaultWithSourceScanConfiguration();
  await updateResourceWithUserAssignedIdentity();
  await updateResourceWithCustomerManagedKeys2();
}

main().catch(console.error);
