// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PostgreSQLManagementFlexibleServerClient } from "@azure/arm-postgresql-flexible";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates an existing server. The request body can contain one or multiple of the properties present in the normal server definition.
 *
 * @summary updates an existing server. The request body can contain one or multiple of the properties present in the normal server definition.
 * x-ms-original-file: 2026-01-01-preview/ServersPromoteReplicaAsForcedStandaloneServer.json
 */
async function promoteAReadReplicaToAStandaloneServerWithForcedDataSynchronizationMeaningThatItDoesnTWaitForDataInTheReadReplicaToBeSynchronizedWithItsSourceServerBeforeItInitiatesThePromotionToAStandaloneServer(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.servers.update("exampleresourcegroup", "exampleserver", {
    replica: { promoteMode: "Standalone", promoteOption: "Forced" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates an existing server. The request body can contain one or multiple of the properties present in the normal server definition.
 *
 * @summary updates an existing server. The request body can contain one or multiple of the properties present in the normal server definition.
 * x-ms-original-file: 2026-01-01-preview/ServersPromoteReplicaAsForcedSwitchover.json
 */
async function switchOverAReadReplicaToPrimaryServerWithForcedDataSynchronizationMeaningThatItDoesnTWaitForDataInTheReadReplicaToBeSynchronizedWithItsSourceServerBeforeItInitiatesTheSwitchingOfRolesBetweenTheReadReplicaAndThePrimaryServer(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.servers.update("exampleresourcegroup", "exampleserver", {
    replica: { promoteMode: "Switchover", promoteOption: "Forced" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates an existing server. The request body can contain one or multiple of the properties present in the normal server definition.
 *
 * @summary updates an existing server. The request body can contain one or multiple of the properties present in the normal server definition.
 * x-ms-original-file: 2026-01-01-preview/ServersPromoteReplicaAsPlannedStandaloneServer.json
 */
async function promoteAReadReplicaToAStandaloneServerWithPlannedDataSynchronizationMeaningThatItWaitsForDataInTheReadReplicaToBeFullySynchronizedWithItsSourceServerBeforeItInitiatesThePromotionToAStandaloneServer(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.servers.update("exampleresourcegroup", "exampleserver", {
    replica: { promoteMode: "Standalone", promoteOption: "Planned" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates an existing server. The request body can contain one or multiple of the properties present in the normal server definition.
 *
 * @summary updates an existing server. The request body can contain one or multiple of the properties present in the normal server definition.
 * x-ms-original-file: 2026-01-01-preview/ServersPromoteReplicaAsPlannedSwitchover.json
 */
async function switchOverAReadReplicaToPrimaryServerWithPlannedDataSynchronizationMeaningThatItWaitsForDataInTheReadReplicaToBeFullySynchronizedWithItsSourceServerBeforeItInitiatesTheSwitchingOfRolesBetweenTheReadReplicaAndThePrimaryServer(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.servers.update("exampleresourcegroup", "exampleserver", {
    replica: { promoteMode: "Switchover", promoteOption: "Planned" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates an existing server. The request body can contain one or multiple of the properties present in the normal server definition.
 *
 * @summary updates an existing server. The request body can contain one or multiple of the properties present in the normal server definition.
 * x-ms-original-file: 2026-01-01-preview/ServersUpdate.json
 */
async function updateAnExistingServer(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.servers.update("exampleresourcegroup", "exampleserver", {
    administratorLoginPassword: "examplenewpassword",
    backup: { backupRetentionDays: 20 },
    createMode: "Update",
    storage: { autoGrow: "Enabled", storageSizeGB: 1024, tier: "P30" },
    sku: { name: "Standard_D8s_v3", tier: "GeneralPurpose" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates an existing server. The request body can contain one or multiple of the properties present in the normal server definition.
 *
 * @summary updates an existing server. The request body can contain one or multiple of the properties present in the normal server definition.
 * x-ms-original-file: 2026-01-01-preview/ServersUpdateWithCustomMaintenanceWindow.json
 */
async function updateAnExistingServerWithCustomMaintenanceWindow(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.servers.update("exampleresourcegroup", "exampleserver", {
    createMode: "Update",
    maintenanceWindow: { customWindow: "Enabled", dayOfWeek: 0, startHour: 8, startMinute: 0 },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates an existing server. The request body can contain one or multiple of the properties present in the normal server definition.
 *
 * @summary updates an existing server. The request body can contain one or multiple of the properties present in the normal server definition.
 * x-ms-original-file: 2026-01-01-preview/ServersUpdateWithDataEncryptionEnabled.json
 */
async function updateAnExistingServerWithDataEncryptionBasedOnCustomerManagedKey(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.servers.update("exampleresourcegroup", "exampleserver", {
    identity: {
      type: "UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/exampleresourcegroup/providers/Microsoft.ManagedIdentity/userAssignedIdentities/examplegeoredundantidentity":
          {},
        "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/exampleresourcegroup/providers/Microsoft.ManagedIdentity/userAssignedIdentities/exampleprimaryidentity":
          {},
      },
    },
    administratorLoginPassword: "examplenewpassword",
    backup: { backupRetentionDays: 20 },
    createMode: "Update",
    dataEncryption: {
      type: "AzureKeyVault",
      geoBackupKeyURI:
        "https://examplegeoredundantkeyvault.vault.azure.net/keys/examplekey/yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy",
      geoBackupUserAssignedIdentityId:
        "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/exampleresourcegroup/providers/Microsoft.ManagedIdentity/userAssignedIdentities/examplegeoredundantidentity",
      primaryKeyURI:
        "https://exampleprimarykeyvault.vault.azure.net/keys/examplekey/xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      primaryUserAssignedIdentityId:
        "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/exampleresourcegroup/providers/Microsoft.ManagedIdentity/userAssignedIdentities/exampleprimaryidentity",
    },
    sku: { name: "Standard_D8s_v3", tier: "GeneralPurpose" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates an existing server. The request body can contain one or multiple of the properties present in the normal server definition.
 *
 * @summary updates an existing server. The request body can contain one or multiple of the properties present in the normal server definition.
 * x-ms-original-file: 2026-01-01-preview/ServersUpdateWithDataEncryptionEnabledAutoUpdate.json
 */
async function updateAnExistingServerWithDataEncryptionBasedOnCustomerManagedKeyWithAutomaticKeyVersionUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.servers.update("exampleresourcegroup", "exampleserver", {
    identity: {
      type: "UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/exampleresourcegroup/providers/Microsoft.ManagedIdentity/userAssignedIdentities/examplegeoredundantidentity":
          {},
        "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/exampleresourcegroup/providers/Microsoft.ManagedIdentity/userAssignedIdentities/exampleprimaryidentity":
          {},
      },
    },
    administratorLoginPassword: "examplenewpassword",
    backup: { backupRetentionDays: 20 },
    createMode: "Update",
    dataEncryption: {
      type: "AzureKeyVault",
      geoBackupKeyURI: "https://examplegeoredundantkeyvault.vault.azure.net/keys/examplekey",
      geoBackupUserAssignedIdentityId:
        "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/exampleresourcegroup/providers/Microsoft.ManagedIdentity/userAssignedIdentities/examplegeoredundantidentity",
      primaryKeyURI: "https://exampleprimarykeyvault.vault.azure.net/keys/examplekey",
      primaryUserAssignedIdentityId:
        "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/exampleresourcegroup/providers/Microsoft.ManagedIdentity/userAssignedIdentities/exampleprimaryidentity",
    },
    sku: { name: "Standard_D8s_v3", tier: "GeneralPurpose" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates an existing server. The request body can contain one or multiple of the properties present in the normal server definition.
 *
 * @summary updates an existing server. The request body can contain one or multiple of the properties present in the normal server definition.
 * x-ms-original-file: 2026-01-01-preview/ServersUpdateWithMajorVersionUpgrade.json
 */
async function updateAnExistingServerToUpgradeTheMajorVersionOfPostgreSQLDatabaseEngine(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.servers.update("exampleresourcegroup", "exampleserver", {
    createMode: "Update",
    version: "17",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates an existing server. The request body can contain one or multiple of the properties present in the normal server definition.
 *
 * @summary updates an existing server. The request body can contain one or multiple of the properties present in the normal server definition.
 * x-ms-original-file: 2026-01-01-preview/ServersUpdateWithMicrosoftEntraEnabled.json
 */
async function updateAnExistingServerWithMicrosoftEntraAuthenticationEnabled(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.servers.update("exampleresourcegroup", "exampleserver", {
    administratorLoginPassword: "examplenewpassword",
    authConfig: {
      activeDirectoryAuth: "Enabled",
      passwordAuth: "Enabled",
      tenantId: "tttttt-tttt-tttt-tttt-tttttttttttt",
    },
    backup: { backupRetentionDays: 20 },
    createMode: "Update",
    storage: { autoGrow: "Disabled", storageSizeGB: 1024, tier: "P30" },
    sku: { name: "Standard_D8s_v3", tier: "GeneralPurpose" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await promoteAReadReplicaToAStandaloneServerWithForcedDataSynchronizationMeaningThatItDoesnTWaitForDataInTheReadReplicaToBeSynchronizedWithItsSourceServerBeforeItInitiatesThePromotionToAStandaloneServer();
  await switchOverAReadReplicaToPrimaryServerWithForcedDataSynchronizationMeaningThatItDoesnTWaitForDataInTheReadReplicaToBeSynchronizedWithItsSourceServerBeforeItInitiatesTheSwitchingOfRolesBetweenTheReadReplicaAndThePrimaryServer();
  await promoteAReadReplicaToAStandaloneServerWithPlannedDataSynchronizationMeaningThatItWaitsForDataInTheReadReplicaToBeFullySynchronizedWithItsSourceServerBeforeItInitiatesThePromotionToAStandaloneServer();
  await switchOverAReadReplicaToPrimaryServerWithPlannedDataSynchronizationMeaningThatItWaitsForDataInTheReadReplicaToBeFullySynchronizedWithItsSourceServerBeforeItInitiatesTheSwitchingOfRolesBetweenTheReadReplicaAndThePrimaryServer();
  await updateAnExistingServer();
  await updateAnExistingServerWithCustomMaintenanceWindow();
  await updateAnExistingServerWithDataEncryptionBasedOnCustomerManagedKey();
  await updateAnExistingServerWithDataEncryptionBasedOnCustomerManagedKeyWithAutomaticKeyVersionUpdate();
  await updateAnExistingServerToUpgradeTheMajorVersionOfPostgreSQLDatabaseEngine();
  await updateAnExistingServerWithMicrosoftEntraAuthenticationEnabled();
}

main().catch(console.error);
