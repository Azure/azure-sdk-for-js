// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  ServerForPatch} from "@azure/arm-postgresql-flexible";
import {
  PostgreSQLManagementFlexibleServerClient,
} from "@azure/arm-postgresql-flexible";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Updates an existing server. The request body can contain one or multiple of the properties present in the normal server definition.
 *
 * @summary Updates an existing server. The request body can contain one or multiple of the properties present in the normal server definition.
 * x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2025-08-01/examples/ServersPromoteReplicaAsForcedStandaloneServer.json
 */
async function promoteAReadReplicaToAStandaloneServerWithForcedDataSynchronizationMeaningThatItDoesnTWaitForDataInTheReadReplicaToBeSynchronizedWithItsSourceServerBeforeItInitiatesThePromotionToAStandaloneServer(): Promise<void> {
  const subscriptionId =
    process.env["POSTGRESQL_SUBSCRIPTION_ID"] ||
    "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName =
    process.env["POSTGRESQL_RESOURCE_GROUP"] || "exampleresourcegroup";
  const serverName = "exampleserver";
  const parameters: ServerForPatch = {
    replica: { promoteMode: "Standalone", promoteOption: "Forced" },
  };
  const credential = new DefaultAzureCredential();
  const client = new PostgreSQLManagementFlexibleServerClient(
    credential,
    subscriptionId,
  );
  const result = await client.servers.beginUpdateAndWait(
    resourceGroupName,
    serverName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Updates an existing server. The request body can contain one or multiple of the properties present in the normal server definition.
 *
 * @summary Updates an existing server. The request body can contain one or multiple of the properties present in the normal server definition.
 * x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2025-08-01/examples/ServersPromoteReplicaAsPlannedStandaloneServer.json
 */
async function promoteAReadReplicaToAStandaloneServerWithPlannedDataSynchronizationMeaningThatItWaitsForDataInTheReadReplicaToBeFullySynchronizedWithItsSourceServerBeforeItInitiatesThePromotionToAStandaloneServer(): Promise<void> {
  const subscriptionId =
    process.env["POSTGRESQL_SUBSCRIPTION_ID"] ||
    "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName =
    process.env["POSTGRESQL_RESOURCE_GROUP"] || "exampleresourcegroup";
  const serverName = "exampleserver";
  const parameters: ServerForPatch = {
    replica: { promoteMode: "Standalone", promoteOption: "Planned" },
  };
  const credential = new DefaultAzureCredential();
  const client = new PostgreSQLManagementFlexibleServerClient(
    credential,
    subscriptionId,
  );
  const result = await client.servers.beginUpdateAndWait(
    resourceGroupName,
    serverName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Updates an existing server. The request body can contain one or multiple of the properties present in the normal server definition.
 *
 * @summary Updates an existing server. The request body can contain one or multiple of the properties present in the normal server definition.
 * x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2025-08-01/examples/ServersPromoteReplicaAsForcedSwitchover.json
 */
async function switchOverAReadReplicaToPrimaryServerWithForcedDataSynchronizationMeaningThatItDoesnTWaitForDataInTheReadReplicaToBeSynchronizedWithItsSourceServerBeforeItInitiatesTheSwitchingOfRolesBetweenTheReadReplicaAndThePrimaryServer(): Promise<void> {
  const subscriptionId =
    process.env["POSTGRESQL_SUBSCRIPTION_ID"] ||
    "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName =
    process.env["POSTGRESQL_RESOURCE_GROUP"] || "exampleresourcegroup";
  const serverName = "exampleserver";
  const parameters: ServerForPatch = {
    replica: { promoteMode: "Switchover", promoteOption: "Forced" },
  };
  const credential = new DefaultAzureCredential();
  const client = new PostgreSQLManagementFlexibleServerClient(
    credential,
    subscriptionId,
  );
  const result = await client.servers.beginUpdateAndWait(
    resourceGroupName,
    serverName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Updates an existing server. The request body can contain one or multiple of the properties present in the normal server definition.
 *
 * @summary Updates an existing server. The request body can contain one or multiple of the properties present in the normal server definition.
 * x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2025-08-01/examples/ServersPromoteReplicaAsPlannedSwitchover.json
 */
async function switchOverAReadReplicaToPrimaryServerWithPlannedDataSynchronizationMeaningThatItWaitsForDataInTheReadReplicaToBeFullySynchronizedWithItsSourceServerBeforeItInitiatesTheSwitchingOfRolesBetweenTheReadReplicaAndThePrimaryServer(): Promise<void> {
  const subscriptionId =
    process.env["POSTGRESQL_SUBSCRIPTION_ID"] ||
    "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName =
    process.env["POSTGRESQL_RESOURCE_GROUP"] || "exampleresourcegroup";
  const serverName = "exampleserver";
  const parameters: ServerForPatch = {
    replica: { promoteMode: "Switchover", promoteOption: "Planned" },
  };
  const credential = new DefaultAzureCredential();
  const client = new PostgreSQLManagementFlexibleServerClient(
    credential,
    subscriptionId,
  );
  const result = await client.servers.beginUpdateAndWait(
    resourceGroupName,
    serverName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Updates an existing server. The request body can contain one or multiple of the properties present in the normal server definition.
 *
 * @summary Updates an existing server. The request body can contain one or multiple of the properties present in the normal server definition.
 * x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2025-08-01/examples/ServersUpdateWithMajorVersionUpgrade.json
 */
async function updateAnExistingServerToUpgradeTheMajorVersionOfPostgreSqlDatabaseEngine(): Promise<void> {
  const subscriptionId =
    process.env["POSTGRESQL_SUBSCRIPTION_ID"] ||
    "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName =
    process.env["POSTGRESQL_RESOURCE_GROUP"] || "exampleresourcegroup";
  const serverName = "exampleserver";
  const parameters: ServerForPatch = { createMode: "Update", version: "17" };
  const credential = new DefaultAzureCredential();
  const client = new PostgreSQLManagementFlexibleServerClient(
    credential,
    subscriptionId,
  );
  const result = await client.servers.beginUpdateAndWait(
    resourceGroupName,
    serverName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Updates an existing server. The request body can contain one or multiple of the properties present in the normal server definition.
 *
 * @summary Updates an existing server. The request body can contain one or multiple of the properties present in the normal server definition.
 * x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2025-08-01/examples/ServersUpdateWithMicrosoftEntraEnabled.json
 */
async function updateAnExistingServerWithMicrosoftEntraAuthenticationEnabled(): Promise<void> {
  const subscriptionId =
    process.env["POSTGRESQL_SUBSCRIPTION_ID"] ||
    "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName =
    process.env["POSTGRESQL_RESOURCE_GROUP"] || "exampleresourcegroup";
  const serverName = "exampleserver";
  const parameters: ServerForPatch = {
    administratorLoginPassword: "examplenewpassword",
    authConfig: {
      activeDirectoryAuth: "Enabled",
      passwordAuth: "Enabled",
      tenantId: "tttttt-tttt-tttt-tttt-tttttttttttt",
    },
    backup: { backupRetentionDays: 20 },
    createMode: "Update",
    sku: { name: "Standard_D8s_v3", tier: "GeneralPurpose" },
    storage: { autoGrow: "Disabled", storageSizeGB: 1024, tier: "P30" },
  };
  const credential = new DefaultAzureCredential();
  const client = new PostgreSQLManagementFlexibleServerClient(
    credential,
    subscriptionId,
  );
  const result = await client.servers.beginUpdateAndWait(
    resourceGroupName,
    serverName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Updates an existing server. The request body can contain one or multiple of the properties present in the normal server definition.
 *
 * @summary Updates an existing server. The request body can contain one or multiple of the properties present in the normal server definition.
 * x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2025-08-01/examples/ServersUpdateWithCustomMaintenanceWindow.json
 */
async function updateAnExistingServerWithCustomMaintenanceWindow(): Promise<void> {
  const subscriptionId =
    process.env["POSTGRESQL_SUBSCRIPTION_ID"] ||
    "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName =
    process.env["POSTGRESQL_RESOURCE_GROUP"] || "exampleresourcegroup";
  const serverName = "exampleserver";
  const parameters: ServerForPatch = {
    createMode: "Update",
    maintenanceWindow: {
      customWindow: "Enabled",
      dayOfWeek: 0,
      startHour: 8,
      startMinute: 0,
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new PostgreSQLManagementFlexibleServerClient(
    credential,
    subscriptionId,
  );
  const result = await client.servers.beginUpdateAndWait(
    resourceGroupName,
    serverName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Updates an existing server. The request body can contain one or multiple of the properties present in the normal server definition.
 *
 * @summary Updates an existing server. The request body can contain one or multiple of the properties present in the normal server definition.
 * x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2025-08-01/examples/ServersUpdateWithDataEncryptionEnabledAutoUpdate.json
 */
async function updateAnExistingServerWithDataEncryptionBasedOnCustomerManagedKeyWithAutomaticKeyVersionUpdate(): Promise<void> {
  const subscriptionId =
    process.env["POSTGRESQL_SUBSCRIPTION_ID"] ||
    "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName =
    process.env["POSTGRESQL_RESOURCE_GROUP"] || "exampleresourcegroup";
  const serverName = "exampleserver";
  const parameters: ServerForPatch = {
    administratorLoginPassword: "examplenewpassword",
    backup: { backupRetentionDays: 20 },
    createMode: "Update",
    dataEncryption: {
      type: "AzureKeyVault",
      geoBackupKeyURI:
        "https://examplegeoredundantkeyvault.vault.azure.net/keys/examplekey",
      geoBackupUserAssignedIdentityId:
        "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/exampleresourcegroup/providers/Microsoft.ManagedIdentity/userAssignedIdentities/examplegeoredundantidentity",
      primaryKeyURI:
        "https://exampleprimarykeyvault.vault.azure.net/keys/examplekey",
      primaryUserAssignedIdentityId:
        "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/exampleresourcegroup/providers/Microsoft.ManagedIdentity/userAssignedIdentities/exampleprimaryidentity",
    },
    identity: {
      type: "UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/ffffffffFfffFfffFfffFfffffffffff/resourceGroups/exampleresourcegroup/providers/MicrosoftManagedIdentity/userAssignedIdentities/examplegeoredundantidentity":
          {},
        "/subscriptions/ffffffffFfffFfffFfffFfffffffffff/resourceGroups/exampleresourcegroup/providers/MicrosoftManagedIdentity/userAssignedIdentities/exampleprimaryidentity":
          {},
      },
    },
    sku: { name: "Standard_D8s_v3", tier: "GeneralPurpose" },
  };
  const credential = new DefaultAzureCredential();
  const client = new PostgreSQLManagementFlexibleServerClient(
    credential,
    subscriptionId,
  );
  const result = await client.servers.beginUpdateAndWait(
    resourceGroupName,
    serverName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Updates an existing server. The request body can contain one or multiple of the properties present in the normal server definition.
 *
 * @summary Updates an existing server. The request body can contain one or multiple of the properties present in the normal server definition.
 * x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2025-08-01/examples/ServersUpdateWithDataEncryptionEnabled.json
 */
async function updateAnExistingServerWithDataEncryptionBasedOnCustomerManagedKey(): Promise<void> {
  const subscriptionId =
    process.env["POSTGRESQL_SUBSCRIPTION_ID"] ||
    "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName =
    process.env["POSTGRESQL_RESOURCE_GROUP"] || "exampleresourcegroup";
  const serverName = "exampleserver";
  const parameters: ServerForPatch = {
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
    identity: {
      type: "UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/ffffffffFfffFfffFfffFfffffffffff/resourceGroups/exampleresourcegroup/providers/MicrosoftManagedIdentity/userAssignedIdentities/examplegeoredundantidentity":
          {},
        "/subscriptions/ffffffffFfffFfffFfffFfffffffffff/resourceGroups/exampleresourcegroup/providers/MicrosoftManagedIdentity/userAssignedIdentities/exampleprimaryidentity":
          {},
      },
    },
    sku: { name: "Standard_D8s_v3", tier: "GeneralPurpose" },
  };
  const credential = new DefaultAzureCredential();
  const client = new PostgreSQLManagementFlexibleServerClient(
    credential,
    subscriptionId,
  );
  const result = await client.servers.beginUpdateAndWait(
    resourceGroupName,
    serverName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Updates an existing server. The request body can contain one or multiple of the properties present in the normal server definition.
 *
 * @summary Updates an existing server. The request body can contain one or multiple of the properties present in the normal server definition.
 * x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2025-08-01/examples/ServersUpdate.json
 */
async function updateAnExistingServer(): Promise<void> {
  const subscriptionId =
    process.env["POSTGRESQL_SUBSCRIPTION_ID"] ||
    "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName =
    process.env["POSTGRESQL_RESOURCE_GROUP"] || "exampleresourcegroup";
  const serverName = "exampleserver";
  const parameters: ServerForPatch = {
    administratorLoginPassword: "examplenewpassword",
    backup: { backupRetentionDays: 20 },
    createMode: "Update",
    sku: { name: "Standard_D8s_v3", tier: "GeneralPurpose" },
    storage: { autoGrow: "Enabled", storageSizeGB: 1024, tier: "P30" },
  };
  const credential = new DefaultAzureCredential();
  const client = new PostgreSQLManagementFlexibleServerClient(
    credential,
    subscriptionId,
  );
  const result = await client.servers.beginUpdateAndWait(
    resourceGroupName,
    serverName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await promoteAReadReplicaToAStandaloneServerWithForcedDataSynchronizationMeaningThatItDoesnTWaitForDataInTheReadReplicaToBeSynchronizedWithItsSourceServerBeforeItInitiatesThePromotionToAStandaloneServer();
  await promoteAReadReplicaToAStandaloneServerWithPlannedDataSynchronizationMeaningThatItWaitsForDataInTheReadReplicaToBeFullySynchronizedWithItsSourceServerBeforeItInitiatesThePromotionToAStandaloneServer();
  await switchOverAReadReplicaToPrimaryServerWithForcedDataSynchronizationMeaningThatItDoesnTWaitForDataInTheReadReplicaToBeSynchronizedWithItsSourceServerBeforeItInitiatesTheSwitchingOfRolesBetweenTheReadReplicaAndThePrimaryServer();
  await switchOverAReadReplicaToPrimaryServerWithPlannedDataSynchronizationMeaningThatItWaitsForDataInTheReadReplicaToBeFullySynchronizedWithItsSourceServerBeforeItInitiatesTheSwitchingOfRolesBetweenTheReadReplicaAndThePrimaryServer();
  await updateAnExistingServerToUpgradeTheMajorVersionOfPostgreSqlDatabaseEngine();
  await updateAnExistingServerWithMicrosoftEntraAuthenticationEnabled();
  await updateAnExistingServerWithCustomMaintenanceWindow();
  await updateAnExistingServerWithDataEncryptionBasedOnCustomerManagedKeyWithAutomaticKeyVersionUpdate();
  await updateAnExistingServerWithDataEncryptionBasedOnCustomerManagedKey();
  await updateAnExistingServer();
}

main().catch(console.error);
