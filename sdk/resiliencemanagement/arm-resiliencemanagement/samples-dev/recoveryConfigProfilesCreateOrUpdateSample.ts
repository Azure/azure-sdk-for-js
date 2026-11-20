// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureResilienceManagementClient } from "@azure/arm-resiliencemanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or replaces a recovery configuration profile.
 *
 * @summary creates or replaces a recovery configuration profile.
 * x-ms-original-file: 2026-11-30-preview/RecoveryConfigProfiles_CreateOrUpdate_MaximumSet_Gen.json
 */
async function recoveryConfigProfilesCreateOrUpdateMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new AzureResilienceManagementClient(credential);
  const result = await client.recoveryConfigProfiles.createOrUpdate(
    "contoso-service-group",
    "cyber-plan",
    "azure-vm-default",
    {
      properties: {
        targetScope: {
          subscriptionId: "12345678-1234-1234-1234-123456789012",
          location: "eastus2",
        },
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
            dependsOn: ["targetVirtualNetwork"],
          },
          storageAccount: {
            armResourceType: "Microsoft.Storage/storageAccounts",
            provisioningMode: "Existing",
            resourceId:
              "/subscriptions/12345678-1234-1234-1234-123456789012/resourceGroups/cyber-recovery-rg/providers/Microsoft.Storage/storageAccounts/cyberrecoverystorage",
          },
          zones: ["1", "2"],
          targetNamePrefix: "cr-",
          recoveryType: "CreateNewVM",
        },
        recoveryPointPolicy: {
          type: "Latest",
          startTime: new Date("2026-09-27T04:00:00Z"),
          endTime: new Date("2026-09-28T04:00:00Z"),
          backupType: ["Snapshot"],
          recoveryPointHealthStatus: "HealthyAndUnknown",
        },
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await recoveryConfigProfilesCreateOrUpdateMaximumSet();
}

main().catch(console.error);
