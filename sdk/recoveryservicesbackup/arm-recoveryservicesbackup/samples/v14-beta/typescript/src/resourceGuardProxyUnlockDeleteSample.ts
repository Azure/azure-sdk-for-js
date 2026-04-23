// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RecoveryServicesBackupClient } from "@azure/arm-recoveryservicesbackup";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to secures delete ResourceGuardProxy operations.
 *
 * @summary secures delete ResourceGuardProxy operations.
 * x-ms-original-file: 2026-01-01-preview/ResourceGuardProxyCRUD/UnlockDeleteResourceGuardProxy.json
 */
async function unlockDeleteResourceGuardProxy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0b352192-dcac-4cc7-992e-a96190ccc68c";
  const client = new RecoveryServicesBackupClient(credential, subscriptionId);
  const result = await client.resourceGuardProxy.unlockDelete(
    "sampleVault",
    "SampleResourceGroup",
    "swaggerExample",
    {
      resourceGuardOperationRequests: [
        "/subscriptions/c999d45b-944f-418c-a0d8-c3fcfd1802c8/resourceGroups/vaultguardRGNew/providers/Microsoft.DataProtection/resourceGuards/VaultGuardTestNew/deleteProtectedItemRequests/default",
      ],
      resourceToBeDeleted:
        "/subscriptions/62b829ee-7936-40c9-a1c9-47a93f9f3965/resourceGroups/gaallarg/providers/Microsoft.RecoveryServices/vaults/MercuryCrrVault/backupFabrics/Azure/protectionContainers/VMAppContainer;compute;crrtestrg;crrtestvm/protectedItems/SQLDataBase;mssqlserver;testdb",
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await unlockDeleteResourceGuardProxy();
}

main().catch(console.error);
