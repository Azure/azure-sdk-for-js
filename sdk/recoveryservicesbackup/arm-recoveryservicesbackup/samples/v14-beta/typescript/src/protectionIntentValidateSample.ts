// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RecoveryServicesBackupClient } from "@azure/arm-recoveryservicesbackup";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to it will validate followings
 * 1. Vault capacity
 * 2. VM is already protected
 * 3. Any VM related configuration passed in properties.
 *
 * @summary it will validate followings
 * 1. Vault capacity
 * 2. VM is already protected
 * 3. Any VM related configuration passed in properties.
 * x-ms-original-file: 2026-01-01-preview/AzureIaasVm/ProtectionIntent_Validate.json
 */
async function validateEnableProtectionOnAzureVm(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RecoveryServicesBackupClient(credential, subscriptionId);
  const result = await client.protectionIntent.validate("southeastasia", {
    properties: "",
    resourceId:
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/arunaupgrade/providers/Microsoft.Compute/VirtualMachines/upgrade1",
    resourceType: "VM",
    vaultId:
      "/Subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myRG/providers/Microsoft.RecoveryServices/Vaults/myVault",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await validateEnableProtectionOnAzureVm();
}

main().catch(console.error);
