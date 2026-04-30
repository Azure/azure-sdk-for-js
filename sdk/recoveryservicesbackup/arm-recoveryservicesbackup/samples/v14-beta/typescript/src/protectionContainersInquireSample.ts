// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RecoveryServicesBackupClient } from "@azure/arm-recoveryservicesbackup";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to this is an async operation and the results should be tracked using location header or Azure-async-url.
 *
 * @summary this is an async operation and the results should be tracked using location header or Azure-async-url.
 * x-ms-original-file: 2026-01-01-preview/AzureStorage/ProtectionContainers_Inquire.json
 */
async function inquireAzureStorageProtectionContainers(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RecoveryServicesBackupClient(credential, subscriptionId);
  await client.protectionContainers.inquire(
    "testvault",
    "test-rg",
    "Azure",
    "storagecontainer;Storage;test-rg;teststorage",
  );
}

async function main(): Promise<void> {
  await inquireAzureStorageProtectionContainers();
}

main().catch(console.error);
