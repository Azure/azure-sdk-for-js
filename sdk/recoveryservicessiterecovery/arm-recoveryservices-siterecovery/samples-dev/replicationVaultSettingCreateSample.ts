// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SiteRecoveryManagementClient } from "@azure/arm-recoveryservices-siterecovery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation to configure vault setting.
 *
 * @summary the operation to configure vault setting.
 * x-ms-original-file: 2026-11-01/ReplicationVaultSetting_Create.json
 */
async function updatesVaultSettingAVaultSettingObjectIsASingletonPerVaultAndItIsAlwaysPresentByDefault(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "c183865e-6077-46f2-a3b1-deb0f4f4650a";
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const result = await client.replicationVaultSetting.create(
    "resourceGroupPS1",
    "vault1",
    "default",
    {
      properties: {
        migrationSolutionId:
          "/subscriptions/c183865e-6077-46f2-a3b1-deb0f4f4650a/resourceGroups/resourceGroupPS1/providers/Microsoft.Migrate/MigrateProjects/resourceGroupPS1-MigrateProject/Solutions/Servers-Migration-ServerMigration",
        recoveryNetworkConfigAutoSync: "Enabled",
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to the operation to configure vault setting.
 *
 * @summary the operation to configure vault setting.
 * x-ms-original-file: 2026-11-01/ReplicationVaultSetting_Create_Disabled.json
 */
async function updatesVaultSettingWithTheA2ARecoveryNetworkConfigurationAutoSyncPolicyDisabled(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "c183865e-6077-46f2-a3b1-deb0f4f4650a";
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const result = await client.replicationVaultSetting.create(
    "resourceGroupPS1",
    "vault1",
    "default",
    {
      properties: {
        migrationSolutionId:
          "/subscriptions/c183865e-6077-46f2-a3b1-deb0f4f4650a/resourceGroups/resourceGroupPS1/providers/Microsoft.Migrate/MigrateProjects/resourceGroupPS1-MigrateProject/Solutions/Servers-Migration-ServerMigration",
        recoveryNetworkConfigAutoSync: "Disabled",
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updatesVaultSettingAVaultSettingObjectIsASingletonPerVaultAndItIsAlwaysPresentByDefault();
  await updatesVaultSettingWithTheA2ARecoveryNetworkConfigurationAutoSyncPolicyDisabled();
}

main().catch(console.error);
