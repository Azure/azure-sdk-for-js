// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RecoveryServicesBackupClient } from "@azure/arm-recoveryservicesbackup";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to used to disable backup of an item within a container. This is an asynchronous operation. To know the status of the
 * request, call the GetItemOperationResult API.
 *
 * @summary used to disable backup of an item within a container. This is an asynchronous operation. To know the status of the
 * request, call the GetItemOperationResult API.
 * x-ms-original-file: 2026-01-01-preview/Common/ProtectedItem_Delete.json
 */
async function deleteProtectionFromAzureVirtualMachine(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RecoveryServicesBackupClient(credential, subscriptionId);
  await client.protectedItems.delete(
    "PySDKBackupTestRsVault",
    "PythonSDKBackupTestRg",
    "Azure",
    "iaasvmcontainer;iaasvmcontainerv2;pysdktestrg;pysdktestv2vm1",
    "vm;iaasvmcontainerv2;pysdktestrg;pysdktestv2vm1",
  );
}

async function main(): Promise<void> {
  await deleteProtectionFromAzureVirtualMachine();
}

main().catch(console.error);
