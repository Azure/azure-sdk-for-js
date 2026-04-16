// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataProtectionClient } from "@azure/arm-dataprotection";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to returns resource collection belonging to a subscription.
 *
 * @summary returns resource collection belonging to a subscription.
 * x-ms-original-file: 2025-07-01/VaultCRUD/GetBackupVaultsInSubscription.json
 */
async function getBackupVaultsInSubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0b352192-dcac-4cc7-992e-a96190ccc68c";
  const client = new DataProtectionClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.backupVaults.listInSubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getBackupVaultsInSubscription();
}

main().catch(console.error);
