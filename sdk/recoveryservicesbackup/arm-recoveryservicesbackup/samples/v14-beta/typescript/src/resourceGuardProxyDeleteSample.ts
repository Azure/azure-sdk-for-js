// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RecoveryServicesBackupClient } from "@azure/arm-recoveryservicesbackup";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete ResourceGuardProxy under vault
 *
 * @summary delete ResourceGuardProxy under vault
 * x-ms-original-file: 2026-01-01-preview/ResourceGuardProxyCRUD/DeleteResourceGuardProxy.json
 */
async function deleteResourceGuardProxy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0b352192-dcac-4cc7-992e-a96190ccc68c";
  const client = new RecoveryServicesBackupClient(credential, subscriptionId);
  await client.resourceGuardProxy.delete("sampleVault", "SampleResourceGroup", "swaggerExample");
}

async function main(): Promise<void> {
  await deleteResourceGuardProxy();
}

main().catch(console.error);
