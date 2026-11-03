// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureResilienceManagementClient } from "@azure/arm-resiliencemanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates a recovery configuration profile. Omitted fields remain unchanged.
 *
 * @summary updates a recovery configuration profile. Omitted fields remain unchanged.
 * x-ms-original-file: 2026-11-30-preview/RecoveryConfigProfiles_Update.json
 */
async function recoveryConfigProfilesUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new AzureResilienceManagementClient(credential);
  const result = await client.recoveryConfigProfiles.update(
    "contoso-service-group",
    "cyber-plan",
    "azure-vm-default",
    {
      properties: {
        workloadConfig: {
          workloadType: "AzureVm",
          resourceGroup: {
            armResourceType: "Microsoft.Resources/resourceGroups",
            provisioningMode: "Existing",
            resourceId:
              "/subscriptions/12345678-1234-1234-1234-123456789012/resourceGroups/cyber-recovery-rg",
          },
          virtualNetwork: {
            armResourceType: "Microsoft.Network/virtualNetworks",
            provisioningMode: "Existing",
            resourceId:
              "/subscriptions/12345678-1234-1234-1234-123456789012/resourceGroups/cyber-recovery-rg/providers/Microsoft.Network/virtualNetworks/cyber-recovery-vnet",
          },
          subnet: {
            armResourceType: "Microsoft.Network/virtualNetworks/subnets",
            provisioningMode: "Existing",
            resourceId:
              "/subscriptions/12345678-1234-1234-1234-123456789012/resourceGroups/cyber-recovery-rg/providers/Microsoft.Network/virtualNetworks/cyber-recovery-vnet/subnets/default",
          },
          storageAccount: {
            armResourceType: "Microsoft.Storage/storageAccounts",
            provisioningMode: "Existing",
            resourceId:
              "/subscriptions/12345678-1234-1234-1234-123456789012/resourceGroups/cyber-recovery-rg/providers/Microsoft.Storage/storageAccounts/cyberrecoverystorage",
          },
          targetNamePrefix: "updated-cr-",
        },
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to updates a recovery configuration profile. Omitted fields remain unchanged.
 *
 * @summary updates a recovery configuration profile. Omitted fields remain unchanged.
 * x-ms-original-file: 2026-11-30-preview/RecoveryConfigProfiles_Update_SqlDatabase.json
 */
async function recoveryConfigProfilesUpdateSqlDatabase(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new AzureResilienceManagementClient(credential);
  const result = await client.recoveryConfigProfiles.update(
    "contoso-service-group",
    "cyber-plan",
    "sql-database-default",
    {
      properties: {
        workloadConfig: { workloadType: "SqlDatabaseInAzureVm" },
        recoveryPointPolicy: {
          type: "Random",
          lookbackDuration: "P10D",
          backupType: ["Streaming", "Snapshot"],
          recoveryPointHealthStatus: "HealthyOnly",
        },
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await recoveryConfigProfilesUpdate();
  await recoveryConfigProfilesUpdateSqlDatabase();
}

main().catch(console.error);
