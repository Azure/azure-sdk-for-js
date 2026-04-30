// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RecoveryServicesBackupClient } from "@azure/arm-recoveryservicesbackup";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create Intent for Enabling backup of an item. This is a synchronous operation.
 *
 * @summary create Intent for Enabling backup of an item. This is a synchronous operation.
 * x-ms-original-file: 2026-01-01-preview/AzureIaasVm/ProtectionIntent_CreateOrUpdate.json
 */
async function createOrUpdateAzureVmProtectionIntent(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RecoveryServicesBackupClient(credential, subscriptionId);
  const result = await client.protectionIntent.createOrUpdate(
    "myVault",
    "myRG",
    "Azure",
    "vm;iaasvmcontainerv2;chamsrgtest;chamscandel",
    {
      properties: {
        policyId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myRG/providers/Microsoft.RecoveryServices/vaults/myVault/backupPolicies/myPolicy",
        protectionIntentItemType: "AzureResourceItem",
        sourceResourceId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/chamsrgtest/providers/Microsoft.Compute/virtualMachines/chamscandel",
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateAzureVmProtectionIntent();
}

main().catch(console.error);
